// netlify/functions/sitemap.js
// Dynamic XML Sitemap — includes all published blog posts + static pages
//
// Serves at: /sitemap.xml (redirected via netlify.toml)
// Cache: 1 hour at CDN edge, 30 min browser

import pg from 'pg';
const { Pool } = pg;

let pool = null;

function getPool() {
  if (!pool) {
    const connectionString = Netlify.env.get('DATABASE_URL');
    if (!connectionString) return null;
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'development'
        ? false
        : { rejectUnauthorized: true },
      max: 2,
      idleTimeoutMillis: 5000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

const SITE_URL = 'https://lydellsecurity.com';

// Static pages with their change frequency and priority
const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/methodology', changefreq: 'monthly', priority: '0.8' },
  { path: '/pedigree', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/intel', changefreq: 'daily', priority: '0.8' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/dib-supply-chain-response', changefreq: 'monthly', priority: '0.8' },
  { path: '/financial-services-ransomware-response', changefreq: 'monthly', priority: '0.8' },
  { path: '/healthcare-identity-breach-response', changefreq: 'monthly', priority: '0.8' },
  { path: '/enterprise-identity-compromise-response', changefreq: 'monthly', priority: '0.8' },
];

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

export default async (request, context) => {
  const today = formatDate(new Date());

  let blogEntries = '';

  // Fetch blog posts from database
  const db = getPool();
  if (db) {
    try {
      const result = await db.query(
        `SELECT slug, updated_at, published_at
         FROM posts
         WHERE is_published = true
         ORDER BY published_at DESC
         LIMIT 5000`
      );

      for (const row of result.rows) {
        const lastmod = formatDate(row.updated_at || row.published_at);
        blogEntries += `
  <url>
    <loc>${SITE_URL}/blog/${escapeXml(row.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    } catch (err) {
      console.error('Sitemap DB error:', err.message);
      // Continue without blog posts — static pages still generated
    }
  }

  // Build static page entries
  let staticEntries = '';
  for (const page of STATIC_PAGES) {
    staticEntries += `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${staticEntries}${blogEntries}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, max-age=1800, stale-while-revalidate=86400',
    },
  });
};

export const config = {
  path: '/sitemap.xml',
};
