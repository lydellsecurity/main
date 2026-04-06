import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const DIBLandingPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <Helmet>
        <title>Supply Chain Compromise & APT Response for Defense Industrial Base | Lydell Security</title>
        <meta
          name="description"
          content="CMMC 2.0 & FedRAMP Ready incident response for Defense Industrial Base organizations. Living-off-the-land detection, assume-breach threat hunting, and Digital Sovereignty Restoration. 15-minute response guarantee. C2C/1099 subcontracting available for DoD Prime Contractors."
        />
        <meta
          name="keywords"
          content="DIB incident response, CMMC 2.0 compliance, FedRAMP Ready, supply chain compromise, APT response, defense industrial base cybersecurity, living off the land detection, assume breach threat hunting, DoD prime contractor subcontracting, C2C cybersecurity, 1099 incident response, digital sovereignty restoration, persistent access removal, critical infrastructure security"
        />
        <link rel="canonical" href="https://lydellsecurity.com/dib-supply-chain-response" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Supply Chain Compromise & APT Response for Defense Industrial Base | Lydell Security" />
        <meta property="og:description" content="CMMC 2.0 & FedRAMP Ready. Digital Sovereignty Restoration for DIB organizations under persistent access threat. 15-minute response guarantee." />
        <meta property="og:url" content="https://lydellsecurity.com/dib-supply-chain-response" />
        <meta property="og:site_name" content="Lydell Security" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="APT & Supply Chain Response for Defense Industrial Base | Lydell Security" />
        <meta name="twitter:description" content="CMMC 2.0 & FedRAMP Ready incident response. Living-off-the-land detection at machine speed." />

        {/* Schema.org structured data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Digital Sovereignty Restoration for Defense Industrial Base",
            "provider": {
              "@type": "Organization",
              "name": "Lydell Security",
              "url": "https://lydellsecurity.com"
            },
            "description": "Specialized incident response for Defense Industrial Base organizations facing supply chain compromise and advanced persistent threats. CMMC 2.0 and FedRAMP Ready certified.",
            "serviceType": ["Incident Response", "Threat Hunting", "Digital Forensics", "Supply Chain Security"],
            "areaServed": "United States",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "DIB Incident Response Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Sovereignty Restoration",
                    "description": "Living-off-the-land detection, assume-breach hunt operations, and persistent access eradication for CMMC 2.0 environments"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "C2C/1099 Subcontracting for DoD Primes",
                    "description": "Retained sub-contracting incident response capabilities for DoD Prime Contractors and Federal Systems Integrators"
                  }
                }
              ]
            }
          }
        `}</script>

        {/* FAQ Schema for AEO */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Digital Sovereignty Restoration for Defense Industrial Base?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Digital Sovereignty Restoration is Lydell Security's methodology for evicting advanced persistent threats from DIB environments. It combines living-off-the-land detection, assume-breach hunt operations, and federation-wide credential resets to eliminate persistent access—restoring full operational control to the defending organization within hours, not months."
                }
              },
              {
                "@type": "Question",
                "name": "How does Lydell Security support CMMC 2.0 compliance during incident response?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lydell Security holds CMMC 2.0 and FedRAMP Ready certifications. During incident response engagements, all forensic procedures, evidence handling, and remediation actions are executed within CMMC 2.0 control boundaries. Our chain-of-custody documentation satisfies DFARS 252.204-7012 reporting requirements and supports DIBCAC assessment readiness."
                }
              },
              {
                "@type": "Question",
                "name": "Can DoD Prime Contractors subcontract Lydell Security for incident response?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Lydell Security operates as a C2C/1099 sub-contractor for DoD Prime Contractors and Federal Systems Integrators. Our CMMC 2.0 and FedRAMP Ready certifications, combined with Federal Reserve and NYSE-grade operational pedigree, allow primes to fulfill specialized cybersecurity sub-contracting requirements without building these capabilities in-house."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      <Navigation />

      <main className={`min-h-screen ${isDark ? 'bg-obsidian text-white' : 'bg-white text-slate-900'}`}>

        {/* ════════════════════════════════════════════════════════════════════
            H1 — HERO SECTION
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(${isDark ? 'rgba(0,102,255,0.15)' : 'rgba(0,102,255,0.08)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(0,102,255,0.15)' : 'rgba(0,102,255,0.08)'} 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Classification tag */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
              <div className="relative">
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-500' : 'bg-red-600'}`} />
                <div className={`absolute inset-0 w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-red-500' : 'bg-red-600'}`} />
              </div>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                DIB Critical Infrastructure — Elevated Threat Level
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              High-Impact{' '}
              <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-600'}>
                Supply Chain Compromise &amp; APT Response
              </span>{' '}
              for the Defense Industrial Base.
            </h1>

            <p className={`text-xl md:text-2xl font-light leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              They are already inside your supply chain. Living off your land. Using your own tools against you.
              We find them, cut their access, and restore your digital sovereignty—before CUI is exfiltrated
              and before your CMMC 2.0 assessment becomes an autopsy.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                INITIATE ENGAGEMENT →
              </Link>
              <a
                href="#subcontracting"
                className={`inline-flex items-center gap-2 px-6 py-3 border font-mono text-sm tracking-wider rounded transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:border-cobalt-500 hover:text-cobalt-400' : 'border-slate-300 text-slate-700 hover:border-cobalt-600 hover:text-cobalt-600'}`}
              >
                DOD PRIME CONTRACTORS →
              </a>
            </div>

            {/* Key stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              {[
                { value: '15 min', label: 'Response Guarantee' },
                { value: 'CMMC 2.0', label: 'Certified Ready' },
                { value: 'FedRAMP', label: 'Ready Authorization' },
                { value: '< 4 hr', label: 'Avg Sovereignty Restored' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className={`font-mono text-2xl md:text-3xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            H2 — THE THREAT LANDSCAPE
        ════════════════════════════════════════════════════════════════════ */}
        <section className={`py-20 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                01 — Threat Landscape
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-8 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why the Defense Industrial Base Is Under Persistent, State-Sponsored Siege
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className={`text-lg leading-relaxed space-y-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>
                  The Defense Industrial Base is not a "high-value target." It is <em>the</em> target. Nation-state
                  adversaries—PRC-affiliated APT groups, Russian GRU-linked operators, DPRK cyber units—have shifted
                  strategy from direct DoD penetration to compromising the 300,000+ companies that comprise the DIB
                  supply chain. They are not smashing through perimeters. They are logging in with legitimate credentials,
                  moving laterally using native operating system tools, and exfiltrating Controlled Unclassified Information
                  (CUI) through encrypted channels that blend with normal traffic.
                </p>
                <p>
                  This is living-off-the-land at industrial scale. PowerShell. WMI. PsExec. RDP. Tools your administrators
                  use daily are the same tools the adversary is using to maintain persistent access across your tier-2 and
                  tier-3 suppliers. Traditional signature-based detection does not see it. Your SIEM is generating noise, not signal.
                </p>
              </div>

              <div className="space-y-6">
                {/* Threat cards */}
                {[
                  {
                    title: 'Supply Chain Compromise',
                    desc: 'Adversaries compromise a single vendor in your supply chain, then pivot laterally into your CUI-handling environments. One vendor\u2019s VPN credential becomes your incident.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'Persistent Access via LOLBins',
                    desc: 'Living-off-the-land binaries (LOLBins) allow adversaries to operate without deploying malware. No signatures to detect. No IOCs to match. Just native Windows tooling executing adversary objectives.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'CUI Exfiltration & CMMC Failure',
                    desc: 'If CUI is exfiltrated before your CMMC 2.0 Level 2 assessment, the compromise becomes a DFARS 252.204-7012 reporting event and a potential contract termination trigger. The operational cost is existential.',
                    severity: 'HIGH',
                  },
                ].map((threat, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-lg border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`font-mono text-xs px-2 py-0.5 rounded ${threat.severity === 'CRITICAL' ? (isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-700') : (isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-700')}`}>
                        {threat.severity}
                      </span>
                      <h3 className={`font-mono text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {threat.title}
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {threat.desc}
                    </p>
                  </div>
                ))}

                {/* CMMC cost callout */}
                <div className={`p-6 rounded-lg border-l-4 ${isDark ? 'bg-slate-900/50 border-l-amber-500' : 'bg-amber-50 border-l-amber-500'}`}>
                  <p className={`font-mono text-xs uppercase tracking-wider mb-2 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    Operational Cost of CMMC 2.0 Failure
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Loss of DoD contract eligibility. DFARS non-compliance penalties. Downstream supply chain liability.
                    Reputational damage that eliminates prime contractor partnerships. The cost of a missed APT in a DIB
                    environment is not a line item—it is the end of the business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            H2 — THE COUNTERMEASURE: DIGITAL SOVEREIGNTY RESTORATION
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                02 — The Countermeasure
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-4 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Digital Sovereignty Restoration: Neutralizing Persistent Access at Machine Speed
            </h2>

            <p className={`text-xl font-light mb-12 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Our 15-Minute Response Guarantee means a senior incident commander—not a call center, not a
              junior analyst—establishes contact within 15 minutes of activation. Initial containment actions
              begin on that same call.
            </p>

            {/* Response timeline */}
            <div className={`grid md:grid-cols-4 gap-6 mb-16`}>
              {[
                {
                  time: '0 – 15 min',
                  phase: 'Activation',
                  detail: 'Senior incident commander on comms. Threat briefing initiated. Forensic telemetry collection begins.',
                },
                {
                  time: '15 – 60 min',
                  phase: 'Containment',
                  detail: 'Living-off-the-land activity isolated. Compromised credentials revoked. Lateral movement corridors severed.',
                },
                {
                  time: '1 – 4 hrs',
                  phase: 'Eradication',
                  detail: 'Full assume-breach hunt across CUI-handling systems. Persistence mechanisms identified and removed. Backdoor implants neutralized.',
                },
                {
                  time: '4 – 24 hrs',
                  phase: 'Sovereignty Restored',
                  detail: 'Complete attack narrative delivered. DFARS 252.204-7012 reporting package prepared. CMMC 2.0 control remediation initiated.',
                },
              ].map((phase, idx) => (
                <div
                  key={idx}
                  className={`relative p-6 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                >
                  <div className={`font-mono text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                    {phase.time}
                  </div>
                  <h3 className={`font-mono text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {phase.phase}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {phase.detail}
                  </p>
                  {idx < 3 && (
                    <div className={`hidden md:block absolute top-1/2 -right-3 w-6 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Core capabilities */}
            <h3 className={`font-mono text-xs uppercase tracking-wider mb-8 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              Digital Sovereignty Restoration — Core Protocol
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Living-off-the-Land Detection',
                  desc: 'Behavioral analysis engine purpose-built for LOLBin abuse. Detects anomalous PowerShell, WMI, PsExec, and DCOM execution patterns that signature-based tools miss entirely. We find the adversary using your own tools against you.',
                },
                {
                  title: 'Assume-Breach Hunt Operations',
                  desc: 'We do not wait for alerts. Our operators deploy into your environment under the assumption that the adversary is already present. Proactive sweep of CUI data stores, domain controllers, federation servers, and supply chain interconnect points.',
                },
                {
                  title: 'Supply Chain Interconnect Severing',
                  desc: 'Surgical isolation of compromised vendor VPN tunnels, API integrations, and shared service accounts without disrupting legitimate operational dependencies. The adversary\u2019s pivot path is eliminated.',
                },
                {
                  title: 'Persistence Mechanism Eradication',
                  desc: 'Systematic identification and removal of scheduled tasks, WMI event subscriptions, registry run keys, DLL side-loading, and firmware-level implants. Every foothold is mapped and destroyed.',
                },
                {
                  title: 'CUI Exfiltration Scoping',
                  desc: 'Forensic determination of whether Controlled Unclassified Information was accessed or exfiltrated. Full data-flow reconstruction with sub-second timeline precision. This is the evidence your legal team and DIBCAC assessors require.',
                },
                {
                  title: 'CMMC 2.0 Remediation Support',
                  desc: 'Post-incident control remediation mapped directly to NIST SP 800-171 Rev 2 and CMMC 2.0 Level 2 requirements. We do not just clean up the breach—we ensure your environment is assessment-ready when we leave.',
                },
              ].map((cap, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-lg border ${isDark ? 'bg-slate-900/40 border-slate-800 hover:border-cobalt-500/30' : 'bg-white border-slate-200 hover:border-cobalt-500/50'} transition-colors`}
                >
                  <h4 className={`font-mono text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {cap.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            H2 — PARTNERING WITH LYDELL: SUBCONTRACTING ADVANTAGE
        ════════════════════════════════════════════════════════════════════ */}
        <section id="subcontracting" className={`py-20 scroll-mt-24 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-cobalt-500/10 border border-cobalt-500/20' : 'bg-cobalt-50 border border-cobalt-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
                03 — For DoD Prime Contractors &amp; Federal Integrators
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your Secret Weapon for Specialized Cyber Sub-Contracting
            </h2>

            <p className={`text-xl font-light mb-12 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              You won the prime contract. You deliver systems engineering, program management, and IT modernization
              at scale. But when a tier-2 supplier reports anomalous network activity at 0200, and CUI is potentially
              exposed, your team needs specialized capability you cannot build and maintain in-house. That is where
              Lydell Security operates.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Value propositions */}
              <div className="space-y-8">
                <h3 className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Why Primes Retain Lydell Security on C2C/1099
                </h3>

                {[
                  {
                    title: 'Pre-Certified Compliance Posture',
                    desc: 'We hold CMMC 2.0 and FedRAMP Ready authorizations. When you sub-contract Lydell Security, your compliance inheritance chain is unbroken. No gaps for DIBCAC assessors to find. No remediation delays.',
                  },
                  {
                    title: 'Capability You Cannot Staff',
                    desc: 'Recruiting, training, and retaining a team capable of detecting living-off-the-land campaigns and executing assume-breach hunt operations costs millions annually and takes years to build. We deploy that capability to your engagement in 15 minutes.',
                  },
                  {
                    title: 'Federal Reserve & NYSE Operational Pedigree',
                    desc: 'Your government customer requires confidence that incident response sub-contractors can operate at the highest classification and criticality levels. Our 20+ year track record defending the Federal Reserve System and NYSE infrastructure is that confidence.',
                  },
                  {
                    title: 'Seamless Integration with Prime Workflows',
                    desc: 'We operate within your existing program management structure, reporting frameworks, and ITAR/EAR compliance boundaries. Our engagement model is designed for primes—we augment your team, not compete with it.',
                  },
                ].map((prop, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center font-mono text-sm ${isDark ? 'bg-cobalt-500/10 text-cobalt-400' : 'bg-cobalt-50 text-cobalt-600'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className={`font-mono text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {prop.title}
                      </h4>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {prop.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Engagement model */}
              <div>
                <h3 className={`font-mono text-xs uppercase tracking-wider mb-6 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  C2C/1099 Engagement Models
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      model: 'Retained IR Standby',
                      desc: 'Annual retainer with guaranteed 15-minute response. Pre-negotiated rates. Pre-staged forensic tooling and access credentials. When the call comes, there is zero ramp-up time.',
                      tag: 'RECOMMENDED',
                    },
                    {
                      model: 'On-Demand Engagement',
                      desc: 'Emergency incident response activated per-event. Full Digital Sovereignty Restoration protocol deployed on demand. Ideal for primes managing multiple sub-contracts with variable risk exposure.',
                      tag: 'FLEXIBLE',
                    },
                    {
                      model: 'Proactive Hunt Operations',
                      desc: 'Scheduled assume-breach threat hunting across your DIB sub-contractor network. Quarterly or bi-annual sweeps. Identifies persistent access before it becomes an incident.',
                      tag: 'PROACTIVE',
                    },
                  ].map((model, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-lg border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`font-mono text-xs px-2 py-0.5 rounded ${isDark ? 'bg-cobalt-500/10 text-cobalt-400' : 'bg-cobalt-50 text-cobalt-700'}`}>
                          {model.tag}
                        </span>
                        <h4 className={`font-mono text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {model.model}
                        </h4>
                      </div>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {model.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Certifications badge strip */}
                <div className={`mt-8 p-6 rounded-lg ${isDark ? 'bg-slate-900/60 border border-slate-800' : 'bg-white border border-slate-200'}`}>
                  <p className={`font-mono text-xs uppercase tracking-wider mb-4 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                    Active Certifications & Authorizations
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['CMMC 2.0', 'FedRAMP Ready', 'SOC 2 Type II', 'HIPAA', 'PCI-DSS 4.0'].map((cert) => (
                      <span
                        key={cert}
                        className={`font-mono text-xs px-3 py-1.5 rounded border ${isDark ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'}`}
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                H3 — OUR PEDIGREE
            ════════════════════════════════════════════════════════════════ */}
            <div className={`p-8 md:p-12 rounded-lg border ${isDark ? 'bg-gradient-to-b from-slate-900/80 to-slate-950/80 border-slate-800' : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'}`}>
              <h3 className={`text-2xl md:text-3xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Operational Pedigree: Tested at the Highest Levels
              </h3>

              <p className={`text-lg leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Lydell Security's capabilities are not theoretical. They were forged defending infrastructure
                where a missed alert has national security implications.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[
                  {
                    name: 'Federal Reserve System',
                    detail: 'Incident response readiness for 12 Federal Reserve Banks. When the backbone of American monetary policy required protection, we were the team on rotation.',
                    metric: '12 Reserve Banks',
                  },
                  {
                    name: 'New York Stock Exchange',
                    detail: 'Maintained security operations for infrastructure processing 6 billion shares daily. Millisecond-sensitive environments where downtime is measured in millions per second.',
                    metric: '6B+ Daily Shares',
                  },
                  {
                    name: 'Cisco Security Operations',
                    detail: 'Built the incident response playbooks inside one of the largest security vendors on the planet. The methodologies others follow—we wrote them.',
                    metric: '20+ Years',
                  },
                ].map((cred, idx) => (
                  <div key={idx}>
                    <div className={`font-mono text-2xl font-semibold mb-2 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                      {cred.metric}
                    </div>
                    <h4 className={`font-mono text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {cred.name}
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {cred.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className={`border-t pt-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <blockquote className={`text-lg italic ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  "We don't list these names for marketing. We list them because when your government customer
                  asks who is handling the incident, these names end the conversation."
                </blockquote>
                <p className={`font-mono text-sm mt-3 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  — Larry Barksdale, Founder &amp; Principal Incident Commander
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            CTA — CONTACT
        ════════════════════════════════════════════════════════════════════ */}
        <section className={`py-20 ${isDark ? 'bg-obsidian' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  Available for Retained Engagement
                </span>
              </div>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Discuss a Retained Sub-Contracting Relationship
            </h2>

            <p className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Contact Larry Barksdale directly to discuss retained IR standby agreements, on-demand engagement
              terms, or emergency response activation for your DIB program. No sales team. No qualification
              calls. Direct access to the principal who will command your engagement.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                CONTACT LARRY BARKSDALE →
              </Link>
              <a
                href="tel:+1XXXXXXXXXX"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 border font-mono text-sm tracking-wider rounded transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-400' : 'border-slate-300 text-slate-700 hover:border-red-600 hover:text-red-600'}`}
              >
                ACTIVE INCIDENT? INITIATE SECURE LINE
              </a>
            </div>

            <p className={`font-mono text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
              Encrypted channels available: Signal &bull; Wire &bull; Secure Voice &bull; SIPR-compatible coordination
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DIBLandingPage;
