import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Apple,
  Check,
  Star,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/app-icon.png"
                alt="NukeMyMac"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-bold text-lg">NukeMyMac</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#showcase" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Screenshots</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#reviews" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            </div>

            <div className="flex items-center gap-3">
              <Button size="sm" className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] hover:opacity-90 text-white shadow-lg shadow-[#ff6b35]/20">
                <Download className="w-4 h-4 mr-2" />
                Free Download
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-orange-50/50 via-white to-white relative">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-3xl mx-auto pt-8 pb-12">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-border/50 mb-8">
              <Apple className="w-4 h-4" />
              <span className="text-sm font-medium">Optimized for macOS Sequoia</span>
              <Badge className="bg-green-500 text-white text-xs border-0">New</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              A cleaner Mac.
              <br />
              <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] bg-clip-text text-transparent">A faster Mac.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              NukeMyMac removes junk files, duplicates, and unused apps to free up space
              and speed up your Mac. Clean, simple, and incredibly effective.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] hover:opacity-90 text-white font-semibold px-8 h-12 text-base shadow-xl shadow-[#ff6b35]/25">
                <Download className="w-5 h-5 mr-2" />
                Download Free
              </Button>
              <Button size="lg" variant="outline" className="font-semibold px-8 h-12 text-base bg-white/50 backdrop-blur-sm">
                Buy Now — $29.99
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-500" />
                Apple Notarized
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                4.8 Rating
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-500" />
                50K+ Users
              </span>
            </div>
          </div>

          {/* Hero App Screenshot with Glassmorphism */}
          <div className="relative max-w-5xl mx-auto">
            {/* Glassmorphism floating cards */}
            <div className="absolute -left-4 top-1/4 z-20 hidden lg:block">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 animate-float">
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

            <div className="absolute -right-4 top-1/3 z-20 hidden lg:block">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 animate-float" style={{ animationDelay: '1s' }}>
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
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-slate-900">
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
      <section className="py-12 border-y border-border/50 bg-gradient-to-r from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="50GB+" label="Average space recovered" />
            <StatItem value="2M+" label="Files cleaned monthly" />
            <StatItem value="50K+" label="Happy users" />
            <StatItem value="4.8" label="App Store rating" icon={<Star className="w-4 h-4 text-amber-500 fill-amber-500" />} />
          </div>
        </div>
      </section>

      {/* Features Showcase with Screenshots */}
      <section id="showcase" className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] border-0">See It In Action</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powerful features, beautiful interface
            </h2>
            <p className="text-lg text-muted-foreground">
              Every tool designed to make your Mac maintenance effortless
            </p>
          </div>

          {/* Feature 1: Disk Analysis */}
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

          {/* Feature 2: Space Treemap */}
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

          {/* Feature 3: App Uninstaller */}
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

          {/* Feature 4: Developer Tools */}
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
              { value: "8+", label: "Package managers" },
            ]}
          />

          {/* Feature 5: System Maintenance */}
          <FeatureShowcase
            title="System Maintenance"
            subtitle="Keep Your Mac Healthy"
            description="Run maintenance tasks with one click—flush DNS cache, repair permissions, rebuild Spotlight index, clear font caches, and more. Touch ID supported."
            imageSrc="/screenshots/system-maintenance.png"
            imageAlt="System Maintenance Tasks"
            stats={[
              { value: "10+", label: "Tasks available" },
              { value: "Touch ID", label: "Supported" },
            ]}
          />
        </div>
      </section>

      {/* All Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] border-0">All Features</Badge>
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
              title="Scan Results"
              description="Detailed breakdown of junk files found"
              imageSrc="/screenshots/scan-results.png"
              imageAlt="Scan Results"
            />
            <FeatureBox
              title="Browser Manager"
              description="Clear cache from all your browsers"
              imageSrc="/screenshots/browser-manager.png"
              imageAlt="Browser Manager"
              badge="Pro"
            />
            <FeatureBox
              title="Startup Manager"
              description="Control apps that launch at startup"
              imageSrc="/screenshots/startup-manager.png"
              imageAlt="Startup Manager"
            />
            <FeatureBox
              title="Scheduled Scans"
              description="Automate your cleanup routine"
              imageSrc="/screenshots/scheduled-scans.png"
              imageAlt="Scheduled Scans"
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

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gradient-to-b from-slate-50 to-white">
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

          <div className="grid md:grid-cols-3 gap-6">
            <ReviewCard quote="Recovered 47GB on my MacBook Pro. This app actually finds stuff other cleaners miss." author="Sarah M." role="Designer" />
            <ReviewCard quote="Finally, a cleaner that doesn't feel like bloatware. Fast, clean interface, does exactly what it says." author="James K." role="Developer" />
            <ReviewCard quote="The duplicate finder alone saved me hours. Found thousands of duplicate photos." author="Michael R." role="Photographer" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-[#ff6b35]/10 text-[#ff6b35] border-0">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
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
            />
            <PricingCard
              name="Pro"
              price="$2.49"
              period="/mo"
              subtext="Billed annually at $29.99"
              features={["Everything in Free", "Disk Analysis", "Duplicate Finder", "App Uninstaller", "Developer Tools", "Browser Cleanup", "Priority Support"]}
              buttonText="Get Pro"
              highlighted
            />
            <PricingCard
              name="Lifetime"
              price="$49.99"
              period="One-time"
              features={["All Pro Features", "Lifetime Updates", "Priority Support", "No Subscription", "Early Access"]}
              buttonText="Buy Lifetime"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <Image
            src="/app-icon.png"
            alt="NukeMyMac"
            width={80}
            height={80}
            className="rounded-2xl mx-auto mb-6 shadow-xl"
          />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready for a cleaner Mac?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have reclaimed their storage and sped up their Macs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] hover:opacity-90 text-white font-semibold px-8 h-12 shadow-xl shadow-[#ff6b35]/25">
              <Download className="w-5 h-5 mr-2" />
              Download for Free
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> macOS 10.15+</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> Apple Silicon native</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/app-icon.png" alt="NukeMyMac" width={32} height={32} className="rounded-lg" />
                <span className="font-semibold">NukeMyMac</span>
              </div>
              <p className="text-sm text-muted-foreground">The smart way to clean and optimize your Mac.</p>
            </div>
            <FooterColumn title="Product" links={["Features", "Pricing", "Download", "Changelog"]} />
            <FooterColumn title="Support" links={["Help Center", "Contact", "System Requirements"]} />
            <FooterColumn title="Legal" links={["Privacy Policy", "Terms of Service", "Refund Policy"]} />
          </div>
          <Separator className="mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 NukeMyMac. All rights reserved.</p>
            <p>Made with care for Mac users everywhere.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Components

function StatItem({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-2xl sm:text-3xl font-bold">{value}</span>
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
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
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center py-16`}>
      {/* Content */}
      <div className="flex-1 max-w-lg">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">{subtitle}</Badge>
          {badge && <Badge className="bg-[#ff6b35] text-white border-0 text-xs">{badge}</Badge>}
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

        {stats && (
          <div className="flex gap-8">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-[#ff6b35]">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Screenshot with glassmorphism */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 to-blue-500/20 rounded-3xl blur-3xl -z-10" />
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-slate-900">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1920}
            height={1080}
            className="w-full h-auto"
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
}) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-[#ff6b35] text-white border-0">{badge}</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#ff6b35] transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ReviewCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-6">
        <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
          ))}
        </div>
        <p className="text-foreground mb-4">&ldquo;{quote}&rdquo;</p>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
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
}: {
  name: string;
  price: string;
  period: string;
  subtext?: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "outline" | "default";
  highlighted?: boolean;
}) {
  return (
    <Card className={`relative ${highlighted ? 'border-[#ff6b35] shadow-xl shadow-[#ff6b35]/10' : 'border-border/50'} bg-white`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] text-white border-0">Most Popular</Badge>
        </div>
      )}
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">{price}</span>
            <span className="text-muted-foreground">{period}</span>
          </div>
          {subtext && <p className="text-sm text-muted-foreground mt-1">{subtext}</p>}
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={buttonVariant || "default"}
          className={`w-full ${!buttonVariant ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff8f5a] hover:opacity-90 text-white' : ''}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((link, i) => (
          <li key={i}><a href="#" className="hover:text-foreground transition-colors">{link}</a></li>
        ))}
      </ul>
    </div>
  );
}
