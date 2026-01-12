import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Cloud, 
  Shield, 
  Server, 
  Lock,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cloud Security',
  description: 'AWS, Azure, and GCP security consulting. Cloud architecture review, CSPM implementation, container security, and multi-cloud strategy.',
}

const services = [
  {
    title: 'Cloud Security Architecture Review',
    description: 'Comprehensive review of your cloud architecture to identify security gaps and misconfigurations.',
  },
  {
    title: 'AWS/Azure/GCP Hardening',
    description: 'Platform-specific security hardening following CIS benchmarks and cloud provider best practices.',
  },
  {
    title: 'Cloud Security Posture Management',
    description: 'Implementation and tuning of CSPM tools to maintain continuous visibility and compliance.',
  },
  {
    title: 'Container & Kubernetes Security',
    description: 'Secure your containerized workloads from image to runtime with comprehensive Kubernetes security.',
  },
  {
    title: 'Serverless Security',
    description: 'Security assessment and hardening for Lambda, Azure Functions, and Cloud Functions deployments.',
  },
  {
    title: 'Multi-Cloud Strategy',
    description: 'Unified security approach across multiple cloud providers with consistent controls and visibility.',
  },
]

const platforms = ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform']

export default function CloudSecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/80 font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Cloud Security
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Secure your cloud-native future.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              Cloud environments present unique security challenges. We help organizations design, 
              implement, and maintain secure cloud architectures across AWS, Azure, and GCP with a 
              focus on cloud-native security controls.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get Cloud Security Help
            </Link>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {platforms.map((platform) => (
              <div key={platform} className="text-gray-400 font-heading font-semibold text-lg">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Capabilities</span>
            <h2 className="text-3xl md:text-4xl mb-4">Cloud Security Services</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card card-hover">
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-5">
                  <Shield className="w-7 h-7 text-navy" />
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
              Secure Your Cloud Environment
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get expert guidance on cloud security architecture and implementation.
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
