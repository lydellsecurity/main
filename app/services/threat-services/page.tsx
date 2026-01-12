import { Metadata } from 'next'
import Link from 'next/link'
import { 
  AlertTriangle, 
  Clock, 
  Search, 
  Shield, 
  Activity,
  Users,
  CheckCircle,
  ArrowRight,
  Phone
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Threat Services',
  description: 'Expert incident response, threat hunting, and compromise assessments from frontline veterans with 20+ years of Fortune 500 experience.',
}

const services = [
  {
    icon: Clock,
    title: 'Incident Response (24/7)',
    description: 'Immediate response to active security incidents. Our team deploys rapidly to contain threats, preserve evidence, and restore operations.',
  },
  {
    icon: Search,
    title: 'Threat Hunting',
    description: 'Proactive search for hidden threats in your environment. We use advanced techniques to find adversaries that automated tools miss.',
  },
  {
    icon: Shield,
    title: 'Compromise Assessment',
    description: 'Comprehensive evaluation to determine if your organization has been breached. We identify indicators of compromise and assess the extent of any intrusion.',
  },
  {
    icon: Activity,
    title: 'Managed Detection & Response',
    description: '24/7 monitoring and response services. Our SOC analysts watch your environment and respond to threats in real-time.',
  },
  {
    icon: Users,
    title: 'Security Operations Development',
    description: 'Build or enhance your internal security operations. We help you develop processes, playbooks, and capabilities.',
  },
]

export default function ThreatServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/80 font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Threat Services
            </h1>
            <p className="text-xl text-white/80 mb-4">
              When seconds count, experience matters.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              Our threat services team brings decades of incident response experience from major 
              financial institutions. We've handled everything from nation-state attacks to insider 
              threats, ransomware to data breaches.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link href="tel:+17702439064" className="btn btn-outline-white btn-lg">
                <Phone className="w-5 h-5" />
                24/7 Emergency: 770-243-9064
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Capabilities</span>
            <h2 className="text-3xl md:text-4xl mb-4">What We Offer</h2>
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

      {/* Why Us */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Our Experience</span>
              <h2 className="text-3xl md:text-4xl mb-6">Battle-Tested Expertise</h2>
              <p className="text-gray-600 text-lg mb-6">
                Our team has defended some of the largest financial institutions in the world, 
                including Truist Financial, SunTrust Bank, and the Federal Reserve Bank of Atlanta.
              </p>
              <ul className="space-y-4">
                {[
                  '20+ years of hands-on incident response experience',
                  'GREM certified malware analysis expertise',
                  'Experience with nation-state level threats',
                  'Proven playbooks refined through hundreds of engagements',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h3 className="font-heading font-bold text-2xl mb-4">Response Time Matters</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-heading font-bold text-alert-light">2 Hours</div>
                  <div className="text-white/70">Emergency Response SLA</div>
                </div>
                <div>
                  <div className="text-4xl font-heading font-bold">24/7</div>
                  <div className="text-white/70">Availability for Incidents</div>
                </div>
                <div>
                  <div className="text-4xl font-heading font-bold">100%</div>
                  <div className="text-white/70">Client Resolution Rate</div>
                </div>
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
              Ready to Strengthen Your Defenses?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Whether you need emergency response or proactive threat hunting, we're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-lg bg-white text-alert border-white hover:bg-gray-100">
                Schedule Consultation
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
