import React from 'react';

/**
 * Credential Badge Component
 */
const CredentialBadge = ({ title, description, metric, metricLabel }) => {
  return (
    <div className="
      group relative p-6
      bg-gradient-to-b from-slate-900/80 to-slate-950/80
      border border-slate-800 hover:border-slate-700
      rounded-lg
      transition-all duration-300
    ">
      {/* Hover glow */}
      <div className="
        absolute inset-0 bg-gradient-to-r from-cobalt-500/5 to-cyan-500/5
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        rounded-lg
      " />
      
      <div className="relative">
        {/* Title */}
        <h4 className="text-lg text-white font-light mb-3">{title}</h4>
        
        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Metric */}
        {metric && (
          <div className="pt-4 border-t border-slate-800">
            <div className="font-mono text-2xl text-cobalt-400">{metric}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
              {metricLabel}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Timeline Item Component
 */
const TimelineItem = ({ year, event }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-16 font-mono text-sm text-cobalt-400">
        {year}
      </div>
      <div className="relative">
        <div className="absolute -left-6 top-2 w-2 h-2 bg-cobalt-500 rounded-full" />
        <p className="text-sm text-slate-300">{event}</p>
      </div>
    </div>
  );
};

/**
 * Elite Pedigree Section
 */
const PedigreeSection = () => {
  const credentials = [
    {
      title: 'Federal Reserve System',
      description: 'The backbone of American monetary policy. When the stakes are measured in trillions, the response team cannot be measured in tiers.',
      metric: '12',
      metricLabel: 'Reserve Banks Protected'
    },
    {
      title: 'New York Stock Exchange',
      description: 'Where milliseconds determine millions. We\'ve maintained incident response readiness for infrastructure that processes 6 billion shares daily.',
      metric: '6B+',
      metricLabel: 'Daily Shares Secured'
    },
    {
      title: 'Cisco Security Operations',
      description: 'Inside one of the world\'s largest security vendors, building the playbooks that others now follow.',
      metric: '20+',
      metricLabel: 'Years of Expertise'
    },
    {
      title: 'Fortune 500 Programs',
      description: 'Decades of experience across financial services, healthcare, critical infrastructure, and defense industrial base.',
      metric: '100+',
      metricLabel: 'Enterprise Engagements'
    }
  ];
  
  return (
    <section className="relative py-24 bg-obsidian overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cobalt-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-cobalt-500" />
            <span className="font-mono text-xs text-cobalt-400 tracking-widest uppercase">
              Elite Pedigree
            </span>
            <div className="h-px w-12 bg-cobalt-500" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
            Proven Shield for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt-400 to-cyan-400">
              Global Financial Infrastructure
            </span>
          </h2>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto mb-8" />
          
          <p className="text-lg text-slate-400 leading-relaxed">
            We've protected systems that, if compromised, would make international news.
            Our history is your assurance: when the situation is genuinely critical, 
            we've been there before.
          </p>
        </div>
        
        {/* Credentials grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {credentials.map((cred, idx) => (
            <CredentialBadge key={idx} {...cred} />
          ))}
        </div>
        
        {/* Trust statement */}
        <div className="
          relative max-w-4xl mx-auto
          p-8 md:p-12
          bg-gradient-to-b from-slate-900/50 to-transparent
          border border-slate-800
          rounded-lg
        ">
          {/* Quote marks */}
          <div className="absolute -top-4 left-8 text-6xl text-cobalt-500/20 font-serif">
            "
          </div>
          
          <blockquote className="relative">
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed italic mb-6">
              We don't list clients for marketing purposes. We list them because our history 
              is your assurance: when the situation is genuinely critical, we've been there before.
            </p>
            
            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cobalt-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-cobalt-500/30">
                <span className="font-mono text-sm text-cobalt-400">JL</span>
              </div>
              <div>
                <div className="text-white font-medium">Jr Lydell</div>
                <div className="text-sm text-slate-500">Founder & Principal</div>
              </div>
            </footer>
          </blockquote>
        </div>
        
        {/* Certifications row */}
        <div className="mt-16 pt-16 border-t border-slate-800">
          <div className="text-center mb-8">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
              Compliance & Certifications
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            {['SOC 2 Type II', 'HIPAA', 'PCI-DSS 4.0', 'CMMC 2.0', 'FedRAMP Ready'].map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cobalt-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PedigreeSection;
