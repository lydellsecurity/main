'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Send,
  CheckCircle
} from 'lucide-react'

const services = [
  'AI Incident Response',
  'Threat Services',
  'Security Assessments',
  'Cloud Security',
  'Solution Deployment',
  'Adversarial Testing',
  'Other',
]

function ContactForm() {
  const searchParams = useSearchParams()
  const isUrgent = searchParams.get('urgent') === 'true'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    urgent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isUrgent) {
      setFormData(prev => ({ ...prev, urgent: true }))
    }
  }, [isUrgent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission (replace with actual Netlify form or API)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <>
      {/* Urgent Notice */}
      {isUrgent && (
        <section className="bg-alert py-4">
          <div className="container-custom">
            <div className="flex items-center gap-4 text-white">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <div>
                <span className="font-semibold">Reporting an Active Incident?</span>
                {' '}Call us immediately at{' '}
                <a href="tel:+17702439064" className="underline font-bold">770-243-9064</a>
                {' '}for 24/7 emergency response.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-heading font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <a href="tel:+17702439064" className="text-gray-600 hover:text-navy block">
                      770-243-9064
                    </a>
                    <a href="tel:+18008932145" className="text-gray-600 hover:text-navy block text-sm">
                      800-893-2145 (Toll-Free)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a href="mailto:support@lydellsecurity.com" className="text-gray-600 hover:text-navy">
                      support@lydellsecurity.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Location</div>
                    <div className="text-gray-600">Atlanta, Georgia, USA</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Hours</div>
                    <div className="text-gray-600">24/7 for Incidents</div>
                    <div className="text-gray-500 text-sm">Business hours: M-F 9AM-6PM EST</div>
                  </div>
                </div>
              </div>

              {/* Emergency Box */}
              <div className="bg-alert/10 border border-alert/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-alert" />
                  <span className="font-heading font-bold text-alert">Active Incident?</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  If you&apos;re experiencing an active security incident, don&apos;t wait. 
                  Call us immediately for emergency response.
                </p>
                <a 
                  href="tel:+17702439064" 
                  className="btn btn-primary w-full"
                >
                  <Phone className="w-4 h-4" />
                  Call Now: 770-243-9064
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl mb-4">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      We&apos;ve received your message and will respond within 24 hours.
                      {formData.urgent && ' Since you indicated this is urgent, we\'ll prioritize your request.'}
                    </p>
                    <Link href="/" className="btn btn-secondary">
                      Return to Home
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true">
                    <input type="hidden" name="form-name" value="contact" />
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold mb-2">
                          Name <span className="text-alert">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">
                          Email <span className="text-alert">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all"
                          placeholder="Your company"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="service" className="block text-sm font-semibold mb-2">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select a service...</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-semibold mb-2">
                        Message <span className="text-alert">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all resize-none"
                        placeholder="Tell us about your security needs..."
                      />
                    </div>

                    <div className="mb-8">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="urgent"
                          checked={formData.urgent}
                          onChange={handleChange}
                          className="w-5 h-5 rounded border-gray-300 text-alert focus:ring-alert"
                        />
                        <span className="text-sm">
                          <span className="font-semibold text-alert">This is urgent</span>
                          {' '}— I need immediate incident response assistance
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactFormLoading() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-navy/30 border-t-navy rounded-full animate-spin" />
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Let&apos;s Discuss Your Security
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Whether you&apos;re facing an active incident or planning your security strategy, 
              we&apos;re here to help protect your organization.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<ContactFormLoading />}>
        <ContactForm />
      </Suspense>
    </>
  )
}
