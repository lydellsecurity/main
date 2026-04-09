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
]


def _build_search_query(topic: str) -> str:
    """
    Extract 2-3 meaningful keywords from the topic and append a
    cybersecurity qualifier to bias results toward relevant imagery.
    """
    # Strip HTML, punctuation noise
    clean = re.sub(r"<[^>]+>", "", topic)
    clean = re.sub(r"[^\w\s-]", "", clean)
    words = clean.lower().split()

    # Remove ultra-common stopwords
    stopwords = {
        "the", "a", "an", "and", "or", "for", "in", "on", "to",
        "how", "what", "why", "your", "with", "from", "that", "this",
        "is", "are", "was", "were", "be", "been", "being", "of",
    }
    keywords = [w for w in words if w not in stopwords and len(w) > 2][:3]
    keywords.append("cybersecurity")
    return " ".join(keywords)


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


def _pick_unused(results: list[dict], used_ids: set[str]) -> dict | None:
    """
    Pick the first result whose photo ID hasn't been used before.
    If all have been used, pick a random one from the batch.
    """
    for result in results:
        url = result["urls"].get("regular", "")
        match = re.search(r"photo-([a-zA-Z0-9_-]+)", url)
        photo_key = match.group(0) if match else url
        if photo_key not in used_ids:
            return result

    # All used — pick random to at least vary it
    return random.choice(results) if results else None


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
def fetch_featured_image(topic: str) -> FeaturedImage:
    """
    Search Unsplash for a featured image matching the article topic.

    Args:
        topic: The article title or primary keyword.

    Returns:
        FeaturedImage with CDN URL, alt text, and photographer credit.
        Falls back to a default cybersecurity image on any failure.
    """
    cfg = get_settings()
    query = _build_search_query(topic)
    logger.info("media.searching_unsplash", query=query)

    try:
        used_ids = _get_used_image_urls()
        logger.debug("media.existing_images", count=len(used_ids))

        results = _search_unsplash(query)
        result = _pick_unused(results, used_ids) if results else None

        if result is None:
            # Retry with a varied fallback query
            fallback = random.choice(_CYBER_SYNONYMS)
            logger.info("media.fallback_search", query=fallback)
            results = _search_unsplash(fallback, page=random.randint(1, 3))
            result = _pick_unused(results, used_ids) if results else None

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
    img = fetch_featured_image(
        "AI-Driven Ransomware Eradication for Financial Services"
    )
    print(f"URL:    {img.url}")
    print(f"Alt:    {img.alt_text}")
    print(f"Credit: {img.credit}")
