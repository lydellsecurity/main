# Lydell Security — Autonomous Blog Engine

A production-grade, AI-powered blog generation pipeline built for [lydellsecurity.com](https://lydellsecurity.com). Generates SEO-optimized, technically deep cybersecurity articles with zero human intervention post-deployment.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Render Cron Job                           │
│                  (Daily @ 06:00 UTC)                         │
│                                                             │
│  main.py ──► generator.py ──► Claude 3.5 Sonnet API        │
│     │              │                                        │
│     │              ├──► Internal Link Resolution (Postgres) │
│     │              ├──► SEO Meta + Social Blurbs            │
│     │              └──► JSON-LD FAQ Schema                  │
│     │                                                       │
│     ├──► media_engine.py ──► Unsplash API                   │
│     │                                                       │
│     ├──► database.py ──► PostgreSQL (Render)                │
│     │                                                       │
│     └──► Netlify Build Hook ──► Static Site Rebuild         │
└─────────────────────────────────────────────────────────────┘
```

## Modules

| File | Purpose |
|---|---|
| `config.py` | Pydantic-validated environment configuration |
| `database.py` | SQLAlchemy 2.x models, connection pool, query helpers |
| `media_engine.py` | Unsplash API integration with retry logic |
| `generator.py` | Core AI content generation with GEO/AEO prompt engineering |
| `main.py` | Orchestration, topic queue, CLI, Netlify trigger |
| `render.yaml` | Infrastructure-as-code blueprint for Render |

## Setup

### 1. Prerequisites

- Python 3.10+
- PostgreSQL 14+ (local or Render-hosted)
- API keys: Anthropic, Unsplash
- Netlify Build Hook URL

### 2. Local Development

```bash
cd blog-engine

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your actual credentials

# Initialize database
python database.py

# Verify all connections
python main.py --verify

# Generate a single test post
python main.py --topic "Zero Trust Architecture for Healthcare HIPAA Compliance"

# Run the full topic queue
python main.py
```

### 3. Deploy to Render

```bash
# Option A: Render Blueprint (recommended)
# Push to GitHub, then in Render Dashboard:
# New > Blueprint > Select repo > Apply

# Option B: Manual setup
# 1. Create PostgreSQL database (Starter plan)
# 2. Create Cron Job service
# 3. Set environment variables in dashboard
# 4. Set cron schedule: 0 6 * * *
# 5. Build command: cd blog-engine && pip install -r requirements.txt
# 6. Start command: cd blog-engine && python main.py
```

### 4. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ANTHROPIC_API_KEY` | Yes | Claude API key |
| `UNSPLASH_ACCESS_KEY` | Yes | Unsplash API key |
| `NETLIFY_BUILD_HOOK` | Yes | Netlify deploy webhook URL |
| `SENTRY_DSN` | No | Sentry error tracking DSN |
| `LOG_LEVEL` | No | Logging level (default: INFO) |
| `AI_MODEL` | No | Claude model (default: claude-sonnet-4-20250514) |

## Customizing the Topic Queue

### Option A: Edit `DEFAULT_TOPIC_QUEUE` in `main.py`

### Option B: Create a `topics.json` file

```json
[
  {
    "topic": "Your article topic / brief",
    "keyword": "your long-tail seo keyword",
    "category": "Category Name",
    "tags": "tag1,tag2,tag3"
  }
]
```

Place `topics.json` in the `blog-engine/` directory. It takes priority over the default queue.

## SEO Strategy

The engine implements a three-layer optimization strategy:

1. **GEO (Generative Engine Optimization)** — Headers formulated as questions with immediate 2-3 sentence answers for AI Overview capture.
2. **AEO (Answer Engine Optimization)** — JSON-LD FAQ schema auto-generated from article headers for rich snippet eligibility.
3. **Traditional SEO** — Primary keyword placement in H1, meta title, meta description, OG tags, and natural body distribution.

## Database Schema

The `posts` table stores everything needed for frontend rendering and social distribution:

- Core content (title, slug, HTML body, excerpt)
- SEO metadata (meta title, meta description)
- Open Graph tags (og_title, og_description)
- Social blurbs (Twitter/X card text, LinkedIn post text)
- Structured data (JSON-LD FAQ schema)
- Featured image (URL, alt text, photographer credit)
- Taxonomy (category, tags, target keyword)
- Publication state (is_published, published_at)

## Frontend Integration

The Netlify frontend should query the PostgreSQL database (via a serverless function or API layer) and render posts using the stored HTML and metadata. The `faq_schema` column contains ready-to-inject JSON-LD for the `<head>` tag.

---

**Lydell Security** — Digital Sovereignty Restored.
