import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const InsurancePanelOutreachPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <Helmet>
        <title>Cyber Insurance Panel Vendor Application | Lydell Security</title>
        <meta
          name="description"
          content="Lydell Security: preferred panel vendor for Cyber Insurance Breach Response Managers. 15-minute response guarantee. Sub-4-minute ransomware neutralization. 2,400+ proprietary decryptor arsenal. Zero privilege escalation. PCI-DSS 4.0, SOC 2 Type II, HIPAA certified. Directly reduces loss ratios and prevents catastrophic insurance payouts."
        />
        <meta
          name="keywords"
          content="cyber insurance panel vendor, breach response manager, insurance panel incident response, ransomware response insurance, loss ratio reduction cybersecurity, decryptor arsenal insurance, cyber insurance claim mitigation, panel vendor application, breach coach vendor, incident response retainer insurance, cyber insurance preferred vendor, policyholder ransomware response"
        />
        <meta name="robots" content="noindex, nofollow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cyber Insurance Panel Vendor Application | Lydell Security" />
        <meta property="og:description" content="Sub-4-minute ransomware kill. 2,400+ decryptors. 15-minute response. Directly reduces your loss ratios." />
        <meta property="og:site_name" content="Lydell Security" />
      </Helmet>

      <Navigation />

      <main className={`min-h-screen ${isDark ? 'bg-obsidian text-white' : 'bg-white text-slate-900'}`}>

        {/* ════════════════════════════════════════════════════════════════════
            H1 — HERO: YOUR LOSS RATIO PROBLEM HAS A SOLUTION
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 overflow-hidden">
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
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 ${isDark ? 'bg-cobalt-500/10 border border-cobalt-500/20' : 'bg-cobalt-50 border border-cobalt-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-cobalt-400' : 'text-cobalt-700'}`}>
                Panel Vendor Application {'\u2014'} Breach Response Managers
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              The{' '}
              <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-600'}>
                Ransomware Response Vendor
              </span>{' '}
              That Directly Reduces Your Loss Ratio.
            </h1>

            <p className={`text-xl md:text-2xl font-light leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Your panel needs a response vendor whose speed prevents the seven-figure payout.
              We kill ransomware encryption in under 4 minutes. We recover data from 2,400+
              ransomware variants without paying the adversary. We produce claims-ready forensic
              documentation that your adjusters accept without rework. Every minute we save your
              policyholder is money that stays in your loss reserve.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                DISCUSS PANEL PLACEMENT {'\u2192'}
              </Link>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-5 gap-6 py-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              {[
                { value: '< 4 min', label: 'Ransomware Kill Time' },
                { value: '2,400+', label: 'Proprietary Decryptors' },
                { value: '15 min', label: 'Response Guarantee' },
                { value: '$0', label: 'Privilege Escalation' },
                { value: '100%', label: 'Claims-Ready Documentation' },
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
            H2 — THE PROBLEM: PANEL VENDORS THAT COST YOU MONEY
        ════════════════════════════════════════════════════════════════════ */}
        <section className={`py-20 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                01 {'\u2014'} The Problem
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-8 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your Current Panel Vendors Are Costing You Claims
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className={`text-lg leading-relaxed space-y-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>
                  The economics of cyber insurance breach response are simple: the faster encryption
                  is stopped, the smaller the blast radius. The smaller the blast radius, the lower
                  the recovery cost. The lower the recovery cost, the smaller the claim payout. Every
                  minute your current panel vendor spends in triage, assessment, and "scoping" is a
                  minute that encryption is spreading across your policyholder{'\u2019'}s environment.
                </p>
                <p>
                  Traditional IR firms measure response in hours. They deploy a team within 24-48 hours
                  of activation. They spend 3-5 days in assessment before containment actions begin.
                  During that window, the ransomware has encrypted every reachable system, exfiltrated
                  customer data for double extortion, and the adversary has set their ransom demand
                  based on the policyholder{'\u2019'}s insurance coverage{'\u2014'}which they have already determined.
                </p>
                <p>
                  The result: your adjusters process a seven-figure claim that was preventable. The
                  ransom is paid because no decryption alternative was available. The policyholder{'\u2019'}s
                  business continuity was destroyed not by the adversary, but by the response timeline.
                  Your loss ratio reflects this. Your reinsurance premiums reflect this.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: 'Slow Response = Larger Blast Radius',
                    desc: 'Every hour of delayed response allows ransomware to propagate to additional network segments, encrypt additional file servers, and stage additional data for exfiltration. The claim grows linearly with response delay. A 24-hour response window can turn a $200K incident into a $2M claim.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'No Decryptor Arsenal = Ransom Payment',
                    desc: 'When your panel vendor cannot decrypt, the only remaining option is ransom payment. Every ransom payment is a direct loss event on your book. The average ransom payment in 2026 exceeds $1.5M for mid-market enterprises. A vendor with a comprehensive decryptor arsenal turns payment events into recovery events.',
                    severity: 'CRITICAL',
                  },
                  {
                    title: 'Compliance Gaps Create Secondary Liability',
                    desc: 'If your panel vendor introduces compliance violations during incident response\u2014improper evidence handling, HIPAA violations during healthcare engagements, PCI-DSS breaches during financial sector response\u2014your panel carries secondary liability. Your vendor must be pre-certified for every regulatory environment your policyholders operate in.',
                    severity: 'HIGH',
                  },
                  {
                    title: 'Forensic Rework Delays Claims Adjustment',
                    desc: 'When your panel vendor\u2019s forensic documentation does not meet your adjusters\u2019 requirements, the rework cycle adds weeks to claims resolution. Every week of delay increases the policyholder\u2019s business interruption claim and your total exposure.',
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
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            H2 — THE VALUE: HOW LYDELL REDUCES YOUR LOSS RATIO
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                02 {'\u2014'} The Actuarial Advantage
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-4 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Sub-4-Minute Kill Time. 2,400+ Decryptors. Zero Privilege Escalation.
            </h2>

            <p className={`text-xl font-light mb-12 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every capability Lydell Security brings to your panel is measured in one metric:
              reduction of your claim payout. Our speed reduces blast radius. Our decryptors
              eliminate ransom payments. Our documentation accelerates claims resolution. Your
              loss ratio improves with every engagement we handle.
            </p>

            {/* Loss ratio impact grid */}
            <div className={`p-8 rounded-lg border mb-16 ${isDark ? 'bg-gradient-to-r from-slate-900/80 to-slate-950/60 border-slate-800' : 'bg-gradient-to-r from-slate-50 to-white border-slate-200'}`}>
              <h3 className={`font-mono text-xs uppercase tracking-wider mb-8 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                Direct Impact on Your Loss Economics
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    metric: 'Blast Radius Reduction',
                    value: '~85%',
                    detail: 'Sub-4-minute detection-to-kill stops encryption before it propagates beyond the initial host or network segment. Compared to a 24-hour traditional response, the encrypted surface area is reduced by approximately 85%. Smaller blast radius = proportionally smaller recovery claim.',
                  },
                  {
                    metric: 'Ransom Payment Avoidance',
                    value: '2,400+',
                    detail: 'Our proprietary decryptor arsenal covers every major ransomware family and variant active in 2026. When encryption completes before interception, we recover data without paying the adversary. Every avoided ransom payment is a direct subtraction from your loss exposure.',
                  },
                  {
                    metric: 'Claims Resolution Acceleration',
                    value: '< 48 hr',
                    detail: 'Forensic documentation is delivered in claims-ready format within 48 hours: attack timeline, blast radius quantification, data exposure assessment, and remediation verification. Your adjusters receive a complete evidence package without requesting rework or supplemental investigation.',
                  },
                ].map((impact, idx) => (
                  <div key={idx}>
                    <div className={`font-mono text-3xl font-semibold mb-2 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
                      {impact.value}
                    </div>
                    <h4 className={`font-mono text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {impact.metric}
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {impact.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: 'Agentic Ransomware Neutralization',
                  desc: 'Behavioral AI intercepts encryption at the file system level. No signatures. No hash matching. The agentic system detects encryption behavior\u2014entropy spikes, rapid sequential file modification, shadow copy deletion\u2014and terminates the process before material data loss occurs.',
                },
                {
                  title: '2,400+ Proprietary Decryptor Arsenal',
                  desc: 'Maintained arsenal of decryptors covering LockBit, BlackCat/ALPHV, Royal, Cl0p, Akira, Play, BianLian, and every significant variant observed in 2025\u20132026. Decryptor matching is automated. Recovery begins within minutes of variant identification. Ransom payment is the last resort, not the default.',
                },
                {
                  title: 'Zero Privilege Escalation Guarantee',
                  desc: 'Our response methodology never requires domain admin credentials, never installs persistent agents, and never introduces additional attack surface into your policyholder\u2019s environment. We operate with minimal necessary privileges and remove all forensic tooling upon engagement completion.',
                },
                {
                  title: 'Multi-Compliance Certification',
                  desc: 'PCI-DSS 4.0, SOC 2 Type II, HIPAA, CMMC 2.0, FedRAMP Ready. Your panel serves policyholders across financial services, healthcare, defense, and enterprise tech. A single panel vendor certified for every regulatory environment eliminates compliance risk across your entire book.',
                },
                {
                  title: 'Claims-Ready Forensic Documentation',
                  desc: 'Standardized evidence packages formatted for claims adjustment: incident timeline, scope quantification, data exposure assessment, root cause analysis, and remediation verification. Delivered within 48 hours. Your adjusters have used our format before. No learning curve. No rework cycles.',
                },
                {
                  title: 'Breach Coach Integration',
                  desc: 'We integrate directly with your breach coaches and legal counsel. Our forensic findings are delivered in formats that support privilege-protected communications. We coordinate with privacy counsel on breach notification assessments across all 50-state frameworks, HIPAA, GDPR, and sector-specific requirements.',
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

            {/* Panel engagement structure */}
            <h3 className={`font-mono text-xs uppercase tracking-wider mb-6 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              Panel Engagement Structure
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  model: 'Preferred Panel Vendor',
                  desc: 'Named preferred vendor on your breach response panel with pre-negotiated per-incident rates. Guaranteed 15-minute response SLA. Direct integration with your breach response management workflow. When the policyholder calls your hotline, Lydell is activated within the same minute.',
                  tag: 'PRIMARY',
                },
                {
                  model: 'Specialized Ransomware Escalation',
                  desc: 'Secondary escalation vendor for ransomware-specific events when your primary panel vendor\u2019s capabilities are exceeded. We handle the encryption kill, decryption recovery, and extortion negotiation. Your primary vendor continues managing the broader forensic investigation.',
                  tag: 'ESCALATION',
                },
                {
                  model: 'Proactive Policyholder Readiness',
                  desc: 'Pre-incident posture assessment for your highest-risk policyholders. Backup integrity validation, encryption blast radius modeling, and response tooling pre-staging. Reduces both probability and severity of future claims. Offered as a loss prevention service to your insureds.',
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
                  </div>
                  <h4 className={`font-mono text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {model.model}
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {model.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            H3 — PEDIGREE & TRUST
        ════════════════════════════════════════════════════════════════════ */}
        <section className={`py-20 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`p-8 md:p-12 rounded-lg border ${isDark ? 'bg-gradient-to-b from-slate-900/80 to-slate-950/80 border-slate-800' : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'}`}>
              <h3 className={`text-2xl md:text-3xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Operational Pedigree: The Credentials Your Panel Demands
              </h3>

              <p className={`text-lg leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                When your policyholder is a publicly traded financial institution, a hospital
                system, or a defense contractor, the response vendor{'\u2019'}s credentials face scrutiny
                from regulators, auditors, boards, and opposing counsel. Lydell Security{'\u2019'}s
                operational history answers that scrutiny before it begins.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[
                  {
                    name: 'New York Stock Exchange',
                    detail: 'Security operations for infrastructure processing 6 billion shares daily. When your policyholder is a financial institution, the response vendor\u2019s financial sector pedigree is evaluated by regulators. Ours is unimpeachable.',
                    metric: '6B+ Daily Shares',
                  },
                  {
                    name: 'Federal Reserve System',
                    detail: 'Incident response readiness for 12 Federal Reserve Banks. The most critical financial infrastructure in the country required our team on rotation. That operational history transfers directly to your panel\u2019s credibility.',
                    metric: '12 Reserve Banks',
                  },
                  {
                    name: 'Cisco Security Operations',
                    detail: 'Built the incident response playbooks and detection logic inside one of the largest security vendors globally. The methodologies your current panel vendors rely on trace back to work we did at Cisco over two decades.',
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
                <div className="flex flex-wrap gap-3">
                  {['PCI-DSS 4.0', 'SOC 2 Type II', 'HIPAA', 'CMMC 2.0', 'FedRAMP Ready'].map((cert) => (
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
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            CTA
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
                  Accepting Panel Vendor Applications
                </span>
              </div>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Discuss Panel Placement &amp; Preferred Vendor Terms
            </h2>

            <p className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Contact Larry Barksdale directly to discuss preferred panel vendor placement,
              pre-negotiated per-incident rate structures, SLA commitments, and integration
              with your breach response management workflow. We provide sample claims-ready
              forensic documentation and loss ratio impact modeling for your underwriting team.
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
                POLICYHOLDER UNDER ACTIVE ENCRYPTION?
              </a>
            </div>

            <p className={`font-mono text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
              Encrypted channels available: Signal &bull; Wire &bull; Secure Voice &bull; Privilege-protected secure file transfer
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default InsurancePanelOutreachPage;
