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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aryanpandeyce.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aryan Pandey | Backend & Cloud-Native Engineer (Go, Java, Kubernetes)",
    template: "%s | Aryan Pandey",
  },
  description:
    "Aryan Pandey is a Backend & Cloud-Native Engineer specializing in Go, Java 21, Kubernetes, Kafka, and distributed microservices with full-stack roots in React and Node.",
  keywords: [
    "Aryan Pandey",
    "Backend Engineer",
    "Cloud-Native Engineer",
    "Go",
    "Java 21",
    "Kubernetes",
    "Kafka",
    "Distributed Systems",
    "Spring Boot",
    "Microservices",
    "PostgreSQL",
    "Docker",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Aryan Pandey", url: siteUrl }],
  creator: "Aryan Pandey",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Aryan Pandey | Backend & Cloud-Native Engineer (Go, Java, Kubernetes)",
    description:
      "Crafting scalable backends & observable microservices with Go, Java, and Kubernetes.",
    siteName: "Aryan Pandey Developer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Pandey | Backend & Cloud-Native Engineer (Go, Java, Kubernetes)",
    description:
      "Crafting scalable backends & observable microservices with Go, Java, and Kubernetes.",
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
          name: "Gujarat Technological University",
        },
        knowsAbout: [
          "Go",
          "Java",
          "Microservices",
          "Kubernetes",
          "Kafka",
          "Distributed Systems",
          "Spring Boot",
          "PostgreSQL",
          "Docker",
          "Redis",
          "AWS Cloud",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${profileData.personal.name} Developer Portfolio`,
        author: {
          "@id": `${siteUrl}/#person`,
        },
        description: profileData.personal.headline,
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
