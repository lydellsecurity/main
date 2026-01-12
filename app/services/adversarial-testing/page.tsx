import { Metadata } from 'next'
import Link from 'next/link'
import { Key, Target, Users, Building, Brain, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Adversarial Testing',
  description: 'Penetration testing, red team exercises, purple team engagements, social engineering assessments, and AI/ML adversarial testing.',
}

const services = [
  {
    icon: Target,
    title: 'Penetration Testing',
    description: 'Comprehensive testing of networks, web applications, mobile apps, and APIs to identify exploitable vulnerabilities.',
  },
  {
    icon: Users,
    title: 'Red Team Exercises',
    description: 'Simulate real-world attacks against your organization to test detection and response capabilities.',
  },
  {
    icon: Shield,
    title: 'Purple Team Engagements',
    description: 'Collaborative exercises where our red team works with your blue team to improve defenses in real-time.',
  },
  {
    icon: Users,
    title: 'Social Engineering',
    description: 'Test your human defenses with phishing campaigns, pretexting, and physical social engineering assessments.',
  },
  {
    icon: Building,
    title: 'Physical Security Testing',
    description: 'Assess physical access controls, badge systems, and facility security through controlled testing.',
  },
  {
    icon: Brain,
    title: 'AI/ML Adversarial Testing',
    description: 'Specialized testing of AI and machine learning systems for adversarial vulnerabilities and model robustness.',
  },
]

export default function AdversarialTestingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <Key className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/80 font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Adversarial Testing
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Think like an attacker. Defend like an expert.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              The best way to find vulnerabilities is to attack yourself—safely. Our red team and 
              penetration testing services use the same techniques as real adversaries to identify 
              weaknesses before they're exploited.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Request a Test
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Capabilities</span>
            <h2 className="text-3xl md:text-4xl mb-4">Testing Services</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card card-hover">
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Testing Highlight */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-alert text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  SPECIALIZED
                </span>
                <h2 className="text-3xl font-heading font-bold mb-4">AI/ML Adversarial Testing</h2>
                <p className="text-white/80 mb-6">
                  Traditional penetration testing doesn't cover AI-specific attack vectors. Our 
                  specialized AI/ML adversarial testing evaluates your models against evasion attacks, 
                  model extraction, prompt injection, and more.
                </p>
                <Link href="/ai-incident-response" className="btn bg-white text-navy border-white hover:bg-gray-100">
                  Learn About AI Security
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  'Adversarial example generation',
                  'Model robustness evaluation',
                  'Prompt injection testing for LLMs',
                  'Training data extraction attempts',
                  'Model inversion attacks',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-alert rounded-full" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cta-gradient text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Find Vulnerabilities Before Attackers Do
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Test your defenses with expert adversarial security testing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-lg bg-white text-alert border-white hover:bg-gray-100">
                Schedule a Test
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
