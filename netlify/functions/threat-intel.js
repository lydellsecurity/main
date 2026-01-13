// netlify/functions/threat-intel.js
// Serverless function to fetch AI-generated threat intelligence

export default async (request, context) => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow GET and POST
  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ANTHROPIC_API_KEY = Netlify.env.get('ANTHROPIC_API_KEY');

  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not configured');
    return new Response(
      JSON.stringify({ error: 'API key not configured' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

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
        tools: [
          {
            type: 'web_search_20250305',
            name: 'web_search',
          },
        ],
        messages: [
          {
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

Include a diverse mix:
- 1-2 ransomware incidents
- 1 major vulnerability (CVE)
- 1-2 data breaches
- 1 APT/nation-state activity or malware campaign

Return ONLY the valid JSON array, no markdown, no explanation, no code blocks. Start with [ and end with ].`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `API error: ${response.status}` }),
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const data = await response.json();

    // Extract text content from Claude's response
    let content = '';
    for (const block of data.content) {
      if (block.type === 'text') {
        content += block.text;
      }
    }

    // Parse JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        const articles = JSON.parse(jsonMatch[0]);
        return new Response(
          JSON.stringify({
            success: true,
            articles: articles,
            generated_at: new Date().toISOString(),
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=14400', // Cache for 4 hours
            },
          }
        );
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return new Response(
          JSON.stringify({ error: 'Failed to parse threat intel', raw: content.substring(0, 500) }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ error: 'No valid JSON in response', raw: content.substring(0, 500) }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};

export const config = {
  path: '/api/threat-intel',
};
