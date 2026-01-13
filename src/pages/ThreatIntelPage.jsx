import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

/**
 * ThreatIntelPage
 * 
 * AI-powered threat intelligence blog that uses Claude API
 * to generate current cyber threat briefings via web search.
 */
const ThreatIntelPage = () => {
  const { theme } = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [expandedArticle, setExpandedArticle] = useState(null);

  const categories = [
    { id: 'all', label: 'All Threats', icon: '🌐' },
    { id: 'ransomware', label: 'Ransomware', icon: '🔒' },
    { id: 'apt', label: 'APT Groups', icon: '🎯' },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: '⚠️' },
    { id: 'malware', label: 'Malware', icon: '🦠' },
    { id: 'data-breach', label: 'Data Breaches', icon: '💾' },
  ];

  const fetchThreatIntel = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Call our Netlify function which proxies to Claude API
      const response = await fetch('/api/threat-intel', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.articles) {
        setArticles(data.articles);
        setLastUpdated(new Date(data.generated_at || Date.now()));
        
        // Cache in localStorage
        localStorage.setItem('threatIntelCache', JSON.stringify({
          articles: data.articles,
          timestamp: data.generated_at || new Date().toISOString()
        }));
      } else {
        throw new Error(data.error || 'Invalid response format');
      }
    } catch (err) {
      console.error('Threat intel fetch error:', err);
      setError(err.message);
      
      // Try to load from cache on error
      const cached = localStorage.getItem('threatIntelCache');
      if (cached) {
        const { articles: cachedArticles, timestamp } = JSON.parse(cached);
        setArticles(cachedArticles);
        setLastUpdated(new Date(timestamp));
      } else {
        // Load fallback mock data if no cache
        setArticles(getMockArticles());
        setLastUpdated(new Date());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Fallback mock articles when API unavailable
  const getMockArticles = () => [
    {
      id: 'mock-1',
      category: 'ransomware',
      severity: 'critical',
      title: 'BlackCat Ransomware Variant Targets Healthcare Sector',
      summary: 'A new variant of BlackCat (ALPHV) ransomware has been observed targeting healthcare organizations with enhanced evasion techniques.',
      details: 'Security researchers have identified a new variant of the BlackCat ransomware that specifically targets healthcare organizations. The variant includes improved anti-analysis features and uses legitimate system tools to evade detection.\n\nThe attackers are gaining initial access through compromised VPN credentials and exploiting unpatched systems. Once inside, they use living-off-the-land techniques to move laterally before deploying the ransomware payload.\n\nOrganizations are advised to ensure all VPN solutions are patched, implement MFA on all remote access points, and maintain offline backups of critical systems.',
      affected_sectors: ['Healthcare', 'Pharmaceuticals'],
      threat_actors: 'BlackCat/ALPHV',
      iocs: ['185.220.101.xxx', 'SHA256: a1b2c3...'],
      mitre_tactics: ['Initial Access', 'Defense Evasion', 'Impact'],
      source: 'Threat Intelligence Feed',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 'mock-2',
      category: 'vulnerabilities',
      severity: 'critical',
      title: 'Critical RCE Vulnerability in Popular Enterprise Software',
      summary: 'A critical remote code execution vulnerability has been discovered affecting millions of enterprise installations worldwide.',
      details: 'A critical vulnerability (CVE-2025-XXXX) with a CVSS score of 9.8 has been identified in widely-deployed enterprise software. The vulnerability allows unauthenticated remote code execution.\n\nExploitation is trivial and proof-of-concept code has been published. Active exploitation in the wild has been confirmed by multiple security vendors.\n\nImmediate patching is strongly recommended. If patching is not immediately possible, network-level controls should be implemented to restrict access to affected systems.',
      affected_sectors: ['Technology', 'Finance', 'Government', 'Healthcare'],
      threat_actors: 'Multiple',
      iocs: [],
      mitre_tactics: ['Initial Access', 'Execution'],
      source: 'Security Advisory',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 'mock-3',
      category: 'apt',
      severity: 'high',
      title: 'Nation-State Actor Targets Critical Infrastructure',
      summary: 'A sophisticated threat actor linked to a nation-state has been observed conducting reconnaissance against critical infrastructure in multiple countries.',
      details: 'Intelligence agencies have issued a joint advisory warning of ongoing cyber operations targeting critical infrastructure sectors including energy, water, and transportation.\n\nThe threat actor is using spear-phishing campaigns with industry-specific lures and exploiting known vulnerabilities in internet-facing systems. Once access is gained, the actor establishes persistent access and conducts extensive reconnaissance.\n\nOrganizations in critical infrastructure sectors should review their security posture, ensure all systems are patched, and implement enhanced monitoring for indicators of compromise.',
      affected_sectors: ['Energy', 'Water', 'Transportation', 'Government'],
      threat_actors: 'Nation-State APT',
      iocs: ['malicious-domain.example'],
      mitre_tactics: ['Reconnaissance', 'Initial Access', 'Persistence', 'Collection'],
      source: 'Government Advisory',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 'mock-4',
      category: 'data-breach',
      severity: 'high',
      title: 'Major Financial Institution Reports Data Breach',
      summary: 'A leading financial services company has disclosed a data breach affecting customer personal and financial information.',
      details: 'A major financial institution has disclosed a significant data breach that may have exposed personal and financial information of millions of customers. The breach was discovered during routine security monitoring.\n\nPreliminary investigation suggests attackers exploited a vulnerability in a third-party vendor system to gain access to customer databases. Exposed data may include names, account numbers, and transaction history.\n\nAffected customers are being notified and offered credit monitoring services. The institution has engaged forensic investigators and notified relevant regulatory authorities.',
      affected_sectors: ['Finance', 'Banking'],
      threat_actors: 'Unknown',
      iocs: [],
      mitre_tactics: ['Initial Access', 'Collection', 'Exfiltration'],
      source: 'Company Disclosure',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 'mock-5',
      category: 'malware',
      severity: 'medium',
      title: 'New Info-Stealer Malware Campaign Targets Enterprises',
      summary: 'A new information-stealing malware is being distributed through malicious advertisements and compromised software downloads.',
      details: 'Security researchers have identified a new information-stealing malware being distributed through malvertising campaigns and trojanized software installers. The malware targets browser credentials, cryptocurrency wallets, and session tokens.\n\nThe malware uses sophisticated evasion techniques including process hollowing and encrypted communications. It specifically targets enterprise environments to harvest credentials for further attacks.\n\nOrganizations should ensure endpoint protection is up to date, implement application whitelisting where possible, and educate users about the risks of downloading software from unofficial sources.',
      affected_sectors: ['Technology', 'Finance', 'Retail'],
      threat_actors: 'Cybercrime Group',
      iocs: ['stealer-c2.example', 'SHA256: d4e5f6...'],
      mitre_tactics: ['Execution', 'Credential Access', 'Exfiltration'],
      source: 'Malware Analysis Report',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 'mock-6',
      category: 'ransomware',
      severity: 'high',
      title: 'Ransomware-as-a-Service Operation Expands Affiliate Program',
      summary: 'A prominent ransomware-as-a-service operation has expanded its affiliate program, leading to increased attack volume globally.',
      details: 'A major ransomware-as-a-service (RaaS) operation has announced expanded affiliate recruitment, leading to a significant increase in ransomware attacks across multiple sectors. The operation provides affiliates with sophisticated tooling and infrastructure.\n\nThe RaaS platform offers double extortion capabilities, with data exfiltration occurring before encryption. Ransom demands have ranged from hundreds of thousands to millions of dollars depending on victim size.\n\nOrganizations should ensure robust backup strategies, implement network segmentation, and develop incident response plans specifically for ransomware scenarios.',
      affected_sectors: ['Manufacturing', 'Healthcare', 'Education', 'Government'],
      threat_actors: 'RaaS Affiliates',
      iocs: [],
      mitre_tactics: ['Initial Access', 'Execution', 'Exfiltration', 'Impact'],
      source: 'Threat Intelligence',
      date: new Date().toISOString().split('T')[0]
    }
  ];

  // Load cached data on mount, fetch fresh if stale
  useEffect(() => {
    const cached = localStorage.getItem('threatIntelCache');
    if (cached) {
      const { articles: cachedArticles, timestamp } = JSON.parse(cached);
      const cacheAge = Date.now() - new Date(timestamp).getTime();
      const maxAge = 4 * 60 * 60 * 1000; // 4 hours
      
      setArticles(cachedArticles);
      setLastUpdated(new Date(timestamp));
      
      if (cacheAge > maxAge) {
        fetchThreatIntel();
      } else {
        setLoading(false);
      }
    } else {
      fetchThreatIntel();
    }
  }, [fetchThreatIntel]);

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500' },
      high: { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500' },
      medium: { bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500' },
      low: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500' },
    };
    return colors[severity] || colors.medium;
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📋';
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-100'}`}>
      <Navigation />
      
      {/* Hero Section */}
      <section className={`pt-28 pb-12 px-6 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-blue-700'}`} />
            <span className={`font-mono text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cobalt-400' : 'text-blue-700'}`}>
              Live Intelligence Feed
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className={`text-4xl md:text-5xl font-light mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Threat Intelligence <span className={theme === 'dark' ? 'text-cobalt-400' : 'text-blue-700'}>Briefing</span>
              </h1>
              <p className={`text-lg max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                AI-curated cyber threat intelligence updated every 4 hours. Powered by real-time web analysis.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <div className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                  <span className="font-mono">Last updated:</span>{' '}
                  {lastUpdated.toLocaleString()}
                </div>
              )}
              <button
                onClick={fetchThreatIntel}
                disabled={loading}
                className={`
                  px-4 py-2 rounded font-mono text-sm transition-all
                  ${loading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105'
                  }
                  ${theme === 'dark'
                    ? 'bg-cobalt-500 text-white'
                    : 'bg-blue-700 text-white'
                  }
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
                ) : (
                  '↻ Refresh Intel'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className={`sticky top-16 z-40 py-4 px-6 border-b ${theme === 'dark' ? 'bg-obsidian/95 border-slate-800' : 'bg-white/95 border-slate-300'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm whitespace-nowrap transition-all
                  ${selectedCategory === cat.id
                    ? (theme === 'dark' 
                        ? 'bg-cobalt-500 text-white' 
                        : 'bg-blue-700 text-white')
                    : (theme === 'dark'
                        ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300')
                  }
                `}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                {cat.id !== 'all' && (
                  <span className={`
                    px-1.5 py-0.5 rounded text-xs
                    ${selectedCategory === cat.id
                      ? 'bg-white/20'
                      : (theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300')
                    }
                  `}>
                    {articles.filter(a => a.category === cat.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Articles */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {error && !articles.length && (
            <div className={`p-6 rounded-lg border text-center ${theme === 'dark' ? 'bg-red-950/30 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
              <div className={`text-lg mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                Failed to fetch threat intelligence
              </div>
              <div className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                {error}
              </div>
              <button
                onClick={fetchThreatIntel}
                className={`mt-4 px-4 py-2 rounded font-mono text-sm ${theme === 'dark' ? 'bg-red-500 text-white' : 'bg-red-600 text-white'}`}
              >
                Retry
              </button>
            </div>
          )}

          {loading && !articles.length && (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className={`p-6 rounded-lg border animate-pulse ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                >
                  <div className={`h-6 w-48 rounded mb-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`} />
                  <div className={`h-4 w-full rounded mb-2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`} />
                  <div className={`h-4 w-3/4 rounded ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`} />
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
                  className={`
                    rounded-lg border overflow-hidden transition-all
                    ${theme === 'dark' 
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }
                  `}
                >
                  {/* Article Header */}
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Severity Badge */}
                        <span className={`
                          px-2 py-1 rounded text-xs font-mono uppercase font-bold
                          ${severityColors.bg} text-white
                        `}>
                          {article.severity}
                        </span>
                        
                        {/* Category */}
                        <span className={`
                          px-2 py-1 rounded text-xs font-mono
                          ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}
                        `}>
                          {getCategoryIcon(article.category)} {article.category}
                        </span>
                        
                        {/* Date */}
                        <span className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                          {article.date}
                        </span>
                      </div>
                      
                      {/* Threat Actor */}
                      {article.threat_actors && article.threat_actors !== 'Unknown' && (
                        <span className={`
                          px-2 py-1 rounded text-xs font-mono
                          ${theme === 'dark' ? 'bg-red-950 text-red-400' : 'bg-red-100 text-red-700'}
                        `}>
                          🎭 {article.threat_actors}
                        </span>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h2 className={`text-xl font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {article.title}
                    </h2>
                    
                    {/* Summary */}
                    <p className={`mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {article.summary}
                    </p>
                    
                    {/* Affected Sectors */}
                    {article.affected_sectors && article.affected_sectors.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.affected_sectors.map((sector, i) => (
                          <span
                            key={i}
                            className={`
                              px-2 py-0.5 rounded text-xs
                              ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}
                            `}
                          >
                            {sector}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Expand/Collapse */}
                    <button
                      onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                      className={`
                        flex items-center gap-2 text-sm font-mono transition-colors
                        ${theme === 'dark' ? 'text-cobalt-400 hover:text-cobalt-300' : 'text-blue-700 hover:text-blue-600'}
                      `}
                    >
                      {isExpanded ? '− Hide Details' : '+ View Full Analysis'}
                    </button>
                  </div>
                  
                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className={`px-6 pb-6 pt-2 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                      {/* Detailed Analysis */}
                      <div className="mb-6">
                        <h3 className={`font-mono text-sm mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                          DETAILED ANALYSIS
                        </h3>
                        <div className={`prose max-w-none ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                          {article.details.split('\n').map((para, i) => (
                            <p key={i} className="mb-3">{para}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* MITRE ATT&CK Tactics */}
                        {article.mitre_tactics && article.mitre_tactics.length > 0 && (
                          <div>
                            <h3 className={`font-mono text-sm mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                              MITRE ATT&CK TACTICS
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {article.mitre_tactics.map((tactic, i) => (
                                <span
                                  key={i}
                                  className={`
                                    px-2 py-1 rounded text-xs font-mono
                                    ${theme === 'dark' ? 'bg-purple-950 text-purple-400' : 'bg-purple-100 text-purple-700'}
                                  `}
                                >
                                  {tactic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* IOCs */}
                        {article.iocs && article.iocs.length > 0 && (
                          <div>
                            <h3 className={`font-mono text-sm mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                              INDICATORS OF COMPROMISE
                            </h3>
                            <div className={`
                              p-3 rounded font-mono text-xs overflow-x-auto
                              ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100'}
                            `}>
                              {article.iocs.map((ioc, i) => (
                                <div key={i} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}>
                                  {ioc}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Source */}
                      <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                        <span className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                          Source: {article.source}
                        </span>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          
          {filteredArticles.length === 0 && !loading && !error && (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
              No threats found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className={`py-8 px-6 border-t ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
            <strong>Disclaimer:</strong> This threat intelligence is AI-generated from public sources for informational purposes. 
            Always verify critical information through official channels before taking action.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThreatIntelPage;
