import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service',
  description: 'NukeMyMac Terms of Service - Rules and guidelines for using our software.',
};

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 30, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By downloading, installing, or using NukeMyMac (&quot;the Software&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Software.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. License Grant</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Free Trial:</strong> Use the Software with limited features for 7 days</li>
              <li><strong>Pro Yearly:</strong> Use all features on up to 3 Macs for 1 year</li>
              <li><strong>Pro Lifetime:</strong> Use all features on up to 3 Macs indefinitely</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Restrictions</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may NOT:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Share, sell, or distribute your license key to others</li>
              <li>Reverse engineer, decompile, or disassemble the Software</li>
              <li>Use the Software for any illegal purpose</li>
              <li>Remove or alter any proprietary notices</li>
              <li>Use the Software on more devices than your license permits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. We do not warrant that the Software will be error-free or uninterrupted. You use the Software at your own risk.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Important:</strong> Always back up your data before using any system cleaning software. While NukeMyMac is designed to safely clean junk files, we recommend maintaining regular backups.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, PROFITS, OR BUSINESS OPPORTUNITIES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Updates</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may release updates to improve the Software. Updates may be automatic or require manual installation. Continued use of the Software after updates constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Subscription Renewal</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pro Yearly licenses expire after 12 months. We will send reminder emails before expiration. You can renew at any time to maintain access to Pro features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate your license if you violate these Terms. Upon termination, you must stop using the Software and delete all copies. Sections 4, 5, and 10 survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be posted on our website. Continued use of the Software after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, please contact us at{' '}
              <Link href="/contact" className="text-[#ff6b35] hover:underline">our contact page</Link>.
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
