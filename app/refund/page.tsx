import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy',
  description: 'NukeMyMac Refund Policy - Our 30-day money-back guarantee.',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 30, 2026</p>

        {/* Highlight Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-2">30-Day Money-Back Guarantee</h2>
              <p className="text-green-700">
                We offer a full refund within 30 days of purchase, no questions asked. If NukeMyMac doesn&apos;t meet your expectations, we&apos;ll give you your money back.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You are eligible for a full refund if:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Your purchase was made within the last 30 days</li>
              <li>You have not previously received a refund for NukeMyMac</li>
              <li>Your license key has not been flagged for abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
            <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
              <li>
                <strong>Contact us</strong> via our{' '}
                <Link href="/contact" className="text-[#ff6b35] hover:underline">contact form</Link>{' '}
                with your purchase email
              </li>
              <li>
                <strong>Include</strong> the email address used for purchase
              </li>
              <li>
                <strong>Receive</strong> your refund within 5-10 business days
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What Happens After a Refund</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your license key will be deactivated</li>
              <li>Pro features will become unavailable</li>
              <li>You can continue using the free version</li>
              <li>Your cleaning history and settings remain intact</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Exceptions</h2>
            <p className="text-muted-foreground leading-relaxed">
              Refunds may be denied in cases of:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Purchases made more than 30 days ago</li>
              <li>Multiple refund requests from the same person</li>
              <li>Evidence of license key abuse or sharing</li>
              <li>Fraudulent payment disputes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Subscription Cancellations</h2>
            <p className="text-muted-foreground leading-relaxed">
              For Pro Yearly subscriptions:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>You can cancel at any time to prevent future charges</li>
              <li>Access continues until the end of your billing period</li>
              <li>No partial refunds for unused time after 30 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              Have questions about refunds? Reach out to us at{' '}
              <Link href="/contact" className="text-[#ff6b35] hover:underline">our contact page</Link>.
              We typically respond within 24 hours.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NukeMyMac. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
