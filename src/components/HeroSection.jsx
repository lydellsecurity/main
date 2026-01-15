import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LiveNetworkMap from './LiveNetworkMap';
import InitiateIRButton from './InitiateIRButton';
import ThemeToggle from './ThemeToggle';

/**
 * HeroSection - 2026 Paper & Steel Edition
 * 
 * Dark Mode: Original obsidian aesthetic
 * Light Mode: High-contrast "Paper & Steel" with glassmorphism
 */
const HeroSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    containment: 47,
    eradicated: 847,
    uptime: 99.97
  });
  
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setStats(prev => ({
        containment: Math.max(30, Math.min(60, prev.containment + (Math.random() - 0.5) * 5)),
        eradicated: prev.eradicated + Math.floor(Math.random() * 3),
        uptime: 99.97
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const isDark = theme === 'dark';
  
  return (
    <section className={`relative min-h-screen overflow-hidden ${isDark ? 'bg-obsidian' : 'bg-paper'}`}>
      {/* Live Network Map Background */}
      <LiveNetworkMap className="z-0" />
      
      {/* Gradient overlays */}
      <div className={`absolute inset-0 z-10 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/80'
          : 'bg-gradient-to-b from-paper/60 via-paper/30 to-paper/80'
      }`} />
      <div className={`absolute inset-0 z-10 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/50'
          : 'bg-gradient-to-r from-paper/40 via-transparent to-paper/40'
      }`} />
      
      {/* Content wrapper - pointer-events-none to allow network map interaction */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-8 pointer-events-none">
        
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16 md:mb-24 pointer-events-auto">
          <Link to="/" className="flex items-center gap-4 group">
            <div className={`w-10 h-10 border flex items-center justify-center transition-colors duration-300 ${
              isDark 
                ? 'border-cobalt-500/50 group-hover:border-cobalt-400' 
                : 'border-cobalt-700 group-hover:border-cobalt-600'
            }`}>
              <div className={`w-4 h-4 ${isDark ? 'bg-cobalt-500' : 'bg-cobalt-700'}`} />
            </div>
            <span className={`font-mono text-lg tracking-widest ${isDark ? 'text-white' : 'text-ink'}`}>
              LYDELL<span className={isDark ? 'text-cobalt-400' : 'text-cobalt-700'}>SECURITY</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            {/* Live status indicator */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span className={`font-mono text-xs ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
                THREAT GRID ACTIVE
              </span>
            </div>
            
            <div className={`hidden md:block h-4 w-px ${isDark ? 'bg-slate-700' : 'bg-stroke-strong'}`} />
            
            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {['Response', 'Methodology', 'Intel', 'Pedigree'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`} 
                  className={`text-sm font-medium transition-colors ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
            
            <div className={`hidden md:block h-4 w-px ${isDark ? 'bg-slate-700' : 'bg-stroke-strong'}`} />
            <ThemeToggle />
          </div>
        </nav>
        
        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr,420px] gap-12 lg:gap-16 items-start pointer-events-auto">
          
          {/* Left column - Glass card container */}
          <div className={`
            transition-all duration-1000 delay-300 p-8 rounded-2xl
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            ${isDark 
              ? 'bg-obsidian/40 backdrop-blur-sm' 
              : 'glass-card-strong'
            }
          `}>
            {/* Threat level indicator */}
            <div className={`
              inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8
              ${isDark 
                ? 'bg-red-950/50 border border-red-500/30' 
                : 'bg-emergency-light border border-emergency-medium'
              }
            `}>
              <div className="relative">
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-500' : 'bg-emergency-vivid'}`} />
                <div className={`absolute inset-0 w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-red-500' : 'bg-emergency-vivid'}`} />
              </div>
              <span className={`font-mono text-xs tracking-wider font-semibold ${
                isDark ? 'text-red-400' : 'text-emergency-deep'
              }`}>
                GLOBAL THREAT LEVEL: ELEVATED
              </span>
            </div>
            
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-px w-12 ${isDark ? 'bg-cobalt-500' : 'bg-cobalt-700'}`} />
              <span className={`font-mono text-xs tracking-[0.2em] uppercase font-semibold ${
                isDark ? 'text-cobalt-400' : 'text-cobalt-700'
              }`}>
                Agentic Incident Response
              </span>
            </div>
            
            {/* Headline - Ink Black in light mode */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-8 ${
              isDark ? 'text-white' : 'text-ink'
            }`}>
              <span className="block">Adversaries Neutralized.</span>
              <span className={`block ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
                Sovereignty Restored.
              </span>
              <span className="block relative">
                <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-700'}>
                  In Minutes.
                </span>
                <span className={`absolute -bottom-2 left-0 w-32 h-1 ${
                  isDark 
                    ? 'bg-gradient-to-r from-cobalt-500 to-transparent' 
                    : 'bg-gradient-to-r from-cobalt-700 to-transparent'
                }`} />
              </span>
            </h1>
            
            {/* Subhead */}
            <p className={`text-lg md:text-xl max-w-xl mb-10 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-ink-body'
            }`}>
              While others assess, we <strong className={isDark ? 'text-white' : 'text-ink'}>eradicate</strong>. 
              Our agentic AI systems hunt, contain, and neutralize threats at machine speed—restoring 
              your digital sovereignty before the damage compounds.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/response"
                className={`
                  px-8 py-4 font-mono text-sm tracking-wider transition-all duration-300 rounded-lg
                  ${isDark
                    ? 'bg-cobalt-500 hover:bg-cobalt-400 text-white border border-cobalt-400/30'
                    : 'bg-gradient-to-r from-cobalt-600 to-cobalt-700 hover:from-cobalt-700 hover:to-cobalt-800 text-white border border-cobalt-800 shadow-cobalt-glow'
                  }
                `}
              >
                VIEW RESPONSE PROTOCOL
              </Link>
              <Link
                to="/methodology"
                className={`
                  px-8 py-4 font-mono text-sm tracking-wider transition-all duration-300 rounded-lg
                  ${isDark
                    ? 'bg-transparent hover:bg-slate-800/50 text-slate-300 border border-slate-600 hover:border-slate-500'
                    : 'bg-white/80 hover:bg-white text-ink border border-stroke-strong hover:border-ink-muted shadow-card hover:shadow-card-hover'
                  }
                `}
              >
                OUR METHODOLOGY
              </Link>
            </div>
            
            {/* Live stats bar - Terminal aesthetic in light mode */}
            <div className={`
              grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl border
              ${isDark
                ? 'bg-slate-900/50 border-slate-800'
                : 'terminal-block'
              }
            `}>
              {/* Terminal header for light mode */}
              {!isDark && (
                <div className="col-span-1 sm:col-span-3 flex items-center gap-2 pb-3 mb-3 border-b border-stroke">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 font-mono text-xs text-ink-muted">live_metrics.sh</span>
                </div>
              )}

              <div className="flex sm:block items-center justify-between sm:justify-start">
                <div className={`text-xs uppercase tracking-wider order-1 sm:order-2 ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                  Avg Neutralization
                </div>
                <div className={`font-mono text-2xl sm:text-3xl font-bold order-2 sm:order-1 ${isDark ? 'text-white' : 'text-ink'}`}>
                  {Math.round(stats.containment)}<span className={isDark ? 'text-cobalt-400' : 'text-cobalt-700'}>min</span>
                </div>
              </div>
              <div className="flex sm:block items-center justify-between sm:justify-start">
                <div className={`text-xs uppercase tracking-wider order-1 sm:order-2 ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                  Threats Eradicated
                </div>
                <div className={`font-mono text-2xl sm:text-3xl font-bold order-2 sm:order-1 ${isDark ? 'text-white' : 'text-ink'}`}>
                  {stats.eradicated.toLocaleString()}<span className={isDark ? 'text-cobalt-400' : 'text-cobalt-700'}>+</span>
                </div>
              </div>
              <div className="flex sm:block items-center justify-between sm:justify-start">
                <div className={`text-xs uppercase tracking-wider order-1 sm:order-2 ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                  Client Uptime
                </div>
                <div className={`font-mono text-2xl sm:text-3xl font-bold order-2 sm:order-1 ${isDark ? 'text-white' : 'text-ink'}`}>
                  {stats.uptime}<span className={isDark ? 'text-cobalt-400' : 'text-cobalt-700'}>%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Emergency IR Button */}
          <div className={`
            transition-all duration-1000 delay-500 p-6 rounded-2xl
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            ${isDark ? '' : 'glass-card-strong'}
          `}>
            <InitiateIRButton />
            
            {/* Threat intel card */}
            <div className={`
              mt-6 p-5 rounded-xl border
              ${isDark 
                ? 'bg-slate-900/80 border-slate-800' 
                : 'bg-white/90 border-stroke shadow-card'
              }
            `}>
              <div className={`font-mono text-xs mb-3 font-semibold ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
                ACTIVE THREAT CAMPAIGNS
              </div>
              
              <div className="space-y-3">
                <ThreatItem name="AI-Driven Ransomware" level="critical" trend="up" theme={theme} />
                <ThreatItem name="Identity Infrastructure" level="high" trend="up" theme={theme} />
                <ThreatItem name="Supply Chain Compromise" level="elevated" trend="stable" theme={theme} />
              </div>
              
              <Link 
                to="/intel"
                className={`
                  mt-4 block text-center text-xs font-mono py-2 font-semibold transition-colors
                  ${isDark ? 'text-cobalt-400 hover:text-cobalt-300' : 'text-cobalt-700 hover:text-cobalt-600'}
                `}
              >
                VIEW FULL THREAT INTEL →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Trust badges */}
        <div className={`
          mt-16 md:mt-24 pt-8 border-t pointer-events-auto
          ${isDark ? 'border-slate-800/50' : 'border-stroke'}
          transition-all duration-1000 delay-700
          ${mounted ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className={`text-center mb-6 ${isDark ? 'text-slate-500' : 'text-ink-muted'}`}>
            <span className="font-mono text-xs tracking-wider">TRUSTED BY CRITICAL INFRASTRUCTURE</span>
          </div>
          <div className={`flex flex-wrap justify-center gap-8 ${isDark ? 'text-slate-600' : 'text-ink-subtle'}`}>
            {['Federal Reserve System', 'NYSE Infrastructure', 'Cisco Security Operations'].map((org, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 ${isDark ? 'bg-cobalt-500/50' : 'bg-cobalt-700/50'}`} />
                <span className="text-sm font-medium">{org}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * ThreatItem - Individual threat display
 */
const ThreatItem = ({ name, level, trend, theme }) => {
  const isDark = theme === 'dark';
  
  const levelStyles = {
    critical: {
      dot: 'bg-red-500',
      badge: isDark ? 'bg-red-950 text-red-400' : 'bg-emergency-light text-emergency-deep border border-emergency-medium',
    },
    high: {
      dot: 'bg-orange-500',
      badge: isDark ? 'bg-orange-950 text-orange-400' : 'bg-alert-amber-light text-alert-amber-vivid border border-orange-200',
    },
    elevated: {
      dot: 'bg-amber-500',
      badge: isDark ? 'bg-amber-950 text-amber-400' : 'bg-amber-50 text-amber-700 border border-amber-200',
    },
  };
  
  const styles = levelStyles[level] || levelStyles.elevated;
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-ink-body'}`}>
          {name}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-mono uppercase px-2 py-0.5 rounded font-semibold ${styles.badge}`}>
          {level}
        </span>
        {trend === 'up' && (
          <svg className={`w-3 h-3 ${isDark ? 'text-red-500' : 'text-emergency-vivid'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
