// netlify/functions/threat-intel-generate.js
// Scheduled function to generate and cache threat intel
// Runs every 4 hours via Netlify Scheduled Functions

import { getStore } from "@netlify/blobs";

export default async (request, context) => {
  const ANTHROPIC_API_KEY = Netlify.env.get('ANTHROPIC_API_KEY');
  
  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not configured');
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log('Generating fresh threat intelligence...');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: `You are a cybersecurity threat intelligence analyst for Lydell Security. Search for the latest cyber threat news from the past 7 days and provide a briefing.

Search for current cybersecurity news including: ransomware attacks, data breaches, new vulnerabilities, APT group activities, and malware campaigns.

Return your response as a JSON array with exactly 6 threat intelligence articles. Each article must have this exact structure:
{
  "id": "unique-id-string",
  "category": "ransomware|apt|vulnerabilities|malware|data-breach",
  "severity": "critical|high|medium|low",
  "title": "Brief descriptive threat title (max 100 chars)",
  "summary": "2-3 sentence summary of the threat and its impact",
  "details": "Detailed 2-3 paragraph analysis including: what happened, who is affected, technical details if available, and recommended mitigations or defensive actions",
  "affected_sectors": ["Array", "of", "affected", "industries"],
  "threat_actors": "Known threat actor name or 'Unknown'",
  "iocs": ["Array of IOCs if available, empty array if none"],
  "mitre_tactics": ["Relevant", "MITRE", "ATT&CK", "Tactics"],
  "source": "Primary source name",
  "date": "YYYY-MM-DD format"
}

Include a diverse mix of threat types. Return ONLY the valid JSON array.`
        }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    
    let content = '';
    for (const block of data.content) {
      if (block.type === 'text') {
        content += block.text;
      }
    }

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse threat intel response');
    }

    const articles = JSON.parse(jsonMatch[0]);
    const cacheData = {
      articles,
      generated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    };

    // Store in Netlify Blobs for persistence
    const store = getStore('threat-intel');
    await store.setJSON('latest', cacheData);

    console.log(`Successfully generated ${articles.length} threat intel articles`);

    return new Response(JSON.stringify({ success: true, ...cacheData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Generation error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Schedule to run every 4 hours
export const config = {
  schedule: "0 */4 * * *"
};
