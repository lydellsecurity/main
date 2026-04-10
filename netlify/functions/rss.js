// netlify/functions/rss.js
// RSS 2.0 feed for the Lydell Security blog.
//
// Serves at: /rss.xml (via redirect in netlify.toml)
// Includes the Media RSS namespace (media:thumbnail, media:content) so
// feed readers and aggregators render per-post thumbnails.
//
// Cache: 30 min at CDN edge, 15 min browser, SWR 24h.

import pg from 'pg';
const { Pool } = pg;

let pool = null;

function getPool() {
  if (!pool) {
    const connectionString = Netlify.env.get('DATABASE_URL');
    if (!connectionString) return null;
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes('localhost')
        ? false
        : { rejectUnauthorized: false },
      max: 2,
      idleTimeoutMillis: 5000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

const SITE_URL = 'https://lydellsecurity.com';
const SITE_TITLE = 'Lydell Security — Threat Intelligence & Incident Response';
const SITE_DESCRIPTION =
  'Expert analysis on ransomware, identity threats, compliance frameworks, and zero-dwell incident response — from the team behind Lydell Security.';
const FEED_URL = `${SITE_URL}/rss.xml`;
const FEED_LANG = 'en-us';
const MAX_ITEMS = 50;

function escapeXml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cdata(str) {
  // Guard against accidental premature CDATA termination
  const safe = String(str ?? '').replace(/]]>/g, ']]]]><![CDATA[>');
  return `<![CDATA[${safe}]]>`;
}

function rfc822(date) {
  // RSS 2.0 requires RFC-822 dates
  return new Date(date).toUTCString();
}

function renderItem(post) {
  const link = `${SITE_URL}/blog/${post.slug}`;
  const pubDate = rfc822(post.published_at || post.created_at || Date.now());
  const title = escapeXml(post.title || 'Untitled');
  const description = cdata(post.excerpt || post.meta_description || '');
  const content = cdata(post.content_html || '');
  const author = escapeXml(post.author || 'Larry Barksdale');
  const category = post.category ? `<category>${escapeXml(post.category)}</category>` : '';

  let mediaBlock = '';
  let enclosureBlock = '';
  if (post.featured_image_url) {
    const imgUrl = escapeXml(post.featured_image_url);
    const imgAlt = escapeXml(post.featured_image_alt || post.title || '');
    mediaBlock = `
      <media:thumbnail url="${imgUrl}" />
      <media:content url="${imgUrl}" medium="image">
        <media:title type="plain">${escapeXml(post.title || '')}</media:title>
        <media:description type="plain">${imgAlt}</media:description>
      </media:content>`;
    // <enclosure> is how many classic readers (and some social aggregators)
    // discover the post thumbnail.
    enclosureBlock = `
      <enclosure url="${imgUrl}" type="image/jpeg" length="0" />`;
  }

  return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${author}</dc:creator>
      ${category}
      <description>${description}</description>
      <content:encoded>${content}</content:encoded>${mediaBlock}${enclosureBlock}
    </item>`;
}

export default async (request, context) => {
  const db = getPool();
  let items = '';
  let lastBuildDate = rfc822(new Date());

  if (db) {
    try {
      const result = await db.query(
        `SELECT title, slug, excerpt, content_html, author,
                featured_image_url, featured_image_alt,
                meta_description, category, tags,
                published_at, updated_at, created_at
         FROM posts
         WHERE is_published = true
         ORDER BY published_at DESC
         LIMIT ${MAX_ITEMS}`
      );

      if (result.rows.length > 0) {
        lastBuildDate = rfc822(
          result.rows[0].updated_at ||
            result.rows[0].published_at ||
            new Date()
        );
        items = result.rows.map(renderItem).join('');
      }
    } catch (err) {
      console.error('RSS DB error:', err.message);
      // Fall through with empty feed rather than 500ing.
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>${FEED_LANG}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Lydell Security Blog Engine</generator>
    <image>
      <url>${SITE_URL}/favicon.svg</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control':
        'public, s-maxage=1800, max-age=900, stale-while-revalidate=86400',
    },
  });
};

export const config = {
  path: '/.netlify/functions/rss',
};
