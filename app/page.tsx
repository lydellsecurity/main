import Link from 'next/link'
import { 
  Shield, 
  CheckCircle, 
  Sparkles, 
  AlertTriangle, 
  Cloud, 
  Settings, 
  Key,
  Trophy,
  Brain,
  GraduationCap,
  ArrowRight,
  Quote
} from 'lucide-react'

// Stats data
const stats = [
  { number: '20+', label: 'Years IR Experience' },
  { number: '$4.45M', label: 'Avg. Breach Cost (IBM 2023)' },
  { number: '72hrs', label: 'Avg. Detection Time' },
  { number: '100%', label: 'Client Resolution Rate' },
]

// Services data
const services = [
  {
    title: 'AI Incident Response',
    description: "The industry's first comprehensive framework for AI-specific threats. Model poisoning, prompt injection, adversarial attacks—we've built the playbook.",
    icon: Sparkles,
    href: '/ai-incident-response',
    featured: true,
    badge: 'FLAGSHIP SERVICE',
  },
  {
    title: 'Threat Services',
    description: 'Incident Response, Threat Hunting, Compromise Assessments, and Managed Detection & Response from frontline veterans.',
    icon: AlertTriangle,
    href: '/services/threat-services',
  },
  {
    title: 'Security Assessments',
    description: 'Comprehensive security evaluations and regulatory compliance for SOC 2, HIPAA, PCI-DSS 4.0, and CMMC 2.0.',
    icon: Shield,
    href: '/services/security-assessments',
  },
  {
    title: 'Cloud Security',
    description: 'AWS, Azure, and GCP security architecture review, CSPM implementation, and cloud-native security consulting.',
    icon: Cloud,
    href: '/services/cloud-security',
  },
  {
    title: 'Solution Deployment',
    description: 'Security tool implementation, SIEM/SOAR configuration, and managed security services tailored to your environment.',
    icon: Settings,
    href: '/services/solution-deployment',
  },
  {
    title: 'Adversarial Testing',
    description: 'Penetration testing, red team exercises, and purple team engagements to validate your security posture.',
    icon: Key,
    href: '/services/adversarial-testing',
  },
]

// Why Lydell data
const whyLydell = [
  {
    title: 'Frontline Veterans',
    description: 'Experience from Fortune 500 financial institutions including Truist, SunTrust, Federal Reserve Bank of Atlanta, and ICE. We\'ve defended organizations handling trillions in assets.',
    icon: Trophy,
  },
  {
    title: 'AI-First Approach',
    description: "Three years dedicated exclusively to AI/ML security research. We've developed the industry's first AI Incident Response Framework while others are still catching up.",
    icon: Brain,
  },
  {
    title: 'Certified Expertise',
    description: 'GREM certified with continuous threat research. Our expertise is validated by industry certifications and proven through real-world incident response engagements.',
    icon: GraduationCap,
  },
]

// Blog posts for insights preview
const blogPosts = [
  {
    title: 'What Is AI Incident Response? A Complete Guide for Security Leaders',
    excerpt: "Traditional IR playbooks weren't designed for model poisoning or prompt injection. Here's what you need to know.",
    category: 'AI Security',
    date: 'January 2026',
    slug: 'what-is-ai-incident-response',
  },
  {
    title: '5 Signs Your AI System Has Been Compromised',
    excerpt: 'Detecting AI-specific attacks requires new indicators. Learn what to look for in your AI/ML infrastructure.',
    category: 'Threat Intel',
    date: 'January 2026',
    slug: 'signs-ai-system-compromised',
  },
  {
    title: 'Building an AI Security Maturity Model for Your Organization',
    excerpt: 'A practical approach to assessing and improving your AI security posture using our seven-phase methodology.',
    category: 'Framework',
    date: 'December 2025',
    slug: 'ai-security-maturity-model',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden pt-20">
        {/* Animated grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Radial gradient overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
              <span className="text-white text-sm font-medium">24/7 Incident Response Available</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-fade-in-up animation-delay-100 opacity-0">
              The <span className="text-gradient">AI Incident Response</span> Authority
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-4 animate-fade-in-up animation-delay-200 opacity-0">
              20+ Years of Fortune 500 Security. Now Pioneering AI Defense.
            </p>

            {/* Description */}
            <p className="text-lg text-white/75 mb-10 max-w-2xl animate-fade-in-up animation-delay-300 opacity-0">
              When traditional playbooks fail against AI-specific threats, Lydell Security bridges 
              the gap with battle-tested expertise and the industry's first AI Incident Response Framework.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up animation-delay-400 opacity-0">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Schedule Strategic Consultation
              </Link>
              <Link href="/contact?urgent=true" className="btn btn-outline-white btn-lg">
                Report an Active Incident
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 animate-fade-in-up animation-delay-500 opacity-0">
              {['GREM Certified', 'Financial Sector Expertise', 'AI-IRF Framework'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading font-extrabold text-4xl md:text-5xl text-navy mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-gray-50" id="services">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Our Services</span>
            <h2 className="text-3xl md:text-4xl mb-4">Comprehensive Cybersecurity Solutions</h2>
            <p className="text-gray-600 text-lg">
              From proactive threat hunting to reactive incident response, we protect 
              your organization at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className={`card card-hover group relative overflow-hidden ${
                  service.featured 
                    ? 'border-alert bg-gradient-to-br from-white to-red-50' 
                    : ''
                }`}
              >
                {/* Top accent line */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 transition-transform duration-300 ${
                    service.featured 
                      ? 'bg-alert scale-x-100' 
                      : 'bg-navy scale-x-0 group-hover:scale-x-100'
                  }`} 
                />

                {service.featured && (
                  <span className="inline-block bg-alert text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {service.badge}
                  </span>
                )}

                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-navy/10 transition-colors">
                  <service.icon className="w-7 h-7 text-navy" />
                </div>

                <h3 className="font-heading font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>

                <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-navy group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lydell Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Why Lydell Security</span>
            <h2 className="text-3xl md:text-4xl">Battle-Tested. AI-Ready. Trusted.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {whyLydell.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-navy to-navy-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-navy relative overflow-hidden">
        {/* Large quote decoration */}
        <div className="absolute top-0 left-10 text-white/5 text-[400px] font-serif leading-none select-none">
          "
        </div>

        <div className="container-custom relative z-10">
          <div className="section-header">
            <span className="section-tag text-teal-400">Client Success</span>
            <h2 className="text-3xl md:text-4xl text-white">Trusted by Security Leaders</h2>
            <p className="text-white/70 text-lg">Hear from organizations we've helped defend.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
              <Quote className="w-12 h-12 text-white/20 mb-6" />
              <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 italic">
                "The Lydell Security team always improves and fixes problems very quickly. 
                Their extensive experience and competency are impressive and top-notch! 
                When our AI systems faced unexpected threats, they had a framework ready 
                while others were scrambling."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-navy-light rounded-full flex items-center justify-center text-white font-heading font-bold text-lg">
                  SC
                </div>
                <div>
                  <div className="text-white font-semibold">Steve Callahan</div>
                  <div className="text-white/60 text-sm">VP of IT Operations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Insights</span>
            <h2 className="text-3xl md:text-4xl mb-4">Latest from Our Research</h2>
            <p className="text-gray-600 text-lg">
              Thought leadership on AI security, threat intelligence, and incident response.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="card card-hover group overflow-hidden p-0"
              >
                <div className="h-48 bg-gradient-to-br from-navy to-navy-light relative">
                  <span className="absolute top-4 left-4 bg-alert text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <h3 className="font-heading font-bold text-lg mt-2 mb-3 group-hover:text-navy transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/insights" className="btn btn-secondary">
              View All Insights
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-cta-gradient text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Ready to Secure Your AI Future?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Whether you're facing an active incident or planning your AI security 
              strategy, we're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="btn btn-lg bg-white text-alert border-white hover:bg-gray-100 hover:border-gray-100"
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
