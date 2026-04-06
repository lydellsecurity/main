import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const DoDPrimeOutreachPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <Helmet>
        <title>1099/C2C Incident Response Sub-Contracting for DoD Prime Contractors | Lydell Security</title>
        <meta
          name="description"
          content="Lydell Security provides retained 1099/C2C incident response sub-contracting for DoD Prime Contractors and Federal Systems Integrators. CMMC 2.0 certified. FedRAMP Ready. Instant elite threat hunting, assume-breach operations, and Digital Sovereignty Restoration capabilities for your contract bids. Federal Reserve and NYSE operational pedigree."
        />
        <meta
          name="keywords"
          content="DoD prime contractor subcontracting cybersecurity, 1099 incident response DoD, C2C cybersecurity sub-contractor, CMMC 2.0 sub-contractor, FedRAMP Ready incident response, federal integrator cybersecurity partner, defense contractor threat hunting, DIB sub-contracting, assume breach operations DoD, digital sovereignty restoration, DoD prime cyber capability, federal systems integrator incident response partner"
        />
        {/* Unlisted page - no canonical to prevent indexing from sitemap. Robots meta handled separately if needed. */}
        <meta name="robots" content="noindex, nofollow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="1099/C2C Incident Response for DoD Primes | Lydell Security" />
        <meta property="og:description" content="CMMC 2.0 & FedRAMP Ready. Retained sub-contracting IR capability for DoD Prime Contractors. Federal Reserve & NYSE pedigree." />
        <meta property="og:site_name" content="Lydell Security" />
      </Helmet>

      <Navigation />

      <main className={`min-h-screen ${isDark ? 'bg-obsidian text-white' : 'bg-white text-slate-900'}`}>

        {/* ════════════════════════════════════════════════════════════════════
            H1 — HERO: YOU WIN THE PRIME. WE HANDLE THE ADVERSARY.
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
                Direct Outreach {'\u2014'} DoD Prime Contractors &amp; Federal Integrators
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Elite{' '}
              <span className={isDark ? 'text-cobalt-400' : 'text-cobalt-600'}>
                1099/C2C Incident Response &amp; Threat Hunting
              </span>{' '}
              Sub-Contracting for DoD Prime Contractors.
            </h1>

            <p className={`text-xl md:text-2xl font-light leading-relaxed mb-8 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              You win the prime contract. You deliver systems engineering, program management, and
              IT modernization at scale. When the contract requires specialized adversarial response,
              assume-breach hunt operations, or CMMC 2.0-certified incident response{'\u2014'}you need a
              sub-contractor whose capabilities are already built, already certified, and already
              proven at the highest classification levels. That is Lydell Security.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                DISCUSS SUB-CONTRACTING TERMS {'\u2192'}
              </Link>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              {[
                { value: 'CMMC 2.0', label: 'Certified Ready' },
                { value: 'FedRAMP', label: 'Ready Authorization' },
                { value: '15 min', label: 'Response Guarantee' },
                { value: '20+ yrs', label: 'Fed/NYSE/Cisco Pedigree' },
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
            H2 — THE PROBLEM: THE CAPABILITY GAP IN PRIME CONTRACTS
        ════════════════════════════════════════════════════════════════════ */}
        <section className={`py-20 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                01 {'\u2014'} The Problem
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-8 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your Prime Contract Requires Specialized Cyber Capabilities You Cannot Build Fast Enough
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className={`text-lg leading-relaxed space-y-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>
                  DoD contract vehicles increasingly mandate specialized incident response and threat
                  hunting capabilities as sub-contracting line items. CMMC 2.0 Level 2 requirements,
                  DFARS 252.204-7012 incident reporting obligations, and assume-breach posture mandates
                  are now table stakes for contract eligibility. The government customer expects these
                  capabilities to be operational on Day 1 of contract performance{'\u2014'}not hired, trained,
                  and certified over the first 18 months.
                </p>
                <p>
                  Building an internal team capable of detecting living-off-the-land campaigns,
                  executing Digital Sovereignty Restoration after a supply chain compromise, and
                  maintaining continuous CMMC 2.0 and FedRAMP compliance costs millions annually.
                  Recruiting cleared personnel with this specialization takes months. Training them
                  takes years. And the resulting team supports one contract{'\u2014'}while your portfolio
                  spans dozens.
                </p>
                <p>
                  The math does not work. The capability gap is structural. The solution is a
                  sub-contracting partnership with a firm that already has the certifications,
                  the clearances, the methodology, and the operational pedigree your government
                  customer demands.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: 'CMMC 2.0 Compliance Mandate',
                    desc: 'CMMC 2.0 Level 2 certification is now required for contracts handling CUI. Your sub-contractors must independently satisfy NIST SP 800-171 Rev 2 controls. Lydell Security already holds CMMC 2.0 certification. Your compliance inheritance chain is unbroken from Day 1.',
                    tag: 'COMPLIANCE',
                  },
                  {
                    title: 'DFARS Incident Reporting',
                    desc: 'DFARS 252.204-7012 requires 72-hour incident reporting to DC3. The reporting package demands forensic detail that generalist IT teams cannot produce. Lydell delivers DFARS-compliant incident documentation as a standard engagement output.',
                    tag: 'REGULATORY',
                  },
                  {
                    title: 'Cleared Personnel Shortage',
                    desc: 'The cleared cybersecurity workforce deficit exceeds 30,000 positions. Recruiting, clearing, and retaining specialized threat hunters for a single contract is neither cost-effective nor timely. Sub-contracting Lydell provides immediate access to a team that already holds the necessary clearances and certifications.',
                    tag: 'WORKFORCE',
                  },
                  {
                    title: 'Assume-Breach Posture Requirements',
                    desc: 'Modern DoD contracts require continuous threat hunting and assume-breach operations across the contractor supply chain. This is not monitoring. This is proactive adversary hunt operations conducted by operators who have tracked nation-state APTs across DIB environments.',
                    tag: 'OPERATIONAL',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-lg border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`font-mono text-xs px-2 py-0.5 rounded ${isDark ? 'bg-cobalt-500/10 text-cobalt-400' : 'bg-cobalt-50 text-cobalt-700'}`}>
                        {item.tag}
                      </span>
                      <h3 className={`font-mono text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.title}
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            H2 — THE VALUE: WHAT LYDELL BRINGS TO YOUR BID
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                02 {'\u2014'} The Capability You Gain
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-4 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Instant CMMC 2.0 &amp; FedRAMP Ready Cyber Capability for Your Contract Bids
            </h2>

            <p className={`text-xl font-light mb-12 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              When Lydell Security is named as your incident response and threat hunting sub-contractor,
              your proposal gains capabilities that would take years and millions to build internally.
              These capabilities are certified, operational, and deployable on Day 1 of contract performance.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: 'Digital Sovereignty Restoration',
                  desc: 'Complete methodology for evicting nation-state adversaries from DIB environments. Living-off-the-land detection, assume-breach hunt operations, persistence mechanism eradication, and full operational control restoration. Deployable within 15 minutes of activation.',
                },
                {
                  title: 'Assume-Breach Hunt Operations',
                  desc: 'Proactive adversary hunt teams deploy into your contract environment under the assumption that the adversary is already present. Systematic sweep of CUI data stores, domain controllers, federation servers, and supply chain interconnect points. Quarterly or continuous cadence.',
                },
                {
                  title: 'Supply Chain Compromise Response',
                  desc: 'Surgical isolation and investigation of compromised tier-2 and tier-3 supplier connections. Vendor VPN tunnel severing, shared service account lockdown, and lateral movement corridor elimination without disrupting legitimate operational dependencies.',
                },
                {
                  title: 'CMMC 2.0 Incident Documentation',
                  desc: 'Every engagement produces forensic documentation that satisfies NIST SP 800-171 Rev 2 incident response controls, DFARS 252.204-7012 reporting requirements, and DIBCAC assessment evidence needs. Your compliance posture is strengthened, not jeopardized, by our involvement.',
                },
                {
                  title: 'Identity Infrastructure Takeback',
                  desc: 'Federation-wide session kill, surgical MFA resets, and service account privilege revocation for compromised identity environments. Under 2-minute session kill execution. Under 2-hour full identity sovereignty restoration across Active Directory and cloud IdP.',
                },
                {
                  title: '15-Minute Response Guarantee',
                  desc: 'Senior incident commander on comms within 15 minutes of activation. Not a call center. Not a junior analyst. A principal-level operator who has contained nation-state actors in Federal Reserve and NYSE environments. Your SLA to the government customer is backed by our SLA to you.',
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

            {/* Engagement structure */}
            <h3 className={`font-mono text-xs uppercase tracking-wider mb-6 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              Sub-Contracting Engagement Structure
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  model: 'Named Sub on Contract Vehicle',
                  desc: 'Lydell Security listed as the named incident response and threat hunting sub-contractor on your proposal. Pre-negotiated rates, defined SOW, and SLA commitments included in your bid package. The evaluator sees a credentialed, CMMC-certified sub with Federal Reserve pedigree.',
                  tag: 'PROPOSAL SUPPORT',
                },
                {
                  model: 'Retained IR Standby',
                  desc: 'Annual retainer across your DoD contract portfolio. Guaranteed 15-minute response for any contract environment under threat. Pre-staged forensic tooling and access credentials for each program. Zero ramp-up time when the call comes.',
                  tag: 'PORTFOLIO-WIDE',
                },
                {
                  model: 'Surge Capacity',
                  desc: 'On-demand deployment for large-scale incidents that exceed your current team\u2019s capacity. When a supply chain compromise affects multiple contract environments simultaneously, Lydell deploys additional operators to maintain containment timelines across every affected program.',
                  tag: 'ON-DEMAND',
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
            H2 — WHY LYDELL: COMPETITIVE DIFFERENTIATION FOR YOUR PROPOSAL
        ════════════════════════════════════════════════════════════════════ */}
        <section className={`py-20 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                03 {'\u2014'} Competitive Advantage
              </span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-8 max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              What Naming Lydell Security Does for Your Proposal
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-8">
                {[
                  {
                    title: 'Evaluator Confidence',
                    desc: 'Federal contract evaluators assess sub-contractor credibility as part of technical scoring. A named sub-contractor with CMMC 2.0 certification, FedRAMP Ready authorization, and 20+ years defending the Federal Reserve and NYSE scores higher than "TBD" or a generalist MSP.',
                  },
                  {
                    title: 'Instant Compliance Inheritance',
                    desc: 'Your proposal\u2019s CMMC 2.0 compliance narrative is strengthened by a sub-contractor that independently satisfies every NIST SP 800-171 control in the incident response domain. No compliance gaps. No remediation timelines. Certified capability from Day 1.',
                  },
                  {
                    title: 'Differentiation Against Competing Primes',
                    desc: 'Your competitor\u2019s proposal names a generalist MSSP for incident response. Yours names a firm with Federal Reserve and NYSE operational history, a 15-minute response guarantee, and specialized living-off-the-land detection. The evaluator sees a material capability gap between bids.',
                  },
                  {
                    title: 'Risk Reduction for the Government Customer',
                    desc: 'The government customer\u2019s concern is not whether the prime can manage a program. It is whether the prime can respond when a tier-2 supplier reports a breach at 0200. Naming Lydell answers that concern with specificity: 15-minute response, CMMC-certified, Federal Reserve-grade operations.',
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

              {/* Pedigree panel */}
              <div className={`p-8 rounded-lg border ${isDark ? 'bg-gradient-to-b from-slate-900/80 to-slate-950/80 border-slate-800' : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'}`}>
                <h3 className={`text-2xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Operational Pedigree
                </h3>

                <div className="space-y-8 mb-8">
                  {[
                    {
                      name: 'Federal Reserve System',
                      detail: 'Incident response readiness for 12 Federal Reserve Banks. The backbone of American monetary policy required protection at the highest classification. We were the team on rotation.',
                      metric: '12 Reserve Banks',
                    },
                    {
                      name: 'New York Stock Exchange',
                      detail: 'Security operations for infrastructure processing 6 billion shares daily. Millisecond-sensitive environments where downtime is measured in millions per second.',
                      metric: '6B+ Daily Shares',
                    },
                    {
                      name: 'Cisco Security Operations',
                      detail: 'Built incident response playbooks inside one of the largest security vendors on the planet. The methodologies others follow\u2014we wrote them.',
                      metric: '20+ Years',
                    },
                  ].map((cred, idx) => (
                    <div key={idx}>
                      <div className={`font-mono text-2xl font-semibold mb-1 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
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

                {/* Certs */}
                <div className={`border-t pt-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <p className={`font-mono text-xs uppercase tracking-wider mb-4 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                    Active Certifications
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
                  Accepting New Prime Sub-Contracting Partnerships
                </span>
              </div>
            </div>

            <h2 className={`text-3xl md:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Discuss Sub-Contracting Terms for Your Next Contract Bid
            </h2>

            <p className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Contact Larry Barksdale directly to discuss naming Lydell Security as your incident
              response and threat hunting sub-contractor. We provide proposal language support,
              pre-negotiated rate structures, and capability narratives formatted for federal
              contract evaluation criteria. Direct coordination. No intermediaries.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cobalt-500 hover:bg-cobalt-600 text-white font-mono text-sm tracking-wider rounded transition-colors"
              >
                CONTACT LARRY BARKSDALE {'\u2192'}
              </Link>
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

export default DoDPrimeOutreachPage;
