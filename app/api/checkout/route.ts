import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PRICE_IDS, PlanType } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email } = body as { plan: PlanType; email?: string };

    if (!plan || !['yearly', 'lifetime'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    const priceId = PRICE_IDS[plan];
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

    // Debug logging
    console.log('Checkout attempt:', {
      plan,
      email,
      priceId,
      domain,
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    });

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: plan === 'yearly' ? 'subscription' : 'payment',
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/checkout?canceled=true`,
      customer_email: email,
      metadata: {
        plan,
      },
      // For subscriptions, allow customer to manage billing
      ...(plan === 'yearly' && {
        subscription_data: {
          metadata: {
            plan,
          },
        },
      }),
    });

    console.log('Checkout session created:', session.id);
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error full:', error);

    // Get detailed Stripe error if available
    let errorMessage = 'Unknown error';
    let errorCode = '';

    if (error instanceof Stripe.errors.StripeError) {
      errorMessage = error.message;
      errorCode = error.code || '';
      console.error('Stripe error details:', {
        type: error.type,
        code: error.code,
        message: error.message,
        param: error.param,
      });
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: errorMessage,
        code: errorCode,
      },
      { status: 500 }
    );
  }
}
