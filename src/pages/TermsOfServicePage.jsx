import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TermsOfServicePage = () => {
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
        <title>Terms of Service | Lydell Security</title>
        <meta name="description" content="Lydell Security terms of service. Terms governing the use of our website, incident response services, and subcontracting engagements." />
        <link rel="canonical" href="https://lydellsecurity.com/terms" />
      </Helmet>

      <Navigation />

      <main className={`min-h-screen pt-24 pb-16 ${isDark ? 'bg-obsidian' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p className={`font-mono text-xs tracking-widest mb-3 ${isDark ? 'text-cobalt-400' : 'text-cobalt-600'}`}>
              LEGAL
            </p>
            <h1 className={`text-3xl md:text-4xl font-mono font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Terms of Service
            </h1>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Effective Date: April 6, 2026 &nbsp;|&nbsp; Last Updated: April 6, 2026
            </p>
          </div>

          {/* 1. Acceptance */}
          <div className={sectionClass}>
            <h2 className={h2Class}>1. Acceptance of Terms</h2>
            <p className={pClass}>
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and Lydell Security ("we," "us," or "our"). By accessing or using our website at <strong className={strongClass}>lydellsecurity.com</strong>, contacting us via phone, email, or form submission, or engaging our services, you agree to be bound by these Terms.
            </p>
            <p className={pClass}>
              If you do not agree to these Terms, you must not access or use our website or services. If you are accepting these Terms on behalf of an organization, you represent that you have the authority to bind that organization.
            </p>
          </div>

          {/* 2. Services */}
          <div className={sectionClass}>
            <h2 className={h2Class}>2. Description of Services</h2>
            <p className={pClass}>Lydell Security provides the following cybersecurity services:</p>
            <ul className={listClass}>
              <li><strong className={strongClass}>Agentic Incident Response:</strong> Emergency containment, eradication, and recovery for active security breaches.</li>
              <li><strong className={strongClass}>AI-Driven Ransomware Neutralization:</strong> Behavioral AI interception and decryption services for ransomware events.</li>
              <li><strong className={strongClass}>Identity Infrastructure Takeback:</strong> Federation-wide session termination, MFA resets, and credential theft remediation.</li>
              <li><strong className={strongClass}>Digital Sovereignty Restoration:</strong> Living-off-the-land detection, assume-breach threat hunting, and persistent access eradication.</li>
              <li><strong className={strongClass}>C2C/1099 Subcontracting:</strong> Retained incident response capabilities for Prime Contractors, MSPs, MSSPs, and Cyber Insurance Panels.</li>
            </ul>
            <p className={pClass}>
              Service delivery is governed by a separate Master Services Agreement (MSA), Statement of Work (SOW), or engagement letter specific to each client relationship. These Terms govern website use and initial contact only.
            </p>
          </div>

          {/* 3. Website Use */}
          <div className={sectionClass}>
            <h2 className={h2Class}>3. Website Use</h2>

            <h3 className={h3Class}>3.1 Permitted Use</h3>
            <p className={pClass}>You may use our website for lawful purposes, including viewing information about our services, submitting inquiries, reading our threat intelligence blog, and initiating incident response requests.</p>

            <h3 className={h3Class}>3.2 Prohibited Use</h3>
            <p className={pClass}>You agree not to:</p>
            <ul className={listClass}>
              <li>Use the website in any way that violates applicable federal, state, local, or international law or regulation.</li>
              <li>Attempt to probe, scan, or test the vulnerability of our systems or breach any security or authentication measures.</li>
              <li>Interfere with or disrupt the website, servers, or networks connected to the website.</li>
              <li>Use automated systems (bots, scrapers, crawlers) to access the website without our prior written consent, except for search engine indexing.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
              <li>Submit false, fraudulent, or misleading incident response requests.</li>
              <li>Transmit malware, viruses, or other malicious code through our contact forms or communication channels.</li>
            </ul>
          </div>

          {/* 4. Incident Response */}
          <div className={sectionClass}>
            <h2 className={h2Class}>4. Emergency Incident Response Requests</h2>
            <p className={pClass}>
              When you submit an incident response request through our website or call our IR hotline at <strong className={strongClass}>1-877-IR-TEAM (877-478-3266)</strong>:
            </p>
            <ul className={listClass}>
              <li>You represent that you have the authority to request incident response services on behalf of the affected organization.</li>
              <li>You understand that our <strong className={strongClass}>15-Minute Response Guarantee</strong> refers to initial contact by a senior incident commander, not full incident resolution.</li>
              <li>Formal engagement requires execution of an MSA, SOW, or engagement letter. Initial triage communications do not create a binding service agreement.</li>
              <li>You consent to call recording when contacting our hotline. A notification is provided at the beginning of each call.</li>
              <li>Information provided during initial triage is treated as confidential under our standard NDA terms.</li>
            </ul>
          </div>

          {/* 5. SMS */}
          <div className={sectionClass}>
            <h2 className={h2Class}>5. SMS Communications &amp; Consent</h2>
            <p className={pClass}>
              By checking the SMS consent checkbox on our incident response form, you expressly consent to receive text messages from Lydell Security at the phone number you provide. This consent is not a condition of purchasing any goods or services.
            </p>
            <ul className={listClass}>
              <li><strong className={strongClass}>Message Types:</strong> Incident status updates, response team coordination, and engagement-related communications only. We do not send marketing or promotional messages via SMS.</li>
              <li><strong className={strongClass}>Message Frequency:</strong> Varies based on active incident status. Typically 1-10 messages per engagement.</li>
              <li><strong className={strongClass}>Message &amp; Data Rates:</strong> Standard message and data rates from your carrier may apply.</li>
              <li><strong className={strongClass}>Opt Out:</strong> Reply <strong className={strongClass}>STOP</strong> to any message at any time to opt out. You will receive a single confirmation message.</li>
              <li><strong className={strongClass}>Help:</strong> Reply <strong className={strongClass}>HELP</strong> for assistance or contact <strong className={strongClass}>response@lydellsecurity.com</strong>.</li>
              <li><strong className={strongClass}>Supported Carriers:</strong> All major U.S. carriers are supported. Carriers are not liable for delayed or undelivered messages.</li>
            </ul>
          </div>

          {/* 6. Intellectual Property */}
          <div className={sectionClass}>
            <h2 className={h2Class}>6. Intellectual Property</h2>
            <p className={pClass}>
              All content on this website — including text, graphics, logos, methodologies, service names, blog articles, and the overall design — is the property of Lydell Security and protected by United States and international copyright, trademark, and intellectual property laws.
            </p>
            <ul className={listClass}>
              <li><strong className={strongClass}>Trademarks:</strong> "Lydell Security," "Zero-Dwell Response," "Digital Sovereignty Restoration," "Agentic Ransomware Neutralization," and "Identity Infrastructure Takeback" are trademarks of Lydell Security.</li>
              <li><strong className={strongClass}>Blog Content:</strong> Articles published on our Threat Intelligence Blog may be cited with proper attribution and a link to the original post. Reproduction in full without permission is prohibited.</li>
              <li><strong className={strongClass}>Methodologies:</strong> Our incident response methodologies, detection signatures, and decryptor tools are proprietary and confidential.</li>
            </ul>
          </div>

          {/* 7. Disclaimers */}
          <div className={sectionClass}>
            <h2 className={h2Class}>7. Disclaimers</h2>

            <h3 className={h3Class}>7.1 Website Content</h3>
            <p className={pClass}>
              The information on this website is provided for general informational purposes only. Blog articles, threat intelligence reports, and technical analysis are educational in nature and do not constitute professional cybersecurity advice specific to your environment.
            </p>

            <h3 className={h3Class}>7.2 No Guarantee of Outcome</h3>
            <p className={pClass}>
              While we maintain a proven track record across Federal Reserve, NYSE, and Fortune 500 engagements, every security incident is unique. We do not guarantee specific outcomes, complete data recovery, or prevention of all future incidents. Our 15-Minute Response Guarantee applies to initial commander contact only.
            </p>

            <h3 className={h3Class}>7.3 "As Is" Basis</h3>
            <p className={pClass}>
              THE WEBSITE AND ITS CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </div>

          {/* 8. Limitation of Liability */}
          <div className={sectionClass}>
            <h2 className={h2Class}>8. Limitation of Liability</h2>
            <p className={pClass}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, LYDELL SECURITY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE WEBSITE, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, REVENUE, OR BUSINESS OPPORTUNITIES. OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO WEBSITE USE SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100.00).
            </p>
            <p className={pClass}>
              Liability related to professional service engagements is governed by the applicable MSA or SOW, not these Terms.
            </p>
          </div>

          {/* 9. Indemnification */}
          <div className={sectionClass}>
            <h2 className={h2Class}>9. Indemnification</h2>
            <p className={pClass}>
              You agree to indemnify, defend, and hold harmless Lydell Security, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, costs, and expenses (including attorneys' fees) arising from your violation of these Terms, your use of the website, or your infringement of any third-party rights.
            </p>
          </div>

          {/* 10. Governing Law */}
          <div className={sectionClass}>
            <h2 className={h2Class}>10. Governing Law &amp; Dispute Resolution</h2>
            <p className={pClass}>
              These Terms are governed by the laws of the State of Georgia, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration shall be conducted in Atlanta, Georgia.
            </p>
            <p className={pClass}>
              Notwithstanding the above, either party may seek injunctive or equitable relief in any court of competent jurisdiction for matters involving intellectual property or confidential information.
            </p>
          </div>

          {/* 11. Subcontracting Terms */}
          <div className={sectionClass}>
            <h2 className={h2Class}>11. Subcontracting &amp; Partner Engagements</h2>
            <p className={pClass}>
              For Prime Contractors, MSPs, MSSPs, and Cyber Insurance Panels engaging Lydell Security under C2C or 1099 arrangements:
            </p>
            <ul className={listClass}>
              <li>All subcontracting relationships require a signed Subcontractor Agreement prior to engagement activation.</li>
              <li>Lydell Security maintains its own SOC 2 Type II, HIPAA, PCI-DSS 4.0, CMMC 2.0, and FedRAMP Ready certifications. Compliance attestation letters are available upon request under NDA.</li>
              <li>Rate cards, SLA terms, and retainer structures are provided during the partnership discussion process and are not published on this website.</li>
              <li>Lydell Security maintains independent contractor status in all 1099 arrangements and is responsible for its own tax obligations, insurance, and compliance.</li>
            </ul>
          </div>

          {/* 12. Modifications */}
          <div className={sectionClass}>
            <h2 className={h2Class}>12. Modifications to Terms</h2>
            <p className={pClass}>
              We reserve the right to modify these Terms at any time. Material changes will be posted on this page with an updated effective date. Your continued use of the website after modifications are posted constitutes acceptance of the revised Terms. We encourage you to review these Terms periodically.
            </p>
          </div>

          {/* 13. Severability */}
          <div className={sectionClass}>
            <h2 className={h2Class}>13. Severability</h2>
            <p className={pClass}>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </div>

          {/* 14. Contact */}
          <div className={sectionClass}>
            <h2 className={h2Class}>14. Contact Information</h2>
            <p className={pClass}>For questions about these Terms:</p>
            <div className={`p-6 rounded-lg border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong className={strongClass}>Lydell Security</strong><br />
                Attn: Legal Department<br />
                Email: <a href="mailto:legal@lydellsecurity.com" className={isDark ? 'text-cobalt-400 hover:underline' : 'text-cobalt-600 hover:underline'}>legal@lydellsecurity.com</a><br />
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

export default TermsOfServicePage;
