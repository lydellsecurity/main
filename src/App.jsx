import React from 'react';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PedigreeSection from './components/PedigreeSection';
import TechStackSection from './components/TechStackSection';

/**
 * Lydell Security - Elite Incident Response
 * 
 * A premium, 2026-ready website emphasizing:
 * - Zero-Dwell Response
 * - Agentic AI-driven forensics
 * - Identity-First containment
 * - Post-Quantum readiness
 */
function App() {
  return (
    <div className="min-h-screen bg-obsidian text-white">
      {/* Hero with Emergency Dial */}
      <HeroSection />
      
      {/* Core Services */}
      <ServicesSection />
      
      {/* Elite Pedigree - Federal Reserve, NYSE */}
      <PedigreeSection />
      
      {/* 2026 Tech Stack */}
      <TechStackSection />
      
      {/* Footer */}
      <footer className="relative py-16 bg-obsidian border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 border border-cobalt-500/50 flex items-center justify-center">
                  <div className="w-3 h-3 bg-cobalt-500" />
                </div>
                <span className="font-mono text-lg tracking-widest">
                  LYDELL<span className="text-cobalt-400">SECURITY</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                Elite incident response for organizations that refuse to be the next headline.
                Twenty years defending the institutions that move markets.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Rapid Containment</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors">AI Forensics</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors">Ransomware Recovery</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors">IR Retainer</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-4">
                Emergency Contact
              </h4>
              <div className="space-y-3 text-sm">
                <p className="text-slate-500">
                  <span className="text-cobalt-400">24/7 Hotline</span>
                  <br />
                  <span className="text-white font-mono">+1 (XXX) XXX-XXXX</span>
                </p>
                <p className="text-slate-500">
                  <span className="text-cobalt-400">Secure Email</span>
                  <br />
                  <span className="text-white">response@lydellsecurity.com</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Lydell Security. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-slate-600">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
