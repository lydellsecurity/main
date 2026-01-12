import { Metadata } from 'next'
import Link from 'next/link'
import { Settings, Monitor, Zap, Layers, Users, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solution Deployment',
  description: 'Expert SIEM/SOAR implementation, EDR/XDR configuration, security tool integration, and managed security services.',
}

const services = [
  {
    icon: Monitor,
    title: 'SIEM Implementation & Tuning',
    description: 'Deploy and optimize SIEM platforms including Splunk, Microsoft Sentinel, and Elastic Security for effective threat detection.',
  },
  {
    icon: Zap,
    title: 'SOAR Platform Deployment',
    description: 'Implement security orchestration and automated response to accelerate incident handling and reduce manual workload.',
  },
  {
    icon: Layers,
    title: 'EDR/XDR Configuration',
    description: 'Deploy and tune endpoint detection and response solutions for comprehensive endpoint visibility and protection.',
  },
  {
    icon: Wrench,
    title: 'Security Tool Integration',
    description: 'Connect your security tools into a cohesive ecosystem with proper data flows and automated workflows.',
  },
  {
    icon: Users,
    title: 'Managed Security Services',
    description: 'Ongoing management and monitoring of your security infrastructure by our expert team.',
  },
  {
    icon: Settings,
    title: 'SOC Development',
    description: 'Build or optimize your Security Operations Center with proper processes, playbooks, and tooling.',
  },
]

export default function SolutionDeploymentPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/80 font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Solution Deployment
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Tools are only as good as their implementation.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              Security tools require expert configuration to deliver value. We implement, tune, and 
              manage security solutions to ensure they detect real threats while minimizing false 
              positives that drain your team's resources.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get Implementation Help
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Capabilities</span>
            <h2 className="text-3xl md:text-4xl mb-4">Deployment Services</h2>
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

      {/* CTA */}
      <section className="section bg-cta-gradient text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Ready to Optimize Your Security Stack?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get expert help deploying and configuring your security tools.
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
