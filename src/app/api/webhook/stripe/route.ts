import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Init Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10', // Or whichever version is current
});

// Init Supabase Admin Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Wir haben die User-ID als client_reference_id übergeben
    const userId = session.client_reference_id;
    
    if (userId) {
      console.log(`Zahlung erfolgreich für User: ${userId}`);
      
      // Update User in Supabase (Set is_pro = true)
      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        app_metadata: { is_pro: true },
      });
      
      if (error) {
        console.error(`Fehler beim Update des Users in Supabase:`, error);
        return new NextResponse(`Database Error`, { status: 500 });
      }
      
      console.log('User erfolgreich auf PRO geupgradet!');
    } else {
      console.warn('Checkout Session ohne client_reference_id abgeschlossen.');
    }
  }

  return new NextResponse('OK', { status: 200 });
}
