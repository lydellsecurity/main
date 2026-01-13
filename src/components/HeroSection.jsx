import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LiveNetworkMap from './LiveNetworkMap';
import InitiateIRButton from './InitiateIRButton';
import ThemeToggle from './ThemeToggle';

/**
 * HeroSection - 2026 Agentic Era
 * 
 * Aggressive, kinetic design emphasizing:
 * - Live network visualization
 * - Zero-dwell response messaging
 * - Digital sovereignty restoration
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
    
    // Simulate live stat updates
    const interval = setInterval(() => {
      setStats(prev => ({
        containment: Math.max(30, Math.min(60, prev.containment + (Math.random() - 0.5) * 5)),
        eradicated: prev.eradicated + Math.floor(Math.random() * 3),
        uptime: 99.97
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className={`
      relative min-h-screen overflow-hidden
      ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-200'}
    `}>
      {/* Live Network Map Background - z-0 so it's behind everything */}
      <LiveNetworkMap className="z-0" />
      
      {/* Gradient overlays - z-10, pointer-events-none so they don't block canvas */}
      <div className={`
        absolute inset-0 z-10 pointer-events-none
        ${theme === 'dark'
          ? 'bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/80'
          : 'bg-gradient-to-b from-slate-200/40 via-transparent to-slate-200/70'
        }
      `} />
      <div className={`
        absolute inset-0 z-10 pointer-events-none
        ${theme === 'dark'
          ? 'bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/50'
          : 'bg-gradient-to-r from-slate-200/30 via-transparent to-slate-200/30'
        }
      `} />
      
      {/* Content - z-20 but with pointer-events-none on container, pointer-events-auto on interactive elements */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-8 pointer-events-none">
        {/* Navigation - needs pointer events */}
        <nav className="flex justify-between items-center mb-16 md:mb-24 pointer-events-auto">
          <Link to="/" className="flex items-center gap-4 group">
            <div className={`
              w-10 h-10 border flex items-center justify-center transition-colors duration-300
              ${theme === 'dark' 
                ? 'border-cobalt-500/50 group-hover:border-cobalt-400' 
                : 'border-cobalt-600/50 group-hover:border-cobalt-500'
              }
            `}>
              <div className={`w-4 h-4 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
            </div>
            <span className={`
              font-mono text-lg tracking-widest
              ${theme === 'dark' ? 'text-white' : 'text-slate-900'}
            `}>
              LYDELL<span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>SECURITY</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            {/* Live status */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span className={`font-mono text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                THREAT GRID ACTIVE
              </span>
            </div>
            
            <div className={`hidden md:block h-4 w-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`} />
            
            {/* Navigation links */}
            <nav className="hidden md:flex gap-6 text-sm">
              <Link 
                to="/response" 
                className={`transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Response
              </Link>
              <Link 
                to="/methodology" 
                className={`transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Methodology
              </Link>
              <Link 
                to="/pedigree" 
                className={`transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Pedigree
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Contact
              </Link>
            </nav>
            
            <div className={`hidden md:block h-4 w-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`} />
            
            {/* Theme toggle */}
            <ThemeToggle />
          </div>
        </nav>
        
        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr,420px] gap-12 lg:gap-16 items-start pointer-events-auto">
          {/* Left column - Main messaging with visible gradient backdrop in light mode */}
          <div className={`
            transition-all duration-1000 delay-300 p-8 -m-8 rounded-3xl
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            ${theme === 'dark' 
              ? '' 
              : 'bg-gradient-to-br from-white via-white/95 to-slate-100/90 shadow-xl shadow-slate-300/50 border border-white/50'
            }
          `}>
            {/* Threat level indicator */}
            <div className={`
              inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8
              ${theme === 'dark' ? 'bg-red-950/50 border border-red-500/30' : 'bg-red-100 border border-red-300'}
            `}>
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <span className={`font-mono text-xs tracking-wider ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                GLOBAL THREAT LEVEL: ELEVATED
              </span>
            </div>
            
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-blue-700'}`} />
              <span className={`
                font-mono text-xs tracking-[0.2em] uppercase
                ${theme === 'dark' ? 'text-cobalt-400' : 'text-blue-700'}
              `}>
                Agentic Incident Response
              </span>
            </div>
            
            {/* Headline - Aggressive, kinetic */}
            <h1 className={`
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-8
              ${theme === 'dark' ? 'text-white' : 'text-slate-900'}
            `}>
              <span className="block">Adversaries Neutralized.</span>
              <span className={`block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Sovereignty Restored.
              </span>
              <span className="block relative">
                <span className={theme === 'dark' ? 'text-cobalt-400' : 'text-blue-700'}>
                  In Minutes.
                </span>
                <span className={`
                  absolute -bottom-2 left-0 w-32 h-1
                  ${theme === 'dark' 
                    ? 'bg-gradient-to-r from-cobalt-500 to-transparent' 
                    : 'bg-gradient-to-r from-blue-700 to-transparent'
                  }
                `} />
              </span>
            </h1>
            
            {/* Subhead - Value prop */}
            <p className={`
              text-lg md:text-xl max-w-xl mb-10 leading-relaxed
              ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}
            `}>
              While others assess, we <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>eradicate</strong>. 
              Our agentic AI systems hunt, contain, and neutralize threats at machine speed—restoring 
              your digital sovereignty before the damage compounds.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/response"
                className={`
                  px-8 py-4 font-mono text-sm tracking-wider transition-all duration-300
                  ${theme === 'dark'
                    ? 'bg-cobalt-500 hover:bg-cobalt-400 text-white border border-cobalt-400/30'
                    : 'bg-cobalt-600 hover:bg-cobalt-500 text-white border border-cobalt-500/30'
                  }
                `}
              >
                VIEW RESPONSE PROTOCOL
              </Link>
              <Link
                to="/methodology"
                className={`
                  px-8 py-4 font-mono text-sm tracking-wider transition-all duration-300
                  ${theme === 'dark'
                    ? 'bg-transparent hover:bg-slate-800/50 text-slate-300 border border-slate-600 hover:border-slate-500'
                    : 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 hover:border-slate-400'
                  }
                `}
              >
                OUR METHODOLOGY
              </Link>
            </div>
            
            {/* Live stats bar */}
            <div className={`
              grid grid-cols-3 gap-6 py-6 border-t
              ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}
            `}>
              <div>
                <div className={`font-mono text-3xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {Math.round(stats.containment)}<span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>min</span>
                </div>
                <div className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                  Avg Neutralization
                </div>
              </div>
              <div>
                <div className={`font-mono text-3xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {stats.eradicated.toLocaleString()}<span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>+</span>
                </div>
                <div className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                  Threats Eradicated
                </div>
              </div>
              <div>
                <div className={`font-mono text-3xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {stats.uptime}<span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>%</span>
                </div>
                <div className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                  Client Uptime
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Emergency IR Button */}
          <div className={`
            transition-all duration-1000 delay-500 p-6 -m-6 rounded-3xl
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            ${theme === 'dark' 
              ? '' 
              : 'bg-gradient-to-bl from-white via-white/95 to-slate-100/90 shadow-xl shadow-slate-300/50 border border-white/50'
            }
          `}>
            <InitiateIRButton />
            
            {/* Threat intel card */}
            <div className={`
              mt-6 p-5 rounded-lg border
              ${theme === 'dark' 
                ? 'bg-slate-900/80 border-slate-800' 
                : 'bg-white/90 border-slate-300 shadow-sm'
              }
            `}>
              <div className={`font-mono text-xs mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-700'}`}>
                ACTIVE THREAT CAMPAIGNS
              </div>
              
              <div className="space-y-3">
                <ThreatItem 
                  name="AI-Driven Ransomware" 
                  level="critical" 
                  trend="up"
                  theme={theme}
                />
                <ThreatItem 
                  name="Identity Infrastructure" 
                  level="high" 
                  trend="up"
                  theme={theme}
                />
                <ThreatItem 
                  name="Supply Chain Compromise" 
                  level="elevated" 
                  trend="stable"
                  theme={theme}
                />
              </div>
              
              <Link 
                to="/intel"
                className={`
                  mt-4 block text-center text-xs font-mono py-2
                  ${theme === 'dark' ? 'text-cobalt-400 hover:text-cobalt-300' : 'text-blue-700 hover:text-blue-600'}
                  transition-colors
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
          ${theme === 'dark' ? 'border-slate-800/50' : 'border-slate-300/50'}
          transition-all duration-1000 delay-700
          ${mounted ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="flex flex-col items-center gap-4">
            <span className={`
              text-xs font-mono tracking-widest uppercase
              ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}
            `}>
              Proven Shield for Critical Infrastructure
            </span>
            <div className={`
              flex flex-wrap justify-center gap-8 text-sm font-light
              ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}
            `}>
              {['Federal Reserve System', 'NYSE Infrastructure', 'Cisco Security Operations'].map((name, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none
        ${theme === 'dark'
          ? 'bg-gradient-to-t from-obsidian to-transparent'
          : 'bg-gradient-to-t from-slate-50 to-transparent'
        }
      `} />
    </section>
  );
};

// Threat item component
const ThreatItem = ({ name, level, trend, theme }) => {
  const levelColors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    elevated: 'bg-amber-500',
    low: 'bg-emerald-500'
  };
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${levelColors[level]}`} />
        <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
          {name}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`
          text-xs font-mono uppercase px-2 py-0.5 rounded font-medium
          ${level === 'critical' 
            ? (theme === 'dark' ? 'bg-red-950 text-red-400' : 'bg-red-200 text-red-800')
            : level === 'high'
              ? (theme === 'dark' ? 'bg-orange-950 text-orange-400' : 'bg-orange-200 text-orange-800')
              : (theme === 'dark' ? 'bg-amber-950 text-amber-400' : 'bg-amber-200 text-amber-800')
          }
        `}>
          {level}
        </span>
        {trend === 'up' && (
          <svg className={`w-3 h-3 ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
