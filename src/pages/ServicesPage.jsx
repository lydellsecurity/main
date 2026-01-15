import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const ServiceDetailCard = ({
  id,
  icon,
  category,
  title,
  tagline,
  description,
  capabilities,
  outcome,
  stats,
  benefits,
  theme
}) => {
  return (
    <div
      id={id}
      className={`
        scroll-mt-24 relative overflow-hidden border rounded-lg
        ${theme === 'dark'
          ? 'bg-gradient-to-b from-slate-900/80 to-slate-950/80 border-slate-800'
          : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'
        }
      `}
    >
      <div className={`
        absolute top-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent ${theme === 'dark' ? 'via-slate-700' : 'via-slate-300'} to-transparent
      `} />

      <div className="p-6 md:p-10">
        {/* Header */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
          {icon}
          <span className={`font-mono text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {category}
          </span>
        </div>

        <h2 className={`text-3xl md:text-4xl font-light mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h2>

        <p className={`text-xl mb-6 font-medium ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
          {tagline}
        </p>

        <p className={`text-lg mb-8 leading-relaxed max-w-4xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {description}
        </p>

        {/* Stats */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 mb-8 border-y ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          {stats.map((stat, idx) => (
            <div key={idx} className="flex sm:block justify-between items-center sm:text-center">
              <div className={`font-mono text-2xl md:text-3xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {stat.value}
              </div>
              <div className={`text-xs uppercase tracking-wider mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column: Capabilities + Benefits */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Capabilities */}
          <div>
            <h3 className={`font-mono text-xs uppercase tracking-wider mb-6 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
              Neutralization Protocol
            </h3>
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

          {/* Benefits */}
          <div>
            <h3 className={`font-mono text-xs uppercase tracking-wider mb-6 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
              Why This Matters
            </h3>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outcome */}
        <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-cobalt-950/30 border-cobalt-500/20' : 'bg-cobalt-50 border-cobalt-200'}`}>
          <h4 className={`font-mono text-xs uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
            Sovereignty Restored
          </h4>
          <p className={`leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{outcome}</p>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const { theme } = useTheme();
  const location = useLocation();

  // Scroll to hash on load
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const services = [
    {
      id: 'ai-ransomware',
      category: 'Ransomware Neutralization',
      title: 'AI Ransomware Response',
      tagline: 'They deploy AI. We deploy faster AI.',
      description: 'Modern ransomware syndicates have evolved beyond simple encryption malware. They weaponize machine learning for polymorphic code generation, behavioral evasion, and adaptive payload delivery. Traditional signature-based defenses are obsolete against AI-generated variants that mutate every execution. Our agentic countermeasures hunt, identify, and terminate ransomware operations before encryption completes—fighting AI with superior AI.',
      icon: <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
      stats: [
        { value: '< 4min', label: 'Threat Detection' },
        { value: '93%', label: 'Pre-Encryption Kill Rate' },
        { value: '$0', label: 'Ransom Paid' }
      ],
      capabilities: [
        { title: 'Behavioral AI Interception', description: 'Machine learning models detect ransomware staging activities—credential harvesting, shadow copy deletion, lateral movement—and terminate operations before payload deployment begins.' },
        { title: 'Autonomous Isolation Protocol', description: 'Machine-speed network segmentation isolates infected endpoints within seconds. Business connectivity maintained through surgical quarantine rules.' },
        { title: 'Decryptor Arsenal Deployment', description: 'Proprietary database of 2,400+ ransomware variant decryptors maintained and updated. Restore encrypted data without engaging threat actors.' },
        { title: 'Threat Actor Neutralization', description: 'Hunt and sever C2 infrastructure connections. Eliminate the adversary\'s foothold entirely, preventing re-encryption attempts and data exfiltration.' },
        { title: 'Negotiation & Recovery', description: 'When payment is unavoidable, our experienced negotiators minimize costs and ensure decryptor reliability. Post-incident hardening prevents recurrence.' }
      ],
      benefits: [
        'Detect and neutralize ransomware before encryption begins',
        'Restore operations within hours, not weeks',
        'Preserve forensic evidence for legal proceedings',
        'Zero ransom paid in 93% of engagements',
        'Insurance claim support and documentation',
        'Hardened defenses prevent repeat attacks'
      ],
      outcome: 'Your data remains yours. Encryption prevented or reversed. Operations resume within hours, not weeks. No headline. No ransom. Complete sovereignty restored.'
    },
    {
      id: 'identity-breach',
      category: 'Identity-First Response',
      title: 'Identity Breach Containment',
      tagline: 'The breach started with a credential. We end it there.',
      description: 'Modern adversaries don\'t breach firewalls—they log in. Business email compromise, credential stuffing, MFA fatigue attacks, and session token theft have made identity infrastructure the primary attack surface. When your SSO is compromised, the attacker has keys to everything. Our Identity-First protocol treats every authentication anomaly as an existential threat, terminating unauthorized access federation-wide within minutes.',
      icon: <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
      stats: [
        { value: '< 2min', label: 'Session Termination' },
        { value: '100%', label: 'Lateral Movement Block' },
        { value: '0', label: 'Privilege Escalations' }
      ],
      capabilities: [
        { title: 'Federation-Wide Session Termination', description: 'Simultaneous session invalidation across Okta, Azure AD, Ping Identity, and all federated applications. One command triggers complete adversary lockout.' },
        { title: 'Surgical MFA Reset', description: 'Compromised authentication factors revoked immediately while legitimate users maintain access through verified backup paths. Zero business disruption.' },
        { title: 'Service Account Revocation', description: 'Map service account dependencies across your entire infrastructure. Execute privilege revocation without breaking production systems.' },
        { title: 'Conditional Access Hardening', description: 'Real-time policy injection: impossible travel detection, device compliance enforcement, risk-based step-up authentication deployed within minutes.' },
        { title: 'Token Theft Forensics', description: 'Complete reconstruction of the credential theft chain. Timeline analysis, attack vector identification, and court-ready evidence collection.' }
      ],
      benefits: [
        'Terminate all attacker sessions within 2 minutes',
        'Prevent lateral movement through your environment',
        'Maintain business continuity for legitimate users',
        'Complete audit trail for compliance reporting',
        'Hardened identity posture post-incident',
        'Protection against MFA bypass techniques'
      ],
      outcome: 'Attacker access terminated. Lateral movement severed. Identity infrastructure hardened against future attacks. Your employees log in. Adversaries don\'t.'
    },
    {
      id: 'digital-sovereignty',
      category: 'Full Spectrum Response',
      title: 'Digital Sovereignty Restoration',
      tagline: 'Your network. Your rules. Enforced.',
      description: 'When sophisticated adversaries establish persistent access—living off the land with legitimate tools, hiding in plain sight—half-measures fail. Nation-state APTs and advanced ransomware groups don\'t just breach and run; they establish multiple redundant footholds, exfiltrate data over months, and prepare for maximum impact. We assume breach, hunt aggressively, and eradicate every trace of adversary presence from your environment.',
      icon: <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      stats: [
        { value: '72hr', label: 'Complete Eradication' },
        { value: '100%', label: 'Persistence Removal' },
        { value: 'Zero', label: 'Re-compromise Rate' }
      ],
      capabilities: [
        { title: 'Assume-Breach Threat Hunt', description: 'Every endpoint, log source, cloud workload, and network flow scrutinized for indicators of compromise. Nothing assumed clean until verified.' },
        { title: 'Living-off-the-Land Detection', description: 'Adversaries using PowerShell, WMI, PsExec, and other legitimate tools identified through behavioral analysis and anomaly detection.' },
        { title: 'Persistence Eradication', description: 'Systematic elimination of all persistence mechanisms: scheduled tasks, registry keys, WMI subscriptions, bootkits, firmware implants.' },
        { title: 'C2 Infrastructure Mapping', description: 'Map entire adversary command-and-control infrastructure. Coordinate with law enforcement for takedowns when appropriate.' },
        { title: 'Hardened Rebuild', description: 'Orchestrate secure environment rebuilds with hardened baselines, zero-trust architecture, and detection capabilities against future intrusion.' }
      ],
      benefits: [
        'Complete adversary eradication in 72 hours',
        'Identify all persistence mechanisms and backdoors',
        'Detailed threat intelligence on your specific attacker',
        'Rebuilt environment with enhanced security posture',
        'Board-ready reporting and risk documentation',
        'Zero re-compromise guarantee'
      ],
      outcome: 'Complete adversary eradication. Every backdoor discovered and eliminated. Every persistence mechanism removed. Your environment is yours again—hardened against the next attack.'
    },
    {
      id: 'ir-retainer',
      category: 'Proactive Partnership',
      title: 'IR Retainer Programs',
      tagline: 'Elite response on standby. Before you need it.',
      description: 'The worst time to find an incident response partner is during an incident. Our retainer programs provide guaranteed response times, pre-staged access, and deep familiarity with your environment—so when the inevitable breach occurs, we\'re not starting from zero. Retainer clients receive priority queuing, reduced rates, and proactive threat hunting to catch adversaries before they achieve their objectives.',
      icon: <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      stats: [
        { value: '15min', label: 'Guaranteed Response' },
        { value: '40%', label: 'Reduced Hourly Rate' },
        { value: '24/7', label: 'Commander Access' }
      ],
      capabilities: [
        { title: 'Environment Pre-Staging', description: 'Jump kits deployed, credentials provisioned, network diagrams documented. When an incident occurs, we\'re operational in minutes, not hours.' },
        { title: 'Quarterly Threat Hunts', description: 'Proactive sweeps of your environment using current threat intelligence. Catch adversaries during reconnaissance, not after data exfiltration.' },
        { title: 'Tabletop Exercises', description: 'Annual incident simulation with your team. Test runbooks, identify gaps, and build muscle memory before real incidents occur.' },
        { title: 'Priority Queue Access', description: 'Retainer clients jump the queue during mass-casualty events. When the next Log4j hits, you\'re first in line.' },
        { title: 'Insurance Coordination', description: 'Pre-approved vendor status with major cyber insurers. Streamlined claims process and documentation.' }
      ],
      benefits: [
        'Guaranteed 15-minute response time, 24/7/365',
        '40% reduced hourly rates during incidents',
        'Pre-staged access eliminates onboarding delays',
        'Quarterly threat hunts catch breaches early',
        'Annual tabletop exercises build team readiness',
        'Insurance pre-approval streamlines claims'
      ],
      outcome: 'When breach occurs—and it will—you have elite responders who already know your environment, have access provisioned, and can contain threats in minutes. Peace of mind, guaranteed.'
    }
  ];

  const quickNav = [
    { id: 'ai-ransomware', label: 'Ransomware', icon: '01' },
    { id: 'identity-breach', label: 'Identity Breach', icon: '02' },
    { id: 'digital-sovereignty', label: 'Sovereignty', icon: '03' },
    { id: 'ir-retainer', label: 'IR Retainer', icon: '04' }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-50'}`}>
      <Helmet>
        <title>Services | Lydell Security - Elite Incident Response</title>
        <meta name="description" content="AI Ransomware Response, Identity Breach Containment, Digital Sovereignty Restoration, and IR Retainer Programs. Zero-Dwell Response methodology with 15-minute guaranteed response times." />
        <meta name="keywords" content="ransomware response, identity breach, incident response retainer, digital sovereignty, cyber incident response, breach containment" />
        <link rel="canonical" href="https://lydellsecurity.com/services" />

        <meta property="og:title" content="Services | Lydell Security" />
        <meta property="og:description" content="Elite incident response services: AI Ransomware, Identity Breach, Digital Sovereignty, IR Retainers." />
        <meta property="og:url" content="https://lydellsecurity.com/services" />

        <meta name="twitter:title" content="Services | Lydell Security" />
        <meta name="twitter:description" content="Elite incident response services with 15-minute guaranteed response." />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "provider": {
              "@type": "Organization",
              "name": "Lydell Security"
            },
            "serviceType": "Incident Response",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Incident Response Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI Ransomware Response",
                    "description": "AI-driven detection and neutralization of ransomware attacks before encryption completes."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Identity Breach Containment",
                    "description": "Rapid containment and remediation of identity infrastructure compromises including SSO, MFA, and credential theft."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Sovereignty Restoration",
                    "description": "Complete adversary eradication and environment restoration for persistent access campaigns."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "IR Retainer Programs",
                    "description": "Proactive partnership with guaranteed response times, pre-staged access, and quarterly threat hunts."
                  }
                }
              ]
            }
          }
        `}</script>
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-px w-12 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
              <span className={`font-mono text-xs tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                Specialized Response Services
              </span>
            </div>

            <h1 className={`text-4xl md:text-6xl font-light mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Threats Evolve. <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>We Evolve Faster.</span>
            </h1>

            <p className={`text-xl leading-relaxed mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              2026's threat landscape demands 2026 countermeasures. AI-driven ransomware, identity infrastructure compromise,
              and persistent access campaigns require specialized response protocols—not generic playbooks written for last decade's threats.
            </p>

            {/* Quick Navigation */}
            <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className={`font-mono text-xs uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                Jump to Service
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickNav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center gap-3 p-3 rounded border transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800/50 border-slate-700 hover:border-cobalt-500 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 hover:border-cobalt-500 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`font-mono text-xs ${theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}`}>{item.icon}</span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-obsidian' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {services.map((service) => (
              <ServiceDetailCard
                key={service.id}
                {...service}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 border-t ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-light mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Not sure which protocol applies?
          </h2>
          <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Every engagement begins with a secure conversation. Our commanders assess your situation and recommend the optimal response protocol.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-mono text-sm tracking-wider transition-all ${
                theme === 'dark'
                  ? 'bg-cobalt-500 hover:bg-cobalt-400 text-white'
                  : 'bg-cobalt-600 hover:bg-cobalt-500 text-white'
              }`}
            >
              DISCUSS YOUR SITUATION
            </Link>
            <Link
              to="/methodology"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-mono text-sm tracking-wider transition-all ${
                theme === 'dark'
                  ? 'bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-600 hover:border-cobalt-500'
                  : 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 hover:border-cobalt-500'
              }`}
            >
              VIEW METHODOLOGY
            </Link>
          </div>

          {/* Emergency CTA */}
          <div className={`mt-12 p-6 rounded-lg border ${theme === 'dark' ? 'bg-red-950/20 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className={`font-mono text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>ACTIVE INCIDENT?</span>
            </div>
            <p className={`mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              15-minute response guarantee. Senior commander on the line within minutes.
            </p>
            <div className={`font-mono text-2xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              +1 (888) IR-RAPID
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
