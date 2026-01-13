import React, { useState } from 'react';

/**
 * Tech Stack Card Component
 */
const TechCard = ({ title, description, features, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-6
        border rounded-lg
        transition-all duration-300
        ${isActive 
          ? 'bg-cobalt-500/10 border-cobalt-500/50 shadow-lg shadow-cobalt-500/10' 
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-10 h-10 flex items-center justify-center rounded
          transition-colors duration-300
          ${isActive ? 'bg-cobalt-500/20 text-cobalt-400' : 'bg-slate-800 text-slate-400'}
        `}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`
            text-base font-medium mb-1 transition-colors duration-300
            ${isActive ? 'text-white' : 'text-slate-300'}
          `}>
            {title}
          </h4>
          <p className="text-sm text-slate-500 line-clamp-2">
            {description}
          </p>
        </div>
        
        <svg 
          className={`
            w-5 h-5 transition-all duration-300 flex-shrink-0
            ${isActive ? 'text-cobalt-400 rotate-90' : 'text-slate-600'}
          `}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

/**
 * Tech Stack Section
 */
const TechStackSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const technologies = [
    {
      title: 'Extended Detection & Response (XDR)',
      description: 'Unified telemetry across endpoint, network, identity, and cloud.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      details: {
        headline: 'Complete Visibility Across Your Environment',
        points: [
          'Single-pane correlation of endpoint, network, identity, and cloud events',
          'Sub-second query performance across petabytes of telemetry',
          'Automated alert enrichment with threat intelligence context',
          'Cross-platform investigation without console switching'
        ],
        metric: '< 100ms',
        metricLabel: 'Query Response Time'
      }
    },
    {
      title: 'SIEM-as-Code',
      description: 'Detection logic version-controlled, tested, and deployed like software.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      details: {
        headline: 'Detection Engineering at Software Speed',
        points: [
          'Git-managed detection rules with CI/CD deployment',
          'Automated testing against attack simulations before production',
          'MITRE ATT&CK coverage tracking and gap analysis',
          'Hours to deploy new detections, not quarters'
        ],
        metric: '4 hrs',
        metricLabel: 'New Technique Coverage'
      }
    },
    {
      title: 'AI-Driven Playbooks',
      description: 'Response procedures that adapt to what they find.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      details: {
        headline: 'Autonomous First Response',
        points: [
          'Agentic systems make tier-one decisions without human latency',
          'Dynamic playbook branching based on investigation findings',
          'Automatic escalation triggers for human judgment',
          'Complete audit trail of autonomous actions'
        ],
        metric: '90%',
        metricLabel: 'Tier-1 Automation'
      }
    },
    {
      title: 'Post-Quantum Cryptography',
      description: 'Preparing infrastructure for the quantum threat horizon.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      ),
      details: {
        headline: 'Quantum-Ready Infrastructure',
        points: [
          'Complete inventory of quantum-vulnerable cryptographic implementations',
          'Migration roadmaps to NIST-approved PQC algorithms',
          'Hybrid encryption for harvest-now-decrypt-later protection',
          'Key management modernization for crypto-agility'
        ],
        metric: '2025',
        metricLabel: 'PQC Ready Target'
      }
    },
    {
      title: 'Threat Intelligence Fusion',
      description: 'Real-time correlation against commercial and government sources.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: {
        headline: 'Intelligence-Led Defense',
        points: [
          'Aggregation from 40+ commercial and government threat feeds',
          'Dark web monitoring for credential leaks and brand mentions',
          'Attribution analysis with confidence scoring',
          'Proactive threat hunting based on emerging campaigns'
        ],
        metric: '40+',
        metricLabel: 'Intelligence Sources'
      }
    }
  ];
  
  const activeDetail = technologies[activeIndex].details;
  
  return (
    <section className="relative py-24 bg-obsidian">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-cobalt-500" />
            <span className="font-mono text-xs text-cobalt-400 tracking-widest uppercase">
              2026 Tech Stack
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Infrastructure for the
            <br />
            <span className="text-slate-500">Next Generation of Threats</span>
          </h2>
          
          <p className="text-lg text-slate-400 leading-relaxed">
            Our technology stack isn't a product pitch. It's the operational backbone 
            that enables sub-hour containment at enterprise scale.
          </p>
        </div>
        
        {/* Main content grid */}
        <div className="grid lg:grid-cols-[400px,1fr] gap-8">
          {/* Tech list */}
          <div className="space-y-3">
            {technologies.map((tech, idx) => (
              <TechCard 
                key={idx}
                {...tech}
                isActive={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
          
          {/* Detail panel */}
          <div className="
            relative p-8 lg:p-10
            bg-gradient-to-b from-slate-900/80 to-slate-950/80
            border border-slate-800
            rounded-lg
          ">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cobalt-500/50 to-transparent" />
            
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <span className="font-mono text-xs text-cobalt-400 uppercase tracking-wider">
                  {technologies[activeIndex].title}
                </span>
                <h3 className="text-2xl md:text-3xl text-white font-light mt-2">
                  {activeDetail.headline}
                </h3>
              </div>
              
              {/* Metric badge */}
              <div className="text-right">
                <div className="font-mono text-3xl text-cobalt-400">
                  {activeDetail.metric}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  {activeDetail.metricLabel}
                </div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="h-px bg-slate-800 mb-8" />
            
            {/* Features */}
            <ul className="space-y-4">
              {activeDetail.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-cobalt-500/10 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-cobalt-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
            
            {/* Bottom CTA */}
            <div className="mt-10 pt-8 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Want to see this in action?
                </p>
                <button className="
                  px-6 py-3
                  bg-cobalt-500/10 hover:bg-cobalt-500/20
                  text-cobalt-400
                  font-mono text-sm tracking-wider
                  border border-cobalt-500/30
                  rounded
                  transition-colors duration-300
                ">
                  REQUEST DEMO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
