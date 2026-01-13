import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { path: '/response', label: 'Response' },
    { path: '/methodology', label: 'Methodology' },
    { path: '/pedigree', label: 'Pedigree' },
    { path: '/technology', label: 'Technology' },
    { path: '/contact', label: 'Contact' }
  ];
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-obsidian/90' : 'bg-white/90'} backdrop-blur-md border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-8 h-8 border flex items-center justify-center transition-colors ${theme === 'dark' ? 'border-cobalt-500/50 group-hover:border-cobalt-400' : 'border-cobalt-600/50 group-hover:border-cobalt-500'}`}>
              <div className={`w-3 h-3 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
            </div>
            <span className={`font-mono text-base tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              LYDELL<span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>SECURITY</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 mr-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span className={`font-mono text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>ACTIVE</span>
            </div>
            
            <div className={`h-4 w-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`} />
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors ${isActive(link.path) ? (theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600') : (theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className={`h-4 w-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`} />
            <ThemeToggle />
          </div>
          
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className={`md:hidden pt-4 pb-2 border-t mt-4 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className={`block py-3 text-sm ${isActive(link.path) ? (theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600') : (theme === 'dark' ? 'text-slate-400' : 'text-slate-600')}`}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
