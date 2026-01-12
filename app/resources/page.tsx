import { Metadata } from 'next'
import Link from 'next/link'
import { Download, FileText, BookOpen, Video, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'AI security resources including the AI-IRF framework documentation, whitepapers, case studies, and educational materials from Lydell Security.',
}

const frameworks = [
  {
    title: 'AI Incident Response Framework (AI-IRF)',
    description: 'Our comprehensive seven-phase framework for responding to AI-specific security incidents. The industry\'s first dedicated AI IR methodology.',
    type: 'Framework',
    link: '/ai-incident-response',
  },
]

const whitepapers = [
  {
    title: 'Introduction to AI Security Threats',
    description: 'An overview of the emerging threat landscape targeting AI and machine learning systems.',
    pages: '24 pages',
  },
  {
    title: 'Model Poisoning: Detection and Response',
    description: 'Technical deep-dive into model poisoning attacks and defensive strategies.',
    pages: '18 pages',
  },
  {
    title: 'Securing the ML Pipeline',
    description: 'Best practices for securing machine learning development and deployment pipelines.',
    pages: '32 pages',
  },
]

const caseStudies = [
  {
    title: 'Financial Services AI Incident',
    description: 'How we helped a major financial institution respond to a model poisoning attack affecting their fraud detection system.',
    industry: 'Financial Services',
  },
  {
    title: 'Healthcare LLM Security Assessment',
    description: 'Comprehensive security assessment of a healthcare organization\'s clinical decision support AI.',
    industry: 'Healthcare',
  },
  {
    title: 'E-commerce Recommendation System',
    description: 'Incident response engagement for a retail company experiencing adversarial manipulation of their recommendation AI.',
    industry: 'Retail',
  },
]

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Resources
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Frameworks, whitepapers, and case studies to help you understand and 
              improve your AI security posture.
            </p>
          </div>
        </div>
      </section>

      {/* AI-IRF Framework Section */}
      <section className="section bg-white" id="ai-irf">
        <div className="container-custom">
          <div className="section-header text-left max-w-none">
            <span className="section-tag">Featured Framework</span>
            <h2 className="text-3xl md:text-4xl mb-4">AI-IRF Framework</h2>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border border-alert/20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-alert text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  FLAGSHIP FRAMEWORK
                </span>
                <h3 className="font-heading font-bold text-2xl mb-4">
                  AI Incident Response Framework
                </h3>
                <p className="text-gray-600 mb-6">
                  The industry's first comprehensive framework for responding to AI-specific 
                  security incidents. Developed through real-world engagements and continuous 
                  research, the AI-IRF provides a structured approach to detecting, containing, 
                  and recovering from attacks on AI systems.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/ai-incident-response" className="btn btn-primary">
                    Explore Framework
                  </Link>
                  <Link href="/contact" className="btn btn-outline">
                    Request Training
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-heading font-semibold mb-4">Seven-Phase Lifecycle</h4>
                <ul className="space-y-3">
                  {[
                    'AI Threat Detection & Triage',
                    'Containment & Isolation',
                    'Model Integrity Assessment',
                    'Training Data Forensics',
                    'Prompt Injection Analysis',
                    'Recovery & Hardening',
                    'Maturity Assessment',
                  ].map((phase, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-alert/10 text-alert rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{phase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whitepapers Section */}
      <section className="section bg-gray-50" id="whitepapers">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Research</span>
            <h2 className="text-3xl md:text-4xl mb-4">Whitepapers</h2>
            <p className="text-gray-600 text-lg">
              In-depth research on AI security topics from our team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whitepapers.map((paper, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-navy" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{paper.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{paper.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{paper.pages}</span>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-navy font-semibold text-sm hover:gap-3 transition-all">
                    Request Access
                    <Download className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Whitepapers are available to clients and qualified prospects.
            </p>
            <Link href="/contact" className="btn btn-secondary">
              Request Whitepaper Access
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section bg-white" id="case-studies">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Real-World Results</span>
            <h2 className="text-3xl md:text-4xl mb-4">Case Studies</h2>
            <p className="text-gray-600 text-lg">
              See how we've helped organizations respond to AI security challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="card card-hover">
                <span className="inline-block bg-navy/10 text-navy text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {study.industry}
                </span>
                <h3 className="font-heading font-bold text-lg mb-3">{study.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-navy font-semibold text-sm">
                  Request Full Case Study
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-navy" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Blog & Insights</h3>
              <p className="text-gray-600 mb-4">
                Regular articles on AI security trends, techniques, and best practices.
              </p>
              <Link href="/insights" className="btn btn-outline">
                Read Our Blog
              </Link>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-navy" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Training & Workshops</h3>
              <p className="text-gray-600 mb-4">
                Custom training programs on AI security for your team.
              </p>
              <Link href="/contact" className="btn btn-outline">
                Inquire About Training
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cta-gradient text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Need Custom Resources?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              We can develop custom training materials and assessments for your organization.
            </p>
            <Link href="/contact" className="btn btn-lg bg-white text-alert border-white hover:bg-gray-100">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
