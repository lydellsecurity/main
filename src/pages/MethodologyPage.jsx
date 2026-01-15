import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

/**
 * MethodologyPage - Zero-Dwell Response Framework
 * Paper & Steel edition with border-stroke logic
 */
const MethodologyPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const phases = [
    { 
      number: '01', 
      name: 'INTERCEPT', 
      duration: '0-15 min', 
      title: 'Threat Interception',
      desc: 'No assessment paralysis. We intercept active threats while others schedule meetings.',
      actions: ['Threat triage & classification', 'Evidence preservation initiated', 'Command channel established'],
      outcome: 'Response in motion'
    },
    { 
      number: '02', 
      name: 'CONTAIN', 
      duration: '15-60 min', 
      title: 'Surgical Containment',
      desc: 'Immediate, surgical severing of adversary access while preserving forensic evidence.',
      actions: ['Network segmentation', 'Identity session termination', 'Lateral movement blocked'],
      outcome: 'Adversary halted'
    },
    { 
      number: '03', 
      name: 'HUNT', 
      duration: '1-4 hr', 
      title: 'Aggressive Threat Hunt',
      desc: 'AI-augmented operators sweep every corner for adversary presence and persistence.',
      actions: ['Full environment sweep', 'Persistence mechanism mapping', 'Backdoor identification'],
      outcome: 'Footprint mapped'
    },
    { 
      number: '04', 
      name: 'NEUTRALIZE', 
      duration: '4-24 hr', 
      title: 'Systematic Neutralization',
      desc: 'Every backdoor closed. Every persistence mechanism eliminated. No survivors.',
      actions: ['Malware eradication', 'Persistence removal', 'Access revocation'],
      outcome: 'Environment sanitized'
    },
    { 
      number: '05', 
      name: 'FORTIFY', 
      duration: '24-72 hr', 
      title: 'Defensive Fortification',
      desc: 'Harden against the techniques used and the broader threat landscape.',
      actions: ['Vulnerability remediation', 'Detection rule deployment', 'Architecture hardening'],
      outcome: 'Re-compromise blocked'
    },
    { 
      number: '06', 
      name: 'RESTORE', 
      duration: '72+ hr', 
      title: 'Sovereignty Restoration',
      desc: 'Full operational capability restored—stronger than before the incident.',
      actions: ['System restoration', 'Monitoring validation', 'Lessons learned'],
      outcome: 'Sovereignty restored'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-obsidian' : 'bg-paper'}`}>
      <Navigation />
      
      {/* Hero Section */}
      <section className={`pt-32 pb-16 px-6 ${isDark ? '' : 'bg-paper-cool'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-px w-12 ${isDark ? 'bg-cobalt-500' : 'bg-cobalt-700'}`} />
              <span className={`font-mono text-xs tracking-widest uppercase font-semibold ${
                isDark ? 'text-cobalt-400' : 'text-cobalt-700'
              }`}>
                Methodology
              </span>
            </div>
            <h1 className={`text-4xl md:text-6xl font-light mb-6 ${isDark ? 'text-white' : 'text-ink'}`}>
              Zero-Dwell <span className={isDark ? 'text-slate-400' : 'text-ink-muted'}>Response</span>
            </h1>
            <p className={`text-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
              While others assess for days, adversaries exfiltrate for hours. Our principle: 
              <strong className={isDark ? 'text-white' : 'text-ink'}> act first, assess in parallel</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Cards */}
      <section className={`py-12 px-6 ${isDark ? 'bg-slate-950' : 'bg-paper'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Speed Over Sequence', desc: 'Traditional IR waits for discovery. We contain while discovering.' },
              { title: 'Neutralize, Don\'t Assess', desc: 'Assessment is a luxury. Neutralization is a necessity.' },
              { title: 'Sovereignty Restored', desc: 'Your network, your rules—enforced by our expertise.' },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`
                  p-6 rounded-xl transition-all duration-300
                  ${isDark 
                    ? 'bg-slate-900/50 border border-slate-800 hover:border-slate-700' 
                    : 'glass-card hover:shadow-card-hover'
                  }
                `}
              >
                <div className={`font-mono text-xs mb-3 font-semibold ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
                  PRINCIPLE {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-ink'}`}>
                  {item.title}
                </h3>
                <p className={isDark ? 'text-slate-400' : 'text-ink-body'}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={`divider-gradient mx-6`} />

      {/* Phase Timeline */}
      <section className={`py-16 px-6 ${isDark ? 'bg-obsidian' : 'bg-paper-cool'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-light mb-4 ${isDark ? 'text-white' : 'text-ink'}`}>
              Six-Phase Protocol
            </h2>
            <p className={isDark ? 'text-slate-400' : 'text-ink-muted'}>
              From interception to restoration in under 72 hours
            </p>
          </div>

          <div className="space-y-6">
            {phases.map((phase, idx) => (
              <div 
                key={phase.number}
                className={`
                  relative p-6 md:p-8 rounded-xl transition-all duration-300
                  ${isDark 
                    ? 'bg-slate-900/50 border border-slate-800 hover:border-cobalt-500/30' 
                    : 'bg-white border border-stroke hover:border-cobalt-300 shadow-card hover:shadow-card-hover'
                  }
                `}
              >
                {/* Connection line */}
                {idx < phases.length - 1 && (
                  <div className={`
                    absolute left-12 top-full w-px h-6 z-10
                    ${isDark ? 'bg-slate-700' : 'bg-stroke'}
                  `} />
                )}

                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Phase indicator */}
                  <div className="flex-shrink-0 w-24">
                    <div className={`
                      font-mono text-5xl font-bold leading-none
                      ${isDark ? 'text-cobalt-500/20' : 'text-cobalt-100'}
                    `}>
                      {phase.number}
                    </div>
                    <div className={`
                      font-mono text-sm font-bold mt-2
                      ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}
                    `}>
                      {phase.name}
                    </div>
                    <div className={`
                      text-xs font-mono mt-1
                      ${isDark ? 'text-slate-500' : 'text-ink-muted'}
                    `}>
                      {phase.duration}
                    </div>
                  </div>

                  {/* Phase content */}
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-ink'}`}>
                      {phase.title}
                    </h3>
                    <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
                      {phase.desc}
                    </p>

                    {/* Actions - Terminal style in light mode */}
                    <div className={`
                      p-4 rounded-lg font-mono text-sm
                      ${isDark 
                        ? 'bg-slate-950 border border-slate-800' 
                        : 'terminal-block'
                      }
                    `}>
                      {!isDark && (
                        <div className="flex items-center gap-2 pb-2 mb-2 border-b border-stroke">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-xs text-ink-muted ml-2">phase_{phase.number}_actions.sh</span>
                        </div>
                      )}
                      {phase.actions.map((action, i) => (
                        <div key={i} className="flex items-center gap-2 py-1">
                          <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-700'}>→</span>
                          <span className={isDark ? 'text-slate-300' : 'text-ink'}>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome badge */}
                  <div className={`
                    flex-shrink-0 px-4 py-2 rounded-lg font-mono text-sm
                    ${isDark 
                      ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-tactical-light text-tactical-vivid border border-green-200'
                    }
                  `}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">{phase.outcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={`py-16 px-6 ${isDark ? 'bg-slate-950' : 'bg-paper'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-3xl font-light text-center mb-12 ${isDark ? 'text-white' : 'text-ink'}`}>
            Traditional IR vs. <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-700'}>Zero-Dwell</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className={`
              p-8 rounded-xl
              ${isDark 
                ? 'bg-red-950/20 border border-red-500/20' 
                : 'bg-emergency-light/50 border border-emergency-medium'
              }
            `}>
              <div className={`font-mono text-sm mb-4 ${isDark ? 'text-red-400' : 'text-emergency-deep'}`}>
                TRADITIONAL APPROACH
              </div>
              <div className={`text-4xl font-mono font-bold mb-4 ${isDark ? 'text-red-400' : 'text-emergency-vivid'}`}>
                21+ days
              </div>
              <ul className="space-y-3">
                {[
                  'Days spent in "discovery phase"',
                  'Adversary continues operations',
                  'Data exfiltration ongoing',
                  'Scope expands during assessment',
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-2 ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
                    <svg className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-red-500' : 'text-emergency-vivid'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Zero-Dwell */}
            <div className={`
              p-8 rounded-xl
              ${isDark 
                ? 'bg-emerald-950/20 border border-emerald-500/20' 
                : 'bg-tactical-light/50 border border-green-200'
              }
            `}>
              <div className={`font-mono text-sm mb-4 ${isDark ? 'text-emerald-400' : 'text-tactical-vivid'}`}>
                ZERO-DWELL RESPONSE
              </div>
              <div className={`text-4xl font-mono font-bold mb-4 ${isDark ? 'text-emerald-400' : 'text-tactical-vivid'}`}>
                &lt; 72 hours
              </div>
              <ul className="space-y-3">
                {[
                  'Containment within first hour',
                  'Adversary access terminated',
                  'Exfiltration stopped immediately',
                  'Parallel investigation & action',
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-2 ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
                    <svg className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-emerald-500' : 'text-tactical-vivid'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-6 ${isDark ? 'bg-obsidian' : 'bg-paper-cool'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-3xl font-light mb-6 ${isDark ? 'text-white' : 'text-ink'}`}>
            Ready to Modernize Your Response?
          </h2>
          <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-ink-body'}`}>
            Every hour without Zero-Dwell capabilities is an hour of unnecessary risk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className={`
                px-8 py-4 font-mono text-sm tracking-wider rounded-lg transition-all
                ${isDark
                  ? 'bg-cobalt-500 hover:bg-cobalt-400 text-white'
                  : 'bg-gradient-to-r from-cobalt-600 to-cobalt-700 text-white shadow-cobalt-glow hover:shadow-lg'
                }
              `}
            >
              SCHEDULE CONSULTATION
            </Link>
            <Link
              to="/services"
              className={`
                px-8 py-4 font-mono text-sm tracking-wider rounded-lg transition-all
                ${isDark
                  ? 'border border-slate-600 text-slate-300 hover:border-slate-500'
                  : 'border border-stroke-strong text-ink hover:border-ink-muted bg-white shadow-card'
                }
              `}
            >
              VIEW SERVICES
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MethodologyPage;
