import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Sparkles, 
  AlertTriangle, 
  Shield, 
  Cloud, 
  Settings, 
  Key,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive cybersecurity services including AI incident response, threat services, security assessments, cloud security, and adversarial testing.',
}

const services = [
  {
    title: 'AI Incident Response',
    tagline: 'The playbook for AI-specific threats.',
    description: 'Traditional incident response falls short when attackers target your AI systems. Model poisoning, prompt injection, training data exfiltration—these attacks require specialized expertise. Our AI-IRF framework is the industry\'s first comprehensive approach.',
    icon: Sparkles,
    href: '/ai-incident-response',
    featured: true,
    items: [
      'AI Threat Detection & Triage',
      'Model Integrity Assessment',
      'Training Data Forensics',
      'Prompt Injection Analysis',
      'AI System Recovery & Hardening',
      'AI Security Maturity Assessment',
    ],
  },
  {
    title: 'Threat Services',
    tagline: 'When seconds count, experience matters.',
    description: 'Our threat services team brings decades of incident response experience from major financial institutions. We\'ve handled everything from nation-state attacks to insider threats, ransomware to data breaches.',
    icon: AlertTriangle,
    href: '/services/threat-services',
    items: [
      'Incident Response (24/7 Available)',
      'Threat Hunting',
      'Compromise Assessments',
      'Post-Compromise Assessment',
      'Security Operations Development',
      'Managed Detection & Response (MDR)',
    ],
  },
  {
    title: 'Security Assessments',
    tagline: 'Know your risks before attackers do.',
    description: 'Comprehensive security evaluations that identify vulnerabilities, assess controls, and ensure regulatory compliance. Our assessments combine automated scanning with expert manual analysis.',
    icon: Shield,
    href: '/services/security-assessments',
    items: [
      'Security Risk Assessments',
      'Vulnerability Assessments',
      'Gap Analysis',
      'SOC 2 Readiness & Compliance',
      'HIPAA Compliance',
      'PCI-DSS 4.0 & CMMC 2.0',
    ],
  },
  {
    title: 'Cloud Security',
    tagline: 'Secure your cloud-native future.',
    description: 'Cloud environments present unique security challenges. We help organizations design, implement, and maintain secure cloud architectures across AWS, Azure, and GCP.',
    icon: Cloud,
    href: '/services/cloud-security',
    items: [
      'Cloud Security Architecture Review',
      'AWS/Azure/GCP Security Hardening',
      'Cloud Security Posture Management',
      'Container & Kubernetes Security',
      'Serverless Security Assessment',
      'Multi-Cloud Security Strategy',
    ],
  },
  {
    title: 'Solution Deployment',
    tagline: 'Tools are only as good as their implementation.',
    description: 'Security tools require expert configuration to deliver value. We implement, tune, and manage security solutions to ensure they detect real threats while minimizing false positives.',
    icon: Settings,
    href: '/services/solution-deployment',
    items: [
      'SIEM Implementation & Tuning',
      'SOAR Platform Deployment',
      'EDR/XDR Configuration',
      'Security Tool Integration',
      'Managed Security Services',
      'SOC Development & Optimization',
    ],
  },
  {
    title: 'Adversarial Testing',
    tagline: 'Think like an attacker. Defend like an expert.',
    description: 'The best way to find vulnerabilities is to attack yourself—safely. Our red team and penetration testing services use the same techniques as real adversaries.',
    icon: Key,
    href: '/services/adversarial-testing',
    items: [
      'Penetration Testing (Network, Web, Mobile)',
      'Red Team Exercises',
      'Purple Team Engagements',
      'Social Engineering Assessments',
      'Physical Security Testing',
      'AI/ML Adversarial Testing',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Comprehensive Cybersecurity,{' '}
              <span className="text-gradient">Specialized AI Security</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              From proactive assessments to reactive incident response, Lydell Security provides 
              end-to-end cybersecurity solutions with specialized expertise in AI system protection.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.href}
                className={`grid lg:grid-cols-2 gap-12 items-start ${
                  service.featured ? 'bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 lg:p-12 border border-alert/20' : ''
                }`}
              >
                <div>
                  {service.featured && (
                    <span className="inline-block bg-alert text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      FLAGSHIP SERVICE
                    </span>
                  )}
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      service.featured ? 'bg-alert/10' : 'bg-navy/10'
                    }`}>
                      <service.icon className={`w-7 h-7 ${service.featured ? 'text-alert' : 'text-navy'}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold">{service.title}</h2>
                      <p className={`font-medium ${service.featured ? 'text-alert' : 'text-navy'}`}>
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg mb-6">
                    {service.description}
                  </p>

                  <Link 
                    href={service.href} 
                    className={`btn ${service.featured ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${service.featured ? 'bg-alert' : 'bg-navy'}`} />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-cta-gradient text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss your security challenges and find the right solution for your organization.
            </p>
            <Link href="/contact" className="btn btn-lg bg-white text-alert border-white hover:bg-gray-100">
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
