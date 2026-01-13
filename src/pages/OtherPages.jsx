import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ServicesSection from '../components/ServicesSection';

export const ResponsePage = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-50'}`}>
      <Navigation />
      <div className="pt-20"><ServicesSection /></div>
      <Footer />
    </div>
  );
};

export const PedigreePage = () => {
  const { theme } = useTheme();
  const credentials = [
    { title: 'Federal Reserve System', desc: 'Backbone of American monetary policy. 12 Reserve Banks protected.', metric: '$4.5T' },
    { title: 'New York Stock Exchange', desc: 'Infrastructure processing 6 billion shares daily.', metric: '6B+' },
    { title: 'Cisco Security Operations', desc: 'Building playbooks that others follow.', metric: '20+ yr' },
    { title: 'Fortune 500 Programs', desc: 'Financial services, healthcare, critical infrastructure.', metric: '100+' }
  ];
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-50'}`}>
      <Navigation />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
              <span className={`font-mono text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>Elite Pedigree</span>
            </div>
            <h1 className={`text-4xl md:text-6xl font-light mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Proven Shield for <span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>Critical Infrastructure</span>
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              We've protected systems that, if compromised, would make international news.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {credentials.map((c, i) => (
              <div key={i} className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className={`font-mono text-3xl mb-2 ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>{c.metric}</div>
                <h3 className={`text-xl font-light mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{c.title}</h3>
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const TechnologyPage = () => {
  const { theme } = useTheme();
  const tech = [
    { name: 'XDR Integration', desc: 'Unified telemetry across endpoint, network, identity, cloud.' },
    { name: 'SIEM-as-Code', desc: 'Detection logic version-controlled, deployed like software.' },
    { name: 'AI Playbooks', desc: 'Agentic systems make tier-one decisions autonomously.' },
    { name: 'Post-Quantum Ready', desc: 'Preparing infrastructure for quantum threat horizon.' },
    { name: 'Threat Intel Fusion', desc: '40+ commercial and government sources correlated.' }
  ];
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-50'}`}>
      <Navigation />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
              <span className={`font-mono text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>2026 Tech Stack</span>
            </div>
            <h1 className={`text-4xl md:text-6xl font-light mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Infrastructure for <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Next-Gen Threats</span>
            </h1>
          </div>
          <div className="space-y-4">
            {tech.map((t, i) => (
              <div key={i} className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-xl font-light mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.name}</h3>
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const ContactPage = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-50'}`}>
      <Navigation />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
            <span className={`font-mono text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>Contact</span>
          </div>
          <h1 className={`text-4xl md:text-6xl font-light mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Establish <span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>Contact</span>
          </h1>
          <div className={`p-8 rounded-lg border mb-8 ${theme === 'dark' ? 'bg-red-950/20 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className={`font-mono text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>ACTIVE INCIDENT?</span>
            </div>
            <p className={`mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>15-minute response guarantee. Direct line to senior commanders.</p>
            <div className={`font-mono text-2xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>+1 (888) IR-RAPID</div>
          </div>
          <form className="space-y-6">
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Organization</label>
              <input type="text" className={`w-full px-4 py-3 rounded border ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
            </div>
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Email</label>
              <input type="email" className={`w-full px-4 py-3 rounded border ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
            </div>
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>How can we help?</label>
              <textarea rows={4} className={`w-full px-4 py-3 rounded border ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
            </div>
            <button type="submit" className={`w-full py-4 font-mono text-sm tracking-wider ${theme === 'dark' ? 'bg-cobalt-500 hover:bg-cobalt-400' : 'bg-cobalt-600 hover:bg-cobalt-500'} text-white transition-colors`}>
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};
