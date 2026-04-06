import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

/**
 * BlogPostPage — Individual article view
 *
 * SEO Features:
 *  - Dynamic <head> meta from DB (meta_title, meta_description, OG tags)
 *  - JSON-LD Article + FAQ schema injection
 *  - Canonical URL
 *  - Related posts sidebar
 *  - Social share buttons (Twitter, LinkedIn)
 *  - Reading time estimate
 */
const BlogPostPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`);
        if (!resp.ok) {
          if (resp.status === 404) throw new Error('Article not found');
          throw new Error(`API error: ${resp.status}`);
        }
        const data = await resp.json();
        if (data.success && data.post) {
          setPost(data.post);
        } else {
          throw new Error(data.error || 'Failed to load article');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const estimateReadingTime = (html) => {
    if (!html) return 0;
    const text = html.replace(/<[^>]+>/g, '');
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 230));
  };

  const getShareUrl = () => `https://lydellsecurity.com/blog/${slug}`;

  // ── Loading State ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-obsidian' : 'bg-paper'}`}>
        <Navigation />
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className={`h-8 rounded w-3/4 ${isDark ? 'bg-steel' : 'bg-stroke-subtle'}`} />
            <div className={`h-4 rounded w-1/3 ${isDark ? 'bg-steel' : 'bg-stroke-subtle'}`} />
            <div className={`h-64 rounded ${isDark ? 'bg-steel' : 'bg-stroke-subtle'}`} />
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-4 rounded ${isDark ? 'bg-steel' : 'bg-stroke-subtle'} ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error / 404 ────────────────────────────────────────────────────────
  if (error || !post) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-obsidian text-white' : 'bg-paper text-ink'}`}>
        <Navigation />
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 text-center">
          <div className={`text-8xl font-mono font-bold mb-4 ${isDark ? 'text-slate-800' : 'text-stroke-subtle'}`}>404</div>
          <h1 className={`text-2xl font-display font-semibold mb-4 ${isDark ? 'text-white' : 'text-ink'}`}>
            Article Not Found
          </h1>
          <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
            {error || 'The requested article does not exist or has been removed.'}
          </p>
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded font-mono text-sm ${
              isDark ? 'bg-cobalt-600 text-white hover:bg-cobalt-500' : 'bg-cobalt-600 text-white hover:bg-cobalt-700'
            }`}
          >
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const readingTime = estimateReadingTime(post.content_html);
  const shareUrl = getShareUrl();
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.og_title || post.title)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-obsidian text-white' : 'bg-paper text-ink'}`}>
      <Helmet>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <link rel="canonical" href={shareUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.og_title || post.title} />
        <meta property="og:description" content={post.og_description || post.excerpt} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:site_name" content="Lydell Security" />
        {post.featured_image_url && <meta property="og:image" content={post.featured_image_url} />}
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:author" content={post.author} />
        {post.category && <meta property="article:section" content={post.category} />}
        {post.tags && post.tags.split(',').map((tag) => (
          <meta key={tag.trim()} property="article:tag" content={tag.trim()} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.og_title || post.title} />
        <meta name="twitter:description" content={post.og_description || post.excerpt} />
        {post.featured_image_url && <meta name="twitter:image" content={post.featured_image_url} />}

        {/* Article Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": ${JSON.stringify(post.title)},
            "description": ${JSON.stringify(post.meta_description || post.excerpt)},
            "url": ${JSON.stringify(shareUrl)},
            ${post.featured_image_url ? `"image": ${JSON.stringify(post.featured_image_url)},` : ''}
            "datePublished": ${JSON.stringify(post.published_at)},
            "dateModified": ${JSON.stringify(post.updated_at || post.published_at)},
            "author": {
              "@type": "Person",
              "name": ${JSON.stringify(post.author)},
              "jobTitle": "Founder",
              "worksFor": {
                "@type": "Organization",
                "name": "Lydell Security"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "Lydell Security",
              "url": "https://lydellsecurity.com"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": ${JSON.stringify(shareUrl)}
            }
          }
        `}</script>

        {/* FAQ Schema (from DB) */}
        {post.faq_schema && (
          <script type="application/ld+json">{post.faq_schema}</script>
        )}
      </Helmet>

      <Navigation />

      {/* ── Article Header ────────────────────────────────────────────── */}
      <header className={`pt-32 pb-8 border-b ${isDark ? 'border-slate-800' : 'border-stroke-subtle'}`}>
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-sm font-mono" aria-label="Breadcrumb">
            <Link to="/" className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-ink-subtle hover:text-ink'}`}>
              Home
            </Link>
            <span className={isDark ? 'text-slate-700' : 'text-stroke'}>/</span>
            <Link to="/blog" className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-ink-subtle hover:text-ink'}`}>
              Blog
            </Link>
            <span className={isDark ? 'text-slate-700' : 'text-stroke'}>/</span>
            <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-600'}>
              {post.category || 'Article'}
            </span>
          </nav>

          {/* Category + Reading Time */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.category && (
              <span className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded ${
                isDark ? 'bg-cobalt-900/50 text-cobalt-400 border border-cobalt-800' : 'bg-cobalt-50 text-cobalt-700 border border-cobalt-200'
              }`}>
                {post.category}
              </span>
            )}
            <span className={`text-sm font-mono ${isDark ? 'text-slate-500' : 'text-ink-subtle'}`}>
              {readingTime} min read
            </span>
            <time className={`text-sm font-mono ${isDark ? 'text-slate-500' : 'text-ink-subtle'}`}>
              {formatDate(post.published_at)}
            </time>
          </div>

          {/* Title */}
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight mb-6 ${isDark ? 'text-white' : 'text-ink'}`}>
            {post.title}
          </h1>

          {/* Author + Share */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold ${
                isDark ? 'bg-cobalt-900 text-cobalt-400' : 'bg-cobalt-100 text-cobalt-700'
              }`}>
                {post.author?.charAt(0) || 'L'}
              </div>
              <div>
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-ink'}`}>
                  {post.author}
                </div>
                <div className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-ink-subtle'}`}>
                  Lydell Security
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono uppercase tracking-wider ${isDark ? 'text-slate-600' : 'text-ink-subtle'}`}>Share:</span>
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
                  isDark ? 'bg-matrix text-slate-400 hover:text-white hover:bg-steel' : 'bg-surface-sunken text-ink-muted hover:text-ink hover:bg-stroke-subtle'
                }`}
                aria-label="Share on X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
                  isDark ? 'bg-matrix text-slate-400 hover:text-white hover:bg-steel' : 'bg-surface-sunken text-ink-muted hover:text-ink hover:bg-stroke-subtle'
                }`}
                aria-label="Share on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Featured Image ────────────────────────────────────────────── */}
      {post.featured_image_url && (
        <div className="max-w-5xl mx-auto px-6 mt-10">
          <figure>
            <img
              src={post.featured_image_url}
              alt={post.featured_image_alt || post.title}
              className="w-full h-auto rounded-lg object-cover max-h-[480px]"
            />
            {post.featured_image_credit && (
              <figcaption className={`mt-2 text-xs font-mono text-center ${isDark ? 'text-slate-600' : 'text-ink-subtle'}`}>
                {post.featured_image_credit}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      {/* ── Article Body + Sidebar ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-16">
          {/* Main Content */}
          <article
            className={`prose max-w-none
              ${isDark
                ? 'prose-invert prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-a:text-cobalt-400 hover:prose-a:text-cobalt-300 prose-li:text-slate-300 prose-th:text-white prose-td:text-slate-300 prose-code:text-cobalt-400 prose-blockquote:border-cobalt-500'
                : 'prose-headings:text-ink prose-p:text-ink-body prose-a:text-cobalt-600 hover:prose-a:text-cobalt-700 prose-li:text-ink-body prose-code:text-cobalt-700 prose-blockquote:border-cobalt-600'
              }
              prose-headings:font-display prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed
              prose-table:text-sm
              prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-th:tracking-wider
              prose-img:rounded-lg
            `}
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-8">
            {/* Tags */}
            {post.tags && (
              <div className={`p-6 rounded-lg border ${isDark ? 'bg-matrix border-slate-800' : 'bg-white border-stroke-subtle shadow-card'}`}>
                <h3 className={`font-mono text-xs uppercase tracking-wider mb-4 ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag) => (
                    <Link
                      key={tag.trim()}
                      to={`/blog?search=${encodeURIComponent(tag.trim())}`}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        isDark
                          ? 'bg-steel/50 text-slate-400 hover:text-white hover:bg-steel'
                          : 'bg-surface-sunken text-ink-muted hover:text-ink hover:bg-stroke-subtle'
                      }`}
                    >
                      {tag.trim()}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {post.related_posts && post.related_posts.length > 0 && (
              <div className={`p-6 rounded-lg border ${isDark ? 'bg-matrix border-slate-800' : 'bg-white border-stroke-subtle shadow-card'}`}>
                <h3 className={`font-mono text-xs uppercase tracking-wider mb-4 ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
                  Related Analysis
                </h3>
                <div className="space-y-4">
                  {post.related_posts.map((related) => (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        {related.featured_image_url ? (
                          <img
                            src={related.featured_image_url}
                            alt=""
                            className="w-16 h-16 rounded object-cover flex-shrink-0"
                            loading="lazy"
                          />
                        ) : (
                          <div className={`w-16 h-16 rounded flex-shrink-0 flex items-center justify-center ${isDark ? 'bg-steel' : 'bg-surface-sunken'}`}>
                            <svg className={`w-6 h-6 ${isDark ? 'text-slate-600' : 'text-stroke'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className={`text-sm font-medium line-clamp-2 transition-colors ${
                            isDark ? 'text-slate-300 group-hover:text-cobalt-400' : 'text-ink group-hover:text-cobalt-600'
                          }`}>
                            {related.title}
                          </h4>
                          <time className={`text-xs font-mono mt-1 block ${isDark ? 'text-slate-600' : 'text-ink-subtle'}`}>
                            {formatDate(related.published_at)}
                          </time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className={`p-6 rounded-lg border ${
              isDark
                ? 'bg-gradient-to-br from-cobalt-900/30 to-matrix border-cobalt-800/50'
                : 'bg-gradient-to-br from-cobalt-50 to-white border-cobalt-200'
            }`}>
              <h3 className={`font-display font-semibold mb-2 ${isDark ? 'text-white' : 'text-ink'}`}>
                Under Active Attack?
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
                15-Minute Response Guarantee. Senior incident commanders standing by 24/7.
              </p>
              <Link
                to="/contact"
                className={`block text-center px-4 py-3 rounded font-mono text-sm font-medium transition-colors ${
                  isDark
                    ? 'bg-emergency text-white hover:bg-emergency-vivid'
                    : 'bg-emergency text-white hover:bg-emergency-vivid'
                }`}
              >
                Initiate Response
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Social Blurbs (hidden, for copy-paste) ────────────────────── */}
      {(post.twitter_card_text || post.linkedin_post_text) && (
        <section className={`py-12 border-t ${isDark ? 'border-slate-800' : 'border-stroke-subtle'}`}>
          <div className="max-w-4xl mx-auto px-6">
            <h2 className={`font-mono text-xs uppercase tracking-wider mb-6 ${isDark ? 'text-slate-500' : 'text-ink-subtle'}`}>
              Share This Analysis
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {post.twitter_card_text && (
                <div className={`p-4 rounded-lg border ${isDark ? 'bg-matrix border-slate-800' : 'bg-white border-stroke-subtle'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    <span className={`text-xs font-mono uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>X / Twitter</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-ink-body'}`}>{post.twitter_card_text}</p>
                </div>
              )}
              {post.linkedin_post_text && (
                <div className={`p-4 rounded-lg border ${isDark ? 'bg-matrix border-slate-800' : 'bg-white border-stroke-subtle'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className={`text-xs font-mono uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>LinkedIn</span>
                  </div>
                  <p className={`text-sm whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-ink-body'}`}>{post.linkedin_post_text}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
