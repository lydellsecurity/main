"""
Lydell Security — Blog Engine Configuration
=============================================
Central configuration module. All secrets and environment-specific values
are loaded from environment variables (or a .env file in local dev).

Required Environment Variables:
    DATABASE_URL          — Postgres connection string (Render provides this)
    ANTHROPIC_API_KEY     — Claude 3.5 Sonnet key for content generation
    OPENAI_API_KEY        — Fallback AI provider (optional)
    UNSPLASH_ACCESS_KEY   — Unsplash API key for featured images
    NETLIFY_BUILD_HOOK    — Netlify deploy webhook URL
    SENTRY_DSN            — Sentry error tracking (optional)
"""

from __future__ import annotations

import os
from pathlib import Path
from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


# ---------------------------------------------------------------------------
# Resolve .env path relative to this file
# ---------------------------------------------------------------------------
_ENV_FILE = Path(__file__).resolve().parent / ".env"


class Settings(BaseSettings):
    """Immutable, validated application settings."""

    model_config = SettingsConfigDict(
        env_file=str(_ENV_FILE) if _ENV_FILE.exists() else None,
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── Database ──────────────────────────────────────────────────────────
    database_url: str = Field(
        ...,
        description="PostgreSQL connection string (e.g. postgresql://user:pass@host:5432/db)",
    )

    @field_validator("database_url")
    @classmethod
    def _fix_render_scheme(cls, v: str) -> str:
        """Render sometimes provides `postgres://` — SQLAlchemy 2.x needs
        `postgresql://`."""
        if v.startswith("postgres://"):
            return v.replace("postgres://", "postgresql://", 1)
        return v

    db_pool_size: int = Field(5, description="SQLAlchemy connection pool size")
    db_max_overflow: int = Field(10, description="Max overflow connections")
    db_pool_timeout: int = Field(30, description="Pool checkout timeout (sec)")

    # ── AI Provider ───────────────────────────────────────────────────────
    anthropic_api_key: str = Field(
        ..., description="Anthropic API key for Claude"
    )
    openai_api_key: str = Field(
        "", description="OpenAI API key (fallback provider)"
    )
    ai_model: str = Field(
        "claude-sonnet-4-20250514",
        description="Primary model identifier",
    )
    ai_max_tokens: int = Field(4096, description="Max tokens per generation")
    ai_temperature: float = Field(0.7, description="Sampling temperature")

    # ── Unsplash ──────────────────────────────────────────────────────────
    unsplash_access_key: str = Field(
        ..., description="Unsplash API access key"
    )
    unsplash_fallback_url: str = Field(
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
        "?auto=format&fit=crop&w=1200&q=80",
        description="Fallback image if Unsplash fails",
    )

    # ── Netlify ───────────────────────────────────────────────────────────
    netlify_build_hook: str = Field(
        ..., description="Netlify build hook URL for deploy triggers"
    )

    # ── Observability ─────────────────────────────────────────────────────
    sentry_dsn: str = Field("", description="Sentry DSN (optional)")
    log_level: str = Field("INFO", description="Logging level")
    environment: str = Field("production", description="Runtime environment")

    # ── Content Defaults ──────────────────────────────────────────────────
    site_url: str = Field(
        "https://lydellsecurity.com", description="Canonical site URL"
    )
    site_name: str = Field("Lydell Security", description="Brand name")
    default_author: str = Field(
        "Larry Barksdale", description="Default post author"
    )
    internal_link_count: int = Field(
        4, description="Number of internal links to weave per post"
    )
    topics_per_run: int = Field(
        1, description="Number of new topics to auto-generate per cron run"
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return a cached, validated Settings singleton."""
    return Settings()  # type: ignore[call-arg]


# ---------------------------------------------------------------------------
# Quick sanity check when module is executed directly
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    cfg = get_settings()
    print(f"✓ Config loaded — env={cfg.environment}, model={cfg.ai_model}")
    print(f"  DB: {cfg.database_url[:40]}…")
    print(f"  Site: {cfg.site_url}")
