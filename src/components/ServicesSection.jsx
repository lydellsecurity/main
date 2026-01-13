import React, { useState } from 'react';

/**
 * Service Card Component
 * Individual service with expandable details
 */
const ServiceCard = ({ 
  number, 
  title, 
  subtitle, 
  description, 
  capabilities, 
  outcome,
  icon 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className={`
        group relative
        border border-slate-800 hover:border-cobalt-500/50
        bg-gradient-to-b from-slate-900/50 to-slate-950/50
        backdrop-blur-sm rounded-lg
        transition-all duration-500
        ${isExpanded ? 'ring-1 ring-cobalt-500/30' : ''}
      `}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent group-hover:via-cobalt-500/50 transition-colors duration-500" />
      
      {/* Service number */}
      <div className="absolute -top-3 left-6">
        <span className="font-mono text-xs text-cobalt-500 bg-obsidian px-2">
          {number}
        </span>
      </div>
      
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          {/* Icon */}
          <div className="
            w-12 h-12 
            flex items-center justify-center 
            bg-cobalt-500/10 
            border border-cobalt-500/30 
            rounded
            group-hover:bg-cobalt-500/20
            transition-colors duration-300
          ">
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl text-white font-light mb-1">{title}</h3>
            <p className="text-sm text-cobalt-400 font-mono">{subtitle}</p>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        {/* Expand toggle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-cobalt-400 transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-wider">
            {isExpanded ? 'Collapse' : 'View Capabilities'}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Expandable content */}
        <div className={`
          overflow-hidden transition-all duration-500
          ${isExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}
        `}>
          {/* Capabilities */}
          <div className="border-t border-slate-800 pt-6">
            <h4 className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-4">
              What We Execute
            </h4>
            <ul className="space-y-3">
              {capabilities.map((capability, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 bg-cobalt-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Outcome */}
          <div className="mt-6 p-4 bg-cobalt-500/5 border border-cobalt-500/20 rounded">
            <h4 className="font-mono text-xs text-cobalt-400 uppercase tracking-wider mb-2">
              The Outcome
            </h4>
            <p className="text-sm text-slate-300">{outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Core Services Section
 */
const ServicesSection = () => {
  const services = [
    {
      number: '01',
      title: 'Rapid Containment',
      subtitle: 'Identity-First Protocol',
      description: 'Modern attacks don\'t breach firewalls—they compromise identities. A single stolen session token can traverse your entire environment before traditional detection even fires.',
      capabilities: [
        'Immediate federation of compromised SSO/IdP sessions across Okta, Azure AD, Ping',
        'Surgical MFA reset sequences that don\'t disrupt legitimate users',
        'Service account privilege revocation with dependency mapping',
        'Conditional access policy hardening in real-time',
        'Session token invalidation across distributed infrastructure'
      ],
      outcome: 'Lateral movement stops. The attacker\'s foothold becomes an island.',
      icon: (
        <svg className="w-6 h-6 text-cobalt-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
          />
        </svg>
      )
    },
    {
      number: '02',
      title: 'AI-Automated Forensics',
      subtitle: 'Machine-Speed Investigation',
      description: 'Traditional forensics takes weeks. Your board wants answers in hours. Our agentic AI systems perform parallel investigation across every data source simultaneously.',
      capabilities: [
        'Complete attack timeline with sub-second precision',
        'Indicator of Compromise (IOC) extraction and threat intel correlation',
        'Patient-zero identification with confidence scoring',
        'Data exfiltration assessment with scope quantification',
        'Chain-of-custody documentation that holds up in court'
      ],
      outcome: 'You brief your executives with facts, not theories. Within hours, not weeks.',
      icon: (
        <svg className="w-6 h-6 text-cobalt-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Ransomware Recovery',
      subtitle: 'Business Continuity Protocol',
      description: 'Ransomware isn\'t just a technical problem—it\'s a business crisis. We\'ve negotiated with every major ransomware syndicate and know their breaking points.',
      capabilities: [
        'Immediate backup integrity assessment (can we restore without paying?)',
        'Threat actor profiling (who are we dealing with?)',
        'Negotiation strategy development (if payment becomes necessary)',
        'Cryptocurrency transaction handling with regulatory compliance',
        'Parallel restoration workstreams to minimize downtime'
      ],
      outcome: 'Business continuity preserved. Ransom payments avoided when possible, minimized when necessary.',
      icon: (
        <svg className="w-6 h-6 text-cobalt-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
      )
    }
  ];
  
  return (
    <section className="relative py-24 bg-obsidian">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-cobalt-500" />
            <span className="font-mono text-xs text-cobalt-400 tracking-widest uppercase">
              Core Capabilities
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            When Minutes 
            <span className="text-slate-500"> Matter Most</span>
          </h2>
          
          <p className="text-lg text-slate-400 leading-relaxed">
            The average dwell time for sophisticated adversaries is 21 days. 
            Our average time-to-containment is 47 minutes. The difference is whether 
            you're reading about the breach—or reading about someone else's.
          </p>
        </div>
        
        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-6">
            Every engagement begins with a secure conversation.
          </p>
          <button className="
            px-8 py-4 
            bg-transparent hover:bg-slate-800/50
            text-slate-300 hover:text-white
            font-mono text-sm tracking-wider
            transition-all duration-300
            border border-slate-600 hover:border-cobalt-500/50
            rounded
          ">
            DISCUSS YOUR REQUIREMENTS
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
