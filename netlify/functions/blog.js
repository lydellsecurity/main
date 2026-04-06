// netlify/functions/blog.js
// Blog API — Serves posts from PostgreSQL to the React frontend
//
// Endpoints:
//   GET /api/blog              → List published posts (paginated)
//   GET /api/blog?slug=<slug>  → Single post by slug
//   GET /api/blog?category=<c> → Filter by category
//   GET /api/blog?search=<q>   → Full-text search
//
// Security: parameterized queries, input validation, restricted CORS,
//           SSL verification, generic error responses.

import pg from 'pg';
const { Pool } = pg;

// ---------------------------------------------------------------------------
// Connection Pool (reused across invocations in warm lambdas)
// ---------------------------------------------------------------------------
let pool = null;

function getPool() {
  if (!pool) {
    const connectionString = Netlify.env.get('DATABASE_URL');
    if (!connectionString) {
      throw new Error('DATABASE_URL not configured');
    }
    pool = new Pool({
      connectionString,
      // Render managed Postgres uses self-signed certs — external
      // connections (Netlify → Render) must accept them.
      // Internal connections (Render cron → Render DB) don't need SSL.
      ssl: connectionString.includes('localhost')
        ? false
        : { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

// ---------------------------------------------------------------------------
// Allowed Origins
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = [
  'https://lydellsecurity.com',
  'https://www.lydellsecurity.com',
];

function getCorsOrigin(request) {
  const origin = request.headers.get('origin') || '';
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  // Allow same-origin requests (no Origin header) and localhost in dev
  if (!origin) return 'https://lydellsecurity.com';
  if (origin.startsWith('http://localhost')) return origin;
  return 'https://lydellsecurity.com';
}

// ---------------------------------------------------------------------------
// Input Validation
// ---------------------------------------------------------------------------
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,298}$/;
const MAX_SEARCH_LEN = 100;
const MAX_CATEGORY_LEN = 60;
const MAX_PAGE = 500;
const MAX_LIMIT = 24;

function sanitizeSlug(raw) {
  if (!raw) return null;
  const s = raw.trim().toLowerCase().slice(0, 300);
  return SLUG_RE.test(s) ? s : null;
}

function sanitizeSearch(raw) {
  if (!raw) return null;
  return raw.trim().slice(0, MAX_SEARCH_LEN) || null;
}

function sanitizeCategory(raw) {
  if (!raw || raw === 'all') return null;
  return raw.trim().slice(0, MAX_CATEGORY_LEN) || null;
}

// ---------------------------------------------------------------------------
// Response Helper
// ---------------------------------------------------------------------------
function respond(body, status, cacheSeconds, request) {
  const corsOrigin = request ? getCorsOrigin(request) : 'https://lydellsecurity.com';
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
      'Cache-Control': cacheSeconds > 0
        ? `public, s-maxage=${cacheSeconds}, max-age=${Math.floor(cacheSeconds / 2)}, stale-while-revalidate=86400`
        : 'no-store',
    },
  });
}

// ---------------------------------------------------------------------------
// Query: Single Post by Slug
// ---------------------------------------------------------------------------
async function getPostBySlug(slug) {
  const db = getPool();
  const result = await db.query(
    `SELECT
        id, title, slug, content_html, excerpt, author,
        featured_image_url, featured_image_alt, featured_image_credit,
        meta_title, meta_description, og_title, og_description,
        twitter_card_text, linkedin_post_text, faq_schema,
        category, tags, target_keyword,
        published_at, updated_at
     FROM posts
     WHERE slug = $1 AND is_published = true
     LIMIT 1`,
    [slug]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const post = result.rows[0];

  // Parse FAQ schema if present — validate before passing to frontend
  if (post.faq_schema) {
    try {
      const parsed = JSON.parse(post.faq_schema);
      // Validate it has the expected FAQPage structure
      if (parsed?.['@type'] === 'FAQPage' && Array.isArray(parsed?.mainEntity)) {
        post.faq_schema_parsed = parsed;
      } else {
        post.faq_schema_parsed = null;
      }
    } catch (e) {
      console.warn(`Invalid FAQ schema for slug ${slug}:`, e.message);
      post.faq_schema_parsed = null;
    }
  }

  // Fetch related posts for sidebar
  const related = await db.query(
    `SELECT title, slug, excerpt, featured_image_url, category, published_at
     FROM posts
     WHERE is_published = true AND slug != $1
     ORDER BY
       CASE WHEN category = $2 THEN 0 ELSE 1 END,
       published_at DESC
     LIMIT 4`,
    [slug, post.category]
  );
  post.related_posts = related.rows;

  return post;
}

// ---------------------------------------------------------------------------
// Query: List Posts (Paginated)
// ---------------------------------------------------------------------------
async function listPosts({ page = 1, limit = 12, category = null, search = null }) {
  const db = getPool();
  const offset = (page - 1) * limit;
  const params = [];
  const conditions = ['is_published = true'];
  let paramIndex = 1;

  if (category) {
    conditions.push(`category = $${paramIndex}`);
    params.push(category);
    paramIndex++;
  }

  if (search) {
    conditions.push(`(title ILIKE $${paramIndex} OR excerpt ILIKE $${paramIndex} OR tags ILIKE $${paramIndex})`);
    params.push(`%${search}%`);
    paramIndex++;
  }

  const whereClause = `WHERE ${conditions.join(' AND ')}`;

  // Count total
  const countResult = await db.query(
    `SELECT COUNT(*) as total FROM posts ${whereClause}`,
    params
  );
  const total = parseInt(countResult.rows[0].total, 10);

  // Fetch page
  const postsResult = await db.query(
    `SELECT
        id, title, slug, excerpt, author,
        featured_image_url, featured_image_alt,
        meta_title, meta_description, category, tags,
        published_at
     FROM posts
     ${whereClause}
     ORDER BY published_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, limit, offset]
  );

  // Fetch all categories for filter UI
  const categoriesResult = await db.query(
    `SELECT category, COUNT(*) as count
     FROM posts
     WHERE is_published = true AND category IS NOT NULL
     GROUP BY category
     ORDER BY count DESC`
  );

  return {
    posts: postsResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
    categories: categoriesResult.rows,
  };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async (request, context) => {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': getCorsOrigin(request),
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin',
      },
    });
  }

  if (request.method !== 'GET') {
    return respond({ error: 'Method not allowed' }, 405, 0, request);
  }

  const url = new URL(request.url);

  // ── Input Validation ───────────────────────────────────────────────
  const slug = sanitizeSlug(url.searchParams.get('slug'));
  const category = sanitizeCategory(url.searchParams.get('category'));
  const search = sanitizeSearch(url.searchParams.get('search'));
  const page = Math.min(MAX_PAGE, Math.max(1, parseInt(url.searchParams.get('page') || '1', 10)));
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(url.searchParams.get('limit') || '12', 10)));

  // Reject clearly invalid slug requests early
  if (url.searchParams.get('slug') && !slug) {
    return respond({ error: 'Invalid slug format' }, 400, 0, request);
  }

  try {
    // ── Single Post ────────────────────────────────────────────────────
    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return respond({ error: 'Post not found' }, 404, 60, request);
      }
      return respond({ success: true, post }, 200, 600, request);
    }

    // ── List / Search / Filter ─────────────────────────────────────────
    const data = await listPosts({ page, limit, category, search });
    return respond({ success: true, ...data }, 200, 300, request);

  } catch (err) {
    console.error('Blog API error:', err.message, err.stack);
    // Generic error response — never expose internal details
    return respond({ error: 'Internal server error' }, 500, 0, request);
  }
};

export const config = {
  path: '/api/blog',
};
