'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Shield, ArrowLeft, Lock, CreditCard } from "lucide-react";

type Plan = 'yearly' | 'lifetime';

const plans: Record<Plan, { name: string; price: number; period: string; description: string; features: string[] }> = {
  yearly: {
    name: 'Pro',
    price: 29.99,
    period: '/year',
    description: 'Billed annually at $29.99/yr',
    features: [
      'Everything in Free',
      'Disk Analysis Sunburst',
      'Duplicate Finder',
      'App Uninstaller',
      'Developer Tools',
      'Space Treemap',
      'Browser Manager',
    ],
  },
  lifetime: {
    name: 'Lifetime',
    price: 49.99,
    period: '',
    description: 'One-time payment',
    features: [
      'All Pro Features',
      'Lifetime Updates',
      'Priority Support',
      'No Subscription',
      'Support Development',
    ],
  },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') as Plan | null;

  const [plan, setPlan] = useState<Plan>(planParam && plans[planParam] ? planParam : 'yearly');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (planParam && plans[planParam]) {
      setPlan(planParam);
    }
  }, [planParam]);

  const selectedPlan = plans[plan];

  const handleCheckout = async () => {
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/app-icon.png"
                alt="NukeMyMac"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-bold text-lg">NukeMyMac</span>
            </Link>

            <Link href="/#pricing" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Pricing
            </Link>
          </div>
        </div>
      </nav>

      {/* Checkout Content */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-orange-50/50 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] border-0">Secure Checkout</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Complete Your Purchase</h1>
            <p className="text-muted-foreground">Unlock all Pro features and supercharge your Mac</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Plan Selection */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Select Plan</h2>

              {(Object.entries(plans) as [Plan, typeof plans.yearly][]).map(([key, p]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all ${
                    plan === key
                      ? 'border-[#ff6b35] shadow-lg shadow-[#ff6b35]/10'
                      : 'border-border/50 hover:border-border'
                  }`}
                  onClick={() => setPlan(key)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          plan === key ? 'border-[#ff6b35]' : 'border-muted-foreground/30'
                        }`}>
                          {plan === key && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b35]" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {p.name}
                            {key === 'yearly' && (
                              <Badge className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] text-white border-0 text-xs">Most Popular</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{p.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl">${p.price.toFixed(2)}</div>
                        {p.period && <div className="text-sm text-muted-foreground">{p.period}</div>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Features */}
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-4">What&apos;s included:</h3>
                  <ul className="space-y-3">
                    {selectedPlan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <Card className="border-border/50 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Your Information</h2>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                      }}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Your license key will be sent to this email
                    </p>
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => {
                        setAgreedToTerms(e.target.checked);
                        setError(null);
                      }}
                      className="mt-1 w-4 h-4 rounded border-input text-[#ff6b35] focus:ring-[#ff6b35]"
                    />
                    <span className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <Link href="/terms" className="text-[#ff6b35] hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-[#ff6b35] hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <Separator />

                  {/* Order Summary */}
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{selectedPlan.name} Plan</span>
                      <span>${selectedPlan.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${selectedPlan.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] hover:opacity-90 text-white font-semibold shadow-lg shadow-[#ff6b35]/25"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pay ${selectedPlan.price.toFixed(2)} with Stripe
                      </>
                    )}
                  </Button>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-green-500" />
                      SSL Encrypted
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-green-500" />
                      30-Day Refund
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} NukeMyMac. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <a href="mailto:support@nukemymac.com" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#ff6b35] border-t-transparent rounded-full"></div>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
