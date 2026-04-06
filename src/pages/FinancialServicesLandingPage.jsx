import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const FinancialServicesLandingPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <Helmet>
        <title>AI-Driven Ransomware Response for Financial Services & Banking | Lydell Security</title>
        <meta
          name="description"
          content="Agentic Ransomware Neutralization for Financial Services, Banking, and Fintech. PCI-DSS 4.0 & SOC 2 Type II certified. Sub-4-minute behavioral AI interception kills encryption before it completes. 2,400+ proprietary decryptor arsenal. Preferred 1099 partner for Cyber Insurance Panels."
        />
        <meta
          name="keywords"
          content="financial services ransomware response, banking cybersecurity incident response, AI ransomware neutralization, PCI-DSS 4.0 compliance, SOC 2 Type II incident response, cyber insurance panel vendor, breach response manager, financial MSP subcontracting, ransomware decryptor, polymorphic ransomware defense, fintech security, banking extortion response, C2C cybersecurity financial services, 1099 incident response panel, agentic ransomware countermeasure, multistage extortion defense"
        />
        <link rel="canonical" href="https://lydellsecurity.com/financial-services-ransomware-response" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI-Driven Ransomware Response for Financial Services & Banking | Lydell Security" />
        <meta property="og:description" content="Sub-4-minute ransomware neutralization. PCI-DSS 4.0 & SOC 2 Type II certified. 2,400+ proprietary decryptors. Preferred vendor for Cyber Insurance Panels." />
        <meta property="og:url" content="https://lydellsecurity.com/financial-services-ransomware-response" />
        <meta property="og:site_name" content="Lydell Security" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Ransomware Response for Financial Services | Lydell Security" />
        <meta name="twitter:description" content="Sub-4-minute behavioral AI interception. 2,400+ decryptors. NYSE & Federal Reserve operational pedigree." />

        {/* Schema.org Service structured data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Agentic Ransomware Neutralization for Financial Services",
            "provider": {
              "@type": "Organization",
              "name": "Lydell Security",
              "url": "https://lydellsecurity.com"
            },
            "description": "Machine-speed behavioral AI interception for financial services organizations facing AI-driven ransomware and multistage extortion campaigns. PCI-DSS 4.0 and SOC 2 Type II certified. Sub-4-minute detection-to-kill capability.",
            "serviceType": ["Ransomware Incident Response", "AI Threat Neutralization", "Digital Forensics", "Extortion Response"],
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Financial Services Ransomware Response",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Agentic Ransomware Neutralization",
                    "description": "Behavioral AI interception that detects and terminates ransomware encryption processes in under 4 minutes, before material data loss occurs"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cyber Insurance Panel Partnership",
                    "description": "Retained 1099/C2C ransomware response capability for Cyber Insurance Panels and Financial-sector Breach Response Managers"
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
                "name": "What is Agentic Ransomware Neutralization?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Agentic Ransomware Neutralization is Lydell Security's autonomous countermeasure system that uses behavioral AI to detect ransomware encryption activity within seconds of execution. Unlike signature-based detection, our agentic system identifies encryption behavior patterns—file system entropy changes, rapid sequential file modification, shadow copy deletion—and terminates the malicious process before encryption propagates beyond the initial blast radius. Average detection-to-kill time is under 4 minutes."
                }
              },
              {
                "@type": "Question",
                "name": "How does Lydell Security handle AI-driven polymorphic ransomware?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AI-driven polymorphic ransomware mutates its signature on every execution, rendering traditional antivirus and signature-based EDR ineffective. Lydell Security counters this with behavioral interception—our agentic systems do not match signatures. They detect encryption behavior at the file system and process level, regardless of how the ransomware binary has mutated. Combined with our arsenal of 2,400+ proprietary decryptors, we can both stop active encryption and recover data from completed encryption events."
                }
              },
              {
                "@type": "Question",
                "name": "Can Cyber Insurance Panels retain Lydell Security for policyholder ransomware response?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Lydell Security operates as a preferred 1099/C2C vendor for Cyber Insurance Panels and Breach Response Managers. Our sub-4-minute neutralization capability, 2,400+ decryptor arsenal, and PCI-DSS 4.0 and SOC 2 Type II certifications directly reduce loss ratios by minimizing encryption blast radius and avoiding ransom payments. We provide pre-negotiated response SLAs, standardized reporting for claims adjustment, and direct integration with panel workflows."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      <Navigation />

      <main className={`min-h-screen ${isDark ? 'bg-obsidian text-white' : 'bg-white text-slate-900'}`}>

        {/* ════════════════════════════════════════════════════════════════════
            H1 — HERO: THE CLOCK IS THE ENEMY
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
                Financial Sector — Active Ransomware Campaign Cycle
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              High-Impact{' '}
              <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-600'}>
                AI-Driven Ransomware &amp; Extortion Response
              </span>{' '}
              for Financial Services &amp; Banking.
            </h1>

            <p className={`text-xl md:text-2xl font-light leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every second of active encryption is liquidity evaporating, regulatory exposure compounding,
              and market trust eroding. Traditional IR firms measure response in hours. We measure
              detection-to-kill in under four minutes. That difference determines whether your institution
              opens for business tomorrow morning.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                ACTIVATE RANSOMWARE RESPONSE →
              </Link>
              <a
                href="#insurance-panels"
                className={`inline-flex items-center gap-2 px-6 py-3 border font-mono text-sm tracking-wider rounded transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:border-cobalt-500 hover:text-cobalt-400' : 'border-slate-300 text-slate-700 hover:border-cobalt-600 hover:text-cobalt-600'}`}
              >
                CYBER INSURANCE PANELS →
              </a>
            </div>

            {/* Time-to-neutralization stats — the core hook */}
            <div className={`grid grid-cols-2 md:grid-cols-5 gap-6 py-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              {[
                { value: '< 4 min', label: 'Detection-to-Kill' },
                { value: '15 min', label: 'Response Guarantee' },
                { value: '2,400+', label: 'Proprietary Decryptors' },
                { value: 'PCI-DSS 4.0', label: 'Certified' },
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
            H2 — THE THREAT LANDSCAPE: AI-DRIVEN RANSOMWARE IN FINANCE
        ════════════════════════════════════════════════════════════════════ */}
        <section className={`py-20 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                01 — Threat Landscape
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-8 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why Financial Services Is the Highest-Value Target for AI-Driven Ransomware &amp; Multistage Extortion
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className={`text-lg leading-relaxed space-y-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>
                  The ransomware landscape has undergone a fundamental mutation. The adversary is no longer deploying
                  static executables that your EDR has a signature for. In 2026, the most sophisticated ransomware
                  syndicates are deploying AI-driven polymorphic encryption engines that rewrite their own binary
                  on every execution. Every payload is unique. Every hash is new. Your signature-based detection
                  is functionally blind.
                </p>
                <p>
                  Financial services is the apex target because the pressure to pay is existential. When core banking
                  systems are encrypted, transaction processing halts. When trading platforms go dark, liquidity
                  evaporates by the second. When customer PII is staged for exfiltration, the regulatory cascade under
                  PCI-DSS 4.0, SOC 2, GLBA, and state privacy laws becomes a multi-front legal war. The adversary
                  knows this. They price their ransom demands accordingly.
                </p>
                <p>
                  And they have evolved beyond single-stage encryption. Modern campaigns execute multistage extortion:
                  encrypt first, exfiltrate second, then threaten public disclosure of stolen financial records as
                  a third pressure lever. Each stage multiplies the institution{'\u2019'}s exposure and compresses the decision
                  window for executives who are already operating in crisis.
                </p>
              </div>

              <div className="space-y-6">
                {/* Threat evolution cards */}
                {[
                  {
                    title: 'AI-Driven Polymorphic Encryption',
                    desc: 'Adversary-deployed AI rewrites ransomware binaries in real time. Every execution produces a unique hash. Signature-based EDR, static YARA rules, and hash-matching detection are defeated before the payload touches disk.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'Multistage Extortion Campaigns',
                    desc: 'Stage 1: Encrypt critical systems to halt operations. Stage 2: Exfiltrate customer PII, transaction records, and proprietary trading algorithms. Stage 3: Threaten public disclosure on leak sites. Each stage independently justifies a ransom demand.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'Targeted Financial Timing',
                    desc: 'Syndicates time detonation to maximum-impact windows: quarter-end close, earnings announcements, regulatory examination periods, and merger activity. The operational pressure to restore service overrides deliberate response.',
                    severity: 'HIGH',
                  },
                  {
                    title: 'PCI-DSS 4.0 & SOC 2 Compliance Cascade',
                    desc: 'A ransomware event in a PCI-DSS 4.0 cardholder data environment triggers mandatory incident reporting, forensic investigation requirements, and potential loss of payment processing capability. SOC 2 Type II attestation is jeopardized. The compliance cost compounds daily.',
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

                {/* Financial impact callout */}
                <div className={`p-6 rounded-lg border-l-4 ${isDark ? 'bg-slate-900/50 border-l-red-500' : 'bg-red-50 border-l-red-500'}`}>
                  <p className={`font-mono text-xs uppercase tracking-wider mb-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    The Cost of Every Minute
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    A Tier-1 bank loses an estimated $9.4M per hour of core system downtime. A mid-market financial
                    institution loses transaction processing revenue, faces regulatory fines, and hemorrhages customer
                    trust with every minute encryption remains active. The adversary is not waiting for your IR firm
                    to finish triage. Neither should you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            H2 — THE COUNTERMEASURE: AGENTIC RANSOMWARE NEUTRALIZATION
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                02 — The Countermeasure
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-4 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Agentic Ransomware Neutralization: Killing Encryption at Machine Speed
            </h2>

            <p className={`text-xl font-light mb-6 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Signatures are dead. Behavioral interception is the only countermeasure that operates at the speed
              of AI-driven ransomware. Our agentic system does not identify malware. It identifies encryption
              behavior{'\u2014'}and terminates it.
            </p>

            <p className={`text-lg mb-12 max-w-3xl ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Our 15-Minute Response Guarantee places a senior incident commander on comms within 15 minutes
              of activation. But the agentic countermeasure is already working. Detection-to-kill happens in
              under 4 minutes. The human confirms. The machine already acted.
            </p>

            {/* Detection-to-Kill timeline — the core differentiator */}
            <div className={`p-8 rounded-lg border mb-16 ${isDark ? 'bg-gradient-to-r from-slate-900/80 to-slate-950/60 border-slate-800' : 'bg-gradient-to-r from-slate-50 to-white border-slate-200'}`}>
              <h3 className={`font-mono text-xs uppercase tracking-wider mb-8 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                Sub-4-Minute Neutralization Timeline
              </h3>

              <div className="grid md:grid-cols-5 gap-6">
                {[
                  {
                    time: '0 – 8 sec',
                    phase: 'Behavioral Detection',
                    detail: 'Agentic sensors detect anomalous file system entropy spike. Rapid sequential file modification pattern identified. Shadow copy deletion attempt flagged.',
                  },
                  {
                    time: '8 – 30 sec',
                    phase: 'Process Isolation',
                    detail: 'Malicious process tree isolated. Parent-child process chain mapped. Network egress from suspect process blocked. Encryption propagation halted at current blast radius.',
                  },
                  {
                    time: '30 sec – 2 min',
                    phase: 'Kill & Contain',
                    detail: 'Encryption process terminated. Memory forensic capture preserved. Lateral movement corridors from compromised host severed. Affected file inventory initiated.',
                  },
                  {
                    time: '2 – 4 min',
                    phase: 'Sovereignty Assessment',
                    detail: 'Blast radius quantified: exactly which files encrypted, which systems touched, which data potentially staged for exfiltration. Recovery path determined.',
                  },
                  {
                    time: '4 min +',
                    phase: 'Recovery & Restore',
                    detail: 'Decryptor matched from 2,400+ proprietary arsenal. Encrypted files restored. Persistence mechanisms hunted and eradicated. Full incident timeline constructed.',
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

            {/* How behavioral AI defeats polymorphic encryption */}
            <h3 className={`font-mono text-xs uppercase tracking-wider mb-4 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              Why Behavioral AI Defeats Polymorphic Encryption
            </h3>

            <p className={`text-lg leading-relaxed mb-8 max-w-4xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              The adversary can mutate the binary. They cannot mutate what encryption <em>does</em>. Every
              ransomware variant{'\u2014'}regardless of AI-driven polymorphism{'\u2014'}must perform the same fundamental
              operations: enumerate files, open file handles, read contents, encrypt, write ciphertext, delete
              originals. Our agentic system monitors these behavioral invariants at the file system and kernel level.
              The ransomware{'\u2019'}s signature is irrelevant. Its behavior is its death sentence.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'File System Entropy Monitoring',
                  desc: 'Real-time entropy analysis across all active write operations. When file entropy spikes from structured data to near-random ciphertext, the agentic system flags the responsible process within seconds. No signatures required.',
                },
                {
                  title: 'Process Behavior Chain Analysis',
                  desc: 'Full parent-child process tree reconstruction in real time. Identifies the execution chain from initial access through privilege escalation to encryption payload deployment. The entire kill chain is mapped before the process is terminated.',
                },
                {
                  title: 'Shadow Copy & Backup Deletion Interception',
                  desc: 'Ransomware operators delete Volume Shadow Copies and backup catalogs before encrypting. Our system intercepts vssadmin, wmic, and bcdedit commands associated with recovery sabotage and blocks execution before deletion completes.',
                },
                {
                  title: 'Exfiltration Channel Detection',
                  desc: 'Multistage extortion requires data exfiltration before encryption. Our agentic system monitors for anomalous egress patterns: bulk data transfers to new external endpoints, DNS tunneling, and encrypted channel establishment to known staging infrastructure.',
                },
                {
                  title: '2,400+ Proprietary Decryptor Arsenal',
                  desc: 'When encryption completes before interception, we deploy from an arsenal of 2,400+ proprietary decryptors covering every major ransomware family and variant. Decryptor matching is automated. Recovery begins within minutes of variant identification.',
                },
                {
                  title: 'PCI-DSS 4.0 Forensic Compliance',
                  desc: 'Every containment action, forensic artifact, and recovery step is documented to PCI-DSS 4.0 Requirement 12.10.1 standards. Chain-of-custody evidence collection supports both regulatory reporting and cyber insurance claims adjustment.',
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
            H2 — PARTNERING WITH LYDELL: CYBER INSURANCE & MSP ADVANTAGE
        ════════════════════════════════════════════════════════════════════ */}
        <section id="insurance-panels" className={`py-20 scroll-mt-24 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-cobalt-500/10 border border-cobalt-500/20' : 'bg-cobalt-50 border border-cobalt-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
                03 — For Cyber Insurance Panels &amp; Financial MSPs
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              The On-Call Ransomware Capability That Reduces Your Loss Ratio
            </h2>

            <p className={`text-xl font-light mb-12 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              You manage the breach response panel. You coordinate between the policyholder, legal counsel,
              and forensics. But when the call comes in at 0300 and a regional bank{'\u2019'}s core system is actively
              encrypting, you need a response partner whose speed directly prevents the seven-figure payout.
              That partner is Lydell Security.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Value props for Insurance Panels */}
              <div className="space-y-8">
                <h3 className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Why Panels &amp; MSPs Retain Lydell Security on 1099/C2C
                </h3>

                {[
                  {
                    title: 'Direct Loss Ratio Reduction',
                    desc: 'Sub-4-minute detection-to-kill means encryption is stopped before material data loss occurs. Less encrypted data means smaller recovery scope. Smaller recovery scope means dramatically lower claim payouts. Our speed is your actuarial advantage.',
                  },
                  {
                    title: '2,400+ Decryptors Eliminate Ransom Payments',
                    desc: 'When encryption does complete, our proprietary decryptor arsenal recovers data without paying the adversary. Every avoided ransom payment is a direct reduction in your loss exposure. We have decryptors for every major syndicate variant active in the financial sector.',
                  },
                  {
                    title: 'Pre-Certified PCI-DSS 4.0 & SOC 2 Type II',
                    desc: 'Your financial-sector policyholders operate under PCI-DSS 4.0 and SOC 2 requirements. Our response team is already certified. No compliance gaps introduced during incident response. No secondary liability created by your panel vendor.',
                  },
                  {
                    title: 'Claims-Ready Forensic Documentation',
                    desc: 'Every engagement produces forensic documentation formatted for claims adjustment: attack timeline, blast radius quantification, data exposure assessment, and remediation verification. Your adjusters receive what they need without requesting rework.',
                  },
                  {
                    title: 'NYSE & Federal Reserve Operational Pedigree',
                    desc: 'When your policyholder is a Tier-1 bank or publicly traded financial institution, the response firm{"\u2019"}s credentials face scrutiny from regulators, auditors, and the board. Our 20+ year track record defending the Federal Reserve and NYSE answers that scrutiny definitively.',
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
                  Panel &amp; MSP Engagement Models
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      model: 'Panel Retained Standby',
                      desc: 'Annual retainer as a preferred panel vendor with guaranteed 15-minute response. Pre-negotiated per-incident rates. Standardized claims documentation. Direct integration with your breach response management workflow. When policyholders call, we are already activated.',
                      tag: 'INSURANCE PANELS',
                    },
                    {
                      model: 'MSP Augmentation',
                      desc: 'Your MSP manages the financial institution{"\u2019"}s day-to-day security operations. When ransomware detonates and your team needs specialized neutralization capability, Lydell deploys as your 1099 extension. Your client relationship is preserved. Our capability is invisible to the end customer.',
                      tag: 'FINANCIAL MSPs',
                    },
                    {
                      model: 'Emergency Activation',
                      desc: 'No retainer required. Direct emergency engagement for active ransomware events. Senior incident commander on comms within 15 minutes. Agentic countermeasure deployment begins immediately. Ideal for panels managing unpredictable claim volume.',
                      tag: 'ON-DEMAND',
                    },
                    {
                      model: 'Proactive Ransomware Readiness',
                      desc: 'Pre-incident posture assessment for your highest-risk policyholders. We evaluate backup integrity, identify encryption blast radius exposure, and pre-stage response tooling. Reduces both the probability and the severity of future claims.',
                      tag: 'LOSS PREVENTION',
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
                    {['PCI-DSS 4.0', 'SOC 2 Type II', 'CMMC 2.0', 'HIPAA', 'FedRAMP Ready'].map((cert) => (
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
                H3 — PEDIGREE: OPERATIONAL TRUST AT THE HIGHEST LEVEL
            ════════════════════════════════════════════════════════════════ */}
            <div className={`p-8 md:p-12 rounded-lg border ${isDark ? 'bg-gradient-to-b from-slate-900/80 to-slate-950/80 border-slate-800' : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'}`}>
              <h3 className={`text-2xl md:text-3xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Operational Pedigree: Forged in Financial Critical Infrastructure
              </h3>

              <p className={`text-lg leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                When your policyholder or managed client is a publicly traded financial institution under active
                ransomware attack, the incident response firm{'\u2019'}s credibility is examined by regulators, legal counsel,
                the board, and the press. Lydell Security{'\u2019'}s track record ends that conversation before it begins.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[
                  {
                    name: 'New York Stock Exchange',
                    detail: 'Security operations for infrastructure processing 6 billion shares daily. We maintained incident response readiness in an environment where a single minute of downtime moves markets and triggers regulatory inquiry.',
                    metric: '6B+ Daily Shares',
                  },
                  {
                    name: 'Federal Reserve System',
                    detail: 'Incident response readiness for 12 Federal Reserve Banks. The backbone of American monetary policy required protection at the highest classification level. We delivered.',
                    metric: '12 Reserve Banks',
                  },
                  {
                    name: 'Cisco Security Operations',
                    detail: 'Built incident response playbooks and detection logic inside one of the largest security vendors on the planet. The methodologies that financial-sector SOCs rely on today trace back to work we did at Cisco.',
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
                  "When a financial institution is under active encryption, the breach response manager does not
                  need a vendor. They need a team that has already done this at the scale that matters. We have."
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
                  Panel Partnerships &amp; Retained Engagements Available
                </span>
              </div>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Discuss Panel Placement or Retained Sub-Contracting
            </h2>

            <p className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Contact Larry Barksdale directly to discuss panel vendor placement, retained IR standby terms for
              financial-sector MSPs, or emergency activation for an active ransomware event. No sales qualification.
              No tier-one routing. Direct access to the principal incident commander who will lead your engagement.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                CONTACT LARRY BARKSDALE {'\u2192'}
              </Link>
              <a
                href="tel:+18774783266"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 border font-mono text-sm tracking-wider rounded transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-400' : 'border-slate-300 text-slate-700 hover:border-red-600 hover:text-red-600'}`}
              >
                ACTIVE ENCRYPTION? INITIATE SECURE LINE
              </a>
            </div>

            <p className={`font-mono text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
              Encrypted channels available: Signal &bull; Wire &bull; Secure Voice &bull; PCI-compliant secure file transfer
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FinancialServicesLandingPage;
