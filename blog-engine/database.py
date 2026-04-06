"""
Lydell Security — Database Module
===================================
SQLAlchemy 2.x models and connection management for the blog engine.

Schema:
    posts — Stores generated blog posts with full SEO metadata,
            social media blurbs, FAQ schema, and publication state.
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import (
    Column,
    DateTime,
    Index,
    String,
    Text,
    Boolean,
    create_engine,
    text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import (
    DeclarativeBase,
    Session,
    sessionmaker,
    Mapped,
    mapped_column,
)
from sqlalchemy.pool import QueuePool

import structlog

from config import get_settings

logger = structlog.get_logger(__name__)


# ---------------------------------------------------------------------------
# Base
# ---------------------------------------------------------------------------
class Base(DeclarativeBase):
    pass


# ---------------------------------------------------------------------------
# Post Model
# ---------------------------------------------------------------------------
class Post(Base):
    """
    A single blog post with complete SEO / social / schema metadata.
    """

    __tablename__ = "posts"

    # ── Primary Key ───────────────────────────────────────────────────────
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    # ── Core Content ──────────────────────────────────────────────────────
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    slug: Mapped[str] = mapped_column(
        String(300), nullable=False, unique=True, index=True
    )
    content_html: Mapped[str] = mapped_column(Text, nullable=False)
    excerpt: Mapped[str] = mapped_column(Text, nullable=False, default="")
    author: Mapped[str] = mapped_column(
        String(150), nullable=False, default="Larry Barksdale"
    )

    # ── Featured Image ────────────────────────────────────────────────────
    featured_image_url: Mapped[Optional[str]] = mapped_column(
        String(1024), nullable=True
    )
    featured_image_alt: Mapped[Optional[str]] = mapped_column(
        String(500), nullable=True
    )
    featured_image_credit: Mapped[Optional[str]] = mapped_column(
        String(300), nullable=True
    )

    # ── SEO Meta ──────────────────────────────────────────────────────────
    meta_title: Mapped[str] = mapped_column(String(70), nullable=False)
    meta_description: Mapped[str] = mapped_column(String(160), nullable=False)

    # ── Open Graph ────────────────────────────────────────────────────────
    og_title: Mapped[str] = mapped_column(String(95), nullable=False)
    og_description: Mapped[str] = mapped_column(String(200), nullable=False)

    # ── Social Media Blurbs ───────────────────────────────────────────────
    twitter_card_text: Mapped[str] = mapped_column(
        String(280), nullable=False, default=""
    )
    linkedin_post_text: Mapped[str] = mapped_column(
        Text, nullable=False, default=""
    )

    # ── Structured Data ───────────────────────────────────────────────────
    faq_schema: Mapped[Optional[str]] = mapped_column(
        Text, nullable=True, comment="JSON-LD FAQ schema markup"
    )

    # ── Taxonomy / Targeting ──────────────────────────────────────────────
    category: Mapped[Optional[str]] = mapped_column(
        String(100), nullable=True, index=True
    )
    tags: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
        comment="Comma-separated keyword tags",
    )
    target_keyword: Mapped[Optional[str]] = mapped_column(
        String(200),
        nullable=True,
        comment="Primary long-tail SEO keyword",
    )

    # ── Publication State ─────────────────────────────────────────────────
    is_published: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True
    )
    published_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # ── Composite Indexes ─────────────────────────────────────────────────
    __table_args__ = (
        Index("ix_posts_published", "is_published", "published_at"),
        Index("ix_posts_category_published", "category", "published_at"),
    )

    def __repr__(self) -> str:
        return f"<Post slug={self.slug!r} published={self.is_published}>"


# ---------------------------------------------------------------------------
# Engine & Session Factory
# ---------------------------------------------------------------------------
_engine = None
_SessionLocal = None


def get_engine():
    """Create (or return cached) SQLAlchemy engine."""
    global _engine
    if _engine is None:
        cfg = get_settings()
        _engine = create_engine(
            cfg.database_url,
            poolclass=QueuePool,
            pool_size=cfg.db_pool_size,
            max_overflow=cfg.db_max_overflow,
            pool_timeout=cfg.db_pool_timeout,
            pool_pre_ping=True,
            echo=cfg.log_level == "DEBUG",
        )
        logger.info("database.engine_created", url=cfg.database_url[:40])
    return _engine


def get_session_factory() -> sessionmaker:
    """Return a sessionmaker bound to the engine."""
    global _SessionLocal
    if _SessionLocal is None:
        _SessionLocal = sessionmaker(
            bind=get_engine(),
            autocommit=False,
            autoflush=False,
            expire_on_commit=False,
        )
    return _SessionLocal


def get_session() -> Session:
    """Open a new database session."""
    factory = get_session_factory()
    return factory()


# ---------------------------------------------------------------------------
# Schema Management
# ---------------------------------------------------------------------------
def init_db() -> None:
    """Create all tables if they don't exist."""
    engine = get_engine()
    Base.metadata.create_all(bind=engine)
    logger.info("database.tables_created")


def verify_connection() -> bool:
    """Smoke-test the database connection. Returns True on success."""
    try:
        engine = get_engine()
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        logger.info("database.connection_verified")
        return True
    except Exception as exc:
        logger.error("database.connection_failed", error=str(exc))
        return False


# ---------------------------------------------------------------------------
# Query Helpers
# ---------------------------------------------------------------------------
def get_recent_posts(
    limit: int = 5,
    exclude_slug: str | None = None,
) -> list[Post]:
    """
    Fetch recently published posts for internal linking.

    Args:
        limit: Max posts to return.
        exclude_slug: Slug of the current post being generated (avoid self-link).

    Returns:
        List of Post objects ordered by published_at DESC.
    """
    session = get_session()
    try:
        query = (
            session.query(Post)
            .filter(Post.is_published.is_(True))
            .order_by(Post.published_at.desc())
        )
        if exclude_slug:
            query = query.filter(Post.slug != exclude_slug)
        return query.limit(limit).all()
    finally:
        session.close()


def slug_exists(slug: str) -> bool:
    """Check if a slug is already taken."""
    session = get_session()
    try:
        return session.query(Post).filter(Post.slug == slug).first() is not None
    finally:
        session.close()


def insert_post(post: Post) -> Post:
    """
    Insert a new post into the database.

    Returns the persisted Post with its generated UUID.
    """
    session = get_session()
    try:
        session.add(post)
        session.commit()
        session.refresh(post)
        logger.info("database.post_inserted", slug=post.slug, id=str(post.id))
        return post
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


# ---------------------------------------------------------------------------
# CLI Entrypoint
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    print("Verifying database connection…")
    if verify_connection():
        print("✓ Connection OK")
        init_db()
        print("✓ Tables created / verified")
    else:
        print("✗ Connection FAILED — check DATABASE_URL")
