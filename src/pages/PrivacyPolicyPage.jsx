import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sectionClass = `mb-10`;
  const h2Class = `text-xl font-mono font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`;
  const h3Class = `text-lg font-mono font-medium mb-3 ${isDark ? 'text-slate-200' : 'text-slate-800'}`;
  const pClass = `text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`;
  const listClass = `text-sm leading-relaxed mb-4 list-disc pl-6 space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`;
  const strongClass = isDark ? 'text-slate-200' : 'text-slate-800';

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Lydell Security</title>
        <meta name="description" content="Lydell Security privacy policy. How we collect, use, and protect your personal information in compliance with CCPA, GDPR, and applicable privacy regulations." />
        <link rel="canonical" href="https://lydellsecurity.com/privacy" />
      </Helmet>

      <Navigation />

      <main className={`min-h-screen pt-24 pb-16 ${isDark ? 'bg-obsidian' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p className={`font-mono text-xs tracking-widest mb-3 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
              LEGAL
            </p>
            <h1 className={`text-3xl md:text-4xl font-mono font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Privacy Policy
            </h1>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Effective Date: April 6, 2026 &nbsp;|&nbsp; Last Updated: April 6, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className={sectionClass}>
            <p className={pClass}>
              Lydell Security ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong className={strongClass}>lydellsecurity.com</strong>, use our services, or interact with us through any channel, including our incident response hotline.
            </p>
            <p className={pClass}>
              By using our website or services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with its terms, please discontinue use of our website and services.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div className={sectionClass}>
            <h2 className={h2Class}>1. Information We Collect</h2>

            <h3 className={h3Class}>1.1 Information You Provide Directly</h3>
            <ul className={listClass}>
              <li><strong className={strongClass}>Incident Response Requests:</strong> Name, email address, phone number, organization name, incident description, and affected systems when you submit our emergency response form.</li>
              <li><strong className={strongClass}>Contact Forms:</strong> Name, email, phone number, and message content when you contact us for general inquiries or partnership discussions.</li>
              <li><strong className={strongClass}>Subcontracting &amp; Partnership Inquiries:</strong> Business name, contact information, and project details submitted for C2C/1099 engagement discussions.</li>
              <li><strong className={strongClass}>Phone Communications:</strong> When you call our IR hotline at 1-877-IR-TEAM (877-478-3266), calls may be recorded for quality assurance, training, and incident forensics documentation with prior notification.</li>
              <li><strong className={strongClass}>SMS Communications:</strong> Phone number and message content when you text our toll-free number. You must explicitly opt in to receive SMS communications from us.</li>
            </ul>

            <h3 className={h3Class}>1.2 Information Collected Automatically</h3>
            <ul className={listClass}>
              <li><strong className={strongClass}>Device &amp; Browser Data:</strong> IP address, browser type and version, operating system, device type, and screen resolution.</li>
              <li><strong className={strongClass}>Usage Data:</strong> Pages visited, time spent on pages, referral source, click patterns, and navigation paths.</li>
              <li><strong className={strongClass}>Cookies &amp; Similar Technologies:</strong> We use strictly necessary cookies for site functionality. See Section 7 for details.</li>
            </ul>

            <h3 className={h3Class}>1.3 Information We Do Not Collect</h3>
            <p className={pClass}>
              We do not collect Social Security numbers, financial account information, payment card numbers, biometric data, or protected health information (PHI) through our website. During incident response engagements, any access to client systems is governed by a separate Master Services Agreement (MSA) and Non-Disclosure Agreement (NDA).
            </p>
          </div>

          {/* 2. How We Use Your Information */}
          <div className={sectionClass}>
            <h2 className={h2Class}>2. How We Use Your Information</h2>
            <p className={pClass}>We use the information we collect for the following purposes:</p>
            <ul className={listClass}>
              <li><strong className={strongClass}>Incident Response Coordination:</strong> To contact you, dispatch our response team, and manage active security incidents.</li>
              <li><strong className={strongClass}>Service Delivery:</strong> To provide cybersecurity consulting, threat hunting, and digital forensics services.</li>
              <li><strong className={strongClass}>Communications:</strong> To respond to your inquiries, send engagement-related updates, and provide requested information about our services.</li>
              <li><strong className={strongClass}>Legal Compliance:</strong> To comply with applicable laws, regulations, court orders, or legal processes.</li>
              <li><strong className={strongClass}>Security &amp; Fraud Prevention:</strong> To detect, prevent, and respond to security threats against our own infrastructure.</li>
              <li><strong className={strongClass}>Website Improvement:</strong> To analyze usage patterns and improve site functionality, content, and user experience.</li>
            </ul>
            <p className={pClass}>
              We do <strong className={strongClass}>not</strong> sell, rent, or trade your personal information to third parties for marketing purposes. We do <strong className={strongClass}>not</strong> use your information for automated decision-making or profiling.
            </p>
          </div>

          {/* 3. Legal Bases for Processing */}
          <div className={sectionClass}>
            <h2 className={h2Class}>3. Legal Bases for Processing (GDPR)</h2>
            <p className={pClass}>If you are located in the European Economic Area (EEA) or United Kingdom, we process your personal data under the following legal bases:</p>
            <ul className={listClass}>
              <li><strong className={strongClass}>Consent:</strong> When you explicitly opt in to SMS communications or submit a contact form.</li>
              <li><strong className={strongClass}>Contractual Necessity:</strong> When processing is required to deliver incident response or consulting services under a signed agreement.</li>
              <li><strong className={strongClass}>Legitimate Interest:</strong> For website analytics, security monitoring, and fraud prevention, balanced against your fundamental rights.</li>
              <li><strong className={strongClass}>Legal Obligation:</strong> When required by applicable law or regulation.</li>
            </ul>
          </div>

          {/* 4. Information Sharing */}
          <div className={sectionClass}>
            <h2 className={h2Class}>4. Information Sharing &amp; Disclosure</h2>
            <p className={pClass}>We may share your information only in the following circumstances:</p>
            <ul className={listClass}>
              <li><strong className={strongClass}>Service Providers:</strong> With vetted third-party vendors who assist in website hosting (Netlify), database infrastructure (Render), communication services (Twilio), and analytics — all bound by data processing agreements.</li>
              <li><strong className={strongClass}>Legal Requirements:</strong> When required by law, subpoena, court order, or government request.</li>
              <li><strong className={strongClass}>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with advance notice to affected individuals.</li>
              <li><strong className={strongClass}>With Your Consent:</strong> When you have provided explicit consent for a specific disclosure.</li>
            </ul>
            <p className={pClass}>
              During incident response engagements, forensic findings are shared exclusively with the contracting organization and, when legally required, with relevant law enforcement or regulatory bodies as specified in the engagement agreement.
            </p>
          </div>

          {/* 5. Data Retention */}
          <div className={sectionClass}>
            <h2 className={h2Class}>5. Data Retention</h2>
            <ul className={listClass}>
              <li><strong className={strongClass}>Website Inquiry Data:</strong> Retained for 24 months from the date of submission, then deleted.</li>
              <li><strong className={strongClass}>Incident Response Records:</strong> Retained for the duration specified in the engagement agreement, typically 36 months, in compliance with applicable regulatory requirements.</li>
              <li><strong className={strongClass}>Call Recordings:</strong> Retained for 12 months, then securely deleted.</li>
              <li><strong className={strongClass}>SMS Records:</strong> Retained for 6 months for compliance verification, then deleted.</li>
              <li><strong className={strongClass}>Website Analytics:</strong> Aggregated and anonymized after 14 months.</li>
            </ul>
          </div>

          {/* 6. Your Rights */}
          <div className={sectionClass}>
            <h2 className={h2Class}>6. Your Rights</h2>

            <h3 className={h3Class}>6.1 California Residents (CCPA/CPRA)</h3>
            <p className={pClass}>Under the California Consumer Privacy Act, as amended by the California Privacy Rights Act and 2026 regulations, you have the right to:</p>
            <ul className={listClass}>
              <li><strong className={strongClass}>Know</strong> what personal information we collect, use, and disclose.</li>
              <li><strong className={strongClass}>Delete</strong> your personal information, subject to legal exceptions.</li>
              <li><strong className={strongClass}>Correct</strong> inaccurate personal information we hold about you.</li>
              <li><strong className={strongClass}>Opt Out</strong> of the sale or sharing of your personal information. We do not sell or share personal information as defined by the CCPA.</li>
              <li><strong className={strongClass}>Non-Discrimination</strong> for exercising your privacy rights.</li>
              <li><strong className={strongClass}>Limit Use</strong> of sensitive personal information. We do not use sensitive personal information beyond what is necessary to provide our services.</li>
            </ul>
            <p className={pClass}>
              To exercise these rights, contact us at <strong className={strongClass}>privacy@lydellsecurity.com</strong>. We will verify your identity and respond within 45 days as required by law.
            </p>

            <h3 className={h3Class}>6.2 EEA/UK Residents (GDPR/UK GDPR)</h3>
            <p className={pClass}>You have the right to access, rectification, erasure, restriction of processing, data portability, and objection. You may also withdraw consent at any time. To exercise these rights, contact <strong className={strongClass}>privacy@lydellsecurity.com</strong>.</p>

            <h3 className={h3Class}>6.3 All Users</h3>
            <ul className={listClass}>
              <li><strong className={strongClass}>Opt Out of SMS:</strong> Reply STOP to any message from our toll-free number at any time.</li>
              <li><strong className={strongClass}>Opt Out of Email:</strong> Click the unsubscribe link in any communication or email <strong className={strongClass}>privacy@lydellsecurity.com</strong>.</li>
              <li><strong className={strongClass}>Do Not Track:</strong> We honor Global Privacy Control (GPC) signals as opt-out requests.</li>
            </ul>
          </div>

          {/* 7. Cookies */}
          <div className={sectionClass}>
            <h2 className={h2Class}>7. Cookies &amp; Tracking Technologies</h2>
            <p className={pClass}>We use only strictly necessary cookies required for website functionality. We do not use advertising cookies, cross-site tracking pixels, or third-party marketing trackers.</p>
            <div className={`overflow-x-auto rounded-lg border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className={isDark ? 'bg-slate-800' : 'bg-slate-50'}>
                    <th className={`px-4 py-3 text-left font-mono text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Cookie</th>
                    <th className={`px-4 py-3 text-left font-mono text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Purpose</th>
                    <th className={`px-4 py-3 text-left font-mono text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Duration</th>
                  </tr>
                </thead>
                <tbody className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  <tr className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <td className="px-4 py-3 font-mono">theme</td>
                    <td className="px-4 py-3">Stores light/dark mode preference</td>
                    <td className="px-4 py-3">1 year</td>
                  </tr>
                  <tr className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <td className="px-4 py-3 font-mono">session</td>
                    <td className="px-4 py-3">Maintains form state during incident submission</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 8. Data Security */}
          <div className={sectionClass}>
            <h2 className={h2Class}>8. Data Security</h2>
            <p className={pClass}>
              We implement industry-standard security measures including TLS 1.3 encryption in transit, AES-256 encryption at rest, access controls, and regular security assessments. As a SOC 2 Type II certified organization, our security controls are independently audited annually.
            </p>
            <p className={pClass}>
              No method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </div>

          {/* 9. Children */}
          <div className={sectionClass}>
            <h2 className={h2Class}>9. Children's Privacy</h2>
            <p className={pClass}>
              Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 18, we will delete it immediately. Contact <strong className={strongClass}>privacy@lydellsecurity.com</strong> if you believe a child has provided us with personal information.
            </p>
          </div>

          {/* 10. Third-Party Links */}
          <div className={sectionClass}>
            <h2 className={h2Class}>10. Third-Party Links</h2>
            <p className={pClass}>
              Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policy of any site you visit.
            </p>
          </div>

          {/* 11. International Transfers */}
          <div className={sectionClass}>
            <h2 className={h2Class}>11. International Data Transfers</h2>
            <p className={pClass}>
              Your information may be transferred to and processed in the United States, where our servers and operations are located. If you are located outside the United States, by using our website you consent to the transfer of your information to the United States. For EEA/UK residents, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission to safeguard international transfers.
            </p>
          </div>

          {/* 12. Changes */}
          <div className={sectionClass}>
            <h2 className={h2Class}>12. Changes to This Policy</h2>
            <p className={pClass}>
              We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated effective date. Your continued use of our website after changes are posted constitutes acceptance of the revised policy.
            </p>
          </div>

          {/* 13. Contact */}
          <div className={sectionClass}>
            <h2 className={h2Class}>13. Contact Us</h2>
            <p className={pClass}>For privacy-related inquiries, data subject requests, or complaints:</p>
            <div className={`p-6 rounded-lg border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong className={strongClass}>Lydell Security</strong><br />
                Attn: Privacy Officer<br />
                Email: <a href="mailto:privacy@lydellsecurity.com" className={isDark ? 'text-cobalt-400 hover:underline' : 'text-cobalt-600 hover:underline'}>privacy@lydellsecurity.com</a><br />
                Phone: <a href="tel:+18774783266" className={isDark ? 'text-cobalt-400 hover:underline' : 'text-cobalt-600 hover:underline'}>1-877-478-3266</a><br />
                Website: <a href="https://lydellsecurity.com" className={isDark ? 'text-cobalt-400 hover:underline' : 'text-cobalt-600 hover:underline'}>lydellsecurity.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
