// api/shopify-webhook.js – Vercel Serverless Function
// Shopify sendet nach Kauf einen Webhook →
// Wir holen den nächsten freien Code aus Supabase (licenses-Tabelle)
// und schicken ihn per Resend-E-Mail an den Käufer.

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import crypto from 'crypto';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

// ── Wichtig: Vercel bodyParser aus, damit wir den Raw-Body für
//    die Shopify HMAC-Signaturprüfung lesen können ──────────────
export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function verifyShopifySignature(rawBody, signature) {
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('base64');
  return hash === signature;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Raw Body lesen
  const rawBody = await getRawBody(req);
  const signature = req.headers['x-shopify-hmac-sha256'];

  // 2. Shopify-Signatur prüfen (Sicherheit!)
  if (!verifyShopifySignature(rawBody, signature)) {
    console.error('❌ Ungültige Shopify-Signatur');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const order = JSON.parse(rawBody.toString('utf8'));
  const customerEmail = order.email || order.contact_email;

  if (!customerEmail) {
    console.error('Keine E-Mail in der Bestellung gefunden');
    return res.status(400).json({ error: 'No email' });
  }

  console.log(`✅ Shopify-Bestellung #${order.order_number} von ${customerEmail}`);

  // 3. Nächsten freien Code aus der licenses-Tabelle holen
  const { data: license, error: fetchError } = await supabase
    .from('licenses')
    .select('id, code')
    .eq('used', false)
    .is('email', null)      // noch keinem Kunden zugewiesen
    .limit(1)
    .single();

  if (fetchError || !license) {
    console.error('❌ Kein freier Code verfügbar:', fetchError);
    // Trotzdem 200 zurückgeben damit Shopify nicht wiederholt versucht
    return res.status(200).json({ error: 'No codes available – bitte neue Codes generieren!' });
  }

  // 4. Code als verwendet markieren + Kundendaten speichern
  const { error: updateError } = await supabase
    .from('licenses')
    .update({
      used: true,
      used_at: new Date().toISOString(),
      email: customerEmail,
      stripe_session_id: `shopify-order-${order.id}` // Shopify Order-ID als Referenz
    })
    .eq('id', license.id);

  if (updateError) {
    console.error('❌ Fehler beim Code-Update:', updateError);
    return res.status(500).json({ error: 'Database update failed' });
  }

  // 5. E-Mail mit Code an Käufer senden
  const firstName = order.customer?.first_name || '';
  const appUrl = process.env.APP_URL || 'https://www.reallife-digga.de';

  await resend.emails.send({
    from: 'Real Life <noreply@reallife-digga.de>',
    to: customerEmail,
    subject: '🎉 Dein Real Life Freischalt-Code',
    html: `
      <!DOCTYPE html>
      <html lang="de">
      <body style="font-family: system-ui, sans-serif; background: #0a0a0f; color: #fff; padding: 40px 20px; max-width: 520px; margin: 0 auto;">
        <div style="background: #141420; border: 1px solid #2a2a40; border-radius: 16px; padding: 36px;">
          <div style="font-size: 2.5rem; text-align: center; margin-bottom: 8px;">🚀</div>
          <h1 style="text-align:center; color: #4f8ef7; margin-bottom: 4px; font-size: 1.4rem;">Real Life freigeschaltet!</h1>
          <p style="text-align:center; color: #888; font-size: 0.9rem; margin-bottom: 28px;">
            ${firstName ? `Hey ${firstName}, danke` : 'Danke'} für deinen Kauf!
          </p>

          <p style="color: #ccc; margin-bottom: 8px; font-size: 0.95rem;">Dein persönlicher Freischalt-Code:</p>
          <div style="background: #1a1a2e; border: 2px solid #4f8ef7; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 1.6rem; font-weight: 700; letter-spacing: 0.15em; color: #fff; font-family: monospace;">${license.code}</span>
          </div>

          <p style="color: #888; font-size: 0.85rem; margin-bottom: 12px;">So verwendest du deinen Code:</p>
          <ol style="color: #aaa; font-size: 0.88rem; line-height: 1.8; padding-left: 20px;">
            <li>Öffne die App: <a href="${appUrl}" style="color: #4f8ef7;">${appUrl}</a></li>
            <li>Klicke auf ein Thema → dann auf „Freischalten"</li>
            <li>Gib deinen Code ein und bestätige</li>
            <li>Alle 15 Themen sind sofort freigeschaltet ✅</li>
          </ol>

          <div style="border-top: 1px solid #2a2a40; margin-top: 28px; padding-top: 20px;">
            <a href="${appUrl}" style="display: block; background: linear-gradient(135deg, #4f8ef7, #10d9a0); color: #fff; text-decoration: none; padding: 14px 24px; border-radius: 10px; text-align: center; font-weight: 600; font-size: 1rem;">
              App jetzt öffnen →
            </a>
          </div>

          <p style="color: #555; font-size: 0.78rem; margin-top: 24px; text-align: center;">
            Code aufbewahren – er ist personalisiert.<br>
            Fragen? Antworte einfach auf diese E-Mail.
          </p>
        </div>
      </body>
      </html>
    `
  });

  console.log(`✅ Code ${license.code} an ${customerEmail} gesendet`);
  return res.status(200).json({ success: true });
}
