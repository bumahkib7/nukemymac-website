'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is NukeMyMac?',
        a: 'NukeMyMac is a powerful Mac cleaning and optimization app. It helps you remove junk files, find duplicates, uninstall apps completely, clean developer tools, and free up valuable disk space.',
      },
      {
        q: 'Is NukeMyMac safe to use?',
        a: 'Yes! NukeMyMac is designed with safety in mind. It only removes files that are safe to delete (caches, logs, temporary files). Important system files and personal documents are never touched. We also show you exactly what will be deleted before any cleaning happens.',
      },
      {
        q: 'What macOS versions are supported?',
        a: 'NukeMyMac supports macOS 13 (Ventura) and later, including macOS 14 (Sonoma) and macOS 15 (Sequoia). We regularly update the app to support the latest macOS versions.',
      },
      {
        q: 'Will NukeMyMac slow down my Mac?',
        a: 'No, quite the opposite! NukeMyMac runs efficiently and only uses system resources when actively scanning or cleaning. After cleaning, your Mac will often run faster due to the freed up disk space.',
      },
    ],
  },
  {
    category: 'Features',
    questions: [
      {
        q: 'What can NukeMyMac clean?',
        a: 'NukeMyMac can clean: System caches, Application caches, Log files, Xcode derived data, iOS device backups, npm/yarn caches, Gradle caches, CocoaPods caches, Homebrew caches, Browser caches, Mail downloads, Trash, and more.',
      },
      {
        q: 'How does the App Uninstaller work?',
        a: 'Unlike dragging apps to Trash, our App Uninstaller finds and removes all associated files: preferences, caches, support files, containers, and login items. This completely removes apps without leaving behind junk.',
      },
      {
        q: 'What is the Disk Analysis feature?',
        a: 'Disk Analysis shows you exactly what\'s using your storage with an interactive sunburst chart. You can drill down into folders to find large files and see storage distribution across your drive.',
      },
      {
        q: 'Can I schedule automatic scans?',
        a: 'Yes! Pro users can schedule automatic scans daily, weekly, or monthly. You can also enable automatic cleaning of selected categories.',
      },
    ],
  },
  {
    category: 'Pricing & Licenses',
    questions: [
      {
        q: 'Is there a free trial?',
        a: 'Yes! You get a 7-day free trial with access to all Pro features. No credit card required. After the trial, you can continue using the free version with limited features or upgrade to Pro.',
      },
      {
        q: 'What\'s the difference between Yearly and Lifetime?',
        a: 'Pro Yearly ($29.99/year) gives you all features for one year and renews annually. Pro Lifetime ($49.99 once) gives you all features forever with no recurring payments. Both include all future updates.',
      },
      {
        q: 'How many Macs can I use with one license?',
        a: 'Each license can be activated on up to 3 Macs. Perfect for your desktop, laptop, and a spare machine. Need more? Contact us for volume pricing.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied for any reason, contact us within 30 days for a full refund.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'Why does NukeMyMac need Full Disk Access?',
        a: 'Full Disk Access allows NukeMyMac to scan and clean files in protected locations like the Library folder. Without it, we can only access limited areas. Your files remain private—we never upload or share them.',
      },
      {
        q: 'How do I activate my license?',
        a: 'After purchase, you\'ll receive a license key by email. Open NukeMyMac, click "Enter License Key", paste your key, and click Activate. That\'s it!',
      },
      {
        q: 'Can I transfer my license to a new Mac?',
        a: 'Yes! Just deactivate the license on your old Mac (Settings > License > Deactivate), then activate it on your new Mac using the same key.',
      },
      {
        q: 'How do I update NukeMyMac?',
        a: 'NukeMyMac checks for updates automatically. When an update is available, you\'ll see a notification. Click "Download Update" to get the latest version from our website.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-[#ff6b35] transition-colors"
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 text-muted-foreground leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about NukeMyMac
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((section) => (
            <section key={section.category}>
              <h2 className="text-xl font-semibold mb-4 text-[#ff6b35]">{section.category}</h2>
              <div className="bg-card rounded-xl border">
                {section.questions.map((faq, index) => (
                  <FAQItem key={index} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center p-8 bg-muted/50 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#ff6b35] text-white font-medium rounded-lg hover:bg-[#ff6b35]/90 transition-colors"
          >
            Contact Support
          </Link>
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
