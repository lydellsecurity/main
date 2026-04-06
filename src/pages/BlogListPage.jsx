import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

/**
 * BlogListPage — SEO-optimized blog index
 *
 * Features:
 *  - Category filtering via query params
 *  - Full-text search
 *  - Pagination
 *  - Schema.org Blog structured data
 *  - Responsive grid with featured image cards
 */
const BlogListPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchParams, setSearchParams] = useSearchParams();

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', '12');
      if (currentCategory && currentCategory !== 'all') {
        params.set('category', currentCategory);
      }
      if (currentSearch) {
        params.set('search', currentSearch);
      }

      const resp = await fetch(`/api/blog?${params.toString()}`);
      if (!resp.ok) throw new Error(`API error: ${resp.status}`);

      const data = await resp.json();
      if (data.success) {
        setPosts(data.posts || []);
        setPagination(data.pagination || null);
        setCategories(data.categories || []);
      } else {
        throw new Error(data.error || 'Failed to load posts');
      }
    } catch (err) {
      console.error('Blog fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentCategory, currentSearch]);

  useEffect(() => {
    fetchPosts();
    window.scrollTo(0, 0);
  }, [fetchPosts]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    params.delete('page');
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-obsidian text-white' : 'bg-paper text-ink'}`}>
      <Helmet>
        <title>Cybersecurity Intelligence Blog | Lydell Security</title>
        <meta name="description" content="Technical threat intelligence, incident response analysis, and compliance guidance from the team that protects the Federal Reserve and NYSE." />
        <link rel="canonical" href="https://lydellsecurity.com/blog" />
        <meta property="og:title" content="Cybersecurity Intelligence Blog | Lydell Security" />
        <meta property="og:description" content="Expert analysis on ransomware, identity threats, and compliance frameworks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lydellsecurity.com/blog" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Lydell Security Intelligence Blog",
            "url": "https://lydellsecurity.com/blog",
            "description": "Technical threat intelligence and incident response analysis from elite cybersecurity operators.",
            "publisher": {
              "@type": "Organization",
              "name": "Lydell Security",
              "url": "https://lydellsecurity.com"
            },
            "author": {
              "@type": "Person",
              "name": "Larry Barksdale",
              "jobTitle": "Founder",
              "worksFor": {
                "@type": "Organization",
                "name": "Lydell Security"
              }
            }
          }
        `}</script>
      </Helmet>

      <Navigation />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className={`pt-32 pb-16 border-b ${isDark ? 'border-slate-800 bg-obsidian' : 'border-stroke-subtle bg-paper'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-tactical'}`} />
              <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-tactical'} animate-ping`} />
            </div>
            <span className={`font-mono text-xs uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
              Intelligence Feed — Active
            </span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-ink'}`}>
            Threat Intelligence &{' '}
            <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-600'}>
              Analysis
            </span>
          </h1>
          <p className={`text-lg max-w-2xl ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
            Technical analysis, compliance guidance, and adversary tradecraft breakdowns from operators who have defended the Federal Reserve, NYSE, and Fortune 500 infrastructure.
          </p>

          {/* ── Search Bar ────────────────────────────────────────────── */}
          <form onSubmit={handleSearch} className="mt-8 max-w-xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-ink-subtle'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles…"
                  className={`w-full pl-10 pr-4 py-3 rounded font-mono text-sm border transition-colors ${
                    isDark
                      ? 'bg-matrix border-slate-700 text-white placeholder-slate-500 focus:border-cobalt-500'
                      : 'bg-white border-stroke text-ink placeholder-ink-subtle focus:border-cobalt-600'
                  } outline-none`}
                />
              </div>
              <button
                type="submit"
                className={`px-6 py-3 rounded font-mono text-sm font-medium transition-colors ${
                  isDark
                    ? 'bg-cobalt-600 text-white hover:bg-cobalt-500'
                    : 'bg-cobalt-600 text-white hover:bg-cobalt-700'
                }`}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Category Filters ─────────────────────────────────────────── */}
      <section className={`py-4 border-b sticky top-[73px] z-40 backdrop-blur-md ${
        isDark ? 'bg-obsidian/95 border-slate-800' : 'bg-paper/95 border-stroke-subtle'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
                currentCategory === 'all'
                  ? isDark
                    ? 'bg-cobalt-600 text-white'
                    : 'bg-cobalt-600 text-white'
                  : isDark
                    ? 'bg-matrix text-slate-400 hover:text-white border border-slate-700'
                    : 'bg-white text-ink-muted hover:text-ink border border-stroke'
              }`}
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => handleCategoryChange(cat.category)}
                className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
                  currentCategory === cat.category
                    ? isDark
                      ? 'bg-cobalt-600 text-white'
                      : 'bg-cobalt-600 text-white'
                    : isDark
                      ? 'bg-matrix text-slate-400 hover:text-white border border-slate-700'
                      : 'bg-white text-ink-muted hover:text-ink border border-stroke'
                }`}
              >
                {cat.category} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Post Grid ────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`rounded-lg overflow-hidden animate-pulse ${isDark ? 'bg-matrix' : 'bg-surface-sunken'}`}>
                  <div className={`h-48 ${isDark ? 'bg-steel' : 'bg-stroke-subtle'}`} />
                  <div className="p-6 space-y-3">
                    <div className={`h-4 rounded w-1/4 ${isDark ? 'bg-steel' : 'bg-stroke-subtle'}`} />
                    <div className={`h-6 rounded w-3/4 ${isDark ? 'bg-steel' : 'bg-stroke-subtle'}`} />
                    <div className={`h-4 rounded w-full ${isDark ? 'bg-steel' : 'bg-stroke-subtle'}`} />
                    <div className={`h-4 rounded w-2/3 ${isDark ? 'bg-steel' : 'bg-stroke-subtle'}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className={`text-center py-20 rounded-lg border ${isDark ? 'bg-matrix border-slate-800' : 'bg-white border-stroke-subtle'}`}>
              <svg className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-stroke'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className={`text-lg font-display font-semibold mb-2 ${isDark ? 'text-white' : 'text-ink'}`}>
                Intelligence Feed Unavailable
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                {error}
              </p>
              <button
                onClick={fetchPosts}
                className={`px-6 py-2 rounded font-mono text-sm ${isDark ? 'bg-cobalt-600 text-white hover:bg-cobalt-500' : 'bg-cobalt-600 text-white hover:bg-cobalt-700'}`}
              >
                Retry
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className={`text-center py-20 rounded-lg border ${isDark ? 'bg-matrix border-slate-800' : 'bg-white border-stroke-subtle'}`}>
              <h3 className={`text-lg font-display font-semibold mb-2 ${isDark ? 'text-white' : 'text-ink'}`}>
                No articles found
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                {currentSearch ? `No results for "${currentSearch}".` : 'No published articles yet.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className={`group rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-matrix border-slate-800 hover:border-cobalt-500/50 shadow-none hover:shadow-glow-cobalt'
                      : 'bg-white border-stroke-subtle hover:border-cobalt-300 shadow-card hover:shadow-card-hover'
                  }`}
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    {/* Image */}
                    {post.featured_image_url ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.featured_image_url}
                          alt={post.featured_image_alt || post.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-obsidian/60 to-transparent' : 'bg-gradient-to-t from-black/20 to-transparent'}`} />
                      </div>
                    ) : (
                      <div className={`h-48 flex items-center justify-center ${isDark ? 'bg-steel' : 'bg-surface-sunken'}`}>
                        <svg className={`w-12 h-12 ${isDark ? 'text-slate-600' : 'text-stroke'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <span className={`text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                            isDark
                              ? 'bg-cobalt-900/50 text-cobalt-400'
                              : 'bg-cobalt-50 text-cobalt-700'
                          }`}>
                            {post.category}
                          </span>
                        )}
                        <time className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-ink-subtle'}`}>
                          {formatDate(post.published_at)}
                        </time>
                      </div>

                      <h2 className={`text-lg font-display font-semibold mb-2 line-clamp-2 transition-colors ${
                        isDark
                          ? 'text-white group-hover:text-cobalt-400'
                          : 'text-ink group-hover:text-cobalt-600'
                      }`}>
                        {post.title}
                      </h2>

                      <p className={`text-sm leading-relaxed line-clamp-3 ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
                        {post.excerpt}
                      </p>

                      <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                        <span>Read analysis</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* ── Pagination ───────────────────────────────────────────── */}
          {pagination && pagination.totalPages > 1 && (
            <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Blog pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrev}
                className={`px-4 py-2 rounded font-mono text-sm transition-colors ${
                  pagination.hasPrev
                    ? isDark
                      ? 'bg-matrix text-white hover:bg-steel border border-slate-700'
                      : 'bg-white text-ink hover:bg-surface-sunken border border-stroke'
                    : isDark
                      ? 'bg-matrix/50 text-slate-600 border border-slate-800 cursor-not-allowed'
                      : 'bg-surface-sunken text-stroke cursor-not-allowed border border-stroke-subtle'
                }`}
              >
                ← Prev
              </button>

              {[...Array(pagination.totalPages)].map((_, i) => {
                const page = i + 1;
                // Show max 7 page buttons
                if (
                  pagination.totalPages > 7 &&
                  page !== 1 &&
                  page !== pagination.totalPages &&
                  Math.abs(page - currentPage) > 2
                ) {
                  if (page === currentPage - 3 || page === currentPage + 3) {
                    return (
                      <span key={page} className={`px-2 ${isDark ? 'text-slate-600' : 'text-stroke'}`}>
                        …
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded font-mono text-sm transition-colors ${
                      page === currentPage
                        ? 'bg-cobalt-600 text-white'
                        : isDark
                          ? 'bg-matrix text-slate-400 hover:text-white border border-slate-700'
                          : 'bg-white text-ink-muted hover:text-ink border border-stroke'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNext}
                className={`px-4 py-2 rounded font-mono text-sm transition-colors ${
                  pagination.hasNext
                    ? isDark
                      ? 'bg-matrix text-white hover:bg-steel border border-slate-700'
                      : 'bg-white text-ink hover:bg-surface-sunken border border-stroke'
                    : isDark
                      ? 'bg-matrix/50 text-slate-600 border border-slate-800 cursor-not-allowed'
                      : 'bg-surface-sunken text-stroke cursor-not-allowed border border-stroke-subtle'
                }`}
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogListPage;
