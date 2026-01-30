import Stripe from 'stripe';

// Lazy initialization to avoid build-time errors
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
    }
    _stripe = new Stripe(secretKey);
  }
  return _stripe;
}

// For backward compatibility
export const stripe = {
  get checkout() { return getStripe().checkout; },
  get webhooks() { return getStripe().webhooks; },
  get customers() { return getStripe().customers; },
  get subscriptions() { return getStripe().subscriptions; },
} as unknown as Stripe;

// Price IDs - create these in your Stripe Dashboard
// Products > Add Product > Set name "NukeMyMac Pro Yearly" and "NukeMyMac Pro Lifetime"
export const PRICE_IDS = {
  yearly: process.env.STRIPE_PRICE_YEARLY || 'price_yearly_placeholder',
  lifetime: process.env.STRIPE_PRICE_LIFETIME || 'price_lifetime_placeholder',
} as const;

export const PRICES = {
  yearly: {
    id: PRICE_IDS.yearly,
    name: 'Pro Yearly',
    price: 29.99,
    interval: 'year',
    description: 'Billed annually',
  },
  lifetime: {
    id: PRICE_IDS.lifetime,
    name: 'Pro Lifetime',
    price: 49.99,
    interval: null,
    description: 'One-time payment',
  },
} as const;

export type PlanType = keyof typeof PRICES;
