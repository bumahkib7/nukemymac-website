"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Download,
  Apple,
  Check,
  Star,
  Shield,
  Users,
  Sparkles,
  Menu,
  Zap,
  Trash2,
  HardDrive,
  Cpu,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  const reviews = [
    {
      quote: "Recovered 47GB on my MacBook Pro. This app actually finds stuff other cleaners miss.",
      author: "Sarah M.",
      role: "Designer",
    },
    {
      quote: "Finally, a cleaner that doesn't feel like bloatware. Fast, clean interface, does exactly what it says.",
      author: "James K.",
      role: "Developer",
    },
    {
      quote: "The duplicate finder alone saved me hours. Found thousands of duplicate photos.",
      author: "Michael R.",
      role: "Photographer",
    },
    {
      quote: "My Mac M1 feels brand new again. The developer tools cleanup is a lifesaver.",
      author: "David L.",
      role: "Software Engineer",
    },
    {
      quote: "Simple, effective, and beautiful. Worth every penny for the lifetime license.",
      author: "Emma S.",
      role: "Writer",
    },
  ];

  const faqs = [
    {
      question: "Is NukeMyMac safe to use?",
      answer: "Yes, absolutely. NukeMyMac is designed to only target safe-to-delete files like caches, logs, temporary files, and trash. It will never touch your personal documents, photos, or system-critical files without your explicit permission.",
    },
    {
      question: "Does it work on Apple Silicon (M1/M2/M3)?",
      answer: "Yes! NukeMyMac is fully optimized for Apple Silicon and runs natively on all M-series chips, as well as Intel-based Macs running macOS 10.15 or later.",
    },
    {
      question: "What is the difference between Free and Pro?",
      answer: "The Free version allows you to scan for junk and perform basic system maintenance tasks. The Pro version unlocks deep cleaning features like the App Uninstaller, Duplicate Finder, large file visualization (Sunburst/Treemap), and Developer Tools cleanup.",
    },
    {
      question: "How do I license the app?",
      answer: "We offer both a yearly subscription and a one-time lifetime purchase. Once you purchase, you'll receive a license key to activate the Pro features immediately.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#ff6b35]/20 selection:text-[#ff6b35]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/app-icon.png"
                alt="NukeMyMac"
                width={36}
                height={36}
                className="rounded-lg shadow-sm"
              />
              <span className="font-bold text-lg tracking-tight">NukeMyMac</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#showcase" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Screenshots</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex">
                <Button size="sm" className="bg-[#ff6b35] hover:bg-[#e85a2a] text-white shadow-lg shadow-[#ff6b35]/20 transition-all hover:scale-105" asChild>
                  <a href="/download">
                    <Download className="w-4 h-4 mr-2" />
                    Free Download
                  </a>
                </Button>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="w-5 h-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Image src="/app-icon.png" alt="NukeMyMac" width={24} height={24} className="rounded" />
                        NukeMyMac
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 mt-8">
                      <a href="#features" className="text-lg font-medium hover:text-[#ff6b35] transition-colors">Features</a>
                      <a href="#showcase" className="text-lg font-medium hover:text-[#ff6b35] transition-colors">Screenshots</a>
                      <a href="#pricing" className="text-lg font-medium hover:text-[#ff6b35] transition-colors">Pricing</a>
                      <a href="#faq" className="text-lg font-medium hover:text-[#ff6b35] transition-colors">FAQ</a>
                      <Separator />
                      <Button className="w-full bg-[#ff6b35] hover:bg-[#e85a2a] text-white" asChild>
                        <a href="/download">Download Free</a>
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-20 bg-gradient-to-b from-orange-50/30 via-background to-background relative overflow-hidden dark:from-orange-950/10 dark:via-background dark:to-background">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200/20 rounded-full blur-[100px] animate-pulse dark:bg-orange-500/10" />
        <div className="absolute top-40 right-10 w-[30rem] h-[30rem] bg-blue-200/20 rounded-full blur-[100px] animate-pulse delay-1000 dark:bg-blue-500/10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-md rounded-full px-4 py-1.5 shadow-sm border border-border/50 mb-8 animate-fade-in hover:border-[#ff6b35]/30 transition-colors">
              <Apple className="w-4 h-4 text-foreground/80" />
              <span className="text-sm font-medium">Optimized for macOS Sequoia</span>
              <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-0 h-5 px-1.5 dark:text-green-400">New</Badge>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-foreground animate-fade-in [animation-delay:200ms] opacity-0 fill-mode-forwards">
              A cleaner Mac.
              <br />
              <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff9f7a] bg-clip-text text-transparent">A faster Mac.</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:400ms] opacity-0 fill-mode-forwards">
              NukeMyMac removes junk files, duplicates, and unused apps to free up space
              and speed up your Mac. <span className="text-foreground font-medium">Clean, simple, and incredibly effective.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in [animation-delay:600ms] opacity-0 fill-mode-forwards">
              <Button size="lg" className="bg-[#ff6b35] hover:bg-[#e85a2a] text-white font-semibold px-8 h-12 text-base shadow-xl shadow-[#ff6b35]/25 hover:shadow-[#ff6b35]/40 transition-all hover:-translate-y-0.5" asChild>
                <a href="/download">
                  <Download className="w-5 h-5 mr-2" />
                  Download Free
                </a>
              </Button>
              <Button size="lg" variant="outline" className="font-semibold px-8 h-12 text-base bg-background/50 backdrop-blur-sm border-border/60 hover:bg-background/80" asChild>
                <a href="/checkout?plan=yearly">Buy Now — $29.99</a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in [animation-delay:800ms] opacity-0 fill-mode-forwards">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50">
                <Shield className="w-4 h-4 text-green-500" />
                Apple Notarized
              </span>
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                4.8/5 Rating
              </span>
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50">
                <Users className="w-4 h-4 text-blue-500" />
                50K+ Users
              </span>
            </div>
          </div>

          {/* Hero App Screenshot with Glassmorphism */}
          <div className="relative max-w-5xl mx-auto animate-fade-in [animation-delay:1000ms] opacity-0 fill-mode-forwards group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6b35]/20 to-blue-500/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
            
            {/* Glassmorphism floating cards */}
            <div className="absolute -left-6 top-1/4 z-20 hidden lg:block">
              <div className="bg-background/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 animate-float dark:border-white/10 dark:bg-slate-900/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">89.66 GB</p>
                    <p className="text-xs text-muted-foreground">Ready to clean</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 top-1/3 z-20 hidden lg:block">
              <div className="bg-background/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 animate-float [animation-delay:1s] dark:border-white/10 dark:bg-slate-900/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#ff6b35]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">System Optimized</p>
                    <p className="text-xs text-muted-foreground">Mac running faster</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Screenshot */}
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-slate-900 ring-1 ring-white/10">
              <Image
                src="/screenshots/dashboard.png"
                alt="NukeMyMac Dashboard"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-border/50 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="50GB+" label="Space recovered avg" icon={<HardDrive className="w-4 h-4 text-[#ff6b35]" />} />
            <StatItem value="2M+" label="Files cleaned monthly" icon={<Trash2 className="w-4 h-4 text-[#ff6b35]" />} />
            <StatItem value="50K+" label="Happy users" icon={<Users className="w-4 h-4 text-[#ff6b35]" />} />
            <StatItem value="4.8" label="App Store rating" icon={<Star className="w-4 h-4 text-amber-500 fill-amber-500" />} />
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="showcase" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/20 border-0 transition-colors">See It In Action</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
              Powerful features, <br className="hidden sm:block" />
              <span className="text-[#ff6b35]">beautiful interface</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Every tool is designed to make your Mac maintenance effortless, native, and fast.
            </p>
          </div>

          <div className="space-y-32">
            <FeatureShowcase
              title="Disk Analysis"
              subtitle="Visual Storage Breakdown"
              description="See exactly what's eating your storage with our interactive sunburst chart. Drill down into folders, identify space hogs, and take action instantly."
              imageSrc="/screenshots/disk-analysis.png"
              imageAlt="Disk Analysis Sunburst Chart"
              badge="Pro"
              stats={[
                { value: "134 GB", label: "Analyzed" },
                { value: "< 5s", label: "Scan time" },
              ]}
            />
            
            <FeatureShowcase
              title="Space Treemap"
              subtitle="Folder Size Visualization"
              description="Our colorful treemap gives you an instant visual overview of your entire drive. Spot large folders at a glance and drill into any directory."
              imageSrc="/screenshots/space-treemap.png"
              imageAlt="Space Treemap Visualization"
              badge="Pro"
              reverse
              stats={[
                { value: "16 GB", label: "User folder" },
                { value: "Instant", label: "Navigation" },
              ]}
            />

            <FeatureShowcase
              title="App Uninstaller"
              subtitle="Complete App Removal"
              description="Don't just delete apps—obliterate them. Find and remove all associated files, caches, and preferences that apps leave behind."
              imageSrc="/screenshots/app-uninstaller.png"
              imageAlt="App Uninstaller"
              badge="Pro"
              stats={[
                { value: "153 GB", label: "Game found" },
                { value: "100%", label: "Clean removal" },
              ]}
            />

            <FeatureShowcase
              title="Developer Tools"
              subtitle="Dev Cache Cleanup"
              description="Clean up Xcode derived data, npm, Gradle, CocoaPods, Homebrew, and more. Essential for developers who need to reclaim SSD space."
              imageSrc="/screenshots/developer-tools.png"
              imageAlt="Developer Tools Cleanup"
              badge="Pro"
              reverse
              stats={[
                { value: "24.83 GB", label: "Dev caches" },
                { value: "8+", label: "Managers" },
              ]}
            />

            <FeatureShowcase
              title="System Maintenance"
              subtitle="Keep Your Mac Healthy"
              description="Run maintenance tasks with one click—flush DNS cache, repair permissions, rebuild Spotlight index, clear font caches, and more. Touch ID supported."
              imageSrc="/screenshots/system-maintenance.png"
              imageAlt="System Maintenance Tasks"
              stats={[
                { value: "10+", label: "Tasks" },
                { value: "Touch ID", label: "Supported" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* All Features Grid */}
      <section id="features" className="py-24 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/20 border-0">All Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              More powerful tools
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureBox
              title="Smart Dashboard"
              description="Complete overview of your Mac's health"
              imageSrc="/screenshots/dashboard.png"
              imageAlt="Dashboard"
            />
            <FeatureBox
              title="Browser Manager"
              description="Clear cache from Chrome, Safari, Firefox"
              imageSrc="/screenshots/browser-manager.png"
              imageAlt="Browser Manager"
              badge="Pro"
            />
            <FeatureBox
              title="Scheduled Scans"
              description="Automate your cleanup routine"
              imageSrc="/screenshots/scheduled-scans.png"
              imageAlt="Scheduled Scans"
            />
             <FeatureBox
              title="Startup Manager"
              description="Control apps that launch at startup"
              imageSrc="/screenshots/startup-manager.png"
              imageAlt="Startup Manager"
            />
             <FeatureBox
              title="Scan Results"
              description="Detailed breakdown of junk files found"
              imageSrc="/screenshots/scan-results.png"
              imageAlt="Scan Results"
            />
            <FeatureBox
              title="Disk Analysis"
              description="Interactive sunburst visualization"
              imageSrc="/screenshots/disk-analysis.png"
              imageAlt="Disk Analysis"
              badge="Pro"
            />
          </div>
        </div>
      </section>

      {/* Reviews Section - Carousel */}
      <section id="reviews" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] border-0">Reviews</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by Mac users
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="text-muted-foreground">4.8 out of 5 based on 500+ reviews</p>
          </div>

          <div className="px-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {reviews.map((review, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 p-2">
                    <ReviewCard {...review} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ Section - Accordion */}
      <section id="faq" className="py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] border-0">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] border-0">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free. Upgrade when you need more power.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Free"
              price="$0"
              period="Forever"
              features={["Smart Scan & Clean", "System Maintenance", "Performance Monitor", "Scheduled Scans"]}
              buttonText="Download Free"
              buttonVariant="outline"
              href="/download"
            />
            <PricingCard
              name="Pro"
              price="$2.49"
              period="/mo"
              subtext="Billed annually at $29.99"
              features={["Everything in Free", "Disk Analysis", "Duplicate Finder", "App Uninstaller", "Developer Tools", "Browser Cleanup", "Priority Support"]}
              buttonText="Get Pro"
              highlighted
              href="/checkout?plan=yearly"
            />
            <PricingCard
              name="Lifetime"
              price="$49.99"
              period="One-time"
              features={["All Pro Features", "Lifetime Updates", "Priority Support", "No Subscription", "Early Access"]}
              buttonText="Buy Lifetime"
              buttonVariant="outline"
              href="/checkout?plan=lifetime"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <Image
            src="/app-icon.png"
            alt="NukeMyMac"
            width={80}
            height={80}
            className="rounded-2xl mx-auto mb-8 shadow-2xl ring-2 ring-white/10"
          />
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Ready for a cleaner Mac?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have reclaimed their storage and sped up their Macs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-[#ff6b35] hover:bg-[#e85a2a] text-white font-semibold px-8 h-14 text-lg shadow-xl shadow-[#ff6b35]/25 hover:scale-105 transition-all" asChild>
              <a href="/download">
                <Download className="w-6 h-6 mr-2" />
                Download for Free
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> No credit card required</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> macOS 10.15+</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Apple Silicon native</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/app-icon.png" alt="NukeMyMac" width={32} height={32} className="rounded-lg" />
                <span className="font-semibold text-lg">NukeMyMac</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The smart way to clean, optimize, and maintain your Mac. Built for speed and simplicity.
              </p>
            </div>
            <FooterColumn title="Product" links={["Features", "Pricing", "Download", "Changelog"]} />
            <FooterColumn title="Support" links={["Help Center", "Contact", "System Requirements"]} />
            <FooterColumn title="Legal" links={["Privacy Policy", "Terms of Service", "Refund Policy"]} />
          </div>
          <Separator className="mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} NukeMyMac. All rights reserved.</p>
            <div className="flex items-center gap-4">
               {/* Socials or other links could go here */}
               <p>Made with ❤️ for Mac users.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Components

function StatItem({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="text-center group overflow-hidden">
      <div className="flex items-center justify-center gap-2 mb-2 group-hover:scale-110 transition-transform duration-300">
        <span className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">{value}</span>
      </div>
      <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
    </div>
  );
}

function FeatureShowcase({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  badge,
  reverse,
  stats,
}: {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
  reverse?: boolean;
  stats?: { value: string; label: string }[];
}) {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
      {/* Content */}
      <div className="flex-1 max-w-lg">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="px-2.5 py-0.5 text-xs font-medium">{subtitle}</Badge>
          {badge && <Badge className="bg-[#ff6b35] text-white border-0 text-xs">{badge}</Badge>}
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">{title}</h3>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{description}</p>

        {stats && (
          <div className="flex gap-10 border-t border-border/50 pt-8">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-[#ff6b35]">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Screenshot with glassmorphism */}
      <div className="flex-1 relative w-full">
        <div className={`absolute -inset-4 bg-gradient-to-br from-[#ff6b35]/20 to-blue-500/20 rounded-[2rem] blur-3xl -z-10 opacity-50 ${reverse ? 'left-0' : 'right-0'}`} />
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-slate-900 ring-1 ring-white/10 dark:border-white/10">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1920}
            height={1080}
            className="w-full h-auto transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureBox({
  title,
  description,
  imageSrc,
  imageAlt,
  badge,
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-border/50 bg-card hover:border-[#ff6b35]/30 h-full cursor-pointer">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
        {badge && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-[#ff6b35] text-white border-0 shadow-sm">{badge}</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-2 group-hover:text-[#ff6b35] transition-colors flex items-center gap-2">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function ReviewCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full hover:shadow-lg transition-all hover:border-[#ff6b35]/20">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="flex gap-0.5 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
          ))}
        </div>
        <p className="text-foreground text-lg mb-6 leading-relaxed flex-grow">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff9f7a] flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-sm">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PricingCard({
  name,
  price,
  period,
  subtext,
  features,
  buttonText,
  buttonVariant,
  highlighted,
  href,
}: {
  name: string;
  price: string;
  period: string;
  subtext?: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "outline" | "default";
  highlighted?: boolean;
  href?: string;
}) {
  return (
    <Card className={`relative flex flex-col ${highlighted ? 'border-[#ff6b35] shadow-2xl shadow-[#ff6b35]/10 scale-105 z-10' : 'border-border/50'} bg-card transition-all duration-300 hover:-translate-y-1`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-[#ff6b35] text-white border-0 px-3 py-1 text-xs">Most Popular</Badge>
        </div>
      )}
      <CardContent className="p-8 flex flex-col h-full">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">{price}</span>
            <span className="text-muted-foreground">{period}</span>
          </div>
          {subtext && <p className="text-sm text-muted-foreground mt-2">{subtext}</p>}
        </div>
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={buttonVariant || "default"}
          size="lg"
          className={`w-full ${!buttonVariant ? 'bg-[#ff6b35] hover:bg-[#e85a2a] text-white shadow-lg shadow-[#ff6b35]/20' : ''}`}
          asChild={!!href}
        >
          {href ? <a href={href}>{buttonText}</a> : buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-bold mb-4">{title}</h4>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {links.map((link, i) => (
          <li key={i}><a href="#" className="hover:text-[#ff6b35] transition-colors">{link}</a></li>
        ))}
      </ul>
    </div>
  );
}
