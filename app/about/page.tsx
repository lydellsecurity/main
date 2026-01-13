import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Shield, 
  Award, 
  Building2, 
  Users, 
  Target, 
  CheckCircle,
  Briefcase,
  GraduationCap,
  MapPin,
  ArrowRight,
  Quote
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Larry Barksdale and Lydell Security. 20+ years of cybersecurity leadership at Fortune 500 financial institutions including Truist, SunTrust, ICE/NYSE, and the Federal Reserve Bank of Atlanta.',
}

const careerTimeline = [
  {
    period: 'Present',
    role: 'Chief Executive Officer',
    company: 'Lydell Security LLC',
    description: 'Leading a cybersecurity consulting firm dedicated to protecting companies from advanced cyber threats. Pioneering AI incident response methodologies and providing world-class threat services.',
  },
  {
    period: '2019 - 2021',
    role: 'Head Group Vice President, Incident Response',
    company: 'Truist Financial',
    description: 'Led enterprise-wide incident response operations following the BB&T and SunTrust merger, overseeing cyber threat mitigation for one of the largest U.S. financial institutions.',
  },
  {
    period: '2017 - 2019',
    role: 'GVP, Cyber Tactical Operations Head',
    company: 'SunTrust Bank',
    description: 'Directed cyber tactical operations including digital forensics, incident response, and threat hunting. Managed security operations protecting trillions in assets.',
  },
  {
    period: '2017',
    role: 'Head of Digital, GVP Forensics & Incident Response',
    company: 'SunTrust Bank',
    description: 'Oversaw digital forensics and incident response capabilities, building and leading high-performance security teams.',
  },
  {
    period: '2014 - 2017',
    role: 'Sr. Incident Response Engineer / Cybersecurity Senior Engineer',
    company: 'Intercontinental Exchange (ICE/NYSE)',
    description: 'Protected the world\'s largest stock exchange and critical financial market infrastructure. Developed and executed incident response procedures for high-stakes environments.',
  },
  {
    period: '2013 - 2014',
    role: 'Information Security Specialist',
    company: 'Federal Reserve Bank of Atlanta',
    description: 'Served as vulnerability management liaison and incident response specialist for the central bank, protecting critical financial infrastructure.',
  },
  {
    period: '2012 - 2013',
    role: 'Network Security Senior Analyst',
    company: 'Dell SecureWorks',
    description: 'Protected customer information assets through managed security services, gaining deep expertise in threat detection and response.',
  },
]

const certifications = [
  {
    name: 'GIAC Reverse Engineering Malware (GREM)',
    issuer: 'SANS Institute / GIAC',
    description: 'Advanced certification in malware analysis, reverse engineering, and incident response.',
  },
]

const expertise = [
  'Incident Response & Digital Forensics',
  'Malware Reverse Engineering',
  'Threat Hunting & Intelligence',
  'AI/ML Security & Adversarial Attacks',
  'Security Operations Center (SOC) Leadership',
  'Vulnerability Management',
  'Regulatory Compliance (SOC 2, PCI-DSS, etc.)',
  'Executive Security Advisory',
]

const values = [
  {
    title: 'Lead by Example',
    description: 'We don\'t just advise—we roll up our sleeves and work alongside your team to solve problems.',
    icon: Target,
  },
  {
    title: 'Integrity First',
    description: 'Our reputation is built on trust, professionalism, and unwavering commitment to doing the right thing.',
    icon: Shield,
  },
  {
    title: 'Continuous Improvement',
    description: 'We challenge ourselves and our clients to constantly improve security posture and capabilities.',
    icon: Award,
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block font-heading font-semibold text-sm text-teal-400 uppercase tracking-widest mb-4">
              About Lydell Security
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Frontline Experience. <br />Uncompromising Defense.
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Founded by a veteran of Fortune 500 financial institution security, Lydell Security 
              brings battle-tested expertise to protect your organization from tomorrow&apos;s threats today.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Photo/Avatar Column */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-1">
                  <div className="bg-white rounded-xl p-8">
                    <div className="w-48 h-48 bg-gradient-to-br from-navy to-navy-light rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-6xl font-heading font-bold text-white">LB</span>
                    </div>
                    <div className="text-center">
                      <h2 className="font-heading font-bold text-2xl mb-1">Larry Barksdale</h2>
                      <p className="text-navy font-medium mb-4">Founder & CEO</p>
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        <span className="bg-navy/10 text-navy text-xs font-semibold px-3 py-1 rounded-full">
                          GREM Certified
                        </span>
                        <span className="bg-alert/10 text-alert text-xs font-semibold px-3 py-1 rounded-full">
                          20+ Years Experience
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4" />
                        Atlanta, Georgia
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-heading font-bold text-lg mb-4">Connect with Larry</h3>
                  <div className="space-y-3">
                    <a 
                      href="https://www.linkedin.com/in/lbarksdale1/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 hover:text-navy transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn Profile
                    </a>
                    <Link 
                      href="/contact"
                      className="flex items-center gap-3 text-gray-600 hover:text-navy transition-colors"
                    >
                      <Briefcase className="w-5 h-5" />
                      Schedule a Meeting
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Column */}
            <div className="lg:col-span-3">
              <h2 className="font-heading font-bold text-3xl mb-6">
                From Wall Street to Your Security
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  Lydell Security was founded by Larry Barksdale, a cybersecurity expert who has spent 
                  over two decades discovering and responding to the world&apos;s most advanced cyber threats. 
                  His career spans the most critical financial infrastructure in the United States—from 
                  the New York Stock Exchange to the Federal Reserve Bank of Atlanta.
                </p>
                <p>
                  Larry&apos;s journey includes senior leadership roles at Truist Financial (following the 
                  BB&T/SunTrust merger) where he served as Head Group Vice President of Incident Response, 
                  and at SunTrust Bank where he led Cyber Tactical Operations. Earlier, he protected 
                  Intercontinental Exchange (ICE)—the parent company of the NYSE—as a Senior Incident 
                  Response Engineer during a period of unprecedented cyber threats to financial markets.
                </p>
                <p>
                  His experience at the Federal Reserve Bank of Atlanta and Dell SecureWorks provided 
                  foundational expertise in vulnerability management, threat detection, and managed 
                  security services that inform Lydell Security&apos;s comprehensive approach today.
                </p>
                <p>
                  Holding the prestigious GIAC Reverse Engineering Malware (GREM) certification from 
                  the SANS Institute, Larry brings specialized expertise in malware analysis, digital 
                  forensics, and advanced incident handling methodologies. This technical depth, combined 
                  with executive leadership experience, positions Lydell Security uniquely to serve 
                  organizations facing today&apos;s most sophisticated threats.
                </p>
              </div>

              {/* Expertise Grid */}
              <div className="mb-12">
                <h3 className="font-heading font-bold text-xl mb-4">Areas of Expertise</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {expertise.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-gray-50 rounded-xl p-6 mb-12">
                <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-navy" />
                  Certifications
                </h3>
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <div className="font-semibold">{cert.name}</div>
                      <div className="text-sm text-gray-500">{cert.issuer}</div>
                      <div className="text-sm text-gray-600 mt-1">{cert.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-navy rounded-xl p-8 text-white">
                <Quote className="w-10 h-10 text-white/20 mb-4" />
                <blockquote className="text-lg leading-relaxed mb-6 italic">
                  &quot;Larry has been one of the most effective leaders during my 30-year career in 
                  Information Technology and Cybersecurity. He leads by example, he looks out for 
                  his people, and he challenges us to be better. His professionalism, strength of 
                  character, and patience in working in a highly intensive environment was admired 
                  by his entire staff.&quot;
                </blockquote>
                <div className="text-white/80 text-sm">
                  — Former Direct Report, SunTrust Bank Cyber Tactical Operations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Career Journey</span>
            <h2 className="text-3xl md:text-4xl mb-4">20+ Years Defending Critical Infrastructure</h2>
            <p className="text-gray-600 text-lg">
              A proven track record of protecting the world&apos;s most important financial institutions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-navy/20" />

              {careerTimeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-navy rounded-full border-4 border-white shadow" />
                  
                  {/* Content */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="inline-block bg-navy/10 text-navy text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {item.period}
                    </span>
                    <h3 className="font-heading font-bold text-lg">{item.role}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}">
                      <Building2 className="w-4 h-4" />
                      {item.company}
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Our Values</span>
            <h2 className="text-3xl md:text-4xl mb-4">What Drives Us</h2>
            <p className="text-gray-600 text-lg">
              The principles that guide every engagement and every decision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-navy to-navy-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">The Company</span>
              <h2 className="text-3xl md:text-4xl mb-6">Why Lydell Security?</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Lydell Security LLC provides world-class cybersecurity solutions and capabilities 
                  to combat tomorrow&apos;s threats TODAY. Our frontline expertise and proactive approach 
                  enable businesses to focus less on cyber security risks and focus more on business 
                  growth and success.
                </p>
                <p>
                  We&apos;ve protected organizations handling trillions in assets. We&apos;ve defended 
                  critical financial infrastructure against nation-state actors. And now, we bring 
                  that same level of expertise to organizations of all sizes.
                </p>
                <p>
                  From advanced incident response to AI security consulting, we offer the complete 
                  spectrum of services needed to build and maintain a robust security posture.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/services" className="btn btn-primary">
                  Explore Our Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="font-heading font-extrabold text-4xl text-navy mb-2">20+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="font-heading font-extrabold text-4xl text-navy mb-2">F500</div>
                <div className="text-gray-600 text-sm">Financial Background</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="font-heading font-extrabold text-4xl text-navy mb-2">GREM</div>
                <div className="text-gray-600 text-sm">SANS Certified</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="font-heading font-extrabold text-4xl text-navy mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Incident Response</div>
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
              Ready to Work with Proven Experts?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Schedule a consultation with Larry and the Lydell Security team to discuss 
              your security challenges.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="btn btn-lg bg-white text-alert border-white hover:bg-gray-100"
              >
                Schedule a Consultation
              </Link>
              <Link 
                href="tel:+17702439064" 
                className="btn btn-outline-white btn-lg"
              >
                Call 770-243-9064
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
