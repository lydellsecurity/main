'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Shield } from 'lucide-react'

const services = [
  { name: 'Threat Services', href: '/services/threat-services' },
  { name: 'Security Assessments', href: '/services/security-assessments' },
  { name: 'Cloud Security', href: '/services/cloud-security' },
  { name: 'Solution Deployment', href: '/services/solution-deployment' },
  { name: 'Adversarial Testing', href: '/services/adversarial-testing' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-md'
          : 'bg-white/97 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-navy">
              LYDELL SECURITY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="font-heading font-medium text-slate-750 hover:text-navy transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 font-heading font-medium text-slate-750 hover:text-navy transition-colors">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[220px]">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-slate-750 hover:bg-gray-50 hover:text-navy transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/ai-incident-response"
              className="font-heading font-medium text-alert hover:text-alert-dark transition-colors"
            >
              AI Incident Response
            </Link>
            <Link
              href="/about"
              className="font-heading font-medium text-slate-750 hover:text-navy transition-colors"
            >
              About
            </Link>
            <Link
              href="/insights"
              className="font-heading font-medium text-slate-750 hover:text-navy transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/resources"
              className="font-heading font-medium text-slate-750 hover:text-navy transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="font-heading font-medium text-slate-750 hover:text-navy transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="btn btn-outline btn-sm">
              Schedule Consultation
            </Link>
            <Link href="/contact?urgent=true" className="btn btn-primary btn-sm">
              Report Incident
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-750" />
            ) : (
              <Menu className="w-6 h-6 text-slate-750" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="font-heading font-medium text-slate-750 hover:text-navy"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              
              <div className="space-y-2">
                <span className="font-heading font-medium text-slate-750">Services</span>
                <div className="pl-4 space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block text-sm text-gray-600 hover:text-navy"
                      onClick={closeMobileMenu}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/ai-incident-response"
                className="font-heading font-medium text-alert"
                onClick={closeMobileMenu}
              >
                AI Incident Response
              </Link>
              <Link
                href="/about"
                className="font-heading font-medium text-slate-750 hover:text-navy"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                href="/insights"
                className="font-heading font-medium text-slate-750 hover:text-navy"
                onClick={closeMobileMenu}
              >
                Insights
              </Link>
              <Link
                href="/resources"
                className="font-heading font-medium text-slate-750 hover:text-navy"
                onClick={closeMobileMenu}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="font-heading font-medium text-slate-750 hover:text-navy"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>

              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <Link
                  href="/contact"
                  className="btn btn-outline w-full"
                  onClick={closeMobileMenu}
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="/contact?urgent=true"
                  className="btn btn-primary w-full"
                  onClick={closeMobileMenu}
                >
                  Report Incident
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
