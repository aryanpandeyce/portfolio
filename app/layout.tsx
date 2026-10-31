import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CRTProvider } from "@/components/retro/crt-effect";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { Header } from "@/components/layout/header";
import { RetroStatusBar } from "@/components/layout/retro-status-bar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/retro/custom-cursor";
import { BootSequence } from "@/components/retro/boot-sequence";
import { profileData } from "@/data/profile";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alexrivera-dev.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alex Rivera | Full-Stack Engineer & Cloud Architect",
    template: "%s | Alex Rivera",
  },
  description:
    "Alex Rivera is a Senior Full-Stack Engineer and Cloud Architect specializing in distributed systems, high-throughput microservices, Next.js, Go, TypeScript, and cloud infrastructure.",
  keywords: [
    "Alex Rivera",
    "Full-Stack Engineer",
    "Cloud Architect",
    "Distributed Systems",
    "Next.js Developer",
    "TypeScript",
    "Go Engineer",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Alex Rivera", url: siteUrl }],
  creator: "Alex Rivera",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Alex Rivera | Full-Stack Engineer & Cloud Architect",
    description:
      "Crafting resilient distributed backends & delightfully tactile web experiences with Next.js, Go, and TypeScript.",
    siteName: "Alex Rivera Developer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Rivera | Full-Stack Engineer & Cloud Architect",
    description:
      "Crafting resilient distributed backends & delightfully tactile web experiences with Next.js, Go, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Person & WebSite Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profileData.personal.name,
        jobTitle: profileData.personal.role,
        url: siteUrl,
        sameAs: [
          profileData.personal.githubUrl,
          profileData.personal.linkedinUrl,
          profileData.personal.leetcodeUrl,
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: profileData.education[0]?.institution || "Northeastern University",
        },
        knowsAbout: [
          "Distributed Systems",
          "Cloud Architecture",
          "Full-Stack Development",
          "Next.js",
          "TypeScript",
          "Golang",
          "PostgreSQL",
          "Apache Kafka",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${profileData.personal.name} Portfolio`,
        author: {
          "@id": `${siteUrl}/#person`,
        },
        description: profileData.personal.tagline,
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${pressStart.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CRTProvider>
            <SkipToContent />
            <BootSequence />
            <CustomCursor />
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <RetroStatusBar />
            <Footer />
          </CRTProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
