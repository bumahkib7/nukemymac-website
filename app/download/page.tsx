'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Apple, Shield, Check, ExternalLink, FileDown } from "lucide-react";

interface ReleaseInfo {
  version: string;
  name: string;
  publishedAt: string;
  releaseUrl: string;
  changelog: string;
  downloadUrl: string | null;
  downloadSize: string | null;
  downloadCount: number;
}

export default function DownloadPage() {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/download')
      .then(res => res.json())
      .then(data => {
        setRelease(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const downloadUrl = release?.downloadUrl || 'https://github.com/nukemymac/nukemymac/releases/latest';

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

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-orange-50/50 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] border-0">
            <Apple className="w-3 h-3 mr-1" />
            macOS App
          </Badge>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Download NukeMyMac
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the free version and start cleaning your Mac today.
            Upgrade to Pro anytime for advanced features.
          </p>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#ff6b35] border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] hover:opacity-90 text-white font-semibold px-8 h-14 text-base shadow-xl shadow-[#ff6b35]/25"
                asChild
              >
                <a href={downloadUrl}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Free
                  {release?.downloadSize && (
                    <span className="ml-2 text-white/70">({release.downloadSize})</span>
                  )}
                </a>
              </Button>
            </div>
          )}

          {release && (
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1.5">
                <FileDown className="w-4 h-4 text-[#ff6b35]" />
                Version {release.version}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-500" />
                Apple Notarized
              </span>
              <span className="flex items-center gap-1.5">
                <Apple className="w-4 h-4" />
                macOS 10.15+
              </span>
            </div>
          )}

          {/* System Requirements */}
          <Card className="max-w-xl mx-auto border-border/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">System Requirements</h3>
              <ul className="space-y-2 text-left text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  macOS 10.15 Catalina or later
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Apple Silicon (M1/M2/M3) and Intel supported
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  50 MB free disk space
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">How to Install</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#ff6b35] font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold mb-2">Download</h3>
                <p className="text-sm text-muted-foreground">
                  Click the download button to get the DMG file
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#ff6b35] font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold mb-2">Open DMG</h3>
                <p className="text-sm text-muted-foreground">
                  Double-click the downloaded file to open it
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#ff6b35] font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold mb-2">Drag to Applications</h3>
                <p className="text-sm text-muted-foreground">
                  Drag NukeMyMac to your Applications folder
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Changelog */}
      {release?.changelog && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">What&apos;s New in v{release.version}</h2>
              <Button variant="outline" size="sm" asChild>
                <a href={release.releaseUrl} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <pre className="whitespace-pre-wrap font-sans">{release.changelog}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Want More Power?</h2>
          <p className="text-muted-foreground mb-8">
            Unlock Disk Analysis, Duplicate Finder, App Uninstaller, and more with Pro.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] hover:opacity-90 text-white"
            asChild
          >
            <Link href="/checkout?plan=yearly">
              Upgrade to Pro — $29.99/year
            </Link>
          </Button>
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
