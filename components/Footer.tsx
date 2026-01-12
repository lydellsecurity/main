import Link from 'next/link'
import { Shield, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'AI Incident Response', href: '/ai-incident-response' },
    { name: 'Threat Services', href: '/services/threat-services' },
    { name: 'Security Assessments', href: '/services/security-assessments' },
    { name: 'Cloud Security', href: '/services/cloud-security' },
    { name: 'Adversarial Testing', href: '/services/adversarial-testing' },
  ],
  resources: [
    { name: 'Insights & Blog', href: '/insights' },
    { name: 'AI-IRF Framework', href: '/resources#ai-irf' },
    { name: 'Whitepapers', href: '/resources#whitepapers' },
    { name: 'Case Studies', href: '/resources#case-studies' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-850 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-navy-light rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">
                LYDELL SECURITY
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The AI Incident Response Authority. 20+ years of Fortune 500 security 
              experience, now pioneering the future of AI defense.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/lydellsecurity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-navy-light transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/lydellsecurity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-navy-light transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+17702439064"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  770-243-9064
                </a>
              </li>
              <li>
                <a
                  href="tel:+18008932145"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  800-893-2145 (Toll-Free)
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@lydellsecurity.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  support@lydellsecurity.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                Atlanta, Georgia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            ©{new Date().getFullYear()} Lydell Security LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
