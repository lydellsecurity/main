"""
Lydell Security — Media Engine
================================
Autonomous featured image sourcing via the Unsplash API.

Searches for cybersecurity-relevant images based on the article topic,
returns a CDN-optimized URL with proper attribution metadata.

Deduplicates against previously used images stored in PostgreSQL.
"""

from __future__ import annotations

import random
import re
from dataclasses import dataclass

import httpx
import structlog
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)

from config import get_settings

logger = structlog.get_logger(__name__)

UNSPLASH_API = "https://api.unsplash.com"


# ---------------------------------------------------------------------------
# Data Transfer Object
# ---------------------------------------------------------------------------
@dataclass(frozen=True)
class FeaturedImage:
    """Resolved featured image with attribution."""

    url: str
    alt_text: str
    credit: str  # "Photo by <name> on Unsplash"
    download_location: str | None = None  # Unsplash TOS: trigger download


# ---------------------------------------------------------------------------
# Query Builder
# ---------------------------------------------------------------------------
# General-purpose cyber-aesthetic fallback pool. Used when a topic has no
# matching category or when the topic tokens are all denied.
_CYBER_SYNONYMS = [
    "cybersecurity",
    "network security",
    "data protection",
    "server room",
    "digital lock",
    "encryption",
    "security operations center",
    "firewall",
    "hacking defense",
    "threat detection",
    "binary code dark",
    "dark data center",
    "matrix code",
    "glowing code screen",
    "cyber warrior",
    "network cables glowing",
]

# Category → curated Unsplash query pool. Every entry is empirically
# verified to return cyber-aesthetic imagery (dark rooms, code, screens,
# networks, locks). This is the PRIMARY source for featured-image queries.
_CATEGORY_POOLS: dict[str, list[str]] = {
    "threat intelligence": [
        "dark server room",
        "hacker hoodie screen",
        "network operations center",
        "binary code green",
        "cybersecurity monitoring",
        "glowing code screen",
        "dark computer terminal",
    ],
    "ransomware response": [
        "red alert screen",
        "encrypted data screen",
        "cybersecurity warning",
        "incident response center",
        "dark server room red light",
        "locked computer screen",
    ],
    "identity security": [
        "biometric fingerprint",
        "digital identity",
        "authentication screen",
        "password security",
        "face recognition blue",
        "cybersecurity login",
    ],
    "compliance": [
        "cybersecurity audit",
        "server room inspection",
        "data center compliance",
        "document review computer",
        "network governance",
    ],
    "vulnerability management": [
        "code vulnerability",
        "security patch",
        "programming security",
        "computer code screen",
        "penetration testing",
    ],
    "incident response": [
        "incident response center",
        "network operations center",
        "cybersecurity war room",
        "server room emergency",
        "24 7 security monitoring",
    ],
    "supply chain security": [
        "data center corridor",
        "network infrastructure",
        "cybersecurity enterprise",
        "server stacks",
    ],
    "cloud security": [
        "cloud computing security",
        "data center cloud",
        "network infrastructure dark",
        "cybersecurity cloud",
    ],
    "ai security": [
        "artificial intelligence cybersecurity",
        "neural network visualization",
        "ai data center",
        "machine learning code",
    ],
    "zero trust": [
        "cybersecurity access",
        "network security lock",
        "zero trust architecture",
        "biometric authentication",
    ],
    "general": _CYBER_SYNONYMS,
}

# Tokens that are ambiguous or polysemous in infosec and cause Unsplash to
# return literal nature/animal/toy/food results. Stripped before searching.
# Key examples:
#   - "Cozy Bear" (APT29) → teddy bears
#   - "Fancy Bear" (APT28) → costumed bears
#   - "Lazarus" → biblical paintings
#   - "Scattered Spider" → real spiders
#   - "Honey Trap" / "Honeypot" → actual honey
#   - "Kill Chain" → literal chains
_DENIED_TOKENS: frozenset[str] = frozenset({
    # APT animal codenames (CrowdStrike + FireEye taxonomies)
    "bear", "panda", "tiger", "spider", "wolf", "dragon", "kitten",
    "chollima", "buffalo", "jackal", "leopard", "crane", "eagle",
    "lynx", "badger", "ox", "hawk", "falcon",
    # Adjectives paired with animal codenames
    "cozy", "fancy", "venomous", "scattered", "crimson", "silent",
    "dark", "wizard", "iron", "void", "fuzzy", "charming", "remix",
    # Biblical / historical codenames
    "lazarus", "hermit", "sandworm", "turla",
    # Physical-object metaphors
    "honey", "honeypot", "honeytrap", "trojan", "worm", "virus",
    "bug", "patch", "chain", "killchain", "sandbox", "cookie",
    "backdoor", "rootkit", "phishing", "fishing", "whaling",
    "smishing", "vishing", "pharming", "farming",
    # Food / drink metaphors
    "cocktail", "pickle", "spam", "popcorn", "donut",
    # Generic nature words that creep into topics
    "cloud", "forest", "storm", "lightning", "rainbow",
    # APT number prefix (handled separately via regex)
})

_APT_ID_RE = re.compile(r"^apt[-_]?\d+$", re.IGNORECASE)
_CVE_RE = re.compile(r"^cve[-_]?\d{4}[-_]?\d+$", re.IGNORECASE)

# Tokens we reject if they appear in an Unsplash result's alt_description
# or tag list — strong signal the image is off-topic.
_BANNED_RESULT_TOKENS: frozenset[str] = frozenset({
    "child", "kid", "toddler", "baby", "teddy", "teddybear", "toy",
    "plush", "stuffed", "doll",
    "bear", "dog", "cat", "horse", "rabbit", "bird", "fish", "pet",
    "animal", "wildlife", "zoo", "farm", "cow", "sheep",
    "forest", "mountain", "beach", "lake", "river", "flower",
    "garden", "nature", "tree", "leaf", "waterfall",
    "food", "meal", "cake", "bread", "drink", "coffee", "tea",
    "wedding", "party", "birthday", "holiday", "christmas",
    "makeup", "fashion", "shoes",
})


def _sanitize_topic_tokens(topic: str) -> list[str]:
    """
    Strip denied polysemous tokens and noise from a topic string, returning
    a list of tokens that are safe to feed into Unsplash without risking
    literal nature/animal/toy matches.
    """
    clean = re.sub(r"<[^>]+>", "", topic)
    clean = re.sub(r"[^\w\s-]", " ", clean)
    words = clean.lower().split()

    stopwords = {
        "the", "a", "an", "and", "or", "for", "in", "on", "to",
        "how", "what", "why", "your", "with", "from", "that", "this",
        "is", "are", "was", "were", "be", "been", "being", "of",
        "it", "as", "at", "by", "its", "not", "can", "has", "had",
        "new", "use", "using", "via",
    }

    safe: list[str] = []
    for w in words:
        if len(w) <= 2:
            continue
        if w in stopwords:
            continue
        if w in _DENIED_TOKENS:
            continue
        if _APT_ID_RE.match(w) or _CVE_RE.match(w):
            continue
        safe.append(w)
    return safe


def _category_pool(category: str | None) -> list[str]:
    """Return the cyber-aesthetic query pool for a given category."""
    if not category:
        return _CYBER_SYNONYMS
    key = category.strip().lower()
    # Exact match first
    if key in _CATEGORY_POOLS:
        return _CATEGORY_POOLS[key]
    # Substring / prefix match (e.g., "Threat Intel" → "threat intelligence")
    for cat_key, pool in _CATEGORY_POOLS.items():
        if cat_key in key or key in cat_key:
            return pool
    return _CYBER_SYNONYMS


def _build_search_query(topic: str, category: str | None = None) -> str:
    """
    Build a cyber-aesthetic Unsplash query.

    Priority:
      1. A curated cyber query from the post's category pool (guaranteed
         to return cyber-looking imagery).
      2. A single "safe" noun from the topic, appended for specificity,
         but only if it survived the deny-list. Ambiguous infosec codenames
         ("cozy", "bear", "honey", "chain", etc.) are stripped so Unsplash
         cannot match them literally.

    Examples:
        topic="APT29 Cozy Bear Process Injection", category="Threat Intelligence"
          → "dark server room injection" (instead of "apt29 cozy bear")

        topic="AI Ransomware Financial Services", category="Ransomware Response"
          → "red alert screen ransomware"

        topic="Scattered Spider Identity Takeover", category="Identity Security"
          → "biometric fingerprint identity"
    """
    pool = _category_pool(category)
    primary = random.choice(pool)

    safe_tokens = _sanitize_topic_tokens(topic)
    # Pick at most one safe noun to append — more than one risks
    # re-introducing off-topic weight.
    suffix = safe_tokens[0] if safe_tokens else ""
    return f"{primary} {suffix}".strip()


def _is_result_on_topic(result: dict) -> bool:
    """
    Reject Unsplash results whose metadata strongly suggests nature,
    animals, toys, kids, food, or other non-cyber content.
    """
    fragments: list[str] = []
    if result.get("alt_description"):
        fragments.append(result["alt_description"].lower())
    if result.get("description"):
        fragments.append(result["description"].lower())
    for tag in result.get("tags", []) or []:
        title = tag.get("title") if isinstance(tag, dict) else None
        if title:
            fragments.append(title.lower())

    blob = " ".join(fragments)
    if not blob:
        # No metadata — accept (Unsplash's own cyber queries are trusted).
        return True

    tokens = set(re.findall(r"\b[a-z]+\b", blob))
    hits = tokens & _BANNED_RESULT_TOKENS
    if hits:
        logger.info(
            "media.result_rejected",
            reason="off_topic_metadata",
            banned_hits=sorted(hits),
            alt=blob[:120],
        )
        return False
    return True


# ---------------------------------------------------------------------------
# Unsplash Client
# ---------------------------------------------------------------------------
def _get_used_image_urls() -> set[str]:
    """
    Query the database for all previously used featured image URLs
    so we can avoid duplicates.
    """
    try:
        from database import get_session
        with get_session() as session:
            from sqlalchemy import text
            rows = session.execute(
                text("SELECT featured_image_url FROM posts WHERE featured_image_url IS NOT NULL")
            ).fetchall()
            # Extract the base Unsplash photo ID from URLs to match regardless of params
            used = set()
            for row in rows:
                url = row[0]
                # Extract photo ID: /photo-XXXXX? pattern
                match = re.search(r"photo-([a-zA-Z0-9_-]+)", url)
                if match:
                    used.add(match.group(0))
                else:
                    used.add(url)
            return used
    except Exception as exc:
        logger.debug("media.used_urls_fetch_failed", error=str(exc))
        return set()


@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type((httpx.HTTPStatusError, httpx.ConnectError)),
    reraise=True,
)
def _search_unsplash(query: str, page: int = 1) -> list[dict]:
    """
    Hit the Unsplash search endpoint. Returns up to 15 results.
    """
    cfg = get_settings()
    headers = {"Authorization": f"Client-ID {cfg.unsplash_access_key}"}
    params = {
        "query": query,
        "per_page": 15,
        "page": page,
        "orientation": "landscape",
        "content_filter": "high",  # SFW only
    }

    with httpx.Client(timeout=15.0) as client:
        resp = client.get(
            f"{UNSPLASH_API}/search/photos",
            headers=headers,
            params=params,
        )
        resp.raise_for_status()
        data = resp.json()

    results = data.get("results", [])
    if not results:
        logger.warning("unsplash.no_results", query=query)
    return results


def _pick_unused(
    results: list[dict],
    used_ids: set[str],
    *,
    require_on_topic: bool = True,
) -> dict | None:
    """
    Pick the first result that is (a) unused and (b) passes the on-topic
    filter (no banned nature/animal/toy/food tokens in its metadata).

    If require_on_topic is True and every result fails the filter, returns
    None so the caller can try a fresh query rather than accept a bad
    match. Set to False only as a last-ditch fallback.
    """
    for result in results:
        url = result["urls"].get("regular", "")
        match = re.search(r"photo-([a-zA-Z0-9_-]+)", url)
        photo_key = match.group(0) if match else url
        if photo_key in used_ids:
            continue
        if require_on_topic and not _is_result_on_topic(result):
            continue
        return result

    if not require_on_topic and results:
        return random.choice(results)
    return None


def _trigger_download(download_location: str) -> None:
    """
    Unsplash API TOS requires triggering the download endpoint
    when an image is used (even hotlinked). Fire-and-forget.
    """
    cfg = get_settings()
    headers = {"Authorization": f"Client-ID {cfg.unsplash_access_key}"}
    try:
        with httpx.Client(timeout=10.0) as client:
            client.get(download_location, headers=headers)
    except Exception as exc:
        logger.debug("unsplash.download_trigger_failed", error=str(exc))


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------
def fetch_featured_image(
    topic: str,
    category: str | None = None,
) -> FeaturedImage:
    """
    Search Unsplash for a cyber-aesthetic featured image matching the
    article topic and category.

    Args:
        topic: The article title or primary keyword.
        category: Optional post category used to pick a curated query
                  pool (e.g. "Threat Intelligence" → dark server rooms).

    Returns:
        FeaturedImage with CDN URL, alt text, and photographer credit.
        Falls back to a default cybersecurity image on any failure.

    Resilience strategy:
      1. Try the category-aware query with on-topic filtering.
      2. If no on-topic result, try up to 3 different queries from the
         same category pool.
      3. If still nothing, try a random _CYBER_SYNONYM.
      4. Last resort: drop the on-topic filter (rare, but better than
         the static fallback image which never varies).
    """
    cfg = get_settings()
    pool = _category_pool(category)

    try:
        used_ids = _get_used_image_urls()
        logger.debug("media.existing_images", count=len(used_ids))

        result: dict | None = None

        # ── Attempt 1: category-aware primary query ───────────────────
        query = _build_search_query(topic, category)
        logger.info("media.searching_unsplash", query=query, category=category)
        results = _search_unsplash(query)
        if results:
            result = _pick_unused(results, used_ids)

        # ── Attempt 2-4: rotate through the category pool ─────────────
        if result is None:
            attempts = random.sample(pool, min(3, len(pool)))
            for q in attempts:
                logger.info("media.fallback_search", query=q)
                results = _search_unsplash(q, page=random.randint(1, 3))
                if results:
                    result = _pick_unused(results, used_ids)
                    if result is not None:
                        break

        # ── Attempt 5: generic cyber synonym pool ─────────────────────
        if result is None:
            fallback = random.choice(_CYBER_SYNONYMS)
            logger.info("media.generic_fallback", query=fallback)
            results = _search_unsplash(fallback, page=random.randint(1, 3))
            if results:
                result = _pick_unused(results, used_ids)

        # ── Attempt 6: last resort — accept any result ────────────────
        if result is None and results:
            logger.warning("media.accepting_unfiltered")
            result = _pick_unused(results, used_ids, require_on_topic=False)

        if result is None:
            raise ValueError("No Unsplash results for any query")

        # Extract optimized URL (1200px wide, auto-format)
        raw_url = result["urls"].get("regular", result["urls"]["raw"])
        optimized_url = f"{raw_url}&w=1200&q=80&auto=format"

        # Attribution
        photographer = result.get("user", {}).get("name", "Unknown")
        credit = f"Photo by {photographer} on Unsplash"

        # Alt text from Unsplash description or generate from topic
        alt_text = (
            result.get("alt_description")
            or result.get("description")
            or f"Cybersecurity concept image for {topic[:80]}"
        )

        download_loc = result.get("links", {}).get("download_location")

        image = FeaturedImage(
            url=optimized_url,
            alt_text=alt_text,
            credit=credit,
            download_location=download_loc,
        )

        # Comply with Unsplash TOS
        if download_loc:
            _trigger_download(download_loc)

        logger.info(
            "media.image_resolved",
            url=image.url[:80],
            credit=image.credit,
        )
        return image

    except Exception as exc:
        logger.error("media.fetch_failed", error=str(exc))
        return FeaturedImage(
            url=cfg.unsplash_fallback_url,
            alt_text="Cybersecurity operations and threat monitoring",
            credit="Photo by Unsplash",
        )


# ---------------------------------------------------------------------------
# CLI Test
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    test_cases = [
        ("APT29 Cozy Bear Process Injection Defense Strategies", "Threat Intelligence"),
        ("AI-Driven Ransomware Eradication for Financial Services", "Ransomware Response"),
        ("Scattered Spider Identity Takeover Playbook", "Identity Security"),
    ]
    for topic, cat in test_cases:
        print(f"\n── {topic} [{cat}] ──")
        built = _build_search_query(topic, cat)
        print(f"Query:  {built}")
        img = fetch_featured_image(topic, category=cat)
        print(f"URL:    {img.url}")
        print(f"Alt:    {img.alt_text}")
        print(f"Credit: {img.credit}")
