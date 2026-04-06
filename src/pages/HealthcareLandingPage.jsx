import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const HealthcareLandingPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <Helmet>
        <title>Identity Infrastructure Takeover Response for Healthcare & Hospital Networks | Lydell Security</title>
        <meta
          name="description"
          content="HIPAA-certified Identity Infrastructure Takeback for healthcare organizations under credential theft and identity takeover attack. Federation-wide session kill, emergency MFA resets, and full identity sovereignty restoration in under 2 hours. 15-minute response guarantee. Preferred 1099/C2C partner for Healthcare MSSPs and Regional IT Directors."
        />
        <meta
          name="keywords"
          content="healthcare identity breach response, hospital network credential theft, HIPAA incident response, identity infrastructure takeover, healthcare MSSP subcontracting, credential theft response healthcare, federation session kill, MFA reset healthcare, SSO compromise hospital, identity takeback, healthcare cybersecurity, hospital network security, C2C healthcare incident response, 1099 MSSP healthcare, Okta breach healthcare, Azure AD compromise hospital, identity sovereignty restoration, ePHI breach response, HITECH notification"
        />
        <link rel="canonical" href="https://lydellsecurity.com/healthcare-identity-breach-response" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Identity Infrastructure Takeover Response for Healthcare & Hospital Networks | Lydell Security" />
        <meta property="og:description" content="HIPAA-certified Identity Infrastructure Takeback. Federation-wide session kill in under 2 minutes. 15-minute response guarantee for healthcare organizations." />
        <meta property="og:url" content="https://lydellsecurity.com/healthcare-identity-breach-response" />
        <meta property="og:site_name" content="Lydell Security" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Healthcare Identity Breach Response | Lydell Security" />
        <meta name="twitter:description" content="Federation-wide session kill. HIPAA-certified. Under 2-hour identity sovereignty restoration for hospital networks." />

        {/* Schema.org Service structured data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Identity Infrastructure Takeback for Healthcare",
            "provider": {
              "@type": "Organization",
              "name": "Lydell Security",
              "url": "https://lydellsecurity.com"
            },
            "description": "Specialized identity breach response for healthcare organizations and hospital networks facing credential theft, SSO/IdP compromise, and identity infrastructure takeover. HIPAA certified. Federation-wide session kill, MFA resets, and full identity sovereignty restoration.",
            "serviceType": ["Identity Breach Response", "Credential Theft Remediation", "Healthcare Incident Response", "HIPAA Breach Response"],
            "areaServed": "United States",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Healthcare Identity Breach Response Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Identity Infrastructure Takeback",
                    "description": "Federation-wide session kill, emergency MFA resets, and complete identity sovereignty restoration for healthcare environments under active credential compromise"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Healthcare MSSP/IT Director Sub-Contracting",
                    "description": "Retained 1099/C2C identity breach response capability for Healthcare MSSPs and Regional IT Directors managing hospital network security"
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
                "name": "What is Identity Infrastructure Takeback for healthcare?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Identity Infrastructure Takeback is Lydell Security's methodology for evicting adversaries from compromised healthcare identity systems. When an attacker has taken over SSO, Active Directory, or cloud identity providers like Okta or Azure AD, our team executes federation-wide session kills, surgical MFA resets, and service account privilege revocation to sever every access path the adversary controls. Average time to full identity sovereignty restoration in healthcare environments is under 2 hours."
                }
              },
              {
                "@type": "Question",
                "name": "How does Lydell Security handle HIPAA compliance during identity breach response?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lydell Security is HIPAA certified. All identity breach response actions are executed within HIPAA Security Rule safeguard requirements. Our forensic documentation satisfies HITECH Act breach notification assessment criteria, including the four-factor risk assessment required to determine whether ePHI was actually compromised during the identity takeover. We provide the evidence package your privacy officer and legal counsel need for HHS OCR reporting decisions."
                }
              },
              {
                "@type": "Question",
                "name": "Can Healthcare MSSPs sub-contract Lydell Security for identity breach response?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Lydell Security operates as a 1099/C2C sub-contractor for Healthcare MSSPs and Regional IT Directors. Our HIPAA certification, combined with specialized identity breach response capability and Federal Reserve and NYSE operational pedigree, allows MSSPs to offer enterprise-grade identity incident response to hospital networks without building these capabilities in-house. We integrate seamlessly with existing MSSP workflows and preserve the client relationship."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      <Navigation />

      <main className={`min-h-screen ${isDark ? 'bg-obsidian text-white' : 'bg-white text-slate-900'}`}>

        {/* ════════════════════════════════════════════════════════════════════
            H1 — HERO: IDENTITY IS THE NEW PERIMETER IN HEALTHCARE
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
                Healthcare Sector {'\u2014'} Identity Infrastructure Under Active Siege
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              High-Impact{' '}
              <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-600'}>
                Identity Infrastructure Takeover &amp; Credential Theft Response
              </span>{' '}
              for Healthcare &amp; Hospital Networks.
            </h1>

            <p className={`text-xl md:text-2xl font-light leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              The adversary is not breaking into your hospital network. They are logging in. With stolen
              credentials, hijacked SSO sessions, and compromised federation trusts, they have become
              your administrators. Every EHR access, every ePHI query, every clinical system interaction
              is now under their control. We take it back. Federation-wide session kill in under 2 minutes.
              Full identity sovereignty restored in under 2 hours.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                ACTIVATE IDENTITY TAKEBACK {'\u2192'}
              </Link>
              <a
                href="#mssp-partners"
                className={`inline-flex items-center gap-2 px-6 py-3 border font-mono text-sm tracking-wider rounded transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:border-cobalt-500 hover:text-cobalt-400' : 'border-slate-300 text-slate-700 hover:border-cobalt-600 hover:text-cobalt-600'}`}
              >
                HEALTHCARE MSSPs &amp; IT DIRECTORS {'\u2192'}
              </a>
            </div>

            {/* Key stats */}
            <div className={`grid grid-cols-2 md:grid-cols-5 gap-6 py-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              {[
                { value: '< 2 min', label: 'Session Kill Execution' },
                { value: '< 2 hr', label: 'Identity Sovereignty Restored' },
                { value: '15 min', label: 'Response Guarantee' },
                { value: 'HIPAA', label: 'Certified' },
                { value: 'SOC 2 II', label: 'Attested' },
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
            H2 — THREAT LANDSCAPE: IDENTITY IS HEALTHCARE'S CRITICAL FAILURE POINT
        ════════════════════════════════════════════════════════════════════ */}
        <section className={`py-20 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                01 {'\u2014'} Threat Landscape
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-8 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why Healthcare Identity Infrastructure Is the Most Exploited Attack Surface in 2026
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className={`text-lg leading-relaxed space-y-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>
                  Healthcare has a structural vulnerability that no other industry shares: clinical workflows
                  demand frictionless access. Physicians, nurses, and clinical staff authenticate across dozens
                  of systems per shift{'\u2014'}EHR platforms, PACS imaging, pharmacy dispensing, lab information systems,
                  clinical communication tools. Every one of those authentication events is a potential credential
                  theft vector. And adversaries have learned to exploit this at industrial scale.
                </p>
                <p>
                  The attack pattern is consistent. Phishing campaigns target clinical staff with
                  EHR-themed lures. A single compromised credential enters the SSO federation{'\u2014'}Okta,
                  Azure AD, PingFederate{'\u2014'}and the adversary inherits the clinician{'\u2019'}s access across every
                  federated application. They are now inside your EHR. They are querying patient records.
                  They are staging ePHI for exfiltration. And your identity provider{'\u2019'}s audit logs show
                  nothing but legitimate session activity.
                </p>
                <p>
                  This is not a perimeter breach. This is an identity infrastructure takeover. The adversary
                  has not exploited a vulnerability. They have become a trusted user. Traditional incident
                  response{'\u2014'}isolate the host, image the drive, scan for malware{'\u2014'}does not apply. The
                  compromise lives in session tokens, federation trusts, and MFA registrations. You need
                  a fundamentally different response capability.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: 'SSO Federation Compromise',
                    desc: 'A single stolen credential propagates through the SSO federation to every connected application. The adversary authenticates once and accesses EHR, PACS, pharmacy, and lab systems with a valid session token. No malware deployed. No alerts triggered.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'MFA Fatigue & Registration Hijacking',
                    desc: 'Adversaries bombard clinical staff with MFA push notifications during high-volume shifts until a fatigued user approves. Alternatively, they register their own MFA device on a compromised account, establishing persistent identity access that survives password resets.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'Service Account & HL7/FHIR Abuse',
                    desc: 'Healthcare environments are saturated with service accounts for HL7 interfaces, FHIR API integrations, and clinical system interoperability. These accounts often hold elevated privileges, lack MFA enforcement, and rotate credentials infrequently. They are the adversary\u2019s preferred lateral movement vehicle.',
                    severity: 'HIGH',
                  },
                  {
                    title: 'ePHI Exfiltration & HIPAA Cascade',
                    desc: 'Once inside the identity infrastructure, the adversary accesses and stages electronic Protected Health Information for exfiltration. A confirmed ePHI breach triggers HIPAA Breach Notification Rule requirements, HITECH Act penalties of up to $2.1M per violation category, HHS OCR investigation, and state attorney general notification.',
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

                {/* Patient safety callout */}
                <div className={`p-6 rounded-lg border-l-4 ${isDark ? 'bg-slate-900/50 border-l-red-500' : 'bg-red-50 border-l-red-500'}`}>
                  <p className={`font-mono text-xs uppercase tracking-wider mb-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    Beyond Compliance: Patient Safety
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Identity infrastructure compromise in a hospital network is not an IT problem. When an
                    adversary controls authentication to clinical systems, medication dispensing can be disrupted,
                    lab results can be altered, and patient care coordination collapses. The HIPAA fine is
                    a line item. The patient safety risk is existential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            H2 — THE COUNTERMEASURE: IDENTITY INFRASTRUCTURE TAKEBACK
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                02 {'\u2014'} The Countermeasure
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-4 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Identity Infrastructure Takeback: Restoring Clinical System Sovereignty at Machine Speed
            </h2>

            <p className={`text-xl font-light mb-6 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              You cannot image a drive to investigate an identity compromise. You cannot isolate a host
              when the adversary lives in your federation trust. Identity Infrastructure Takeback is a
              fundamentally different incident response discipline{'\u2014'}purpose-built for the attack surface
              that healthcare exposes.
            </p>

            <p className={`text-lg mb-12 max-w-3xl ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Our 15-Minute Response Guarantee places a senior identity incident commander on comms within
              15 minutes. Federation-wide session kill executes within 2 minutes of authorization. Full
              identity sovereignty{'\u2014'}every compromised session terminated, every hijacked MFA registration
              revoked, every abused service account locked{'\u2014'}restored in under 2 hours.
            </p>

            {/* Identity Takeback timeline */}
            <div className={`p-8 rounded-lg border mb-16 ${isDark ? 'bg-gradient-to-r from-slate-900/80 to-slate-950/60 border-slate-800' : 'bg-gradient-to-r from-slate-50 to-white border-slate-200'}`}>
              <h3 className={`font-mono text-xs uppercase tracking-wider mb-8 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                Identity Sovereignty Restoration Timeline
              </h3>

              <div className="grid md:grid-cols-5 gap-6">
                {[
                  {
                    time: '0 {"\u2013"} 15 min',
                    phase: 'Activation & Triage',
                    detail: 'Senior identity incident commander on comms. IdP audit log ingestion initiated. Compromised account scope estimated. Clinical system impact assessment begins.',
                  },
                  {
                    time: '15 min {"\u2013"} 2 min post-auth',
                    phase: 'Federation-Wide Session Kill',
                    detail: 'All active sessions across Okta, Azure AD, PingFederate terminated simultaneously. Adversary loses access to every federated application instantly. Clinical staff re-authentication coordinated with nursing leadership.',
                  },
                  {
                    time: '20 {"\u2013"} 45 min',
                    phase: 'MFA & Credential Reset',
                    detail: 'Compromised MFA registrations revoked. Adversary-registered devices removed. Surgical credential resets issued for confirmed compromised accounts. Service account passwords rotated with dependency mapping to prevent clinical system disruption.',
                  },
                  {
                    time: '45 min {"\u2013"} 2 hr',
                    phase: 'Identity Audit & Hardening',
                    detail: 'Full identity infrastructure audit: conditional access policies, federation trust configurations, service principal permissions, API consent grants. Every adversary modification identified and reversed.',
                  },
                  {
                    time: '2 hr +',
                    phase: 'Sovereignty Confirmed',
                    detail: 'Complete identity compromise narrative delivered. ePHI access scope quantified for HIPAA breach assessment. HITECH four-factor risk assessment evidence package prepared. Conditional access hardening deployed.',
                  },
                ].map((phase, idx) => (
                  <div key={idx} className="relative">
                    <div className={`font-mono text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                      {phase.time.replace(/\{.*?\}/g, '\u2013')}
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
              Identity Infrastructure Takeback {'\u2014'} Core Protocol
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Federation-Wide Session Kill',
                  desc: 'Simultaneous session termination across every federated identity provider and connected application. Okta, Azure AD, PingFederate, Google Workspace\u2014every active session the adversary controls is destroyed in a single coordinated action. Execution time: under 2 minutes.',
                },
                {
                  title: 'Surgical MFA Reset Operations',
                  desc: 'Adversary-registered MFA devices identified and removed without disrupting legitimate clinical staff authentication. We map every MFA registration event during the compromise window and surgically revoke only adversary-controlled factors. Clinical workflows resume without mass re-enrollment chaos.',
                },
                {
                  title: 'Service Account Lockdown with Dependency Mapping',
                  desc: 'Healthcare environments average 3\u20135 service accounts per clinical application. We map every service account dependency\u2014HL7 interfaces, FHIR APIs, clinical integration engines\u2014before executing credential rotation. The adversary\u2019s lateral movement vehicle is eliminated without breaking patient care systems.',
                },
                {
                  title: 'Conditional Access Policy Hardening',
                  desc: 'Post-containment deployment of hardened conditional access policies: device compliance requirements, impossible-travel detection, risk-based authentication step-up, and geo-fencing for clinical network segments. The identity perimeter that was exploited is rebuilt stronger.',
                },
                {
                  title: 'ePHI Access Scope Quantification',
                  desc: 'Forensic reconstruction of every EHR query, patient record access, and data export executed under compromised credentials. Exact patient population affected is quantified. This is the evidence your privacy officer requires for HIPAA Breach Notification Rule assessment and HITECH four-factor risk analysis.',
                },
                {
                  title: 'HIPAA Breach Assessment Documentation',
                  desc: 'Complete forensic evidence package formatted for HHS OCR reporting decisions: compromise timeline, ePHI exposure scope, probability of compromise assessment, and remediation verification. Your legal counsel and compliance team receive documentation that supports defensible notification decisions.',
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
            H2 — PARTNERING WITH LYDELL: HEALTHCARE MSSPs & IT DIRECTORS
        ════════════════════════════════════════════════════════════════════ */}
        <section id="mssp-partners" className={`py-20 scroll-mt-24 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-cobalt-500/10 border border-cobalt-500/20' : 'bg-cobalt-50 border border-cobalt-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
                03 {'\u2014'} For Healthcare MSSPs &amp; Regional IT Directors
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Enterprise-Grade Identity Incident Response Without the Enterprise Headcount
            </h2>

            <p className={`text-xl font-light mb-12 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              You manage security operations for a regional hospital network or a portfolio of healthcare
              clients. Your team handles endpoint protection, vulnerability management, and compliance
              monitoring. But when the call comes in that a physician{'\u2019'}s Okta session is accessing patient
              records from an IP in Eastern Europe at 0300, you need a specialized identity response
              capability that does not exist on your current roster. That is the gap Lydell Security fills.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Value props */}
              <div className="space-y-8">
                <h3 className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Why Healthcare MSSPs &amp; IT Directors Retain Lydell on C2C/1099
                </h3>

                {[
                  {
                    title: 'Identity Response Is a Specialized Discipline',
                    desc: 'Traditional incident response skills\u2014disk imaging, malware analysis, network forensics\u2014do not apply to identity infrastructure takeover. Our team specializes exclusively in identity-layer attacks: SSO federation compromise, token theft forensics, MFA registration abuse, and service account exploitation. This capability takes years to develop internally. We deploy it in 15 minutes.',
                  },
                  {
                    title: 'Clinical Workflow Continuity',
                    desc: 'A botched identity response in a hospital network disrupts patient care. Mass password resets lock clinicians out of EHR during active shifts. Uncoordinated session kills crash clinical integration engines. Our Identity Takeback protocol is purpose-built for healthcare\u2014surgical precision that eliminates the adversary without creating a secondary clinical disruption event.',
                  },
                  {
                    title: 'HIPAA-Certified Response Chain',
                    desc: 'When you sub-contract Lydell Security, your HIPAA compliance chain remains unbroken. Our team operates under a Business Associate Agreement. All forensic handling, evidence collection, and ePHI access during investigation complies with HIPAA Security Rule administrative, physical, and technical safeguards. Your client\u2019s compliance posture is protected.',
                  },
                  {
                    title: 'Federal Reserve & NYSE Operational Pedigree',
                    desc: 'Your hospital system\u2019s board and legal counsel will scrutinize the incident response sub-contractor\u2019s credentials. Our 20+ year track record defending the Federal Reserve System and NYSE infrastructure provides immediate credibility that satisfies even the most demanding audit committees.',
                  },
                  {
                    title: 'Your Client Relationship Is Preserved',
                    desc: 'We operate as your 1099 extension. Our team integrates into your incident management workflow, reports through your communication channels, and delivers forensic documentation under your engagement structure. The hospital network sees their MSSP handling the crisis. The specialized capability behind it is invisible.',
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
                  MSSP &amp; IT Director Engagement Models
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      model: 'Retained Identity IR Standby',
                      desc: 'Annual retainer with guaranteed 15-minute response for identity incidents. Pre-staged federation access credentials and runbooks for your healthcare client environments. When a credential compromise is confirmed, our team is already inside the IdP console executing containment.',
                      tag: 'RECOMMENDED',
                    },
                    {
                      model: 'On-Demand Identity Response',
                      desc: 'Emergency identity breach response activated per-event. Full Identity Infrastructure Takeback protocol deployed on demand. Ideal for MSSPs managing multiple healthcare clients with variable identity risk exposure across different IdP configurations.',
                      tag: 'FLEXIBLE',
                    },
                    {
                      model: 'Proactive Identity Posture Assessment',
                      desc: 'Scheduled identity infrastructure audit for your healthcare clients. Federation trust review, conditional access gap analysis, service account privilege audit, and MFA coverage assessment. Identifies the identity attack surface before an adversary does.',
                      tag: 'PROACTIVE',
                    },
                    {
                      model: 'Regional IT Director Direct Engagement',
                      desc: 'For hospital systems with internal IT leadership but no dedicated identity security team. Direct C2C engagement with the IT Director. We function as the identity incident response arm that the hospital\u2019s security program requires but cannot justify as a full-time hire.',
                      tag: 'DIRECT',
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
                    {['HIPAA', 'SOC 2 Type II', 'PCI-DSS 4.0', 'CMMC 2.0', 'FedRAMP Ready'].map((cert) => (
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
                Operational Pedigree: Identity Security at National Scale
              </h3>

              <p className={`text-lg leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                When a hospital system{'\u2019'}s board asks who is handling the identity breach, the answer needs
                to end the conversation. Lydell Security{'\u2019'}s track record defending the most critical identity
                infrastructure in the country provides that answer.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[
                  {
                    name: 'Federal Reserve System',
                    detail: 'Identity and access security for 12 Federal Reserve Banks. The authentication infrastructure protecting American monetary policy required zero-tolerance identity incident response. We were that team.',
                    metric: '12 Reserve Banks',
                  },
                  {
                    name: 'New York Stock Exchange',
                    detail: 'Security operations for identity infrastructure underpinning 6 billion daily share transactions. When credential compromise threatens market operations measured in milliseconds, the response cannot be measured in hours.',
                    metric: '6B+ Daily Shares',
                  },
                  {
                    name: 'Cisco Security Operations',
                    detail: 'Built identity security playbooks and authentication incident response procedures inside one of the largest security vendors globally. The identity response methodologies that enterprise SOCs follow today originated in our work at Cisco.',
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
                  "When a hospital network{'\u2019'}s identity infrastructure is compromised, patient safety is
                  at stake. That changes the calculus of everything. Speed is not a preference. It is
                  a clinical obligation."
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
                  Healthcare MSSP Partnerships &amp; Retained Engagements Available
                </span>
              </div>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Discuss Retained Identity Response for Your Healthcare Clients
            </h2>

            <p className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Contact Larry Barksdale directly to discuss retained identity IR standby for your healthcare MSSP
              practice, direct C2C engagement for hospital IT leadership, or emergency activation for an
              active identity compromise. No sales qualification. No tier-one routing. Direct access to
              the principal who commands the engagement.
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
                ACTIVE IDENTITY COMPROMISE? SECURE LINE
              </a>
            </div>

            <p className={`font-mono text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
              Encrypted channels available: Signal &bull; Wire &bull; Secure Voice &bull; HIPAA-compliant secure communication
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HealthcareLandingPage;
