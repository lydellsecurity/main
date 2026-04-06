"""
Lydell Security — Autonomous Topic Engine
============================================
Generates fresh, SEO-optimized blog topic briefs using Claude.

On each invocation, this module:
1.  Queries the database for all existing post slugs and keywords.
2.  Determines which Lydell vertical category is "due" for coverage
    (round-robin rotation weighted by least-recently-published).
3.  Sends a tuned prompt to Claude requesting N new topic briefs that
    avoid duplicating any existing content.
4.  Validates and returns structured topic dicts ready for the generator.

This makes the blog engine truly zero-intervention — fresh content every
day without a human touching the topic queue.
"""

from __future__ import annotations

import json
import random
import re
import textwrap
from datetime import datetime, timezone

import anthropic
import structlog
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)

from config import get_settings
from database import get_all_slugs, get_all_keywords, get_category_counts

logger = structlog.get_logger(__name__)


# ---------------------------------------------------------------------------
# Lydell Verticals — The Content Matrix
# ---------------------------------------------------------------------------
VERTICALS = [
    {
        "category": "Threat Intelligence",
        "focus_areas": [
            "Defense Industrial Base (DIB) supply chain compromise",
            "Living-off-the-land (LOTL) attack detection",
            "APT persistent access campaigns",
            "Nation-state threat actor TTPs",
            "MITRE ATT&CK technique analysis",
        ],
        "compliance": ["CMMC 2.0", "FedRAMP", "NIST 800-171"],
        "tags_pool": [
            "APT", "LOTL", "DIB", "CMMC", "supply chain", "threat hunting",
            "FedRAMP", "NIST", "nation-state", "persistence",
        ],
    },
    {
        "category": "Ransomware Response",
        "focus_areas": [
            "AI-driven polymorphic ransomware",
            "Ransomware-as-a-Service (RaaS) economics",
            "Sub-4-minute detection methodology",
            "Backup infrastructure targeting",
            "Double and triple extortion tactics",
            "Decryptor development and deployment",
        ],
        "compliance": ["PCI-DSS 4.0", "SOC 2 Type II"],
        "tags_pool": [
            "ransomware", "AI", "encryption", "extortion", "RaaS",
            "financial services", "banking", "PCI-DSS", "SOC 2", "decryptor",
        ],
    },
    {
        "category": "Identity Security",
        "focus_areas": [
            "Identity infrastructure takeover",
            "Federated SSO weaponization",
            "Active Directory compromise and forensics",
            "Token theft and session hijacking",
            "MFA bypass techniques and countermeasures",
            "Cloud identity (Entra ID, Okta) attacks",
        ],
        "compliance": ["HIPAA", "HITECH", "SOC 2 Type II"],
        "tags_pool": [
            "identity", "SSO", "Active Directory", "MFA", "token theft",
            "healthcare", "enterprise", "Entra ID", "Okta", "session kill",
        ],
    },
    {
        "category": "Compliance",
        "focus_areas": [
            "CMMC 2.0 implementation timelines and requirements",
            "PCI-DSS 4.0 incident response mandates",
            "HIPAA breach notification rules",
            "SOC 2 Type II continuous monitoring",
            "FedRAMP authorization and assessment",
            "Cyber insurance underwriting requirements",
        ],
        "compliance": ["CMMC 2.0", "PCI-DSS 4.0", "HIPAA", "SOC 2", "FedRAMP"],
        "tags_pool": [
            "compliance", "CMMC", "PCI-DSS", "HIPAA", "SOC 2", "FedRAMP",
            "incident response", "audit", "regulation", "cyber insurance",
        ],
    },
    {
        "category": "Incident Response",
        "focus_areas": [
            "Zero-Dwell Response methodology",
            "IR retainer program design",
            "Forensic evidence preservation",
            "Post-incident recovery playbooks",
            "Tabletop exercise design for executives",
            "Breach coach coordination workflows",
        ],
        "compliance": ["SOC 2 Type II", "NIST CSF"],
        "tags_pool": [
            "incident response", "forensics", "recovery", "playbook",
            "tabletop", "breach coach", "retainer", "containment",
        ],
    },
]


# ---------------------------------------------------------------------------
# Category Rotation Logic
# ---------------------------------------------------------------------------
def _select_target_categories(count: int) -> list[dict]:
    """
    Select which verticals to target, weighted toward categories with
    the fewest existing posts (round-robin coverage balancing).
    """
    category_counts = get_category_counts()
    count_map = {row["category"]: row["count"] for row in category_counts}

    # Score each vertical — lower count = higher priority
    scored = []
    for v in VERTICALS:
        existing = count_map.get(v["category"], 0)
        # Add small random jitter to break ties
        score = existing + random.uniform(0, 0.5)
        scored.append((score, v))

    scored.sort(key=lambda x: x[0])

    # Pick top N, cycling if count > number of verticals
    selected = []
    for i in range(count):
        selected.append(scored[i % len(scored)][1])

    logger.info(
        "topic_engine.categories_selected",
        categories=[s["category"] for s in selected],
    )
    return selected


# ---------------------------------------------------------------------------
# Prompt Construction
# ---------------------------------------------------------------------------
def _build_topic_prompt(
    vertical: dict,
    existing_titles: list[str],
    existing_keywords: list[str],
    count: int = 1,
) -> str:
    """
    Build a tuned prompt for Claude to generate fresh topic briefs.
    """
    # Limit existing titles in prompt to last 50 to save tokens
    recent_titles = existing_titles[-50:] if len(existing_titles) > 50 else existing_titles
    recent_keywords = existing_keywords[-50:] if len(existing_keywords) > 50 else existing_keywords

    titles_block = "\n".join(f"  - {t}" for t in recent_titles) if recent_titles else "  (none yet)"
    keywords_block = "\n".join(f"  - {k}" for k in recent_keywords) if recent_keywords else "  (none yet)"

    focus_areas = "\n".join(f"  - {f}" for f in vertical["focus_areas"])
    compliance = ", ".join(vertical["compliance"])

    return textwrap.dedent(f"""\
        You are an elite cybersecurity SEO strategist for Lydell Security
        (lydellsecurity.com), a boutique incident response firm with a pedigree
        protecting the Federal Reserve, NYSE, and Cisco.

        Generate exactly {count} unique blog topic brief(s) for the
        "{vertical['category']}" category.

        FOCUS AREAS for this category:
        {focus_areas}

        RELEVANT COMPLIANCE FRAMEWORKS: {compliance}

        EXISTING ARTICLES (DO NOT duplicate or closely overlap these):
        {titles_block}

        EXISTING KEYWORDS (DO NOT reuse these):
        {keywords_block}

        REQUIREMENTS:
        1. Each topic must target a SPECIFIC long-tail keyword (5-8 words)
           that a cybersecurity professional or CISO would actually search.
        2. The topic must be technically deep — not generic thought leadership.
        3. Reference specific threats (CVEs, MITRE ATT&CK techniques, threat
           actors) or compliance requirements where possible.
        4. The keyword must be different from ALL existing keywords listed above.
        5. The topic title should be 60-100 characters, compelling, and include
           the primary keyword naturally.
        6. Generate 4-6 relevant tags as comma-separated values.

        Return ONLY a valid JSON array with this exact structure:
        [
          {{
            "topic": "<article title / brief>",
            "keyword": "<5-8 word long-tail SEO keyword>",
            "category": "{vertical['category']}",
            "tags": "<comma-separated tags>"
          }}
        ]

        Return ONLY the JSON array. No explanation, no markdown fences.
    """)


# ---------------------------------------------------------------------------
# AI Client (reuses generator.py pattern)
# ---------------------------------------------------------------------------
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=2, min=4, max=30),
    retry=retry_if_exception_type(
        (anthropic.APITimeoutError, anthropic.APIConnectionError)
    ),
    reraise=True,
)
def _call_claude(prompt: str) -> str:
    """Send a prompt to Claude and return the text response."""
    cfg = get_settings()
    client = anthropic.Anthropic(api_key=cfg.anthropic_api_key)

    message = client.messages.create(
        model=cfg.ai_model,
        max_tokens=2048,
        temperature=0.9,  # Higher creativity for diverse topics
        messages=[{"role": "user", "content": prompt}],
    )

    text_content = ""
    for block in message.content:
        if block.type == "text":
            text_content += block.text

    logger.info(
        "topic_engine.claude_response",
        input_tokens=message.usage.input_tokens,
        output_tokens=message.usage.output_tokens,
    )
    return text_content.strip()


# ---------------------------------------------------------------------------
# Response Parsing & Validation
# ---------------------------------------------------------------------------
def _parse_topics(raw: str) -> list[dict]:
    """
    Robustly extract topic JSON from Claude's response.
    """
    # Strip markdown fences if present
    fence_match = re.search(r"```(?:json)?\s*(\[.*?\])\s*```", raw, re.DOTALL)
    if fence_match:
        raw = fence_match.group(1)

    # Find JSON array
    bracket_match = re.search(r"\[.*\]", raw, re.DOTALL)
    if bracket_match:
        raw = bracket_match.group(0)

    return json.loads(raw)


def _validate_topic(
    topic: dict,
    existing_slugs: set[str],
    existing_keywords: set[str],
) -> bool:
    """
    Validate a single topic brief. Returns True if it passes all checks.
    """
    required_keys = {"topic", "keyword", "category", "tags"}
    if not required_keys.issubset(topic.keys()):
        logger.warning("topic_engine.missing_keys", keys=list(topic.keys()))
        return False

    if not topic["topic"] or len(topic["topic"]) < 20:
        logger.warning("topic_engine.title_too_short", title=topic.get("topic"))
        return False

    if not topic["keyword"] or len(topic["keyword"].split()) < 3:
        logger.warning("topic_engine.keyword_too_short", keyword=topic.get("keyword"))
        return False

    # Check keyword dedup (fuzzy — lowercase normalized)
    normalized_kw = topic["keyword"].strip().lower()
    if normalized_kw in existing_keywords:
        logger.warning("topic_engine.duplicate_keyword", keyword=normalized_kw)
        return False

    return True


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------
def generate_topics(count: int | None = None) -> list[dict]:
    """
    Generate fresh, validated topic briefs for the blog engine.

    Args:
        count: Number of topics to generate. Defaults to config.topics_per_run.

    Returns:
        List of topic dicts: [{topic, keyword, category, tags}, ...]
    """
    cfg = get_settings()
    if count is None:
        count = cfg.topics_per_run

    logger.info("topic_engine.generating", count=count)

    # ── Gather existing content for dedup ─────────────────────────────────
    existing_slugs = set(get_all_slugs())
    existing_keywords = set(k.lower() for k in get_all_keywords())
    existing_titles = list(existing_slugs)  # slugs suffice for title dedup

    # Fetch actual titles for better prompt context
    from database import get_all_titles
    existing_titles = get_all_titles()

    # ── Select target categories ──────────────────────────────────────────
    target_verticals = _select_target_categories(count)

    # ── Generate topics per category ──────────────────────────────────────
    all_topics = []

    for vertical in target_verticals:
        try:
            prompt = _build_topic_prompt(
                vertical=vertical,
                existing_titles=existing_titles,
                existing_keywords=list(existing_keywords),
                count=1,  # 1 topic per category per run
            )
            raw = _call_claude(prompt)
            topics = _parse_topics(raw)

            for topic in topics:
                if _validate_topic(topic, existing_slugs, existing_keywords):
                    all_topics.append(topic)
                    # Add to dedup sets for subsequent iterations
                    existing_keywords.add(topic["keyword"].strip().lower())
                    logger.info(
                        "topic_engine.topic_accepted",
                        topic=topic["topic"][:60],
                        category=topic["category"],
                    )
                else:
                    logger.warning(
                        "topic_engine.topic_rejected",
                        topic=topic.get("topic", "?")[:60],
                    )

        except json.JSONDecodeError as exc:
            logger.error(
                "topic_engine.parse_failed",
                category=vertical["category"],
                error=str(exc),
            )
        except Exception as exc:
            logger.error(
                "topic_engine.generation_failed",
                category=vertical["category"],
                error=str(exc),
            )

    # Trim to requested count
    result = all_topics[:count]

    logger.info(
        "topic_engine.complete",
        requested=count,
        generated=len(result),
        categories=[t["category"] for t in result],
    )
    return result


# ---------------------------------------------------------------------------
# CLI Test
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import sys

    count = int(sys.argv[1]) if len(sys.argv) > 1 else 2
    print(f"Generating {count} topic(s)…\n")

    topics = generate_topics(count=count)
    for i, t in enumerate(topics, 1):
        print(f"── Topic {i} ──")
        print(f"  Title:    {t['topic']}")
        print(f"  Keyword:  {t['keyword']}")
        print(f"  Category: {t['category']}")
        print(f"  Tags:     {t['tags']}")
        print()

    if not topics:
        print("No topics generated. Check API key and database connection.")
        sys.exit(1)
