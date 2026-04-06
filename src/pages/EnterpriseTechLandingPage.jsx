import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const EnterpriseTechLandingPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <Helmet>
        <title>Active Directory & Cloud Identity Compromise Response for Enterprise Tech | Lydell Security</title>
        <meta
          name="description"
          content="Identity-First Response for Enterprise Tech and Fortune 500 organizations under Active Directory and cloud identity compromise. Sub-2-minute session kill, token theft forensics, and full identity sovereignty restoration. SOC 2 Type II attested. 15-minute response guarantee. Preferred C2C/1099 partner for Enterprise IT Consultancies and VPMs."
        />
        <meta
          name="keywords"
          content="enterprise Active Directory compromise response, cloud identity breach Fortune 500, Azure AD compromise incident response, Entra ID breach response, SOC 2 Type II incident response, enterprise identity compromise, token theft forensics, session hijacking response, golden ticket attack response, DCSync attack remediation, enterprise IT consultancy subcontracting, VPM cybersecurity partner, C2C identity incident response, 1099 enterprise security, Okta enterprise breach, identity-first response, Kerberoasting response, SAML token forgery"
        />
        <link rel="canonical" href="https://lydellsecurity.com/enterprise-identity-compromise-response" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Active Directory & Cloud Identity Compromise Response for Enterprise Tech | Lydell Security" />
        <meta property="og:description" content="Sub-2-minute session kill. Token theft forensics. SOC 2 Type II attested Identity-First Response for Fortune 500 environments. 15-minute response guarantee." />
        <meta property="og:url" content="https://lydellsecurity.com/enterprise-identity-compromise-response" />
        <meta property="og:site_name" content="Lydell Security" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Enterprise AD & Cloud Identity Compromise Response | Lydell Security" />
        <meta name="twitter:description" content="Sub-2-minute session kill. Token theft forensics. NYSE & Federal Reserve pedigree. SOC 2 Type II attested." />

        {/* Schema.org Service structured data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Identity-First Response for Enterprise Tech",
            "provider": {
              "@type": "Organization",
              "name": "Lydell Security",
              "url": "https://lydellsecurity.com"
            },
            "description": "Specialized identity compromise response for Enterprise Tech and Fortune 500 organizations facing Active Directory takeover, cloud identity provider compromise, token theft, and SAML/OAuth exploitation. SOC 2 Type II attested. Sub-2-minute session kill with token theft forensics.",
            "serviceType": ["Identity Breach Response", "Active Directory Incident Response", "Cloud Identity Forensics", "Token Theft Investigation"],
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Enterprise Identity Compromise Response Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Identity-First Response",
                    "description": "Sub-2-minute session kill, token theft forensics, and complete identity sovereignty restoration for enterprise Active Directory and cloud identity environments"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Enterprise IT Consultancy & VPM Sub-Contracting",
                    "description": "Retained C2C/1099 identity incident response capability for Enterprise IT Consultancies and Virtual Program Managers serving Fortune 500 clients"
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
                "name": "What is Identity-First Response for enterprise environments?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Identity-First Response is Lydell Security's methodology for enterprise Active Directory and cloud identity compromise. Instead of traditional host-based forensics, Identity-First Response targets the identity layer directly: executing federation-wide session kills in under 2 minutes, performing token theft forensics to trace stolen OAuth/SAML tokens, revoking compromised Kerberos tickets, and eradicating persistence mechanisms like golden tickets and DCSync-derived credentials. Full identity sovereignty restoration for Fortune 500 environments averages under 90 minutes."
                }
              },
              {
                "@type": "Question",
                "name": "How does Lydell Security handle Active Directory compromise at enterprise scale?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Enterprise Active Directory compromise requires simultaneous action across on-premises domain controllers and cloud identity providers like Azure AD/Entra ID. Lydell Security executes coordinated KRBTGT password resets, revokes all Kerberos ticket-granting tickets, terminates cloud sessions across every federated application, and performs forensic analysis of DCSync, DCShadow, and golden ticket attack artifacts. Our team has executed this protocol for environments with 50,000+ identity objects and multi-forest trust architectures."
                }
              },
              {
                "@type": "Question",
                "name": "Can Enterprise IT Consultancies sub-contract Lydell Security for identity incident response?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Lydell Security operates as a C2C/1099 sub-contractor for Enterprise IT Consultancies and Virtual Program Managers. Our SOC 2 Type II attestation, combined with NYSE and Federal Reserve operational pedigree, allows consultancies to deliver specialized identity incident response to Fortune 500 clients without building these capabilities internally. We integrate into existing program management structures and preserve the consultancy-client relationship."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      <Navigation />

      <main className={`min-h-screen ${isDark ? 'bg-obsidian text-white' : 'bg-white text-slate-900'}`}>

        {/* ════════════════════════════════════════════════════════════════════
            H1 — HERO: THEY OWN YOUR DIRECTORY. WE TAKE IT BACK.
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background grid */}
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
            {/* Threat level tag */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
              <div className="relative">
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-500' : 'bg-red-600'}`} />
                <div className={`absolute inset-0 w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-red-500' : 'bg-red-600'}`} />
              </div>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                Enterprise Identity {'\u2014'} AD &amp; Cloud Provider Compromise at Scale
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              High-Impact{' '}
              <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-600'}>
                Active Directory &amp; Cloud Identity Compromise Response
              </span>{' '}
              for Enterprise Tech &amp; the Fortune 500.
            </h1>

            <p className={`text-xl md:text-2xl font-light leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              The adversary executed DCSync against your domain controller 72 hours ago. They have every
              password hash in your directory. They forged a golden ticket. They minted SAML tokens against
              your cloud IdP. They are your Global Admin now. Your traditional IR firm is still imaging
              workstations. We are already inside your identity plane, killing sessions and revoking
              every forged credential. Session kill in under 2 minutes. Full identity sovereignty
              restored in under 90 minutes.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                ACTIVATE IDENTITY-FIRST RESPONSE {'\u2192'}
              </Link>
              <a
                href="#consultancy-partners"
                className={`inline-flex items-center gap-2 px-6 py-3 border font-mono text-sm tracking-wider rounded transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:border-cobalt-500 hover:text-cobalt-400' : 'border-slate-300 text-slate-700 hover:border-cobalt-600 hover:text-cobalt-600'}`}
              >
                IT CONSULTANCIES &amp; VPMs {'\u2192'}
              </a>
            </div>

            {/* Key stats */}
            <div className={`grid grid-cols-2 md:grid-cols-5 gap-6 py-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              {[
                { value: '< 2 min', label: 'Session Kill Execution' },
                { value: '< 90 min', label: 'Identity Sovereignty Restored' },
                { value: '15 min', label: 'Response Guarantee' },
                { value: 'SOC 2 II', label: 'Attested' },
                { value: '50K+', label: 'Identity Object Scale' },
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
            H2 — THREAT LANDSCAPE: ENTERPRISE AD & CLOUD IDENTITY UNDER SIEGE
        ════════════════════════════════════════════════════════════════════ */}
        <section className={`py-20 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                01 {'\u2014'} Threat Landscape
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-8 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why Active Directory &amp; Cloud Identity Is the Kill Chain Endpoint for Enterprise Adversaries
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className={`text-lg leading-relaxed space-y-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>
                  Every sophisticated enterprise breach ends in the same place: the identity infrastructure.
                  Whether the initial vector is phishing, a zero-day, or a supply chain compromise, the
                  adversary{'\u2019'}s objective is consistent{'\u2014'}escalate to domain admin, compromise Active Directory,
                  and establish identity-layer persistence that survives workstation reimaging, EDR deployment,
                  and network segmentation. Once they control your directory, they control everything
                  authenticated against it. Every application. Every service. Every user.
                </p>
                <p>
                  The hybrid identity architecture that Fortune 500 organizations have adopted{'\u2014'}on-premises
                  Active Directory federated with Azure AD/Entra ID, Okta, or PingFederate{'\u2014'}has expanded
                  this attack surface exponentially. A single compromised on-premises domain controller can
                  yield credentials that unlock every cloud-federated application. Conversely, a compromised
                  cloud identity provider grants access to on-premises resources through federation trust abuse.
                  The adversary moves between environments using your own trust relationships as bridges.
                </p>
                <p>
                  Traditional incident response does not address this. Imaging workstations does not evict
                  an adversary who holds a golden ticket. Re-deploying EDR does not invalidate forged SAML
                  tokens. Network segmentation does not stop an attacker who authenticates as your CEO.
                  Enterprise identity compromise requires Identity-First Response{'\u2014'}a fundamentally different
                  discipline that operates at the identity plane, not the network plane.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: 'DCSync & Golden Ticket Attacks',
                    desc: 'The adversary replicates your entire Active Directory password database using DCSync. They forge Kerberos ticket-granting tickets (golden tickets) that grant unlimited access to every domain-joined resource. These forged tickets persist until the KRBTGT account is reset twice\u2014a procedure most enterprise teams have never executed at scale.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'SAML Token Forgery & OAuth Abuse',
                    desc: 'Stolen SAML signing certificates allow adversaries to mint authentication tokens for any federated cloud application without ever touching the cloud identity provider. OAuth consent grant abuse installs persistent application access that survives password resets and MFA changes. The adversary\u2019s access is invisible to traditional monitoring.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'Hybrid Identity Trust Exploitation',
                    desc: 'Azure AD Connect, PHS, PTA, and federation trust configurations create bidirectional bridges between on-premises AD and cloud identity. The adversary compromises one environment and pivots through the trust to the other. Your hybrid architecture is their lateral movement highway.',
                    severity: 'HIGH',
                  },
                  {
                    title: 'SOC 2 Type II & Board-Level Exposure',
                    desc: 'An Active Directory compromise in a Fortune 500 environment triggers SOC 2 Type II reporting obligations, potential SEC disclosure requirements for material cybersecurity incidents, customer notification cascades, and board-level accountability. The compliance and reputational exposure compounds with every hour the adversary maintains access.',
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

                {/* Enterprise impact callout */}
                <div className={`p-6 rounded-lg border-l-4 ${isDark ? 'bg-slate-900/50 border-l-red-500' : 'bg-red-50 border-l-red-500'}`}>
                  <p className={`font-mono text-xs uppercase tracking-wider mb-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    The Scope Problem
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    A compromised Active Directory in a Fortune 500 environment means 50,000+ identity objects,
                    multi-forest trust architectures, hundreds of federated applications, and thousands of service
                    principals are potentially under adversary control. Traditional IR firms scope this engagement
                    in weeks. We scope it in minutes because we operate at the identity plane where the compromise
                    actually lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            H2 — THE COUNTERMEASURE: IDENTITY-FIRST RESPONSE
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                02 {'\u2014'} The Countermeasure
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-4 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Identity-First Response: Evicting Adversaries From the Enterprise Identity Plane
            </h2>

            <p className={`text-xl font-light mb-6 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              When the adversary controls Active Directory, every host-based remediation action is futile.
              You can reimage every workstation in your environment and they will re-authenticate within
              minutes using forged Kerberos tickets. Identity-First Response targets the root of
              compromise{'\u2014'}the identity infrastructure itself{'\u2014'}and restores sovereignty at that layer first.
            </p>

            <p className={`text-lg mb-12 max-w-3xl ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Our 15-Minute Response Guarantee places a senior identity incident commander on comms
              within 15 minutes. Session kill across the entire enterprise identity fabric executes
              in under 2 minutes. Full identity sovereignty{'\u2014'}KRBTGT reset, forged token revocation,
              federation trust verification, and persistence eradication{'\u2014'}restored in under 90 minutes.
            </p>

            {/* Identity-First Response timeline */}
            <div className={`p-8 rounded-lg border mb-16 ${isDark ? 'bg-gradient-to-r from-slate-900/80 to-slate-950/60 border-slate-800' : 'bg-gradient-to-r from-slate-50 to-white border-slate-200'}`}>
              <h3 className={`font-mono text-xs uppercase tracking-wider mb-8 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                Sub-90-Minute Identity Sovereignty Restoration
              </h3>

              <div className="grid md:grid-cols-5 gap-6">
                {[
                  {
                    time: '0 \u2013 15 min',
                    phase: 'Activation & Reconnaissance',
                    detail: 'Senior identity commander on comms. AD replication metadata analysis initiated. Cloud IdP audit log ingestion. Scope of identity compromise estimated: accounts, forests, federated apps.',
                  },
                  {
                    time: '15 min \u2013 2 min post-auth',
                    phase: 'Enterprise Session Kill',
                    detail: 'Simultaneous session termination across on-prem AD and every federated cloud identity provider. All active Kerberos tickets invalidated. Cloud refresh tokens revoked. The adversary loses access to every resource in the enterprise instantly.',
                  },
                  {
                    time: '17 \u2013 40 min',
                    phase: 'Credential & Token Warfare',
                    detail: 'Coordinated double KRBTGT password reset to invalidate all golden tickets. SAML signing certificate rotation. OAuth app consent audit and malicious grant revocation. Compromised service principal secrets rotated.',
                  },
                  {
                    time: '40 \u2013 75 min',
                    phase: 'Persistence Eradication',
                    detail: 'Full Active Directory forensics: AdminSDHolder modifications, SIDHistory injection, DCShadow artifacts, skeleton key detection, directory service restore mode password audit. Cloud: conditional access bypass rules, hidden admin roles, API permission grants.',
                  },
                  {
                    time: '75 \u2013 90 min',
                    phase: 'Sovereignty Confirmed',
                    detail: 'Complete identity compromise timeline with token theft forensics delivered. SOC 2 Type II incident documentation prepared. Federation trust integrity verified. Hardened conditional access and tiered admin policies deployed.',
                  },
                ].map((phase, idx) => (
                  <div key={idx} className="relative">
                    <div className={`font-mono text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                      {phase.time}
                    </div>
                    <h4 className={`font-mono text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {phase.phase}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {phase.detail}
                    </p>
                    {idx < 4 && (
                      <div className={`hidden md:block absolute top-4 -right-3 w-6 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Core capabilities */}
            <h3 className={`font-mono text-xs uppercase tracking-wider mb-8 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              Identity-First Response {'\u2014'} Core Protocol
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Token Theft Forensics',
                  desc: 'Complete forensic reconstruction of stolen OAuth tokens, forged SAML assertions, hijacked refresh tokens, and Kerberos ticket abuse. We trace every forged credential from creation to usage, identifying exactly which resources the adversary accessed with each stolen token. This is the evidence your legal team and SOC 2 auditors require.',
                },
                {
                  title: 'Coordinated KRBTGT Reset at Scale',
                  desc: 'Double KRBTGT password reset executed across multi-forest Active Directory environments with 50,000+ identity objects. We map every domain controller replication dependency, coordinate reset timing to prevent authentication outages, and validate golden ticket invalidation across every domain in the forest hierarchy.',
                },
                {
                  title: 'SAML & OAuth Certificate Rotation',
                  desc: 'Emergency rotation of SAML signing certificates and OAuth application secrets across the entire federation fabric. Every token minted by the adversary using stolen signing material is invalidated. Federation trusts are re-established with new cryptographic material under controlled conditions.',
                },
                {
                  title: 'Active Directory Forensic Analysis',
                  desc: 'Deep AD forensics targeting the attack techniques that persist beyond standard remediation: AdminSDHolder ACL backdoors, SIDHistory injection for cross-domain persistence, DCShadow rogue domain controller registration, skeleton key deployment on domain controllers, and directory service restore mode password compromise.',
                },
                {
                  title: 'Cloud Identity Persistence Sweep',
                  desc: 'Comprehensive audit of Azure AD/Entra ID, Okta, and Google Workspace for adversary-installed persistence: hidden admin role assignments, malicious API permission consent grants, conditional access policy exclusions, and backdoor application registrations. Every cloud identity persistence mechanism is identified and eliminated.',
                },
                {
                  title: 'SOC 2 Type II Incident Documentation',
                  desc: 'Full forensic evidence package formatted for SOC 2 Type II reporting: identity compromise scope, systems affected, data exposure assessment, remediation timeline, and control restoration verification. Documentation satisfies both your SOC 2 auditor and SEC material incident disclosure assessment requirements.',
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
            H2 — PARTNERING WITH LYDELL: IT CONSULTANCIES & VPMs
        ════════════════════════════════════════════════════════════════════ */}
        <section id="consultancy-partners" className={`py-20 scroll-mt-24 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-cobalt-500/10 border border-cobalt-500/20' : 'bg-cobalt-50 border border-cobalt-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
                03 {'\u2014'} For Enterprise IT Consultancies &amp; Virtual Program Managers
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Fortune 500 Identity Incident Response Without Building a Fortune 500 Security Team
            </h2>

            <p className={`text-xl font-light mb-12 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              You manage the technology program for a Fortune 500 client. You oversee infrastructure
              modernization, cloud migration, and digital transformation. But when their CISO calls
              to report that Active Directory has been compromised and the adversary is minting golden
              tickets, your program needs a specialized response capability that is not on your current
              team{'\u2019'}s bench. Lydell Security is that capability{'\u2014'}deployed as your C2C/1099 extension,
              invisible to your client, lethal to the adversary.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Value props */}
              <div className="space-y-8">
                <h3 className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Why Consultancies &amp; VPMs Retain Lydell on C2C/1099
                </h3>

                {[
                  {
                    title: 'Depth That Generalist Teams Cannot Match',
                    desc: 'Active Directory compromise response at enterprise scale requires expertise in KRBTGT reset coordination, SAML token forgery investigation, DCShadow detection, and multi-forest trust forensics. These are not skills that exist on a general IT consultancy bench. They take years of dedicated identity security practice to develop. We deploy that depth in 15 minutes.',
                  },
                  {
                    title: 'Scale-Tested for Fortune 500 Environments',
                    desc: 'We have executed Identity-First Response in environments with 50,000+ identity objects, multi-forest trust architectures, and hundreds of federated cloud applications. Your Fortune 500 client\u2019s environment is not our edge case. It is our operating norm.',
                  },
                  {
                    title: 'SOC 2 Type II Attested Response Chain',
                    desc: 'When you sub-contract Lydell Security, your client\u2019s SOC 2 compliance posture is protected. Our response procedures, evidence handling, and remediation actions are executed within SOC 2 Type II control boundaries. Your engagement introduces zero compliance liability.',
                  },
                  {
                    title: 'NYSE & Federal Reserve Pedigree Satisfies Board Scrutiny',
                    desc: 'A Fortune 500 board under active identity compromise will demand to know who is handling the response. Our 20+ year track record defending the Federal Reserve System and NYSE infrastructure provides the immediate institutional confidence that satisfies audit committees, general counsel, and the CEO.',
                  },
                  {
                    title: 'Your Client Relationship Is the Priority',
                    desc: 'We operate entirely within your program management structure. Our team reports through your engagement leads, delivers documentation under your brand framework, and coordinates through your communication channels. Your client sees their trusted IT consultancy managing the crisis. The specialized identity response capability behind it is your competitive advantage.',
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

              {/* Engagement models */}
              <div>
                <h3 className={`font-mono text-xs uppercase tracking-wider mb-6 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Consultancy &amp; VPM Engagement Models
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      model: 'Retained Identity IR Standby',
                      desc: 'Annual retainer with guaranteed 15-minute response for identity incidents across your Fortune 500 client portfolio. Pre-staged access credentials and AD/cloud IdP runbooks for each client environment. When the CISO calls, your specialized response team is already activated.',
                      tag: 'RECOMMENDED',
                    },
                    {
                      model: 'On-Demand Identity Response',
                      desc: 'Emergency identity compromise response activated per-event. Full Identity-First Response protocol deployed on demand. Ideal for consultancies managing multiple enterprise clients with unpredictable identity risk exposure across heterogeneous AD and cloud IdP architectures.',
                      tag: 'FLEXIBLE',
                    },
                    {
                      model: 'Proactive Identity Posture Assessment',
                      desc: 'Scheduled identity infrastructure audit for your enterprise clients. Active Directory security assessment, federation trust review, tiered admin architecture evaluation, and cloud identity configuration audit. Identifies the identity attack surface your client doesn\u2019t know they have.',
                      tag: 'PROACTIVE',
                    },
                    {
                      model: 'VPM Program Integration',
                      desc: 'For Virtual Program Managers overseeing security transformation programs. Lydell Security integrates as the identity incident response capability within your broader security program delivery. We operate as a named resource on your program team with defined SLAs and escalation paths.',
                      tag: 'VPM',
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

                {/* Certifications */}
                <div className={`mt-8 p-6 rounded-lg ${isDark ? 'bg-slate-900/60 border border-slate-800' : 'bg-white border border-slate-200'}`}>
                  <p className={`font-mono text-xs uppercase tracking-wider mb-4 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                    Active Certifications &amp; Authorizations
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['SOC 2 Type II', 'PCI-DSS 4.0', 'HIPAA', 'CMMC 2.0', 'FedRAMP Ready'].map((cert) => (
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
                H3 — PEDIGREE
            ════════════════════════════════════════════════════════════════ */}
            <div className={`p-8 md:p-12 rounded-lg border ${isDark ? 'bg-gradient-to-b from-slate-900/80 to-slate-950/80 border-slate-800' : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'}`}>
              <h3 className={`text-2xl md:text-3xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Operational Pedigree: Enterprise Identity Security at the Highest Classification
              </h3>

              <p className={`text-lg leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                When a Fortune 500 board asks who is commanding the identity response, the answer must
                withstand scrutiny from general counsel, the audit committee, external auditors, and
                potentially the SEC. Lydell Security{'\u2019'}s operational history provides that answer.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[
                  {
                    name: 'Federal Reserve System',
                    detail: 'Identity infrastructure security for 12 Federal Reserve Banks. The authentication systems protecting American monetary policy demanded zero-tolerance identity incident response and the most rigorous access controls in existence. We operated at that level.',
                    metric: '12 Reserve Banks',
                  },
                  {
                    name: 'New York Stock Exchange',
                    detail: 'Enterprise identity and security operations for the infrastructure processing 6 billion shares daily. Active Directory and authentication systems where a single compromised service account could disrupt global financial markets.',
                    metric: '6B+ Daily Shares',
                  },
                  {
                    name: 'Cisco Security Operations',
                    detail: 'Built enterprise identity security programs and AD incident response procedures inside Cisco. The identity security architectures and response playbooks that Fortune 500 SOCs rely on today were developed during our two decades at Cisco.',
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
                  "Active Directory is the single most consequential system in any enterprise. When the
                  adversary controls it, they control the organization. Every other remediation action
                  is theater until identity sovereignty is restored. That restoration is what we do."
                </blockquote>
                <p className={`font-mono text-sm mt-3 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  {'\u2014'} Larry Barksdale, Founder &amp; Principal Incident Commander
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            CTA — CONTACT LARRY BARKSDALE
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
                  Consultancy Partnerships &amp; Retained Engagements Available
                </span>
              </div>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Discuss Retained Identity Response for Your Enterprise Clients
            </h2>

            <p className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Contact Larry Barksdale directly to discuss retained Identity-First Response for your IT consultancy
              practice, VPM program integration, or emergency activation for an active Active Directory
              compromise. No sales qualification. No tier-one routing. Direct access to the principal
              incident commander who will lead the engagement.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                CONTACT LARRY BARKSDALE {'\u2192'}
              </Link>
              <a
                href="tel:+1XXXXXXXXXX"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 border font-mono text-sm tracking-wider rounded transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-400' : 'border-slate-300 text-slate-700 hover:border-red-600 hover:text-red-600'}`}
              >
                ACTIVE AD COMPROMISE? SECURE LINE
              </a>
            </div>

            <p className={`font-mono text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
              Encrypted channels available: Signal &bull; Wire &bull; Secure Voice &bull; SOC 2-compliant secure communication
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default EnterpriseTechLandingPage;
