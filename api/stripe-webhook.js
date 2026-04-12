// api/stripe-webhook.js – Vercel Serverless Function
// Empfängt Stripe-Webhook nach Kauf → generiert Lizenzcode → sendet E-Mail

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

// Lizenzcode generieren: ADULT-XXXX-XXXX
function generateLicenseCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `ADULT-${seg()}-${seg()}`;
}

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;

    if (!email) {
      console.error('Keine E-Mail in der Session');
      return res.status(400).json({ error: 'No email' });
    }

    // Lizenzcode generieren
    let code;
    let attempts = 0;
    while (attempts < 5) {
      code = generateLicenseCode();
      const { error } = await supabase
        .from('licenses')
        .insert({ code, email, stripe_session_id: session.id });
      if (!error) break;
      attempts++;
    }

    if (!code) {
      return res.status(500).json({ error: 'Code generation failed' });
    }

    // E-Mail versenden via Resend
    const appUrl = process.env.APP_URL || 'https://adultguide.vercel.app';
    await resend.emails.send({
      from: 'Real Life <noreply@deineshop.de>',
      to: email,
      subject: '🎉 Dein Real Life Freischalt-Code',
      html: `
        <!DOCTYPE html>
        <html lang="de">
        <body style="font-family: system-ui, sans-serif; background: #0a0a0f; color: #fff; padding: 40px 20px; max-width: 520px; margin: 0 auto;">
          <div style="background: #141420; border: 1px solid #2a2a40; border-radius: 16px; padding: 36px;">
            <div style="font-size: 2.5rem; text-align: center; margin-bottom: 8px;">🚀</div>
            <h1 style="text-align:center; color: #4f8ef7; margin-bottom: 4px; font-size: 1.4rem;">Real Life freigeschaltet!</h1>
            <p style="text-align:center; color: #888; font-size: 0.9rem; margin-bottom: 28px;">Danke für deinen Kauf.</p>

            <p style="color: #ccc; margin-bottom: 8px; font-size: 0.95rem;">Dein persönlicher Freischalt-Code:</p>
            <div style="background: #1a1a2e; border: 2px solid #4f8ef7; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
              <span style="font-size: 1.6rem; font-weight: 700; letter-spacing: 0.15em; color: #fff; font-family: monospace;">${code}</span>
            </div>

            <p style="color: #888; font-size: 0.85rem; margin-bottom: 20px;">So verwendest du deinen Code:</p>
            <ol style="color: #aaa; font-size: 0.88rem; line-height: 1.8; padding-left: 20px;">
              <li>Öffne die App: <a href="${appUrl}" style="color: #4f8ef7;">${appUrl}</a></li>
              <li>Klicke auf ein Thema und dann auf "Freischalten"</li>
              <li>Gib deinen Code ein und bestätige</li>
              <li>Alle 15 Themen sind sofort freigeschaltet ✅</li>
            </ol>

            <div style="border-top: 1px solid #2a2a40; margin-top: 28px; padding-top: 20px;">
              <a href="${appUrl}" style="display: block; background: linear-gradient(135deg, #4f8ef7, #10d9a0); color: #fff; text-decoration: none; padding: 14px 24px; border-radius: 10px; text-align: center; font-weight: 600; font-size: 1rem;">
                App jetzt öffnen →
              </a>
            </div>

            <p style="color: #555; font-size: 0.78rem; margin-top: 24px; text-align: center;">
              Code aufbewahren – er ist personalisiert und einmalig verwendbar.<br>
              Fragen? Antworte einfach auf diese E-Mail.
            </p>
          </div>
        </body>
        </html>
      `
    });

    console.log(`✅ Lizenzcode ${code} für ${email} erstellt und versendet`);
    return res.status(200).json({ success: true });
  }

  res.status(200).json({ received: true });
}
