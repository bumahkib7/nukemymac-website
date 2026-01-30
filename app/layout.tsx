import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nukemymac-website.vercel.app"),
  title: {
    default: "NukeMyMac - Clean Your Mac & Free Up Storage | Mac Cleaner App",
    template: "%s | NukeMyMac",
  },
  description:
    "NukeMyMac is the smart Mac cleaner that removes junk files, finds duplicates, uninstalls apps completely, and speeds up your Mac. Free download for macOS. Recover 50GB+ of storage.",
  keywords: [
    "mac cleaner",
    "clean my mac",
    "mac storage cleaner",
    "duplicate file finder mac",
    "app uninstaller mac",
    "free mac cleaner",
    "macos cleaner",
    "mac junk cleaner",
    "mac optimizer",
    "disk cleanup mac",
    "storage optimizer mac",
    "cleanmymac alternative",
    "mac maintenance",
    "xcode cache cleaner",
    "developer tools cleanup mac",
    "speed up mac",
    "free up space mac",
    "mac storage full",
    "delete junk files mac",
    "mac system cleaner",
  ],
  authors: [{ name: "NukeMyMac" }],
  creator: "NukeMyMac",
  publisher: "NukeMyMac",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nukemymac-website.vercel.app",
    siteName: "NukeMyMac",
    title: "NukeMyMac - Clean Your Mac & Free Up Storage",
    description:
      "The smart Mac cleaner that removes junk files, finds duplicates, and speeds up your Mac. Free download.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NukeMyMac - Mac Cleaner App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NukeMyMac - Clean Your Mac & Free Up Storage",
    description:
      "Remove junk files, find duplicates, and speed up your Mac. Free download.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://nukemymac-website.vercel.app",
  },
  category: "technology",
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NukeMyMac",
  operatingSystem: "macOS",
  applicationCategory: "UtilitiesApplication",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
    { "@type": "Offer", price: "29.99", priceCurrency: "USD", name: "Pro" },
    { "@type": "Offer", price: "49.99", priceCurrency: "USD", name: "Lifetime" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "500",
  },
  description: "Mac cleaner app that removes junk files, finds duplicates, and optimizes your Mac.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
