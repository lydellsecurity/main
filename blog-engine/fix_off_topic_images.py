"""
One-time script: Re-roll featured images for existing blog posts whose
current thumbnails are off-topic (literal nature/animal/toy matches from
Unsplash when the topic contained polysemous infosec tokens like
"Cozy Bear", "Scattered Spider", "Honey Trap", etc.).

Uses the updated cyber-aesthetic media_engine query pipeline so the
replacement images match the post's category.

Usage:
    # Re-roll a single post by slug
    python fix_off_topic_images.py --slug apt29-cozy-bear-process-injection-defense-strategies

    # Re-roll every post in a category
    python fix_off_topic_images.py --category "Threat Intelligence"

    # Re-roll every published post
    python fix_off_topic_images.py --all

    # Re-roll only posts whose current thumbnail metadata contains one
    # of the banned result tokens (child, teddy, bear, forest, etc.).
    # Safest bulk mode — skips posts that are already on-topic.
    python fix_off_topic_images.py --suspect

    # Dry run — show what would change without writing to the DB.
    python fix_off_topic_images.py --all --dry-run

Requires DATABASE_URL and UNSPLASH_ACCESS_KEY in the environment.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
import time

# Ensure blog-engine modules are importable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import httpx
import structlog
from sqlalchemy import text

from database import get_session
from media_engine import (
    fetch_featured_image,
    _BANNED_RESULT_TOKENS,
)

structlog.configure(
    processors=[structlog.dev.ConsoleRenderer()],
)
logger = structlog.get_logger(__name__)


# ---------------------------------------------------------------------------
# Suspect detection
# ---------------------------------------------------------------------------
def _alt_text_is_suspect(alt_text: str | None) -> bool:
    """
    Return True if the stored alt_text contains any banned nature/animal/
    toy token — strong signal this post has an off-topic thumbnail.
    """
    if not alt_text:
        return False
    tokens = set(re.findall(r"\b[a-z]+\b", alt_text.lower()))
    hits = tokens & _BANNED_RESULT_TOKENS
    if hits:
        logger.debug("fix_images.suspect_match", hits=sorted(hits), alt=alt_text[:120])
        return True
    return False


# ---------------------------------------------------------------------------
# Post selection
# ---------------------------------------------------------------------------
def _fetch_posts(
    *,
    slug: str | None,
    category: str | None,
    fetch_all: bool,
    suspect_only: bool,
) -> list[dict]:
    """Load the set of posts the user asked to re-roll."""
    with get_session() as session:
        if slug:
            rows = session.execute(
                text(
                    "SELECT id, slug, title, category, featured_image_alt "
                    "FROM posts WHERE slug = :slug"
                ),
                {"slug": slug},
            ).fetchall()
        elif category:
            rows = session.execute(
                text(
                    "SELECT id, slug, title, category, featured_image_alt "
                    "FROM posts "
                    "WHERE is_published = true AND category = :cat "
                    "ORDER BY published_at ASC"
                ),
                {"cat": category},
            ).fetchall()
        elif fetch_all or suspect_only:
            rows = session.execute(
                text(
                    "SELECT id, slug, title, category, featured_image_alt "
                    "FROM posts "
                    "WHERE is_published = true "
                    "ORDER BY published_at ASC"
                )
            ).fetchall()
        else:
            rows = []

    posts = [
        {
            "id": r[0],
            "slug": r[1],
            "title": r[2],
            "category": r[3],
            "featured_image_alt": r[4],
        }
        for r in rows
    ]

    if suspect_only:
        posts = [p for p in posts if _alt_text_is_suspect(p["featured_image_alt"])]

    return posts


# ---------------------------------------------------------------------------
# Update
# ---------------------------------------------------------------------------
def _update_post_image(post_id: str, url: str, alt: str, credit: str) -> None:
    with get_session() as session:
        session.execute(
            text(
                """
                UPDATE posts
                SET featured_image_url = :url,
                    featured_image_alt = :alt,
                    featured_image_credit = :credit,
                    updated_at = NOW()
                WHERE id = :post_id
                """
            ),
            {
                "url": url,
                "alt": alt,
                "credit": credit,
                "post_id": str(post_id),
            },
        )
        session.commit()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Re-roll featured images for posts whose thumbnails are "
            "off-topic due to literal Unsplash matches on polysemous "
            "infosec terms."
        ),
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--slug", type=str, help="Single post slug to re-roll.")
    group.add_argument("--category", type=str, help="All posts in this category.")
    group.add_argument("--all", action="store_true", help="Every published post.")
    group.add_argument(
        "--suspect",
        action="store_true",
        help=(
            "Every post whose current featured_image_alt contains a "
            "banned nature/animal/toy/food token. Safest bulk mode."
        ),
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would change without writing to the database.",
    )
    parser.add_argument(
        "--sleep",
        type=float,
        default=1.0,
        help="Seconds to sleep between Unsplash requests (default 1.0).",
    )
    args = parser.parse_args()

    logger.info(
        "fix_images.starting",
        mode=(
            "slug" if args.slug else
            "category" if args.category else
            "suspect" if args.suspect else "all"
        ),
        dry_run=args.dry_run,
    )

    posts = _fetch_posts(
        slug=args.slug,
        category=args.category,
        fetch_all=args.all,
        suspect_only=args.suspect,
    )

    if not posts:
        logger.info("fix_images.no_posts_matched")
        return 0

    logger.info("fix_images.selected", count=len(posts))

    fixed = 0
    skipped = 0
    failed = 0

    for i, post in enumerate(posts, 1):
        logger.info(
            "fix_images.processing",
            index=i,
            total=len(posts),
            slug=post["slug"],
            category=post["category"],
        )

        try:
            new_image = fetch_featured_image(
                topic=post["title"],
                category=post["category"],
            )
        except httpx.HTTPStatusError as exc:
            # Unsplash rate-limit (403 with "Rate Limit Exceeded" body)
            logger.error(
                "fix_images.rate_limited_or_http_error",
                slug=post["slug"],
                status=exc.response.status_code if exc.response else None,
                error=str(exc),
            )
            failed += 1
            continue
        except Exception as exc:
            logger.error(
                "fix_images.media_engine_failed",
                slug=post["slug"],
                error=str(exc),
            )
            failed += 1
            continue

        if args.dry_run:
            logger.info(
                "fix_images.dry_run",
                slug=post["slug"],
                would_set_url=new_image.url[:80],
                would_set_alt=new_image.alt_text[:120],
            )
            skipped += 1
        else:
            try:
                _update_post_image(
                    post_id=post["id"],
                    url=new_image.url,
                    alt=new_image.alt_text,
                    credit=new_image.credit,
                )
                fixed += 1
                logger.info(
                    "fix_images.updated",
                    slug=post["slug"],
                    url=new_image.url[:80],
                )
            except Exception as exc:
                logger.error(
                    "fix_images.db_update_failed",
                    slug=post["slug"],
                    error=str(exc),
                )
                failed += 1

        # Gentle throttle — Unsplash free tier is 50 req/hr
        if args.sleep > 0 and i < len(posts):
            time.sleep(args.sleep)

    logger.info(
        "fix_images.complete",
        fixed=fixed,
        skipped_dry_run=skipped,
        failed=failed,
        total=len(posts),
    )
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
