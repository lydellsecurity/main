import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Lydell Security terms of service - terms and conditions for using our website and services.',
}

export default function TermsPage() {
  return (
    <>
      <section className="relative bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/70">Last updated: January 2026</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the Lydell Security LLC ("Company," "we," "our," or "us") 
              website and services, you agree to be bound by these Terms of Service. If you 
              do not agree to these terms, please do not use our services.
            </p>

            <h2>Services Description</h2>
            <p>
              Lydell Security provides cybersecurity consulting services including but not limited to:
            </p>
            <ul>
              <li>AI Incident Response</li>
              <li>Threat Services</li>
              <li>Security Assessments</li>
              <li>Cloud Security</li>
              <li>Adversarial Testing</li>
              <li>Solution Deployment</li>
            </ul>

            <h2>Use of Website</h2>
            <p>You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
              <li>Use the website in any way that violates applicable laws</li>
              <li>Attempt to gain unauthorized access to any systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Transmit any malicious code or harmful content</li>
              <li>Collect information about other users without consent</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and software, is the 
              property of Lydell Security LLC and is protected by intellectual property laws. 
              You may not reproduce, distribute, or create derivative works without our express 
              written permission.
            </p>

            <h2>Service Engagements</h2>
            <p>
              Professional services are provided under separate written agreements (Statements of Work, 
              Master Service Agreements, etc.) that will govern the specific terms of each engagement. 
              These Terms of Service apply to website use and general interactions with our company.
            </p>

            <h2>Confidentiality</h2>
            <p>
              During the course of any engagement, we may receive confidential information. We commit 
              to maintaining the confidentiality of such information in accordance with our professional 
              obligations and any applicable agreements.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Lydell Security LLC shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages arising from your use 
              of our website or services. Our total liability shall not exceed the amounts paid to us 
              for the services giving rise to such liability.
            </p>

            <h2>Disclaimer of Warranties</h2>
            <p>
              Our website and content are provided "as is" without warranties of any kind, either 
              express or implied. We do not warrant that the website will be uninterrupted, secure, 
              or error-free.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Lydell Security LLC and its officers, directors, 
              employees, and agents from any claims, damages, or expenses arising from your use of our 
              website or violation of these Terms.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the 
              content or practices of these external sites.
            </p>

            <h2>Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective 
              immediately upon posting to the website. Your continued use of our services constitutes 
              acceptance of the modified Terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the 
              State of Georgia, without regard to its conflict of law provisions.
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms or your use of our services shall be resolved 
              through binding arbitration in Atlanta, Georgia, in accordance with the rules of the 
              American Arbitration Association.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining provisions 
              shall continue in full force and effect.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us:
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
