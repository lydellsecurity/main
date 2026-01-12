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
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-white shadow-sm'
      }`}
      style={{ zIndex: 9999 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl text-navy">
              LYDELL SECURITY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            <Link
              href="/"
              className="font-heading font-medium text-sm text-slate-750 hover:text-navy transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 font-heading font-medium text-sm text-slate-750 hover:text-navy transition-colors">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 pt-2"
                  style={{ zIndex: 10000 }}
                >
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
              className="font-heading font-medium text-sm text-alert hover:text-alert-dark transition-colors"
            >
              AI Incident Response
            </Link>
            <Link
              href="/about"
              className="font-heading font-medium text-sm text-slate-750 hover:text-navy transition-colors"
            >
              About
            </Link>
            <Link
              href="/insights"
              className="font-heading font-medium text-sm text-slate-750 hover:text-navy transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/resources"
              className="font-heading font-medium text-sm text-slate-750 hover:text-navy transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="font-heading font-medium text-sm text-slate-750 hover:text-navy transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTAs - Properly spaced */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-3 py-2 font-heading font-semibold text-xs rounded-md border-2 bg-transparent text-navy border-navy hover:bg-navy hover:text-white transition-all whitespace-nowrap"
            >
              Consultation
            </Link>
            <Link 
              href="/contact?urgent=true" 
              className="inline-flex items-center justify-center px-3 py-2 font-heading font-semibold text-xs rounded-md border-2 bg-alert text-white border-alert hover:bg-alert-dark hover:border-alert-dark transition-all whitespace-nowrap"
            >
              Report Incident
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden p-2 -mr-2"
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
          <div 
            className="xl:hidden py-4 border-t border-gray-100 bg-white"
            style={{ zIndex: 9998 }}
          >
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
                  className="inline-flex items-center justify-center px-4 py-3 font-heading font-semibold text-sm rounded-md border-2 bg-transparent text-navy border-navy hover:bg-navy hover:text-white transition-all w-full"
                  onClick={closeMobileMenu}
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="/contact?urgent=true"
                  className="inline-flex items-center justify-center px-4 py-3 font-heading font-semibold text-sm rounded-md border-2 bg-alert text-white border-alert hover:bg-alert-dark hover:border-alert-dark transition-all w-full"
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
