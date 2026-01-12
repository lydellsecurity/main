import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Shield, 
  Award, 
  Users, 
  Lightbulb, 
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind Lydell Security. 20+ years of Fortune 500 incident response experience. GREM certified. Now pioneering AI security solutions from Atlanta, Georgia.',
}

const credentials = [
  { label: 'GREM Certified', description: 'GIAC Reverse Engineering Malware' },
  { label: '20+ Years', description: 'Incident Response Experience' },
  { label: 'Financial Sector', description: 'Truist, SunTrust, Fed Reserve, ICE' },
  { label: 'AI Security Pioneer', description: 'AI-IRF Framework Developer' },
]

const values = [
  {
    icon: Shield,
    title: 'Frontline Expertise',
    description: "We don't just advise—we've been in the trenches. Our experience comes from defending real organizations against real threats, not from textbooks.",
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description: 'The threat landscape evolves daily. We invest heavily in research to stay ahead, developing new frameworks and detection capabilities before threats become mainstream.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: "Your security is our mission. We build long-term relationships focused on improving your security posture, not maximizing billable hours.",
  },
  {
    icon: MessageCircle,
    title: 'Transparent Communication',
    description: "Security shouldn't be a black box. We explain our findings clearly and provide actionable guidance you can implement.",
  },
]

const timeline = [
  { year: '2000s', event: 'Incident Response at Major Financial Institutions' },
  { year: '2010s', event: 'Building Enterprise Security Operations' },
  { year: '2022', event: 'Pivot to AI Security Focus' },
  { year: '2023', event: 'AI-IRF Framework Development' },
  { year: '2024', event: 'AI Security Training & Masterclass Launch' },
  { year: '2025', event: "Industry's First AI-Specific YARA Rules" },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Frontline Experience.{' '}
              <span className="text-gradient">AI-First Innovation.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Lydell Security was founded on a simple premise: organizations deploying AI systems 
              deserve security partners who understand both traditional incident response excellence 
              AND the unique challenges of AI-specific threats.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="section-tag">Leadership</span>
              <h2 className="text-3xl md:text-4xl mb-6">Jr Barksdale</h2>
              <p className="text-xl text-navy font-semibold mb-6">CEO & Principal Consultant</p>
              
              <div className="space-y-4 text-gray-600 mb-8">
                <p>
                  With over two decades defending critical infrastructure at major financial 
                  institutions—including Truist Financial, SunTrust Bank, the Federal Reserve 
                  Bank of Atlanta, and ICE—Jr brings unparalleled frontline experience to 
                  Lydell Security.
                </p>
                <p>
                  Holding the prestigious GREM (GIAC Reverse Engineering Malware) certification, 
                  Jr has built enterprise-scale security operations, led complex threat hunting 
                  initiatives, and conducted digital forensics investigations for organizations 
                  handling trillions in assets.
                </p>
                <p>
                  Three years ago, Jr recognized a critical gap in the cybersecurity industry: 
                  Traditional incident response frameworks weren't designed for AI threats. Since 
                  then, he has dedicated his practice exclusively to AI Incident Response, developing 
                  proprietary frameworks and positioning Lydell Security as the definitive authority 
                  in this emerging field.
                </p>
              </div>

              <a 
                href="https://linkedin.com/in/jrbarksdale" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-navy font-semibold hover:text-navy-light transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-heading font-bold text-xl mb-6">Credentials & Expertise</h3>
              <div className="space-y-4">
                {credentials.map((cred, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-850">{cred.label}</div>
                      <div className="text-gray-600 text-sm">{cred.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <span className="section-tag">Our Story</span>
            <h2 className="text-3xl md:text-4xl mb-8">Our Journey</h2>
            
            <div className="space-y-6 text-gray-600 text-lg mb-12">
              <p>
                Lydell Security LLC was founded in Atlanta, Georgia with a mission to provide 
                world-class cybersecurity solutions that combat tomorrow's threats TODAY. Our 
                approach combines decades of frontline incident response experience with 
                forward-looking research into emerging attack vectors.
              </p>
              <p>
                What sets us apart is our dedicated focus on AI security. While many firms are 
                just beginning to add AI to their service offerings, we made the strategic 
                decision three years ago to focus exclusively on the intersection of traditional 
                cybersecurity and artificial intelligence. This specialization allows us to 
                offer capabilities that generalist firms simply cannot match.
              </p>
              <p>
                Today, we serve organizations across industries who recognize that their AI 
                investments require specialized protection. From Fortune 500 enterprises deploying 
                large-scale ML systems to startups building AI-native products, Lydell Security 
                provides the expertise needed to secure the future of intelligent systems.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-6 relative">
                    <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center z-10 flex-shrink-0">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-navy">{item.year}</div>
                      <div className="text-gray-600">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Our Values</span>
            <h2 className="text-3xl md:text-4xl">What We Stand For</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card">
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Location</span>
              <h2 className="text-3xl md:text-4xl mb-6">Based in Atlanta, Serving Globally</h2>
              <p className="text-gray-600 text-lg mb-8">
                Lydell Security is headquartered in Atlanta, Georgia—a hub for cybersecurity 
                talent and home to numerous Fortune 500 companies. While we're proud of our 
                Atlanta roots, we serve clients nationwide and internationally through our 
                remote engagement capabilities.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Location</div>
                    <div className="font-semibold">Atlanta, Georgia, USA</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Phone</div>
                    <a href="tel:+17702439064" className="font-semibold hover:text-navy">770-243-9064</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Email</div>
                    <a href="mailto:support@lydellsecurity.com" className="font-semibold hover:text-navy">
                      support@lydellsecurity.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 text-white">
              <h3 className="font-heading font-bold text-2xl mb-6">Ready to Work Together?</h3>
              <p className="text-white/80 mb-8">
                Let's discuss how Lydell Security can help protect your organization's 
                most critical assets—including your AI systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn bg-white text-navy border-white hover:bg-gray-100">
                  Schedule a Consultation
                </Link>
                <Link href="/services/threat-services" className="btn btn-outline-white">
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
