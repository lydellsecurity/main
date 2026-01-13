// netlify/functions/initiate-ir.js
// Backend for Emergency Incident Response initiation
// Sends notifications via email (SendGrid) and optional Slack/PagerDuty

export default async (request, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    });
  }

  try {
    const body = await request.json();
    const { 
      contactName, 
      contactEmail, 
      contactPhone, 
      organization,
      incidentType,
      severity,
      description,
      affectedSystems,
      timestamp 
    } = body;

    // Validate required fields
    if (!contactName || !contactEmail || !contactPhone || !description) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields',
        required: ['contactName', 'contactEmail', 'contactPhone', 'description']
      }), {
        status: 400,
        headers,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers,
      });
    }

    // Validate phone (basic check for digits)
    const phoneDigits = contactPhone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return new Response(JSON.stringify({ error: 'Invalid phone number' }), {
        status: 400,
        headers,
      });
    }

    // Generate incident ID
    const incidentId = `IR-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const submittedAt = timestamp || new Date().toISOString();

    // Prepare incident record
    const incidentRecord = {
      incidentId,
      submittedAt,
      status: 'INITIATED',
      contact: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        organization: organization || 'Not specified',
      },
      incident: {
        type: incidentType || 'unspecified',
        severity: severity || 'unknown',
        description,
        affectedSystems: affectedSystems || 'Not specified',
      },
    };

    // Track notification results
    const notifications = {
      email: { sent: false, error: null },
      slack: { sent: false, error: null },
      pagerduty: { sent: false, error: null },
    };

    // ==========================================
    // 1. SEND EMAIL NOTIFICATION (SendGrid)
    // ==========================================
    const SENDGRID_API_KEY = Netlify.env.get('SENDGRID_API_KEY');
    const IR_NOTIFICATION_EMAIL = Netlify.env.get('IR_NOTIFICATION_EMAIL') || 'ir@lydellsecurity.com';
    const IR_FROM_EMAIL = Netlify.env.get('IR_FROM_EMAIL') || 'alerts@lydellsecurity.com';

    if (SENDGRID_API_KEY) {
      try {
        const severityColors = {
          critical: '#DC2626',
          high: '#EA580C',
          medium: '#D97706',
          low: '#2563EB',
          unknown: '#6B7280',
        };

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #0A0A0F; }
    .container { max-width: 600px; margin: 0 auto; background: #1A1A24; }
    .header { background: linear-gradient(135deg, #B91C1C 0%, #991B1B 100%); padding: 24px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
    .content { padding: 32px 24px; color: #E2E8F0; }
    .incident-id { background: #0F172A; border-left: 4px solid #0066FF; padding: 16px; margin-bottom: 24px; }
    .incident-id .label { color: #64748B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
    .incident-id .value { color: #0066FF; font-size: 24px; font-weight: bold; font-family: monospace; }
    .severity { display: inline-block; padding: 6px 16px; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; }
    .section { margin-bottom: 24px; }
    .section-title { color: #64748B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; border-bottom: 1px solid #2D2D3A; padding-bottom: 8px; }
    .field { margin-bottom: 12px; }
    .field-label { color: #64748B; font-size: 12px; }
    .field-value { color: #F1F5F9; font-size: 16px; }
    .description { background: #0F172A; padding: 16px; border-radius: 8px; white-space: pre-wrap; line-height: 1.6; }
    .footer { background: #0F172A; padding: 24px; text-align: center; border-top: 1px solid #2D2D3A; }
    .footer p { color: #64748B; font-size: 12px; margin: 0; }
    .cta { display: inline-block; background: #0066FF; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚨 EMERGENCY IR INITIATED</h1>
      <p>Immediate response required</p>
    </div>
    <div class="content">
      <div class="incident-id">
        <div class="label">Incident ID</div>
        <div class="value">${incidentId}</div>
      </div>
      
      <div style="margin-bottom: 24px;">
        <span class="severity" style="background: ${severityColors[severity] || severityColors.unknown}; color: white;">
          ${(severity || 'unknown').toUpperCase()} SEVERITY
        </span>
        <span style="margin-left: 12px; color: #64748B;">
          ${incidentType || 'Unspecified incident type'}
        </span>
      </div>

      <div class="section">
        <div class="section-title">Contact Information</div>
        <div class="field">
          <div class="field-label">Name</div>
          <div class="field-value">${contactName}</div>
        </div>
        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value"><a href="mailto:${contactEmail}" style="color: #0066FF;">${contactEmail}</a></div>
        </div>
        <div class="field">
          <div class="field-label">Phone</div>
          <div class="field-value"><a href="tel:${contactPhone}" style="color: #0066FF;">${contactPhone}</a></div>
        </div>
        <div class="field">
          <div class="field-label">Organization</div>
          <div class="field-value">${organization || 'Not specified'}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Incident Details</div>
        <div class="field">
          <div class="field-label">Affected Systems</div>
          <div class="field-value">${affectedSystems || 'Not specified'}</div>
        </div>
        <div class="field">
          <div class="field-label">Description</div>
          <div class="description">${description}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Timestamps</div>
        <div class="field">
          <div class="field-label">Submitted</div>
          <div class="field-value">${new Date(submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</div>
        </div>
        <div class="field">
          <div class="field-label">Response SLA</div>
          <div class="field-value" style="color: #EF4444;">15 minutes from submission</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 32px;">
        <a href="tel:${contactPhone}" class="cta">📞 CALL CLIENT NOW</a>
      </div>
    </div>
    <div class="footer">
      <p>LYDELL SECURITY • AGENTIC INCIDENT RESPONSE</p>
      <p style="margin-top: 8px;">This is an automated alert from lydellsecurity.com</p>
    </div>
  </div>
</body>
</html>`;

        const emailText = `
EMERGENCY IR INITIATED
======================

Incident ID: ${incidentId}
Severity: ${(severity || 'unknown').toUpperCase()}
Type: ${incidentType || 'Unspecified'}

CONTACT INFORMATION
-------------------
Name: ${contactName}
Email: ${contactEmail}
Phone: ${contactPhone}
Organization: ${organization || 'Not specified'}

INCIDENT DETAILS
----------------
Affected Systems: ${affectedSystems || 'Not specified'}

Description:
${description}

TIMESTAMPS
----------
Submitted: ${new Date(submittedAt).toLocaleString()}
Response SLA: 15 minutes from submission

---
LYDELL SECURITY • AGENTIC INCIDENT RESPONSE
`;

        const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: IR_NOTIFICATION_EMAIL }],
              subject: `🚨 [${(severity || 'UNKNOWN').toUpperCase()}] Emergency IR - ${incidentId}`,
            }],
            from: { 
              email: IR_FROM_EMAIL,
              name: 'Lydell Security Alerts'
            },
            reply_to: {
              email: contactEmail,
              name: contactName
            },
            content: [
              { type: 'text/plain', value: emailText },
              { type: 'text/html', value: emailHtml },
            ],
          }),
        });

        notifications.email.sent = emailResponse.ok;
        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          notifications.email.error = errorText;
          console.error('SendGrid error:', errorText);
        }
      } catch (emailError) {
        notifications.email.error = emailError.message;
        console.error('Email notification failed:', emailError);
      }
    } else {
      notifications.email.error = 'SendGrid API key not configured';
    }

    // ==========================================
    // 2. SEND SLACK NOTIFICATION (Optional)
    // ==========================================
    const SLACK_WEBHOOK_URL = Netlify.env.get('SLACK_WEBHOOK_URL');

    if (SLACK_WEBHOOK_URL) {
      try {
        const severityEmoji = {
          critical: '🔴',
          high: '🟠',
          medium: '🟡',
          low: '🔵',
          unknown: '⚪',
        };

        const slackPayload = {
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: '🚨 EMERGENCY IR INITIATED',
                emoji: true,
              },
            },
            {
              type: 'section',
              fields: [
                { type: 'mrkdwn', text: `*Incident ID:*\n\`${incidentId}\`` },
                { type: 'mrkdwn', text: `*Severity:*\n${severityEmoji[severity] || '⚪'} ${(severity || 'Unknown').toUpperCase()}` },
                { type: 'mrkdwn', text: `*Contact:*\n${contactName}` },
                { type: 'mrkdwn', text: `*Organization:*\n${organization || 'Not specified'}` },
                { type: 'mrkdwn', text: `*Phone:*\n<tel:${contactPhone}|${contactPhone}>` },
                { type: 'mrkdwn', text: `*Email:*\n<mailto:${contactEmail}|${contactEmail}>` },
              ],
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Incident Type:* ${incidentType || 'Unspecified'}\n*Affected Systems:* ${affectedSystems || 'Not specified'}`,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Description:*\n\`\`\`${description.substring(0, 500)}${description.length > 500 ? '...' : ''}\`\`\``,
              },
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '📞 Call Client', emoji: true },
                  url: `tel:${contactPhone}`,
                  style: 'danger',
                },
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '✉️ Email Client', emoji: true },
                  url: `mailto:${contactEmail}`,
                },
              ],
            },
            {
              type: 'context',
              elements: [
                { type: 'mrkdwn', text: `⏱️ Submitted: ${new Date(submittedAt).toLocaleString()} | *SLA: 15 minutes*` },
              ],
            },
          ],
        };

        const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackPayload),
        });

        notifications.slack.sent = slackResponse.ok;
        if (!slackResponse.ok) {
          notifications.slack.error = await slackResponse.text();
        }
      } catch (slackError) {
        notifications.slack.error = slackError.message;
        console.error('Slack notification failed:', slackError);
      }
    }

    // ==========================================
    // 3. TRIGGER PAGERDUTY (Optional)
    // ==========================================
    const PAGERDUTY_ROUTING_KEY = Netlify.env.get('PAGERDUTY_ROUTING_KEY');

    if (PAGERDUTY_ROUTING_KEY) {
      try {
        const pdSeverity = {
          critical: 'critical',
          high: 'error',
          medium: 'warning',
          low: 'info',
          unknown: 'warning',
        };

        const pdPayload = {
          routing_key: PAGERDUTY_ROUTING_KEY,
          event_action: 'trigger',
          dedup_key: incidentId,
          payload: {
            summary: `[${(severity || 'UNKNOWN').toUpperCase()}] Emergency IR Request - ${contactName} (${organization || 'Unknown Org'})`,
            source: 'lydellsecurity.com',
            severity: pdSeverity[severity] || 'warning',
            timestamp: submittedAt,
            custom_details: {
              incident_id: incidentId,
              contact_name: contactName,
              contact_email: contactEmail,
              contact_phone: contactPhone,
              organization: organization,
              incident_type: incidentType,
              affected_systems: affectedSystems,
              description: description.substring(0, 1000),
            },
          },
          links: [
            {
              href: `tel:${contactPhone}`,
              text: 'Call Client',
            },
            {
              href: `mailto:${contactEmail}`,
              text: 'Email Client',
            },
          ],
        };

        const pdResponse = await fetch('https://events.pagerduty.com/v2/enqueue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pdPayload),
        });

        notifications.pagerduty.sent = pdResponse.ok;
        if (!pdResponse.ok) {
          notifications.pagerduty.error = await pdResponse.text();
        }
      } catch (pdError) {
        notifications.pagerduty.error = pdError.message;
        console.error('PagerDuty notification failed:', pdError);
      }
    }

    // ==========================================
    // RETURN RESPONSE
    // ==========================================
    const anyNotificationSent = notifications.email.sent || notifications.slack.sent || notifications.pagerduty.sent;

    return new Response(JSON.stringify({
      success: true,
      incidentId,
      message: anyNotificationSent 
        ? 'Incident response initiated. Our team has been notified and will contact you within 15 minutes.'
        : 'Incident logged. Please call our emergency line for immediate response.',
      notifications,
      incident: incidentRecord,
    }), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('IR initiation error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process incident request',
      message: 'Please call our emergency line directly for immediate assistance.',
    }), {
      status: 500,
      headers,
    });
  }
};

export const config = {
  path: '/api/initiate-ir',
};
