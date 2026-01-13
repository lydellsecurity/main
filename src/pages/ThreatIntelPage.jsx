import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

/**
 * ThreatIntelPage - AI-Powered Threat Intelligence Blog
 * 
 * SEO/AEO Optimized:
 * - Schema.org NewsArticle markup for each article
 * - FAQ schema for common questions
 * - Proper meta tags and Open Graph
 * - Semantic HTML structure
 * 
 * Caching Strategy:
 * - Server: Netlify Blobs (4hr refresh via scheduled function)
 * - CDN: 1 hour cache
 * - Browser: 15 min cache + localStorage fallback
 */
const ThreatIntelPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [cacheStatus, setCacheStatus] = useState(null);

  const categories = [
    { id: 'all', label: 'All Threats', icon: '🌐' },
    { id: 'ransomware', label: 'Ransomware', icon: '🔒' },
    { id: 'apt', label: 'APT Groups', icon: '🎯' },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: '⚠️' },
    { id: 'malware', label: 'Malware', icon: '🦠' },
    { id: 'data-breach', label: 'Data Breaches', icon: '💾' },
  ];

  const fetchThreatIntel = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/threat-intel', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: forceRefresh ? 'no-cache' : 'default',
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.articles) {
        setArticles(data.articles);
        setLastUpdated(new Date(data.generated_at));
        setCacheStatus({
          cached: data.cached,
          stale: data.stale,
          fallback: data.fallback,
        });
        
        // Also save to localStorage as backup
        localStorage.setItem('threatIntelCache', JSON.stringify({
          articles: data.articles,
          timestamp: data.generated_at
        }));
      } else {
        throw new Error(data.error || 'Invalid response');
      }
    } catch (err) {
      console.error('Threat intel fetch error:', err);
      setError(err.message);
      
      // Try localStorage fallback
      const cached = localStorage.getItem('threatIntelCache');
      if (cached) {
        const { articles: cachedArticles, timestamp } = JSON.parse(cached);
        setArticles(cachedArticles);
        setLastUpdated(new Date(timestamp));
        setCacheStatus({ cached: true, localStorage: true });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThreatIntel();
  }, [fetchThreatIntel]);

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: { bg: 'bg-red-500', text: 'text-red-500' },
      high: { bg: 'bg-orange-500', text: 'text-orange-500' },
      medium: { bg: 'bg-amber-500', text: 'text-amber-500' },
      low: { bg: 'bg-blue-500', text: 'text-blue-500' },
    };
    return colors[severity] || colors.medium;
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📋';
  };

  // Generate Schema.org structured data
  const generateArticleSchema = (article) => ({
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.summary,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Organization",
      "name": "Lydell Security Threat Intelligence"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lydell Security",
      "url": "https://lydellsecurity.com"
    },
    "articleSection": article.category,
    "keywords": [article.category, ...article.mitre_tactics, ...article.affected_sectors].join(', ')
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Cyber Threat Intelligence Briefing | Lydell Security",
        "description": "AI-curated cyber threat intelligence updated every 4 hours. Real-time analysis of ransomware, APT groups, vulnerabilities, and data breaches.",
        "url": "https://lydellsecurity.com/intel",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Lydell Security",
          "url": "https://lydellsecurity.com"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How often is threat intelligence updated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our AI-powered threat intelligence is automatically refreshed every 4 hours using real-time web analysis of cybersecurity news, advisories, and threat reports."
            }
          },
          {
            "@type": "Question",
            "name": "What sources does Lydell Security use for threat intelligence?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We aggregate intelligence from security vendor blogs, government advisories (CISA, NSA, FBI), vulnerability databases, malware analysis reports, and real-time incident disclosures."
            }
          },
          {
            "@type": "Question",
            "name": "How can I respond to threats identified in this briefing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Lydell Security offers 24/7 incident response with a 15-minute response guarantee. Use our Emergency IR button for immediate assistance, or contact us for proactive threat hunting services."
            }
          }
        ]
      },
      ...articles.map(generateArticleSchema)
    ]
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-obsidian' : 'bg-paper'}`}>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Cyber Threat Intelligence Briefing | Lydell Security</title>
        <meta name="description" content="AI-curated cyber threat intelligence updated every 4 hours. Real-time analysis of ransomware, APT groups, vulnerabilities, and data breaches affecting enterprise security." />
        <meta name="keywords" content="threat intelligence, cybersecurity news, ransomware attacks, APT groups, vulnerability alerts, data breach notifications, MITRE ATT&CK, incident response" />
        <link rel="canonical" href="https://lydellsecurity.com/intel" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cyber Threat Intelligence Briefing | Lydell Security" />
        <meta property="og:description" content="AI-curated threat intelligence updated every 4 hours. Stay ahead of ransomware, APTs, and emerging vulnerabilities." />
        <meta property="og:url" content="https://lydellsecurity.com/intel" />
        <meta property="og:site_name" content="Lydell Security" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cyber Threat Intelligence Briefing" />
        <meta name="twitter:description" content="AI-curated threat intelligence updated every 4 hours." />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <Navigation />
      
      {/* Hero Section */}
      <header className={`pt-28 pb-12 px-6 ${isDark ? 'bg-slate-950' : 'bg-paper-cool'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className={`h-px w-12 ${isDark ? 'bg-cobalt-500' : 'bg-cobalt-700'}`} />
            <span className={`font-mono text-xs tracking-widest uppercase font-semibold ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
              Live Intelligence Feed
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className={`text-4xl md:text-5xl font-light mb-4 ${isDark ? 'text-white' : 'text-ink'}`}>
                Threat Intelligence <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-700'}>Briefing</span>
              </h1>
              <p className={`text-lg max-w-2xl ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
                AI-curated cyber threat intelligence updated every 4 hours. Powered by real-time web analysis of security news, advisories, and incident reports.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                  <span className="font-mono">Updated:</span>{' '}
                  <time dateTime={lastUpdated.toISOString()}>
                    {lastUpdated.toLocaleString()}
                  </time>
                  {cacheStatus?.stale && (
                    <span className={`ml-2 text-xs ${isDark ? 'text-amber-400' : 'text-alert-amber'}`}>
                      (refreshing...)
                    </span>
                  )}
                </div>
              )}
              <button
                onClick={() => fetchThreatIntel(true)}
                disabled={loading}
                className={`
                  px-4 py-2 rounded font-mono text-sm transition-all
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                  ${isDark ? 'bg-cobalt-500 text-white' : 'bg-cobalt-700 text-white shadow-cobalt-glow'}
                `}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </span>
                ) : '↻ Refresh'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <nav className={`sticky top-16 z-40 py-4 px-6 border-b ${isDark ? 'bg-obsidian/95 border-slate-800' : 'bg-white/95 border-stroke'} backdrop-blur-md`} aria-label="Threat categories">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={selectedCategory === cat.id}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm whitespace-nowrap transition-all
                  ${selectedCategory === cat.id
                    ? (isDark ? 'bg-cobalt-500 text-white' : 'bg-cobalt-700 text-white')
                    : (isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-200 text-ink-muted hover:bg-slate-300')
                  }
                `}
              >
                <span aria-hidden="true">{cat.icon}</span>
                <span>{cat.label}</span>
                {cat.id !== 'all' && (
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    selectedCategory === cat.id ? 'bg-white/20' : (isDark ? 'bg-slate-700' : 'bg-slate-300')
                  }`}>
                    {articles.filter(a => a.category === cat.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Articles */}
      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {error && !articles.length && (
            <div className={`p-6 rounded-lg border text-center ${isDark ? 'bg-red-950/30 border-red-500/30' : 'bg-emergency-light border-emergency-medium'}`}>
              <p className={`text-lg mb-2 ${isDark ? 'text-red-400' : 'text-emergency-vivid'}`}>
                Failed to fetch threat intelligence
              </p>
              <p className={isDark ? 'text-slate-400' : 'text-ink-muted'}>{error}</p>
              <button onClick={() => fetchThreatIntel(true)} className={`mt-4 px-4 py-2 rounded font-mono text-sm ${isDark ? 'bg-red-500 text-white' : 'bg-emergency-vivid text-white'}`}>
                Retry
              </button>
            </div>
          )}

          {loading && !articles.length && (
            <div className="space-y-6" aria-busy="true" aria-live="polite">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`p-6 rounded-xl border animate-pulse ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stroke'}`}>
                  <div className={`h-6 w-48 rounded mb-4 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
                  <div className={`h-4 w-full rounded mb-2 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
                  <div className={`h-4 w-3/4 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {filteredArticles.map((article) => {
              const severityColors = getSeverityColor(article.severity);
              const isExpanded = expandedArticle === article.id;
              
              return (
                <article
                  key={article.id}
                  className={`rounded-xl border overflow-hidden transition-all ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                      : 'bg-white border-stroke hover:border-stroke-strong shadow-card'
                  }`}
                  itemScope
                  itemType="https://schema.org/NewsArticle"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs font-mono uppercase font-bold ${severityColors.bg} text-white`}>
                          {article.severity}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-ink-muted'}`}>
                          {getCategoryIcon(article.category)} {article.category}
                        </span>
                        <time dateTime={article.date} className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-ink-muted'}`} itemProp="datePublished">
                          {article.date}
                        </time>
                      </div>
                      
                      {article.threat_actors && article.threat_actors !== 'Unknown' && (
                        <span className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-red-950 text-red-400' : 'bg-emergency-light text-emergency-deep'}`}>
                          🎭 {article.threat_actors}
                        </span>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h2 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-ink'}`} itemProp="headline">
                      {article.title}
                    </h2>
                    
                    {/* Summary */}
                    <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-ink-body'}`} itemProp="description">
                      {article.summary}
                    </p>
                    
                    {/* Sectors */}
                    {article.affected_sectors?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.affected_sectors.map((sector, i) => (
                          <span key={i} className={`px-2 py-0.5 rounded text-xs ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-ink-muted'}`}>
                            {sector}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <button
                      onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                      className={`flex items-center gap-2 text-sm font-mono font-semibold transition-colors ${isDark ? 'text-cobalt-400 hover:text-cobalt-300' : 'text-cobalt-700 hover:text-cobalt-600'}`}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? '− Hide Details' : '+ View Full Analysis'}
                    </button>
                  </div>
                  
                  {/* Expanded */}
                  {isExpanded && (
                    <div className={`px-6 pb-6 pt-2 border-t ${isDark ? 'border-slate-800' : 'border-stroke'}`} itemProp="articleBody">
                      <div className="mb-6">
                        <h3 className={`font-mono text-sm mb-3 font-semibold ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                          DETAILED ANALYSIS
                        </h3>
                        <div className={isDark ? 'text-slate-300' : 'text-ink-body'}>
                          {article.details.split('\n').map((para, i) => (
                            <p key={i} className="mb-3">{para}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {article.mitre_tactics?.length > 0 && (
                          <div>
                            <h3 className={`font-mono text-sm mb-3 font-semibold ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                              MITRE ATT&CK TACTICS
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {article.mitre_tactics.map((tactic, i) => (
                                <span key={i} className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-purple-950 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                                  {tactic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {article.iocs?.length > 0 && (
                          <div>
                            <h3 className={`font-mono text-sm mb-3 font-semibold ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                              INDICATORS OF COMPROMISE
                            </h3>
                            <div className={`p-3 rounded font-mono text-xs overflow-x-auto ${isDark ? 'bg-slate-950' : 'terminal-block'}`}>
                              {article.iocs.map((ioc, i) => (
                                <div key={i} className={isDark ? 'text-emerald-400' : 'text-tactical-vivid'}>{ioc}</div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className={`mt-6 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-stroke'}`}>
                        <span className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                          Source: <span itemProp="publisher">{article.source}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          
          {filteredArticles.length === 0 && !loading && !error && (
            <p className={`text-center py-12 ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
              No threats found in this category.
            </p>
          )}
        </div>
      </main>

      {/* Disclaimer */}
      <aside className={`py-8 px-6 border-t ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-paper-cool border-stroke'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
            <strong>Disclaimer:</strong> This threat intelligence is AI-generated from public sources for informational purposes. 
            Always verify critical information through official channels before taking action.
          </p>
        </div>
      </aside>

      <Footer />
    </div>
  );
};

export default ThreatIntelPage;
