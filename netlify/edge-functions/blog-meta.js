// netlify/edge-functions/blog-meta.js
// Social crawler meta-tag injector for blog posts.
//
// Problem: this is a Vite SPA. Social crawlers (Facebook, LinkedIn, X,
// Slack, Discord, etc.) do not execute JavaScript, so the <Helmet> tags
// rendered by BlogPostPage.jsx are invisible to them — they only see
// the static index.html, which has no per-post title, description,
// or thumbnail.
//
// This edge function runs on /blog/:slug. For known social-crawler
// User-Agents it fetches the post from /api/blog and returns a minimal
// HTML response with real Open Graph + Twitter Card tags (including
// the featured image thumbnail). Human visitors are passed through to
// the SPA via context.next(), so their UX is unchanged.

const BOT_UA_RE = new RegExp(
  [
    'facebookexternalhit',
    'facebookcatalog',
    'Facebot',
    'Twitterbot',
    'LinkedInBot',
    'Slackbot',
    'Slack-ImgProxy',
    'Discordbot',
    'WhatsApp',
    'TelegramBot',
    'Pinterest',
    'redditbot',
    'Applebot',
    'bingbot',
    'Googlebot',
    'Google-InspectionTool',
    'embedly',
    'quora link preview',
    'outbrain',
    'vkShare',
    'W3C_Validator',
    'SkypeUriPreview',
    'nuzzel',
    'Bitrix link preview',
    'Viber',
    'tumblr',
    'Mastodon',
    'Iframely',
    'LinkPreview',
    'Snapchat',
  ].join('|'),
  'i'
);

const SITE = 'https://lydellsecurity.com';
const SITE_NAME = 'Lydell Security';
const DEFAULT_OG_IMAGE = `${SITE}/og-default.png`;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderBotHtml(post) {
  const shareUrl = `${SITE}/blog/${post.slug}`;
  const title = escapeHtml(post.og_title || post.meta_title || post.title);
  const description = escapeHtml(
    post.og_description || post.meta_description || post.excerpt || ''
  );
  const image = escapeHtml(post.featured_image_url || DEFAULT_OG_IMAGE);
  const imageAlt = escapeHtml(post.featured_image_alt || post.title);
  const published = escapeHtml(post.published_at || '');
  const author = escapeHtml(post.author || 'Larry Barksdale');
  const section = post.category ? escapeHtml(post.category) : '';

  const tagMetas = post.tags
    ? post.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => `<meta property="article:tag" content="${escapeHtml(t)}" />`)
        .join('\n')
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${shareUrl}" />
<meta name="robots" content="index,follow" />

<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${shareUrl}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:secure_url" content="${image}" />
<meta property="og:image:alt" content="${imageAlt}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="article:published_time" content="${published}" />
<meta property="article:author" content="${author}" />
${section ? `<meta property="article:section" content="${section}" />` : ''}
${tagMetas}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@LydellSecurity" />
<meta name="twitter:creator" content="@LydellSecurity" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />
<meta name="twitter:image:alt" content="${imageAlt}" />
</head>
<body>
<h1>${title}</h1>
<p>${description}</p>
<p><a href="${shareUrl}">Read the full analysis on Lydell Security</a></p>
</body>
</html>`;
}

export default async (request, context) => {
  const userAgent = request.headers.get('user-agent') || '';

  // Humans → pass straight through to the SPA.
  if (!BOT_UA_RE.test(userAgent)) {
    return context.next();
  }

  const url = new URL(request.url);
  const slug = url.pathname
    .replace(/^\/blog\//, '')
    .replace(/\/$/, '')
    .trim();

  // /blog index, or nothing useful — let the SPA handle it.
  if (!slug) {
    return context.next();
  }

  try {
    const apiResp = await fetch(`${url.origin}/api/blog?slug=${encodeURIComponent(slug)}`, {
      headers: { 'User-Agent': 'LydellSecurity-EdgeMeta/1.0' },
    });

    if (!apiResp.ok) {
      return context.next();
    }

    const data = await apiResp.json();
    if (!data?.success || !data?.post) {
      return context.next();
    }

    return new Response(renderBotHtml(data.post), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'index,follow',
        'Vary': 'User-Agent',
      },
    });
  } catch (err) {
    console.error('blog-meta edge function error:', err?.message || err);
    return context.next();
  }
};

export const config = {
  path: '/blog/:slug',
};
