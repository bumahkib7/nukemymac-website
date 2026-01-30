'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Apple, Shield, Check, ExternalLink, FileDown, ArrowRight, Home } from "lucide-react";

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
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    fetch('/api/download')
      .then(res => res.json())
      .then(data => {
        setRelease(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const triggerDownload = React.useCallback(() => {
    const url = release?.downloadUrl || 'https://github.com/nukemymac/nukemymac/releases/latest';
    setDownloadStarted(true);
    
    // Fire confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Trigger actual download
    window.location.href = url;
  }, [release]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!loading && !downloadStarted && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && !downloadStarted) {
      setTimeout(() => {
        triggerDownload();
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [loading, countdown, downloadStarted, triggerDownload]);

  const downloadUrl = release?.downloadUrl || 'https://github.com/nukemymac/nukemymac/releases/latest';

  return (
    <main className="min-h-screen bg-background selection:bg-[#ff6b35]/20 selection:text-[#ff6b35]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/app-icon.png"
                alt="NukeMyMac"
                width={36}
                height={36}
                className="rounded-lg shadow-sm"
              />
              <span className="font-bold text-lg tracking-tight">NukeMyMac</span>
            </Link>

            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 bg-gradient-to-b from-orange-50/30 via-background to-background dark:from-orange-950/10 dark:via-background dark:to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          
           {downloadStarted ? (
            <div className="mb-10 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-green-900/30">
                <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight">Thank you for downloading!</h1>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                Your Mac is about to get a whole lot faster. If the download didn&apos;t start automatically, <a href={downloadUrl} className="text-[#ff6b35] hover:underline font-medium">click here</a>.
              </p>
            </div>
          ) : (
            <div className="mb-10 animate-fade-in">
               <Badge className="mb-6 bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/20 border-0 transition-colors px-3 py-1">
                <Apple className="w-3 h-3 mr-1.5" />
                macOS App
              </Badge>
              <h1 className="text-5xl font-bold mb-4 tracking-tight">Downloading NukeMyMac...</h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                 {loading ? "Checking latest version..." : `Your download will begin in ${countdown} seconds.`}
              </p>
            </div>
          )}


          {!downloadStarted && (
             <div className="flex justify-center mb-12">
                {loading ? (
                   <div className="w-8 h-8 border-4 border-[#ff6b35] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Button
                    size="lg"
                    className="bg-[#ff6b35] hover:bg-[#e85a2a] text-white font-semibold px-8 h-12 text-base shadow-xl shadow-[#ff6b35]/25 hover:scale-105 transition-all"
                    onClick={triggerDownload}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Now
                  </Button>
                )}
             </div>
          )}

          {release && (
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-16 animate-fade-in [animation-delay:200ms] opacity-0 fill-mode-forwards">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary/50 rounded-full">
                <FileDown className="w-4 h-4 text-[#ff6b35]" />
                v{release.version}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary/50 rounded-full">
                <Shield className="w-4 h-4 text-green-500" />
                Apple Notarized
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary/50 rounded-full">
                <Apple className="w-4 h-4" />
                macOS 10.15+
              </span>
            </div>
          )}
        
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-12">Installation is simple</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <InstallStep 
              number="1" 
              title="Download" 
              desc="The .dmg file will download automatically." 
            />
             <div className="hidden md:flex items-center justify-center text-muted-foreground/30">
                <ArrowRight className="w-8 h-8" />
             </div>
            <InstallStep 
              number="2" 
              title="Open" 
              desc="Double-click the downloaded .dmg file." 
            />
             <div className="hidden md:flex items-center justify-center text-muted-foreground/30">
                <ArrowRight className="w-8 h-8" />
             </div>
            <InstallStep 
              number="3" 
              title="Drag & Drop" 
              desc="Drag the NukeMyMac icon to your Applications folder." 
            />
          </div>

          {/* Visualizing the "Drag to Applications" common macOS pattern if intended, or just keeping it simple */}
        </div>
      </section>

      {/* Changelog */}
      {release?.changelog && (
        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Release Notes</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                <a href={release.releaseUrl} target="_blank" rel="noopener noreferrer">
                  View on GitHub <ExternalLink className="w-4 h-4 ml-1.5" />
                </a>
              </Button>
            </div>

            <div className="rounded-xl border border-border/50 bg-slate-900 shadow-2xl overflow-hidden">
               <div className="flex items-center gap-1.5 bg-slate-800/50 px-4 py-3 border-b border-white/5">
                 <div className="w-3 h-3 rounded-full bg-red-500/80" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                 <div className="w-3 h-3 rounded-full bg-green-500/80" />
                 <div className="ml-4 text-xs font-mono text-slate-400">changelog.md</div>
               </div>
               <div className="p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">{release.changelog}</pre>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
             <p className="text-lg font-medium mb-4">Need help?</p>
             <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <Link href="/faq" className="hover:text-[#ff6b35] transition-colors">FAQ</Link>
              <span>•</span>
              <a href="mailto:support@nukemymac.com" className="hover:text-[#ff6b35] transition-colors">Contact Support</a>
             </div>
             <p className="mt-8 text-xs text-muted-foreground/50">&copy; {new Date().getFullYear()} NukeMyMac. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function InstallStep({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="relative group">
       <Card className="border-border/50 bg-background/50 backdrop-blur-sm h-full hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
         <CardContent className="p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#ff6b35]/20 transition-colors">
              <span className="text-[#ff6b35] font-bold text-2xl">{number}</span>
            </div>
            <h3 className="font-bold text-lg mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
         </CardContent>
       </Card>
    </div>
  );
}
