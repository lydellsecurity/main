import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Shield, 
  FileCheck, 
  Search, 
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security Assessments',
  description: 'Comprehensive security assessments and compliance services for SOC 2, HIPAA, PCI-DSS 4.0, and CMMC 2.0.',
}

const assessments = [
  {
    title: 'Security Risk Assessment',
    description: 'Comprehensive evaluation of your security posture, identifying vulnerabilities and providing prioritized remediation guidance.',
  },
  {
    title: 'Vulnerability Assessment',
    description: 'Systematic identification of security weaknesses in your systems, networks, and applications.',
  },
  {
    title: 'Gap Analysis',
    description: 'Compare your current security controls against industry frameworks and best practices to identify areas for improvement.',
  },
]

const compliance = [
  {
    title: 'SOC 2',
    description: 'Type I and Type II readiness assessments and audit preparation for service organizations.',
  },
  {
    title: 'HIPAA',
    description: 'Healthcare security and privacy assessments ensuring compliance with HIPAA requirements.',
  },
  {
    title: 'PCI-DSS 4.0',
    description: 'Payment card industry compliance assessments aligned with the latest PCI-DSS 4.0 requirements.',
  },
  {
    title: 'CMMC 2.0',
    description: 'Cybersecurity Maturity Model Certification preparation for defense contractors.',
  },
]

export default function SecurityAssessmentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/80 font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Security Assessments
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Know your risks before attackers do.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              Comprehensive security evaluations that identify vulnerabilities, assess controls, 
              and ensure regulatory compliance. Our assessments combine automated scanning with 
              expert manual analysis to provide actionable findings.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Request an Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Assessments */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Assessment Services</span>
            <h2 className="text-3xl md:text-4xl mb-4">Security Evaluations</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {assessments.map((item, index) => (
              <div key={index} className="card card-hover">
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-5">
                  <Search className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Compliance</span>
            <h2 className="text-3xl md:text-4xl mb-4">Regulatory Compliance Services</h2>
            <p className="text-gray-600 text-lg">
              Navigate complex compliance requirements with expert guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compliance.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cta-gradient text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Ready for Your Assessment?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Understand your security posture and get a clear roadmap for improvement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-lg bg-white text-alert border-white hover:bg-gray-100">
                Schedule Assessment
              </Link>
              <Link href="/services" className="btn btn-outline-white btn-lg">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
