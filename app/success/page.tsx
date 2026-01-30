'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, CheckCircle2, AlertCircle, Download } from "lucide-react";

interface LicenseData {
  key: string;
  tier: 'yearly' | 'lifetime';
  email: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [license, setLicense] = useState<LicenseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    let attempts = 0;
    const maxAttempts = 10;

    const checkLicense = async () => {
      try {
        const response = await fetch(`/api/license?session_id=${sessionId}`);
        const data = await response.json();

        if (data.license) {
          setLicense(data.license);
          setLoading(false);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkLicense, 2000);
        } else {
          setError('License key generation is taking longer than expected. Please check your email or contact support.');
          setLoading(false);
        }
      } catch {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkLicense, 2000);
        } else {
          setError('Failed to retrieve license key. Please contact support.');
          setLoading(false);
        }
      }
    };

    checkLicense();
  }, [sessionId]);

  const copyToClipboard = async () => {
    if (license?.key) {
      await navigator.clipboard.writeText(license.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-orange-50/50 via-white to-white min-h-screen">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
          {loading ? (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8f5a] flex items-center justify-center animate-pulse shadow-xl shadow-[#ff6b35]/25">
                <Image
                  src="/app-icon.png"
                  alt="NukeMyMac"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-2xl font-bold mb-4">Processing Your Order...</h1>
              <p className="text-muted-foreground mb-8">
                Please wait while we generate your license key.
              </p>
              <div className="flex justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-[#ff6b35] border-t-transparent rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Something Went Wrong</h1>
              <p className="text-muted-foreground mb-8">{error}</p>
              <Button variant="outline" asChild>
                <a href="mailto:support@nukemymac.com">
                  Contact Support
                </a>
              </Button>
            </div>
          ) : license ? (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <Badge className="mb-4 bg-green-500/10 text-green-600 border-0">Payment Successful</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Thank You!</h1>
              <p className="text-muted-foreground mb-8">
                Your purchase of{' '}
                <span className="font-semibold text-foreground">
                  NukeMyMac {license.tier === 'yearly' ? 'Pro' : 'Lifetime'}
                </span>{' '}
                was successful.
              </p>

              {/* License Key Box */}
              <Card className="mb-8 border-[#ff6b35]/20 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-3">Your License Key</p>
                  <code className="block text-xl sm:text-2xl font-mono text-[#ff6b35] tracking-wider mb-4 break-all font-bold">
                    {license.key}
                  </code>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Activation Steps */}
              <Card className="mb-8 border-border/50">
                <CardContent className="p-6 text-left">
                  <h2 className="font-semibold mb-4">How to Activate</h2>
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] flex items-center justify-center text-sm font-bold">
                        1
                      </span>
                      <span className="text-muted-foreground">Open NukeMyMac on your Mac</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] flex items-center justify-center text-sm font-bold">
                        2
                      </span>
                      <span className="text-muted-foreground">Click &quot;Enter License Key&quot; in the upgrade prompt</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] flex items-center justify-center text-sm font-bold">
                        3
                      </span>
                      <span className="text-muted-foreground">Paste your license key and click Activate</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] flex items-center justify-center text-sm font-bold">
                        4
                      </span>
                      <span className="text-muted-foreground">Enjoy all Pro features!</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Button
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] hover:opacity-90 text-white shadow-lg shadow-[#ff6b35]/25 mb-6"
                asChild
              >
                <a href="https://github.com/nukemymac/nukemymac/releases">
                  <Download className="w-4 h-4 mr-2" />
                  Download NukeMyMac
                </a>
              </Button>

              <p className="text-sm text-muted-foreground">
                A copy of your license key has been sent to{' '}
                <span className="text-foreground">{license.email}</span>
              </p>
            </div>
          ) : null}
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

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#ff6b35] border-t-transparent rounded-full"></div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
