// netlify/functions/threat-intel.js
// API endpoint that serves cached threat intel (fast, no API calls)

import { getStore } from "@netlify/blobs";

// Fallback articles when cache is empty
const FALLBACK_ARTICLES = [
  {
    id: 'fallback-1',
    category: 'ransomware',
    severity: 'critical',
    title: 'AI-Powered Ransomware Campaigns Accelerating',
    summary: 'Security researchers observe increased use of AI-generated phishing lures and automated lateral movement in ransomware attacks targeting enterprise environments.',
    details: 'Ransomware operators are increasingly leveraging AI tools to craft highly convincing phishing emails and automate reconnaissance within compromised networks. This evolution reduces the time from initial access to ransomware deployment from weeks to hours.\n\nThe attacks primarily target organizations with hybrid cloud environments where identity federation creates expanded attack surfaces. Initial access vectors include compromised VPN credentials and exploitation of unpatched edge devices.\n\nOrganizations should implement phishing-resistant MFA, segment networks aggressively, and maintain tested offline backups. Early detection through behavioral analytics is critical as traditional signature-based detection struggles against AI-generated content.',
    affected_sectors: ['Healthcare', 'Financial Services', 'Manufacturing'],
    threat_actors: 'Multiple RaaS Operations',
    iocs: [],
    mitre_tactics: ['Initial Access', 'Execution', 'Lateral Movement', 'Impact'],
    source: 'Threat Intelligence',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'fallback-2',
    category: 'vulnerabilities',
    severity: 'critical',
    title: 'Critical Authentication Bypass in Enterprise Software',
    summary: 'A critical vulnerability allowing authentication bypass has been identified in widely-deployed enterprise software, with active exploitation confirmed in the wild.',
    details: 'Security researchers have disclosed a critical authentication bypass vulnerability affecting enterprise identity and access management solutions. The flaw allows unauthenticated attackers to forge authentication tokens and gain administrative access.\n\nExploitation requires network access to the affected system but no prior authentication. Proof-of-concept code is publicly available, and active exploitation has been confirmed by multiple threat intelligence sources.\n\nImmediate patching is strongly recommended. Organizations unable to patch immediately should implement network-level access controls and enhanced monitoring for anomalous authentication events.',
    affected_sectors: ['All Sectors'],
    threat_actors: 'Multiple',
    iocs: [],
    mitre_tactics: ['Initial Access', 'Privilege Escalation'],
    source: 'Security Advisory',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'fallback-3',
    category: 'apt',
    severity: 'high',
    title: 'Nation-State Actor Targeting Critical Infrastructure',
    summary: 'Intelligence agencies have issued warnings about sophisticated intrusion campaigns targeting energy sector organizations and industrial control systems.',
    details: 'A joint advisory from multiple intelligence agencies warns of ongoing cyber operations by a nation-state actor targeting critical infrastructure, with particular focus on energy sector organizations operating industrial control systems.\n\nThe threat actor employs spear-phishing with industry-specific lures, exploitation of internet-facing systems, and living-off-the-land techniques to maintain persistent access while evading detection.\n\nCritical infrastructure operators should implement network segmentation between IT and OT environments, enhance monitoring for anomalous access patterns, and ensure incident response plans address ICS-specific scenarios.',
    affected_sectors: ['Energy', 'Utilities', 'Critical Infrastructure'],
    threat_actors: 'Nation-State APT',
    iocs: [],
    mitre_tactics: ['Reconnaissance', 'Initial Access', 'Persistence', 'Collection'],
    source: 'Government Advisory',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'fallback-4',
    category: 'data-breach',
    severity: 'high',
    title: 'Healthcare Data Breach Exposes Patient Records',
    summary: 'A major healthcare provider has disclosed a significant data breach potentially affecting millions of patients, with protected health information among the exposed data.',
    details: 'A healthcare organization has disclosed a data breach resulting from unauthorized access to systems containing protected health information. The breach potentially affects millions of patients whose records were stored in compromised databases.\n\nPreliminary investigation indicates attackers gained initial access through a compromised third-party vendor with network connectivity to patient record systems. Exposed data may include names, dates of birth, medical record numbers, and treatment information.\n\nThe organization has engaged forensic investigators and is offering credit monitoring to affected individuals. Healthcare organizations should review third-party access controls and ensure business associate agreements include appropriate security requirements.',
    affected_sectors: ['Healthcare'],
    threat_actors: 'Unknown',
    iocs: [],
    mitre_tactics: ['Initial Access', 'Collection', 'Exfiltration'],
    source: 'Data Breach Notification',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'fallback-5',
    category: 'malware',
    severity: 'medium',
    title: 'Info-Stealer Malware Campaign Targets Enterprise Credentials',
    summary: 'A new information-stealing malware variant is being distributed through malicious advertisements and trojanized software, specifically targeting enterprise credentials and session tokens.',
    details: 'Security researchers have identified a new information-stealing malware campaign distributing malware through malvertising and trojanized versions of popular software tools. The malware specifically targets browser-stored credentials, session cookies, and cryptocurrency wallets.\n\nThe malware employs anti-analysis techniques including virtual machine detection and encrypted command-and-control communications. Stolen credentials are used to facilitate follow-on attacks including business email compromise and unauthorized access to cloud services.\n\nOrganizations should enforce application whitelisting, implement browser isolation for high-risk users, and deploy endpoint detection capabilities that identify credential theft behaviors.',
    affected_sectors: ['Technology', 'Financial Services', 'Professional Services'],
    threat_actors: 'Cybercrime',
    iocs: [],
    mitre_tactics: ['Execution', 'Credential Access', 'Collection', 'Exfiltration'],
    source: 'Malware Analysis',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'fallback-6',
    category: 'ransomware',
    severity: 'high',
    title: 'Ransomware Group Targets Backup Infrastructure',
    summary: 'Ransomware operators are increasingly targeting backup infrastructure and disaster recovery systems to maximize impact and pressure victims into paying ransoms.',
    details: 'Threat intelligence indicates ransomware groups are prioritizing the identification and destruction of backup systems before deploying encryption payloads. This tactic significantly increases pressure on victims by eliminating recovery options.\n\nAttackers are targeting backup software credentials, cloud backup configurations, and offline backup schedules. Some groups maintain access for extended periods to ensure backup rotations include only compromised data.\n\nOrganizations should implement immutable backup storage, maintain truly offline backup copies, test restoration procedures regularly, and ensure backup credentials are not stored in compromised identity systems.',
    affected_sectors: ['All Sectors'],
    threat_actors: 'Multiple Ransomware Groups',
    iocs: [],
    mitre_tactics: ['Impact', 'Inhibit Response Function'],
    source: 'Threat Intelligence',
    date: new Date().toISOString().split('T')[0]
  }
];

export default async (request, context) => {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=900, s-maxage=3600', // Browser: 15min, CDN: 1hr
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    // Try to get cached data from Netlify Blobs
    const store = getStore('threat-intel');
    const cached = await store.get('latest', { type: 'json' });

    if (cached && cached.articles && cached.articles.length > 0) {
      // Check if cache is still valid (< 4 hours old)
      const expiresAt = new Date(cached.expires_at);
      const isExpired = new Date() > expiresAt;

      return new Response(JSON.stringify({
        success: true,
        articles: cached.articles,
        generated_at: cached.generated_at,
        cached: true,
        stale: isExpired,
      }), { status: 200, headers });
    }

    // No cache available, return fallback
    return new Response(JSON.stringify({
      success: true,
      articles: FALLBACK_ARTICLES,
      generated_at: new Date().toISOString(),
      cached: false,
      fallback: true,
    }), { status: 200, headers });

  } catch (error) {
    console.error('Error reading cache:', error);
    
    // Return fallback on any error
    return new Response(JSON.stringify({
      success: true,
      articles: FALLBACK_ARTICLES,
      generated_at: new Date().toISOString(),
      cached: false,
      fallback: true,
      error: error.message,
    }), { status: 200, headers });
  }
};

export const config = {
  path: '/api/threat-intel',
};
