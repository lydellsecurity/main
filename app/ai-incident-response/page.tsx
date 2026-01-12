import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Sparkles, 
  Shield, 
  Search, 
  Lock, 
  Database, 
  MessageSquare, 
  RefreshCw, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Download,
  Clock,
  Phone
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Incident Response Framework (AI-IRF)',
  description: "The industry's first AI-specific incident response framework. Model poisoning, prompt injection, adversarial attacks—we've built the playbook. GREM certified expertise.",
}

const phases = [
  {
    number: '01',
    title: 'AI Threat Detection & Triage',
    description: 'Identify AI-specific attack indicators that traditional SIEM and EDR tools miss. Our detection methodology covers model drift anomalies, inference manipulation patterns, and training pipeline compromises.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Containment & Isolation',
    description: 'Specialized containment procedures for AI systems that preserve forensic evidence while preventing further model degradation or data exfiltration.',
    icon: Lock,
  },
  {
    number: '03',
    title: 'Model Integrity Assessment',
    description: 'Comprehensive evaluation of model weights, training data integrity, and inference pipeline security to determine the scope and nature of the compromise.',
    icon: Shield,
  },
  {
    number: '04',
    title: 'Training Data Forensics',
    description: 'Deep analysis of training datasets to identify poisoning, data injection, or exfiltration. We trace the attack vector back to its source.',
    icon: Database,
  },
  {
    number: '05',
    title: 'Prompt Injection Analysis',
    description: 'For LLM-based systems, specialized analysis of prompt manipulation attempts, jailbreak techniques, and instruction injection attacks.',
    icon: MessageSquare,
  },
  {
    number: '06',
    title: 'Recovery & Hardening',
    description: 'Model retraining protocols, inference pipeline security hardening, and deployment of AI-specific monitoring to prevent recurrence.',
    icon: RefreshCw,
  },
  {
    number: '07',
    title: 'Maturity Assessment',
    description: 'Post-incident evaluation using our AI Security Maturity Model to identify gaps and build long-term resilience.',
    icon: BarChart3,
  },
]

const threats = [
  'Model Poisoning & Data Poisoning',
  'Adversarial Examples & Evasion Attacks',
  'Prompt Injection & Jailbreaking',
  'Training Data Extraction',
  'Model Inversion & Membership Inference',
  'Supply Chain Attacks on ML Pipelines',
  'Inference Manipulation',
  'AI System Denial of Service',
]

const differentiators = [
  {
    title: 'First-Mover Expertise',
    description: "While others are just beginning to explore AI security, we've spent three years developing, testing, and refining our AI-IRF framework through real-world engagements.",
  },
  {
    title: 'Traditional IR Foundation',
    description: 'Our 20+ years of incident response experience at major financial institutions provides the foundational expertise that makes our AI-specific capabilities reliable and battle-tested.',
  },
  {
    title: 'Continuous Research',
    description: 'We maintain active threat research including 200+ YARA rules for LLM-specific threats and custom Velociraptor modules for AI system monitoring.',
  },
]

export default function AIIncidentResponsePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 bg-alert/20 border border-alert/30 text-alert-light px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">FLAGSHIP SERVICE</span>
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              AI Incident Response Framework{' '}
              <span className="text-gradient">(AI-IRF)</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-medium mb-4">
              When Traditional Playbooks Fail, We Have the Answer
            </p>

            <p className="text-lg text-white/75 mb-10 max-w-2xl">
              Your organization's AI systems face unique threats that traditional security teams 
              aren't equipped to handle. Model poisoning. Prompt injection. Training data exfiltration. 
              Adversarial attacks. The playbook is different—and we wrote it.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Request a Maturity Assessment
              </Link>
              <Link href="/resources#ai-irf" className="btn btn-outline-white btn-lg">
                <Download className="w-5 h-5" />
                Download AI-IRF White Paper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">The Challenge</span>
              <h2 className="text-3xl md:text-4xl mb-6">The AI Security Gap</h2>
              <p className="text-gray-600 text-lg mb-6">
                Most incident response teams were trained for traditional attacks. But when an 
                adversary poisons your machine learning model, exfiltrates your training data, 
                or manipulates your LLM through prompt injection—the old playbooks don't apply.
              </p>
              <p className="text-gray-600 text-lg mb-8">
                Lydell Security recognized this critical gap three years ago and dedicated our 
                practice exclusively to AI-specific security challenges. The result: the industry's 
                first comprehensive AI Incident Response Framework.
              </p>
              <ul className="space-y-3">
                {[
                  'Traditional SIEM/EDR tools miss AI-specific attack indicators',
                  'Standard IR playbooks lack model forensics procedures',
                  'Security teams aren\'t trained on ML pipeline vulnerabilities',
                  'Recovery procedures don\'t account for model retraining',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-alert mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 text-white">
              <h3 className="font-heading font-bold text-2xl mb-6">AI Threats We Address</h3>
              <ul className="space-y-3">
                {threats.map((threat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-alert rounded-full" />
                    {threat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Our Methodology</span>
            <h2 className="text-3xl md:text-4xl mb-4">The AI-IRF Seven-Phase Lifecycle</h2>
            <p className="text-gray-600 text-lg">
              A comprehensive, battle-tested approach to AI-specific incident response.
            </p>
          </div>

          <div className="space-y-6">
            {phases.map((phase, index) => (
              <div 
                key={phase.number}
                className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 hover:border-navy/30 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex items-center gap-4 md:w-64 flex-shrink-0">
                    <div className="w-16 h-16 bg-navy/10 rounded-xl flex items-center justify-center">
                      <phase.icon className="w-8 h-8 text-navy" />
                    </div>
                    <span className="font-heading font-bold text-4xl text-gray-200">
                      {phase.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl mb-3">{phase.title}</h3>
                    <p className="text-gray-600">{phase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Our Advantage</span>
            <h2 className="text-3xl md:text-4xl mb-4">Why Choose Lydell for AI Incident Response?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-alert/10 rounded-xl flex items-center justify-center mb-5">
                  <CheckCircle className="w-6 h-6 text-alert" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Engagement Options</span>
            <h2 className="text-3xl md:text-4xl mb-4">How We Engage</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card border-alert bg-gradient-to-br from-white to-red-50">
              <div className="w-12 h-12 bg-alert rounded-xl flex items-center justify-center mb-5">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Emergency Response</h3>
              <p className="text-alert font-semibold text-sm mb-3">2-Hour SLA</p>
              <p className="text-gray-600 mb-4">
                For active incidents requiring immediate response. On-demand, retainer-based 
                engagement with full AI-IRF lifecycle execution.
              </p>
              <Link href="/contact?urgent=true" className="inline-flex items-center gap-2 text-alert font-semibold">
                Get Emergency Help <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mb-5">
                <Search className="w-6 h-6 text-navy" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Proactive Assessment</h3>
              <p className="text-navy font-semibold text-sm mb-3">2-4 Weeks</p>
              <p className="text-gray-600 mb-4">
                For organizations wanting to evaluate AI security posture. Project-based 
                engagement including maturity assessment, gap analysis, and roadmap.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-navy font-semibold">
                Schedule Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-navy" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Retainer Services</h3>
              <p className="text-navy font-semibold text-sm mb-3">Annual Partnership</p>
              <p className="text-gray-600 mb-4">
                For ongoing AI security partnership. Reserved capacity plus advisory including 
                priority response, quarterly assessments, and threat briefings.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-navy font-semibold">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-cta-gradient text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Protect Your AI Investment
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Don't wait for an AI-specific incident to discover your traditional IR team 
              isn't equipped. Schedule a consultation to assess your readiness.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="btn btn-lg bg-white text-alert border-white hover:bg-gray-100"
              >
                Schedule AI Security Assessment
              </Link>
              <Link 
                href="tel:+17702439064" 
                className="btn btn-outline-white btn-lg"
              >
                <Phone className="w-5 h-5" />
                770-243-9064 (24/7)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
