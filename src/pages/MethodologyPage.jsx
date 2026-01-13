import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const MethodologyPage = () => {
  const { theme } = useTheme();
  const phases = [
    { number: '01', name: 'INTERCEPT', duration: '0-15 min', title: 'Threat Interception', desc: 'No assessment paralysis. We intercept while others schedule meetings.', outcome: 'Response in motion' },
    { number: '02', name: 'CONTAIN', duration: '15-60 min', title: 'Surgical Containment', desc: 'Immediate, surgical—severing access while preserving evidence.', outcome: 'Adversary halted' },
    { number: '03', name: 'HUNT', duration: '1-4 hr', title: 'Aggressive Threat Hunt', desc: 'AI and operators sweep every corner for adversary presence.', outcome: 'Footprint mapped' },
    { number: '04', name: 'NEUTRALIZE', duration: '4-24 hr', title: 'Systematic Neutralization', desc: 'Every backdoor, persistence mechanism eliminated.', outcome: 'Environment sanitized' },
    { number: '05', name: 'FORTIFY', duration: '24-72 hr', title: 'Defensive Fortification', desc: 'Harden against techniques used and broader landscape.', outcome: 'Re-compromise blocked' },
    { number: '06', name: 'RESTORE', duration: '72+ hr', title: 'Sovereignty Restoration', desc: 'Full operational capability restored—stronger than before.', outcome: 'Sovereignty restored' }
  ];
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-50'}`}>
      <Navigation />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
              <span className={`font-mono text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>Methodology</span>
            </div>
            <h1 className={`text-4xl md:text-6xl font-light mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Zero-Dwell <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Response</span>
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              While others assess for days, adversaries exfiltrate. Our principle: act first, assess in parallel.
            </p>
          </div>
          <div className="space-y-6">
            {phases.map((phase) => (
              <div key={phase.number} className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex flex-wrap items-start gap-6">
                  <div className="w-24">
                    <div className={`font-mono text-4xl font-bold ${theme === 'dark' ? 'text-cobalt-500/30' : 'text-cobalt-600/20'}`}>{phase.number}</div>
                    <div className={`font-mono font-semibold ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>{phase.name}</div>
                    <div className={`text-xs font-mono mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{phase.duration}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-light mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{phase.title}</h3>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{phase.desc}</p>
                    <div className={`inline-flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {phase.outcome}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MethodologyPage;
