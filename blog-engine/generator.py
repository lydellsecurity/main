"""
Lydell Security — Content Generator
=====================================
Core AI-powered content generation engine.

Responsibilities:
1.  Accept a topic/keyword brief and produce a complete blog post.
2.  Generate all SEO metadata (meta title, meta desc, OG tags).
3.  Generate social media blurbs (Twitter/X, LinkedIn).
4.  Generate strict JSON-LD FAQ schema from the article headers.
5.  Query the database for existing posts and weave internal links.
6.  Return a fully-populated Post ORM object ready for insertion.

GEO / AEO Strategy:
    - H2/H3 headers are formulated as questions.
    - Each question header is immediately followed by a concise 2-3 sentence
      definitive answer (AI Overview / Featured Snippet bait).
    - Expanded technical depth follows the short answer.
    - Heavy use of bullet lists, numbered steps, bold terms, and tables.
"""

from __future__ import annotations

import json
import re
import textwrap
from datetime import datetime, timezone

import anthropic
import structlog
from python_slugify import slugify
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)

from config import get_settings
from database import Post, get_recent_posts, slug_exists

logger = structlog.get_logger(__name__)


# ---------------------------------------------------------------------------
# Prompt Templates
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = textwrap.dedent("""\
    You are an elite cybersecurity content writer for Lydell Security
    (lydellsecurity.com). You write authoritative, technically deep blog
    articles optimized for Google AI Overviews, Featured Snippets, and
    long-tail SEO.

    Brand voice rules:
    - Tone: Urgent, authoritative, incident-commander level. Zero fluff.
    - NEVER use "In today's digital age" or similar clichés.
    - Speak with the authority of a firm that has protected the Federal
      Reserve, NYSE, and Cisco.
    - Use the term "Digital Sovereignty" when referencing organizational
      control over their own infrastructure.
    - Author: Larry Barksdale, Founder of Lydell Security.

    E-E-A-T signals to inject:
    - Reference real CVEs, MITRE ATT&CK techniques, and NIST frameworks.
    - Cite specific compliance requirements (PCI-DSS 4.0, HIPAA, CMMC 2.0,
      SOC 2 Type II, FedRAMP).
    - Mention Lydell Security's 15-Minute Response Guarantee where relevant.

    GEO / AEO formatting rules (CRITICAL):
    - Every H2 and H3 MUST be formulated as a question.
    - Immediately after each question header, provide a concise 2-3 sentence
      definitive answer. This is the "snippet bait."
    - Then expand into full technical depth below the short answer.
    - Use bullet lists, numbered steps, bold key terms, and HTML tables
      heavily. Maximize scannability.
    - Include a "Key Takeaways" bulleted summary near the end.

    Output format: Return ONLY valid HTML content (no <html>, <head>, or
    <body> tags — just the article body starting with <h1>).
""")


def _build_article_prompt(
    topic: str,
    keyword: str,
    internal_links: list[dict],
) -> str:
    """Build the user-facing generation prompt."""

    links_block = ""
    if internal_links:
        links_block = "\n\nINTERNAL LINKS TO WEAVE NATURALLY INTO THE ARTICLE:\n"
        for link in internal_links:
            links_block += (
                f'- <a href="{link["url"]}">{link["anchor"]}</a>\n'
            )
        links_block += (
            "\nInsert these as contextual hyperlinks within relevant "
            "paragraphs. Do NOT dump them in a list. Each link should "
            "appear once, in a sentence where its topic is naturally "
            "discussed.\n"
        )

    return textwrap.dedent(f"""\
        Write a comprehensive, technically deep blog article.

        TOPIC: {topic}
        PRIMARY KEYWORD: {keyword}

        Requirements:
        1. Article length: 1,800 – 2,500 words.
        2. Start with an <h1> containing the primary keyword.
        3. Use 4-6 <h2> question headers and 2-3 <h3> sub-question headers.
        4. Each question header must be immediately followed by a 2-3
           sentence definitive answer, then expanded technical analysis.
        5. Include at least one HTML <table> comparing relevant frameworks,
           tools, or threat vectors.
        6. Include numbered steps or checklists where applicable.
        7. Bold all critical terms and acronyms on first use.
        8. End with a "Key Takeaways" section (bulleted).
        9. Final paragraph: Mention Lydell Security's capabilities and
           link to a consultation. Use authoritative, non-salesy language.
        10. Naturally weave the primary keyword into the <h1>, first
            paragraph, at least 2 <h2> headers, and the conclusion.
        {links_block}
        Output ONLY the HTML article body. No markdown. No code fences.
    """)


def _build_meta_prompt(title: str, keyword: str, excerpt: str) -> str:
    """Prompt for SEO metadata + social blurbs."""
    return textwrap.dedent(f"""\
        Based on this blog article:

        Title: {title}
        Primary Keyword: {keyword}
        Excerpt: {excerpt[:300]}

        Generate the following as a valid JSON object (no markdown, no
        code fences, just raw JSON):

        {{
            "meta_title": "<60-70 chars, includes primary keyword>",
            "meta_description": "<150-160 chars, compelling, includes keyword>",
            "og_title": "<60-90 chars, engaging for social shares>",
            "og_description": "<100-200 chars, value-driven hook>",
            "twitter_card_text": "<200-270 chars tweet with 3-5 relevant hashtags>",
            "linkedin_post_text": "<300-600 chars professional post with 3 hashtags>",
            "faq_items": [
                {{
                    "question": "<extracted from an H2/H3 in the article>",
                    "answer": "<the 2-3 sentence snippet answer>"
                }}
            ]
        }}

        Rules:
        - meta_title must include the primary keyword near the front.
        - twitter_card_text must include @LydellSecurity handle.
        - linkedin_post_text must tag #Cybersecurity and reference
          Lydell Security by name.
        - Extract 3-5 FAQ items from the article's question headers.
        - Return ONLY the JSON object. No explanation.
    """)


# ---------------------------------------------------------------------------
# Internal Link Resolver
# ---------------------------------------------------------------------------
def _resolve_internal_links(
    exclude_slug: str | None = None,
) -> list[dict]:
    """
    Query the database for recent published posts and build an
    internal link manifest for the generator prompt.
    """
    cfg = get_settings()
    posts = get_recent_posts(
        limit=cfg.internal_link_count,
        exclude_slug=exclude_slug,
    )

    links = []
    for post in posts:
        links.append(
            {
                "url": f"{cfg.site_url}/blog/{post.slug}",
                "anchor": post.title,
            }
        )

    logger.info("generator.internal_links_resolved", count=len(links))
    return links


# ---------------------------------------------------------------------------
# AI Client
# ---------------------------------------------------------------------------
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=2, min=4, max=30),
    retry=retry_if_exception_type(
        (anthropic.APITimeoutError, anthropic.APIConnectionError)
    ),
    reraise=True,
)
def _call_claude(system: str, user_prompt: str) -> str:
    """
    Send a prompt to Claude and return the text response.
    Includes retry logic for transient API failures.
    """
    cfg = get_settings()
    client = anthropic.Anthropic(api_key=cfg.anthropic_api_key)

    message = client.messages.create(
        model=cfg.ai_model,
        max_tokens=cfg.ai_max_tokens,
        system=system,
        messages=[{"role": "user", "content": user_prompt}],
    )

    # Extract text from response
    text_content = ""
    for block in message.content:
        if block.type == "text":
            text_content += block.text

    logger.info(
        "generator.claude_response",
        input_tokens=message.usage.input_tokens,
        output_tokens=message.usage.output_tokens,
        stop_reason=message.stop_reason,
    )
    return text_content.strip()


# ---------------------------------------------------------------------------
# Post-Processing
# ---------------------------------------------------------------------------
def _extract_title(html: str) -> str:
    """Pull the <h1> text from the generated HTML."""
    match = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.IGNORECASE | re.DOTALL)
    if match:
        # Strip inner HTML tags
        return re.sub(r"<[^>]+>", "", match.group(1)).strip()
    return "Untitled Post"


def _extract_excerpt(html: str, max_length: int = 300) -> str:
    """Extract the first meaningful paragraph as an excerpt."""
    match = re.search(r"<p[^>]*>(.*?)</p>", html, re.IGNORECASE | re.DOTALL)
    if match:
        text = re.sub(r"<[^>]+>", "", match.group(1)).strip()
        if len(text) > max_length:
            return text[: max_length - 3] + "…"
        return text
    return ""


def _generate_unique_slug(title: str) -> str:
    """Create a URL-safe slug, appending a suffix if it already exists."""
    base_slug = slugify(title, max_length=250)
    slug = base_slug
    counter = 1
    while slug_exists(slug):
        slug = f"{base_slug}-{counter}"
        counter += 1
    return slug


def _build_faq_schema(faq_items: list[dict]) -> str:
    """
    Build a strict JSON-LD FAQPage schema from extracted Q&A pairs.
    """
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": item["question"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item["answer"],
                },
            }
            for item in faq_items
        ],
    }
    return json.dumps(schema, indent=2, ensure_ascii=False)


def _parse_meta_json(raw: str) -> dict:
    """
    Robustly extract JSON from Claude's response, handling markdown
    code fences and preamble text.
    """
    # Try to find JSON block in code fences
    fence_match = re.search(
        r"```(?:json)?\s*(\{.*?\})\s*```", raw, re.DOTALL
    )
    if fence_match:
        raw = fence_match.group(1)

    # Try to find raw JSON object
    brace_match = re.search(r"\{.*\}", raw, re.DOTALL)
    if brace_match:
        raw = brace_match.group(0)

    return json.loads(raw)


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------
def generate_post(
    topic: str,
    keyword: str,
    category: str | None = None,
    tags: str | None = None,
) -> Post:
    """
    Orchestrate full blog post generation.

    Pipeline:
        1. Resolve internal links from existing posts.
        2. Generate article HTML via Claude.
        3. Extract title, excerpt, generate slug.
        4. Generate SEO meta, social blurbs, FAQ schema via Claude.
        5. Assemble and return a Post ORM object.

    Args:
        topic: Human-readable article topic / brief.
        keyword: Primary long-tail SEO keyword to target.
        category: Optional taxonomy category.
        tags: Optional comma-separated tags.

    Returns:
        A fully-populated Post object (not yet persisted).
    """
    cfg = get_settings()
    logger.info("generator.pipeline_start", topic=topic, keyword=keyword)

    # ── Step 1: Internal Links ────────────────────────────────────────────
    internal_links = _resolve_internal_links()

    # ── Step 2: Generate Article HTML ─────────────────────────────────────
    article_prompt = _build_article_prompt(topic, keyword, internal_links)
    content_html = _call_claude(SYSTEM_PROMPT, article_prompt)

    # Strip any accidental code fences
    content_html = re.sub(r"^```html?\s*", "", content_html)
    content_html = re.sub(r"\s*```$", "", content_html)

    # ── Step 3: Extract & Build Identifiers ───────────────────────────────
    title = _extract_title(content_html)
    excerpt = _extract_excerpt(content_html)
    slug = _generate_unique_slug(title)

    logger.info("generator.article_generated", title=title, slug=slug)

    # ── Step 4: Generate Metadata ─────────────────────────────────────────
    meta_prompt = _build_meta_prompt(title, keyword, excerpt)
    meta_raw = _call_claude(SYSTEM_PROMPT, meta_prompt)

    try:
        meta = _parse_meta_json(meta_raw)
    except json.JSONDecodeError as exc:
        logger.error(
            "generator.meta_parse_failed",
            error=str(exc),
            raw=meta_raw[:200],
        )
        # Fallback metadata
        meta = {
            "meta_title": title[:70],
            "meta_description": excerpt[:160],
            "og_title": title[:95],
            "og_description": excerpt[:200],
            "twitter_card_text": f"{title[:200]} @LydellSecurity #Cybersecurity",
            "linkedin_post_text": f"{excerpt[:400]} #Cybersecurity #LydellSecurity",
            "faq_items": [],
        }

    # ── Step 5: FAQ Schema ────────────────────────────────────────────────
    faq_items = meta.get("faq_items", [])
    faq_schema = _build_faq_schema(faq_items) if faq_items else None

    # ── Step 6: Assemble Post Object ──────────────────────────────────────
    post = Post(
        title=title,
        slug=slug,
        content_html=content_html,
        excerpt=excerpt,
        author=cfg.default_author,
        meta_title=meta.get("meta_title", title[:70]),
        meta_description=meta.get("meta_description", excerpt[:160]),
        og_title=meta.get("og_title", title[:95]),
        og_description=meta.get("og_description", excerpt[:200]),
        twitter_card_text=meta.get("twitter_card_text", ""),
        linkedin_post_text=meta.get("linkedin_post_text", ""),
        faq_schema=faq_schema,
        category=category,
        tags=tags,
        target_keyword=keyword,
        is_published=True,
        published_at=datetime.now(timezone.utc),
    )

    logger.info("generator.post_assembled", slug=slug)
    return post


# ---------------------------------------------------------------------------
# CLI Test
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    post = generate_post(
        topic="How to Detect Living-off-the-Land Attacks in Defense Industrial Base Networks",
        keyword="living off the land detection defense industrial base",
        category="Threat Intelligence",
        tags="LOTL,APT,DIB,CMMC",
    )
    print(f"Title: {post.title}")
    print(f"Slug:  {post.slug}")
    print(f"Meta:  {post.meta_title}")
    print(f"HTML:  {len(post.content_html)} chars")
