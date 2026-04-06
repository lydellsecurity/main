// netlify/functions/blog.js
// Blog API — Serves posts from PostgreSQL to the React frontend
//
// Endpoints:
//   GET /api/blog              → List published posts (paginated)
//   GET /api/blog?slug=<slug>  → Single post by slug
//   GET /api/blog?category=<c> → Filter by category
//   GET /api/blog?search=<q>   → Full-text search
//
// Requires DATABASE_URL environment variable (Render Postgres)

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
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

// ---------------------------------------------------------------------------
// CORS & Cache Headers
// ---------------------------------------------------------------------------
const baseHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function respond(body, status = 200, cacheSeconds = 300) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...baseHeaders,
      'Cache-Control': `public, s-maxage=${cacheSeconds}, max-age=${Math.floor(cacheSeconds / 2)}, stale-while-revalidate=86400`,
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

  // Parse FAQ schema if present
  if (post.faq_schema) {
    try {
      post.faq_schema_parsed = JSON.parse(post.faq_schema);
    } catch {
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

  if (category && category !== 'all') {
    conditions.push(`category = $${paramIndex}`);
    params.push(category);
    paramIndex++;
  }

  if (search) {
    conditions.push(`(title ILIKE $${paramIndex} OR excerpt ILIKE $${paramIndex} OR tags ILIKE $${paramIndex})`);
    params.push(`%${search}%`);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

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
    return new Response(null, { status: 204, headers: baseHeaders });
  }

  if (request.method !== 'GET') {
    return respond({ error: 'Method not allowed' }, 405, 0);
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const category = url.searchParams.get('category');
  const search = url.searchParams.get('search');
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '12', 10)));

  try {
    // ── Single Post ────────────────────────────────────────────────────
    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return respond({ error: 'Post not found' }, 404, 60);
      }
      return respond({ success: true, post }, 200, 600); // 10min cache for single posts
    }

    // ── List / Search / Filter ─────────────────────────────────────────
    const data = await listPosts({ page, limit, category, search });
    return respond({ success: true, ...data }, 200, 300); // 5min cache for listings

  } catch (err) {
    console.error('Blog API error:', err.message);
    return respond(
      { error: 'Internal server error', message: err.message },
      500,
      0
    );
  }
};

export const config = {
  path: '/api/blog',
};
