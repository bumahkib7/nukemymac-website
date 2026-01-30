import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createLicense, LicenseTier } from '@/lib/license';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      // Handle subscription updates if needed
      console.log(`Subscription event: ${event.type}`);
      break;
    }

    case 'customer.subscription.deleted': {
      // Handle subscription cancellation
      console.log('Subscription cancelled');
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const plan = session.metadata?.plan as LicenseTier | undefined;
  const email = session.customer_email || session.customer_details?.email;

  if (!plan || !email) {
    console.error('Missing plan or email in checkout session', {
      plan,
      email,
      sessionId: session.id,
    });
    return;
  }

  // Create license key
  const license = await createLicense(plan, email, session.id);
  console.log(`License created: ${license.key} for ${email} (${plan})`);
}
