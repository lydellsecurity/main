import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import MethodologyPage from './pages/MethodologyPage';
import ThreatIntelPage from './pages/ThreatIntelPage';
import ServicesPage from './pages/ServicesPage';
import { PedigreePage, ContactPage } from './pages/OtherPages';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Helmet>
            <title>Lydell Security | Elite Incident Response</title>
            <meta name="description" content="Zero-Dwell Response. Adversaries neutralized. Sovereignty restored. In minutes. 20+ years defending Federal Reserve, NYSE, and Fortune 500 infrastructure." />
            <meta name="keywords" content="incident response, breach response, ransomware recovery, AI forensics, cybersecurity, identity breach, digital sovereignty" />
            <link rel="canonical" href="https://lydellsecurity.com" />
            
            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Lydell Security | Elite Incident Response" />
            <meta property="og:description" content="Zero-Dwell Response. Adversaries neutralized in minutes." />
            <meta property="og:url" content="https://lydellsecurity.com" />
            <meta property="og:site_name" content="Lydell Security" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Lydell Security | Elite Incident Response" />
            <meta name="twitter:description" content="Zero-Dwell Response. 47-minute average containment." />
            
            {/* Schema.org structured data for AEO */}
            <script type="application/ld+json">{`
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Lydell Security",
                "url": "https://lydellsecurity.com",
                "description": "Elite incident response for organizations that refuse to be the next headline. 20+ years defending critical infrastructure.",
                "foundingDate": "2004",
                "founder": {
                  "@type": "Person",
                  "name": "Jr Lydell"
                },
                "areaServed": "Worldwide",
                "serviceType": ["Incident Response", "Ransomware Recovery", "Digital Forensics", "Identity Breach Response"],
                "knowsAbout": ["Cybersecurity", "Incident Response", "Ransomware", "Identity Security", "Threat Hunting"],
                "hasCredential": [
                  {"@type": "EducationalOccupationalCredential", "credentialCategory": "SOC 2 Type II"},
                  {"@type": "EducationalOccupationalCredential", "credentialCategory": "HIPAA"},
                  {"@type": "EducationalOccupationalCredential", "credentialCategory": "PCI-DSS 4.0"}
                ]
              }
            `}</script>
            
            {/* FAQ Schema for AEO */}
            <script type="application/ld+json">{`
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is Zero-Dwell Response?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Zero-Dwell Response is Lydell Security's methodology that prioritizes immediate threat containment over traditional assessment phases. While other firms spend days in discovery, our teams act within minutes—containing threats in an average of 47 minutes while investigating in parallel."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How fast can Lydell Security respond to an active breach?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Lydell Security guarantees a 15-minute response time for active incidents. A senior incident commander will establish contact within 15 minutes, with initial containment typically achieved within 60 minutes of engagement."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What types of incidents does Lydell Security handle?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Lydell Security specializes in AI-driven ransomware attacks, identity infrastructure breaches (SSO/MFA compromise), and full-spectrum persistent access campaigns. Our methodologies are specifically designed for 2026-era threats that traditional IR firms aren't equipped to handle."
                    }
                  }
                ]
              }
            `}</script>
          </Helmet>
          
          <div className="min-h-screen transition-colors duration-300">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/methodology" element={<MethodologyPage />} />
              <Route path="/pedigree" element={<PedigreePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/intel" element={<ThreatIntelPage />} />
              {/* Catch-all route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
