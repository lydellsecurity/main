#!/usr/bin/env python3
"""
Lydell Security — Blog Engine Orchestrator
============================================
Main entry point for the autonomous blog generation pipeline.

Pipeline:
    1. Initialize database (create tables if needed).
    2. Load the topic queue (keyword briefs to generate).
    3. For each topic:
       a. Generate full article + metadata via AI.
       b. Fetch a featured image from Unsplash.
       c. Insert the completed post into PostgreSQL.
    4. Trigger a Netlify rebuild to deploy the new content.

Deployment:
    Runs as a Render Cron Job on a configurable schedule
    (default: daily at 06:00 UTC).

Usage:
    python main.py                     # Process the default topic queue
    python main.py --topic "..."       # Generate a single post on-demand
    python main.py --verify            # Verify DB + API connections only
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import httpx
import structlog
from tenacity import retry, stop_after_attempt, wait_fixed

from config import get_settings
from database import init_db, verify_connection, insert_post
from generator import generate_post
from media_engine import fetch_featured_image
from topic_engine import generate_topics

# ---------------------------------------------------------------------------
# Logging Setup
# ---------------------------------------------------------------------------
structlog.configure(
    processors=[
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.dev.ConsoleRenderer(),
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    context_class=dict,
    logger_factory=structlog.PrintLoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger("blog-engine")


# ---------------------------------------------------------------------------
# Topic Queue
# ---------------------------------------------------------------------------
# Each entry is a generation brief. The engine processes them sequentially.
# In production, this can be replaced with a database-backed queue or
# an external scheduling API.

DEFAULT_TOPIC_QUEUE = [
    {
        "topic": (
            "How to Detect and Eradicate Living-off-the-Land Attacks "
            "Targeting Defense Industrial Base Supply Chains"
        ),
        "keyword": "living off the land attack detection defense industrial base",
        "category": "Threat Intelligence",
        "tags": "LOTL,APT,DIB,CMMC 2.0,supply chain security",
    },
    {
        "topic": (
            "AI-Driven Ransomware: Why Financial Institutions Need "
            "Sub-4-Minute Detection to Survive"
        ),
        "keyword": "AI ransomware detection financial services banking",
        "category": "Ransomware Response",
        "tags": "ransomware,AI,financial services,PCI-DSS 4.0,SOC 2",
    },
    {
        "topic": (
            "Identity Infrastructure Takeover in Healthcare: How Threat "
            "Actors Weaponize Federated SSO Against Hospital Networks"
        ),
        "keyword": "identity infrastructure takeover healthcare HIPAA",
        "category": "Identity Security",
        "tags": "identity,SSO,healthcare,HIPAA,credential theft",
    },
    {
        "topic": (
            "Active Directory Compromise in Enterprise Environments: "
            "Token Theft Forensics and Sub-2-Minute Session Kill"
        ),
        "keyword": "active directory compromise enterprise identity response",
        "category": "Identity Security",
        "tags": "active directory,identity,SOC 2,token theft,enterprise",
    },
    {
        "topic": (
            "CMMC 2.0 Incident Response Requirements: What Defense "
            "Contractors Must Implement Before the 2025 Deadline"
        ),
        "keyword": "CMMC 2.0 incident response requirements defense contractors",
        "category": "Compliance",
        "tags": "CMMC,compliance,DoD,incident response,defense",
    },
]


def _load_topic_queue(count: int | None = None) -> list[dict]:
    """
    Load the topic queue. Priority order:
      1. topics.json override file (manual control)
      2. Autonomous topic engine (AI-generated, deduped)
      3. DEFAULT_TOPIC_QUEUE (seed content, first-run only fallback)

    Args:
        count: Number of topics to generate if using the topic engine.
               Defaults to config.topics_per_run.
    """
    # Priority 1: Manual override file
    override_path = Path(__file__).parent / "topics.json"
    if override_path.exists():
        logger.info("queue.loading_override", path=str(override_path))
        with open(override_path) as f:
            return json.load(f)

    # Priority 2: Autonomous topic engine
    try:
        topics = generate_topics(count=count)
        if topics:
            logger.info("queue.auto_generated", count=len(topics))
            return topics
    except Exception as exc:
        logger.error("queue.topic_engine_failed", error=str(exc))

    # Priority 3: Hardcoded seed queue (first-run fallback)
    logger.info("queue.using_default_seed")
    return DEFAULT_TOPIC_QUEUE


# ---------------------------------------------------------------------------
# Netlify Deploy Trigger
# ---------------------------------------------------------------------------
@retry(stop=stop_after_attempt(3), wait=wait_fixed(5), reraise=True)
def trigger_netlify_rebuild() -> bool:
    """
    POST to the Netlify Build Hook to trigger a site rebuild.
    This deploys newly generated content to the static frontend.
    """
    cfg = get_settings()
    if not cfg.netlify_build_hook:
        logger.warning("netlify.no_build_hook_configured")
        return False

    with httpx.Client(timeout=15.0) as client:
        resp = client.post(cfg.netlify_build_hook, json={})
        resp.raise_for_status()

    logger.info("netlify.rebuild_triggered", status=resp.status_code)
    return True


# ---------------------------------------------------------------------------
# Single Post Pipeline
# ---------------------------------------------------------------------------
def process_single_topic(brief: dict) -> bool:
    """
    Full pipeline for a single topic brief.

    Returns True on success, False on failure.
    """
    topic = brief["topic"]
    keyword = brief["keyword"]
    category = brief.get("category")
    tags = brief.get("tags")

    logger.info("pipeline.topic_start", topic=topic[:80])

    try:
        # ── Generate Article ──────────────────────────────────────────
        post = generate_post(
            topic=topic,
            keyword=keyword,
            category=category,
            tags=tags,
        )

        # ── Fetch Featured Image ──────────────────────────────────────
        image = fetch_featured_image(topic)
        post.featured_image_url = image.url
        post.featured_image_alt = image.alt_text
        post.featured_image_credit = image.credit

        # ── Persist to Database ───────────────────────────────────────
        persisted = insert_post(post)
        logger.info(
            "pipeline.topic_complete",
            slug=persisted.slug,
            id=str(persisted.id),
        )
        return True

    except Exception as exc:
        logger.error(
            "pipeline.topic_failed",
            topic=topic[:80],
            error=str(exc),
            exc_info=True,
        )
        return False


# ---------------------------------------------------------------------------
# Main Orchestrator
# ---------------------------------------------------------------------------
def run_engine(single_topic: str | None = None, count: int | None = None) -> int:
    """
    Main engine loop.

    Args:
        single_topic: If provided, generate only this topic (on-demand mode).
        count: Number of topics to auto-generate (overrides config).

    Returns:
        Exit code (0 = all success, 1 = partial failure, 2 = total failure).
    """
    logger.info("engine.starting", mode="single" if single_topic else "auto")

    # ── Database Init ─────────────────────────────────────────────────────
    if not verify_connection():
        logger.critical("engine.database_unreachable")
        return 2

    init_db()

    # ── Build Topic List ──────────────────────────────────────────────────
    if single_topic:
        queue = [
            {
                "topic": single_topic,
                "keyword": single_topic.lower()[:100],
                "category": "General",
                "tags": "cybersecurity",
            }
        ]
    else:
        queue = _load_topic_queue(count=count)

    if not queue:
        logger.warning("engine.empty_queue")
        return 0

    logger.info("engine.queue_loaded", count=len(queue))

    # ── Process Queue ─────────────────────────────────────────────────────
    results = {"success": 0, "failed": 0}

    for i, brief in enumerate(queue, 1):
        logger.info(
            "engine.processing",
            index=i,
            total=len(queue),
            topic=brief["topic"][:60],
        )
        ok = process_single_topic(brief)
        if ok:
            results["success"] += 1
        else:
            results["failed"] += 1

    # ── Trigger Netlify Rebuild ───────────────────────────────────────────
    if results["success"] > 0:
        try:
            trigger_netlify_rebuild()
        except Exception as exc:
            logger.error("engine.netlify_trigger_failed", error=str(exc))

    # ── Summary ───────────────────────────────────────────────────────────
    logger.info(
        "engine.complete",
        success=results["success"],
        failed=results["failed"],
        total=len(queue),
    )

    if results["failed"] == len(queue):
        return 2
    if results["failed"] > 0:
        return 1
    return 0


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------
def main() -> None:
    parser = argparse.ArgumentParser(
        description="Lydell Security Autonomous Blog Engine",
    )
    parser.add_argument(
        "--topic",
        type=str,
        default=None,
        help="Generate a single post on-demand (overrides the queue).",
    )
    parser.add_argument(
        "--count",
        type=int,
        default=None,
        help="Number of posts to auto-generate (overrides TOPICS_PER_RUN).",
    )
    parser.add_argument(
        "--verify",
        action="store_true",
        help="Verify database and API connectivity, then exit.",
    )
    args = parser.parse_args()

    if args.verify:
        print("── Lydell Security Blog Engine — Connection Verify ──")
        db_ok = verify_connection()
        print(f"  Database:  {'✓ OK' if db_ok else '✗ FAILED'}")

        cfg = get_settings()
        api_ok = bool(cfg.anthropic_api_key)
        print(f"  Anthropic: {'✓ Key present' if api_ok else '✗ Missing'}")
        img_ok = bool(cfg.unsplash_access_key)
        print(f"  Unsplash:  {'✓ Key present' if img_ok else '✗ Missing'}")
        hook_ok = bool(cfg.netlify_build_hook)
        print(f"  Netlify:   {'✓ Hook configured' if hook_ok else '✗ Missing'}")

        sys.exit(0 if all([db_ok, api_ok, img_ok, hook_ok]) else 1)

    exit_code = run_engine(single_topic=args.topic, count=args.count)
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
