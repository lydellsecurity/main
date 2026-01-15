// netlify/functions/threat-intel.js
// Simplified API endpoint - calls Claude when needed, with CDN caching

// Static fallback articles (always available)
const FALLBACK_ARTICLES = [
  {
    id: 'intel-001',
    category: 'ransomware',
    severity: 'critical',
    title: 'AI-Powered Ransomware Campaigns Accelerating Across Enterprise Targets',
    summary: 'Security researchers observe increased use of AI-generated phishing lures and automated lateral movement in ransomware attacks targeting enterprise environments.',
    details: 'Ransomware operators are increasingly leveraging AI tools to craft highly convincing phishing emails and automate reconnaissance within compromised networks. This evolution reduces the time from initial access to ransomware deployment from weeks to hours.\n\nThe attacks primarily target organizations with hybrid cloud environments where identity federation creates expanded attack surfaces. Initial access vectors include compromised VPN credentials and exploitation of unpatched edge devices.\n\nOrganizations should implement phishing-resistant MFA, segment networks aggressively, and maintain tested offline backups. Early detection through behavioral analytics is critical as traditional signature-based detection struggles against AI-generated content.',
    affected_sectors: ['Healthcare', 'Financial Services', 'Manufacturing', 'Education'],
    threat_actors: 'Multiple RaaS Operations',
    iocs: [],
    mitre_tactics: ['Initial Access', 'Execution', 'Lateral Movement', 'Impact'],
    source: 'Threat Intelligence Analysis',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'intel-002',
    category: 'vulnerabilities',
    severity: 'critical',
    title: 'Critical Authentication Bypass in Enterprise Identity Solutions',
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
    id: 'intel-003',
    category: 'apt',
    severity: 'high',
    title: 'Nation-State Actor Campaign Targeting Critical Infrastructure',
    summary: 'Intelligence agencies have issued warnings about sophisticated intrusion campaigns targeting energy sector organizations and industrial control systems.',
    details: 'A joint advisory from multiple intelligence agencies warns of ongoing cyber operations by a nation-state actor targeting critical infrastructure, with particular focus on energy sector organizations operating industrial control systems.\n\nThe threat actor employs spear-phishing with industry-specific lures, exploitation of internet-facing systems, and living-off-the-land techniques to maintain persistent access while evading detection.\n\nCritical infrastructure operators should implement network segmentation between IT and OT environments, enhance monitoring for anomalous access patterns, and ensure incident response plans address ICS-specific scenarios.',
    affected_sectors: ['Energy', 'Utilities', 'Water', 'Transportation'],
    threat_actors: 'Nation-State APT',
    iocs: [],
    mitre_tactics: ['Reconnaissance', 'Initial Access', 'Persistence', 'Collection'],
    source: 'Government Advisory',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'intel-004',
    category: 'data-breach',
    severity: 'high',
    title: 'Major Healthcare Provider Discloses Patient Data Breach',
    summary: 'A significant data breach at a healthcare organization has potentially exposed protected health information for millions of patients.',
    details: 'A healthcare organization has disclosed a data breach resulting from unauthorized access to systems containing protected health information. The breach potentially affects millions of patients whose records were stored in compromised databases.\n\nPreliminary investigation indicates attackers gained initial access through a compromised third-party vendor with network connectivity to patient record systems. Exposed data may include names, dates of birth, medical record numbers, and treatment information.\n\nThe organization has engaged forensic investigators and is offering credit monitoring to affected individuals. Healthcare organizations should review third-party access controls and ensure business associate agreements include appropriate security requirements.',
    affected_sectors: ['Healthcare', 'Insurance'],
    threat_actors: 'Unknown',
    iocs: [],
    mitre_tactics: ['Initial Access', 'Collection', 'Exfiltration'],
    source: 'Data Breach Notification',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'intel-005',
    category: 'malware',
    severity: 'medium',
    title: 'Info-Stealer Campaign Targets Enterprise Credentials and Sessions',
    summary: 'A new information-stealing malware variant is being distributed through malicious advertisements and trojanized software, specifically targeting enterprise credentials.',
    details: 'Security researchers have identified a new information-stealing malware campaign distributing malware through malvertising and trojanized versions of popular software tools. The malware specifically targets browser-stored credentials, session cookies, and cryptocurrency wallets.\n\nThe malware employs anti-analysis techniques including virtual machine detection and encrypted command-and-control communications. Stolen credentials are used to facilitate follow-on attacks including business email compromise and unauthorized access to cloud services.\n\nOrganizations should enforce application whitelisting, implement browser isolation for high-risk users, and deploy endpoint detection capabilities that identify credential theft behaviors.',
    affected_sectors: ['Technology', 'Financial Services', 'Professional Services'],
    threat_actors: 'Cybercrime Groups',
    iocs: [],
    mitre_tactics: ['Execution', 'Credential Access', 'Collection', 'Exfiltration'],
    source: 'Malware Analysis Report',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'intel-006',
    category: 'ransomware',
    severity: 'high',
    title: 'Ransomware Operators Increasingly Targeting Backup Infrastructure',
    summary: 'Ransomware groups are prioritizing destruction of backup systems before encryption to maximize impact and pressure victims into paying.',
    details: 'Threat intelligence indicates ransomware groups are prioritizing the identification and destruction of backup systems before deploying encryption payloads. This tactic significantly increases pressure on victims by eliminating recovery options.\n\nAttackers are targeting backup software credentials, cloud backup configurations, and offline backup schedules. Some groups maintain access for extended periods to ensure backup rotations include only compromised data.\n\nOrganizations should implement immutable backup storage, maintain truly offline backup copies, test restoration procedures regularly, and ensure backup credentials are not stored in compromised identity systems.',
    affected_sectors: ['All Sectors'],
    threat_actors: 'Multiple Ransomware Groups',
    iocs: [],
    mitre_tactics: ['Impact', 'Inhibit Response Function', 'Data Destruction'],
    source: 'Incident Response Intelligence',
    date: new Date().toISOString().split('T')[0]
  }
];

export default async (request, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    // CDN caching: 4 hours at edge, 1 hour in browser
    'Cache-Control': 'public, s-maxage=14400, max-age=3600, stale-while-revalidate=86400',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  const ANTHROPIC_API_KEY = Netlify.env.get('ANTHROPIC_API_KEY');
  
  // Check if we should fetch fresh data or use fallback
  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get('refresh') === 'true';

  // If no API key, return fallback immediately
  if (!ANTHROPIC_API_KEY) {
    console.log('No API key configured, returning fallback articles');
    return new Response(JSON.stringify({
      success: true,
      articles: FALLBACK_ARTICLES,
      generated_at: new Date().toISOString(),
      source: 'fallback',
    }), { status: 200, headers });
  }

  // If not forcing refresh, return fallback with CDN caching
  // The CDN will cache this response, so Claude API is only called occasionally
  if (!forceRefresh) {
    try {
      // Create abort controller with 8 second timeout (Netlify functions timeout at 10s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      // Attempt to call Claude API for fresh data
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          messages: [{
            role: 'user',
            content: `You are a cybersecurity threat intelligence analyst. Generate realistic current cyber threat intelligence.

Create a JSON array with exactly 6 threat articles reflecting typical current threats. Each must have:
{
  "id": "unique-string",
  "category": "ransomware|apt|vulnerabilities|malware|data-breach",
  "severity": "critical|high|medium|low",
  "title": "Brief title (max 100 chars)",
  "summary": "2-3 sentence summary",
  "details": "2-3 paragraph detailed analysis with mitigations",
  "affected_sectors": ["Industry1", "Industry2"],
  "threat_actors": "Actor name or Unknown",
  "iocs": [],
  "mitre_tactics": ["Tactic1", "Tactic2"],
  "source": "Source name",
  "date": "${new Date().toISOString().split('T')[0]}"
}

Include mix of: ransomware, APT activity, critical vulnerabilities, data breaches, and malware campaigns.
Return ONLY valid JSON array, no markdown or explanation.`
          }],
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        let content = '';
        for (const block of data.content) {
          if (block.type === 'text') content += block.text;
        }

        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const articles = JSON.parse(jsonMatch[0]);
          return new Response(JSON.stringify({
            success: true,
            articles,
            generated_at: new Date().toISOString(),
            source: 'ai',
          }), { status: 200, headers });
        }
      }
    } catch (error) {
      console.error('Claude API error:', error.message);
    }
  }

  // Return fallback if API call failed
  return new Response(JSON.stringify({
    success: true,
    articles: FALLBACK_ARTICLES,
    generated_at: new Date().toISOString(),
    source: 'fallback',
  }), { status: 200, headers });
};

export const config = {
  path: '/api/threat-intel',
};
