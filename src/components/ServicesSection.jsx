import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const ServiceCard = ({ 
  id,
  icon, 
  category,
  title, 
  tagline,
  description, 
  capabilities, 
  outcome,
  stats,
  isExpanded,
  onToggle,
  theme
}) => {
  return (
    <div 
      className={`
        group relative overflow-hidden border rounded-lg transition-all duration-500
        ${theme === 'dark'
          ? `bg-gradient-to-b from-slate-900/80 to-slate-950/80 
             ${isExpanded ? 'border-cobalt-500/50 shadow-lg shadow-cobalt-500/10' : 'border-slate-800 hover:border-slate-700'}`
          : `bg-gradient-to-b from-white to-slate-50 
             ${isExpanded ? 'border-cobalt-500 shadow-lg shadow-cobalt-500/10' : 'border-slate-200 hover:border-slate-300'}`
        }
      `}
    >
      <div className={`
        absolute top-0 left-0 right-0 h-px
        ${isExpanded
          ? 'bg-gradient-to-r from-transparent via-cobalt-500 to-transparent'
          : `bg-gradient-to-r from-transparent ${theme === 'dark' ? 'via-slate-700' : 'via-slate-300'} to-transparent`
        }
      `} />
      
      <div className="p-6 md:p-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
          {icon}
          <span className={`font-mono text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {category}
          </span>
        </div>
        
        <h3 className={`text-2xl md:text-3xl font-light mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
        
        <p className={`text-lg mb-4 font-medium ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
          {tagline}
        </p>
        
        <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {description}
        </p>
        
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-4 mb-6 border-y ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          {stats.map((stat, idx) => (
            <div key={idx} className="flex sm:block justify-between items-center sm:text-center">
              <div className={`text-xs uppercase tracking-wider order-1 sm:order-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                {stat.label}
              </div>
              <div className={`font-mono text-lg sm:text-xl font-semibold order-2 sm:order-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => onToggle(id)}
          className={`flex items-center gap-2 text-sm font-mono transition-colors ${theme === 'dark' ? 'text-slate-500 hover:text-cobalt-400' : 'text-slate-600 hover:text-cobalt-600'}`}
        >
          <span className="uppercase tracking-wider">{isExpanded ? 'Collapse Details' : 'View Capabilities'}</span>
          <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
          <div className={`pt-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
            <h4 className={`font-mono text-xs uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
              Neutralization Protocol
            </h4>
            <div className="space-y-4">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-cobalt-500/10' : 'bg-cobalt-100'}`}>
                    <span className={`font-mono text-sm font-semibold ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <div className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{cap.title}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{cap.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`mt-6 p-5 rounded-lg border ${theme === 'dark' ? 'bg-cobalt-950/30 border-cobalt-500/20' : 'bg-cobalt-50 border-cobalt-200'}`}>
            <h4 className={`font-mono text-xs uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
              Sovereignty Restored
            </h4>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const { theme } = useTheme();
  const [expandedService, setExpandedService] = useState(null);
  
  const services = [
    {
      id: 'ai-ransomware',
      category: 'Ransomware Neutralization',
      title: 'AI-Driven Ransomware Eradication',
      tagline: 'They deploy AI. We deploy faster AI.',
      description: 'Modern ransomware syndicates weaponize machine learning for polymorphic encryption and adaptive evasion. Our agentic countermeasures hunt and terminate ransomware operations before encryption completes.',
      icon: <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
      stats: [{ value: '< 4min', label: 'Detection' }, { value: '93%', label: 'Pre-Encryption Kill' }, { value: '$0', label: 'Ransom Paid' }],
      capabilities: [
        { title: 'Behavioral AI Interception', description: 'Detect ransomware staging—credential harvesting, shadow copy deletion—and terminate before payload deployment.' },
        { title: 'Autonomous Isolation Protocol', description: 'Machine-speed network segmentation. Infected endpoints quarantined while maintaining business connectivity.' },
        { title: 'Decryptor Arsenal Deployment', description: 'Proprietary database of 2,400+ ransomware variant decryptors. Restore without negotiation.' },
        { title: 'Threat Actor Neutralization', description: 'Hunt and sever C2 infrastructure, eliminating the adversary\'s foothold entirely.' },
        { title: 'Negotiation & Recovery', description: 'When unavoidable, our negotiators minimize payment and maximize decryptor reliability.' }
      ],
      outcome: 'Your data remains yours. Encryption prevented or reversed. Operations resume within hours.'
    },
    {
      id: 'identity-breach',
      category: 'Identity-First Response',
      title: 'Identity Infrastructure Takeback',
      tagline: 'The breach started with a credential. We end it there.',
      description: 'Modern adversaries don\'t breach firewalls—they log in. Our Identity-First protocol treats every authentication anomaly as an existential threat.',
      icon: <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
      stats: [{ value: '< 2min', label: 'Session Kill' }, { value: '100%', label: 'Lateral Block' }, { value: '0', label: 'Privilege Escalation' }],
      capabilities: [
        { title: 'Federation-Wide Session Termination', description: 'Simultaneous invalidation across Okta, Azure AD, Ping Identity. One command, complete lockout.' },
        { title: 'Surgical MFA Reset', description: 'Compromised factors revoked while legitimate users maintain access through backup paths.' },
        { title: 'Service Account Revocation', description: 'Map dependencies and execute privilege revocation without breaking production.' },
        { title: 'Conditional Access Hardening', description: 'Real-time policy injection: impossible travel blocking, device compliance, risk-based step-up.' },
        { title: 'Token Theft Forensics', description: 'Complete reconstruction of the theft chain. Court-ready evidence collection.' }
      ],
      outcome: 'Attacker access terminated. Lateral movement severed. Identity infrastructure hardened. Digital sovereignty restored.'
    },
    {
      id: 'digital-sovereignty',
      category: 'Full Spectrum Response',
      title: 'Digital Sovereignty Restoration',
      tagline: 'Your network. Your rules. Enforced.',
      description: 'When adversaries have persistent access—living off the land—half-measures fail. We assume breach, hunt aggressively, and eradicate every trace.',
      icon: <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      stats: [{ value: '72hr', label: 'Full Eradication' }, { value: '100%', label: 'Persistence Removal' }, { value: 'Zero', label: 'Re-compromise' }],
      capabilities: [
        { title: 'Assume-Breach Threat Hunt', description: 'Every endpoint, log source, and network flow scrutinized for indicators of compromise.' },
        { title: 'Living-off-the-Land Detection', description: 'Adversaries using PowerShell, WMI, PsExec identified through behavioral analysis.' },
        { title: 'Persistence Eradication', description: 'Scheduled tasks, registry keys, WMI subscriptions, bootkits—systematically eliminated.' },
        { title: 'C2 Infrastructure Mapping', description: 'Map entire adversary infrastructure for coordinated takedowns with law enforcement.' },
        { title: 'Hardened Rebuild', description: 'Orchestrate secure rebuilds with hardened baselines against future intrusion.' }
      ],
      outcome: 'Complete adversary eradication. Every backdoor closed. Your environment is yours again.'
    }
  ];
  
  return (
    <section className={`relative py-20 md:py-28 ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-50'}`}>
      <div className={`absolute inset-0 opacity-30 ${theme === 'dark' ? 'bg-grid' : ''}`} />
      <div className={`absolute top-0 left-0 right-0 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-slate-800 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'}`} />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
            <span className={`font-mono text-xs tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
              Specialized Response
            </span>
          </div>
          
          <h2 className={`text-3xl md:text-5xl font-light mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Threats Evolve. <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>We Evolve Faster.</span>
          </h2>
          
          <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            2026's threat landscape demands 2026 countermeasures—AI-driven ransomware, identity infrastructure compromise, and persistent access campaigns.
          </p>
        </div>
        
        <div className="grid gap-6">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              {...service}
              isExpanded={expandedService === service.id}
              onToggle={(id) => setExpandedService(expandedService === id ? null : id)}
              theme={theme}
            />
          ))}
        </div>
        
        <div className={`mt-16 p-8 rounded-lg border text-center ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-xl font-light mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Not sure which protocol applies?
          </h3>
          <p className={`mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Every engagement begins with a secure conversation.
          </p>
          <Link to="/contact" className={`inline-flex items-center gap-2 px-8 py-4 font-mono text-sm tracking-wider transition-all ${theme === 'dark' ? 'bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-600 hover:border-cobalt-500' : 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 hover:border-cobalt-500'}`}>
            DISCUSS YOUR SITUATION
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
