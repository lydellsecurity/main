import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const TechStackSection = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const technologies = [
    { name: 'Extended Detection & Response', short: 'XDR', desc: 'Unified telemetry across endpoint, network, identity, and cloud.', metric: '< 100ms', label: 'Query Time', details: ['Single-pane correlation', 'Sub-second queries', 'Auto enrichment', 'Cross-platform'] },
    { name: 'SIEM-as-Code', short: 'SaC', desc: 'Detection logic version-controlled like software.', metric: '4 hrs', label: 'New Coverage', details: ['Git-managed rules', 'CI/CD deployment', 'MITRE tracking', 'Fast iteration'] },
    { name: 'AI-Driven Playbooks', short: 'AIP', desc: 'Response procedures that adapt dynamically.', metric: '90%', label: 'Tier-1 Auto', details: ['Agentic decisions', 'Dynamic branching', 'Auto escalation', 'Full audit trail'] },
    { name: 'Post-Quantum Cryptography', short: 'PQC', desc: 'Preparing for the quantum threat horizon.', metric: '2025', label: 'PQC Ready', details: ['Algorithm inventory', 'Migration roadmaps', 'Hybrid encryption', 'Crypto-agility'] },
    { name: 'Threat Intelligence Fusion', short: 'TIF', desc: 'Real-time correlation from 40+ sources.', metric: '40+', label: 'Intel Sources', details: ['Commercial feeds', 'Gov programs', 'Dark web monitoring', 'Attribution analysis'] }
  ];
  
  const active = technologies[activeIndex];
  
  return (
    <section className={`relative py-24 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-slate-800 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`} />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
            <span className={`font-mono text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>2026 Tech Stack</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-light mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Infrastructure for <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Next-Gen Threats</span>
          </h2>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Our technology enables sub-hour containment at enterprise scale.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-[350px,1fr] gap-8">
          <div className="space-y-3">
            {technologies.map((tech, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${activeIndex === idx 
                  ? (theme === 'dark' ? 'bg-cobalt-500/10 border-cobalt-500/50' : 'bg-cobalt-50 border-cobalt-500') 
                  : (theme === 'dark' ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300')
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${activeIndex === idx ? (theme === 'dark' ? 'text-white' : 'text-slate-900') : (theme === 'dark' ? 'text-slate-300' : 'text-slate-700')}`}>{tech.name}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{tech.desc}</div>
                  </div>
                  <svg className={`w-5 h-5 ${activeIndex === idx ? (theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600') : (theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
          
          <div className={`p-8 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className={`font-mono text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>{active.short}</span>
                <h3 className={`text-2xl font-light mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{active.name}</h3>
              </div>
              <div className="text-right">
                <div className={`font-mono text-3xl ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>{active.metric}</div>
                <div className={`text-xs uppercase ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{active.label}</div>
              </div>
            </div>
            
            <div className={`h-px mb-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`} />
            
            <div className="grid grid-cols-2 gap-4">
              {active.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${theme === 'dark' ? 'bg-cobalt-500/10' : 'bg-cobalt-50'}`}>
                    <svg className={`w-3 h-3 ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
