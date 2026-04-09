"""
One-time script: Re-assign unique featured images to existing blog posts
that share duplicate Unsplash photos.

Usage:
    python fix_duplicate_images.py

Requires DATABASE_URL and UNSPLASH_ACCESS_KEY in environment.
"""

from __future__ import annotations

import os
import re
import sys
import random

# Ensure blog-engine modules are importable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import get_settings
from database import get_engine, get_session
from media_engine import fetch_featured_image, _search_unsplash, _CYBER_SYNONYMS
from sqlalchemy import text

import structlog
structlog.configure(
    processors=[
        structlog.dev.ConsoleRenderer(),
    ],
)
logger = structlog.get_logger(__name__)


def extract_photo_id(url: str) -> str | None:
    match = re.search(r"photo-([a-zA-Z0-9_-]+)", url)
    return match.group(0) if match else None


def main():
    logger.info("fix_images.starting")

    with get_session() as session:
        # Get all posts with their image URLs
        rows = session.execute(
            text("""
                SELECT id, slug, featured_image_url, title
                FROM posts
                ORDER BY published_at ASC
            """)
        ).fetchall()

    if not rows:
        logger.info("fix_images.no_posts")
        return

    # Group by photo ID to find duplicates
    photo_map: dict[str, list] = {}
    for row in rows:
        photo_id = extract_photo_id(row[2]) if row[2] else "no_image"
        photo_map.setdefault(photo_id, []).append({
            "id": row[0],
            "slug": row[1],
            "url": row[2],
            "title": row[3],
        })

    # Find groups with duplicates
    duplicates = {k: v for k, v in photo_map.items() if len(v) > 1}

    if not duplicates:
        logger.info("fix_images.no_duplicates_found")
        return

    total_dupes = sum(len(v) - 1 for v in duplicates.values())
    logger.info("fix_images.duplicates_found",
                duplicate_groups=len(duplicates),
                posts_to_fix=total_dupes)

    # Collect all currently used photo IDs
    used_ids = {extract_photo_id(r[2]) for r in rows if r[2] and extract_photo_id(r[2])}

    fixed = 0
    failed = 0

    for photo_id, posts in duplicates.items():
        # Keep the first post's image, reassign the rest
        logger.info("fix_images.group",
                     photo_id=photo_id,
                     count=len(posts),
                     keeping=posts[0]["slug"])

        for post in posts[1:]:
            try:
                # Fetch a new unique image based on the post's title
                new_image = fetch_featured_image(post["title"])

                # Verify it's actually different
                new_photo_id = extract_photo_id(new_image.url)
                if new_photo_id and new_photo_id in used_ids:
                    # Try harder with a random synonym + random page
                    query = random.choice(_CYBER_SYNONYMS)
                    results = _search_unsplash(query, page=random.randint(2, 5))
                    for r in results:
                        candidate_url = r["urls"].get("regular", "")
                        candidate_id = extract_photo_id(candidate_url)
                        if candidate_id and candidate_id not in used_ids:
                            photographer = r.get("user", {}).get("name", "Unknown")
                            new_image = type(new_image)(
                                url=f"{candidate_url}&w=1200&q=80&auto=format",
                                alt_text=r.get("alt_description") or f"Cybersecurity concept for {post['title'][:60]}",
                                credit=f"Photo by {photographer} on Unsplash",
                                download_location=r.get("links", {}).get("download_location"),
                            )
                            new_photo_id = candidate_id
                            break

                # Update the database
                with get_session() as session:
                    session.execute(
                        text("""
                            UPDATE posts
                            SET featured_image_url = :url,
                                featured_image_alt = :alt,
                                featured_image_credit = :credit,
                                updated_at = NOW()
                            WHERE id = :post_id
                        """),
                        {
                            "url": new_image.url,
                            "alt": new_image.alt_text,
                            "credit": new_image.credit,
                            "post_id": str(post["id"]),
                        },
                    )
                    session.commit()

                if new_photo_id:
                    used_ids.add(new_photo_id)

                fixed += 1
                logger.info("fix_images.updated",
                            slug=post["slug"],
                            new_photo_id=new_photo_id)

            except Exception as exc:
                failed += 1
                logger.error("fix_images.failed",
                             slug=post["slug"],
                             error=str(exc))

    logger.info("fix_images.complete", fixed=fixed, failed=failed)


if __name__ == "__main__":
    main()
