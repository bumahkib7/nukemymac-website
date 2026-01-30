import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'NukeMyMac Privacy Policy - How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 30, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              NukeMyMac (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our macOS application and website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Email address (when purchasing a license or contacting support)</li>
              <li>Payment information (processed securely by Stripe)</li>
              <li>Feedback and support messages</li>
            </ul>

            <h3 className="text-lg font-medium mb-2 mt-4">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>App version and macOS version (for compatibility)</li>
              <li>Anonymous usage statistics (which features are used)</li>
              <li>Crash reports (to improve stability)</li>
            </ul>

            <h3 className="text-lg font-medium mb-2 mt-4">2.3 Information We Do NOT Collect</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Personal files or documents</li>
              <li>Browsing history or passwords</li>
              <li>Contents of files being cleaned</li>
              <li>Any data from other applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To provide and maintain our service</li>
              <li>To process your purchases and send license keys</li>
              <li>To respond to your support requests</li>
              <li>To improve our application based on usage patterns</li>
              <li>To send important updates about the app (you can opt out)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data is stored securely using industry-standard encryption. Payment information is processed by Stripe and is never stored on our servers. We use secure HTTPS connections for all data transmission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Stripe</strong> - Payment processing</li>
              <li><strong>Vercel</strong> - Website hosting</li>
              <li><strong>Neon</strong> - Database hosting</li>
              <li><strong>Resend</strong> - Email delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of your personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data only for as long as necessary to provide our services and comply with legal obligations. License information is retained for the duration of your license plus 2 years for support purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              NukeMyMac is not intended for children under 13. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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
