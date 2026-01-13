import React from 'react';
import { useTheme } from '../context/ThemeContext';

const PedigreeSection = () => {
  const { theme } = useTheme();
  
  const credentials = [
    { title: 'Federal Reserve System', desc: 'The backbone of American monetary policy. When stakes are measured in trillions.', metric: '12', label: 'Reserve Banks' },
    { title: 'New York Stock Exchange', desc: 'Where milliseconds determine millions. 6 billion shares daily.', metric: '6B+', label: 'Daily Shares' },
    { title: 'Cisco Security Operations', desc: 'Building the playbooks that others now follow.', metric: '20+', label: 'Years' },
    { title: 'Fortune 500 Programs', desc: 'Financial services, healthcare, critical infrastructure, defense.', metric: '100+', label: 'Engagements' }
  ];
  
  return (
    <section className={`relative py-24 ${theme === 'dark' ? 'bg-obsidian' : 'bg-white'}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-slate-800 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`} />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
            <span className={`font-mono text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>Elite Pedigree</span>
            <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-light mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Proven Shield for <span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>Critical Infrastructure</span>
          </h2>
          
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            We've protected systems that, if compromised, would make international news.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {credentials.map((cred, idx) => (
            <div key={idx} className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'} transition-colors`}>
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-light ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{cred.title}</h3>
                <div className="text-right">
                  <div className={`font-mono text-2xl ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>{cred.metric}</div>
                  <div className={`text-xs uppercase ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{cred.label}</div>
                </div>
              </div>
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{cred.desc}</p>
            </div>
          ))}
        </div>
        
        <div className={`max-w-2xl mx-auto p-8 rounded-lg border text-center ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <blockquote className={`text-xl italic mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            "We don't list clients for marketing. We list them because our history is your assurance."
          </blockquote>
          <div className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>— Jr Lydell, Founder</div>
        </div>
        
        <div className={`mt-12 pt-12 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`text-center text-xs font-mono uppercase tracking-wider mb-6 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Certifications</div>
          <div className={`flex flex-wrap justify-center gap-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {['SOC 2 Type II', 'HIPAA', 'PCI-DSS 4.0', 'CMMC 2.0', 'FedRAMP Ready'].map((cert, i) => (
              <span key={i} className="flex items-center gap-2 text-sm">
                <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-cobalt-500' : 'text-cobalt-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PedigreeSection;
