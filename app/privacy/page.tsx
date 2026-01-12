import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Lydell Security privacy policy - how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/70">Last updated: January 2026</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Introduction</h2>
            <p>
              Lydell Security LLC ("we," "our," or "us") respects your privacy and is committed 
              to protecting your personal data. This privacy policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Information You Provide</h3>
            <p>We may collect information you provide directly, including:</p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Company name and job title</li>
              <li>Messages sent through contact forms</li>
              <li>Information provided during service engagements</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Device and operating system information</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Respond to your inquiries and provide services</li>
              <li>Send relevant communications about our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraudulent or unauthorized activity</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with:
            </p>
            <ul>
              <li>Service providers who assist our operations</li>
              <li>Professional advisors (lawyers, accountants)</li>
              <li>Law enforcement when required by law</li>
              <li>Parties involved in business transactions (mergers, acquisitions)</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal data against unauthorized access, alteration, disclosure, or destruction. 
              However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have rights to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              Our website may use cookies and similar technologies to enhance your experience. 
              You can control cookies through your browser settings.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for 
              the privacy practices of these external sites.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect 
              personal information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us:
            </p>
            <ul>
              <li>Email: support@lydellsecurity.com</li>
              <li>Phone: 770-243-9064</li>
              <li>Address: Atlanta, Georgia, USA</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
