import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./sections.css";
import "./experience-header.css";
import "./accessibility.css";
import "./cinematic-closing.css";
import "./media-experience.css";
import "./ambient-soundscape.css";
import "./interaction-layer.css";
import "./inquiry-modules.css";
import "./evidence-explorer.css";
import "./knowledge-atlas.css";
import "./question-explorer.css";
import "./final-responsive.css";
import "./production-readiness.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Truth — Question Yourself. Then, Question the World.",
    template: "%s | Truth",
  },
  description:
    "An interactive journey through self-inquiry, philosophy, knowledge and the questions that shape how we see ourselves and the world.",
  applicationName: "Truth",
  keywords: [
    "self-knowledge",
    "self-inquiry",
    "philosophy",
    "education",
    "critical thinking",
    "Vedanta",
    "Bhagavad Gita",
  ],
  authors: [{ name: "Truth" }],
  creator: "Truth",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Truth — Question Yourself. Then, Question the World.",
    description:
      "A cinematic, interactive journey from conditioning toward inquiry.",
    siteName: "Truth",
    images: [
      {
        url: "/images/truth-cosmic-hero.png",
        alt: "Truth — an interactive journey into self-knowledge and inquiry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Truth — Question Yourself. Then, Question the World.",
    description:
      "A cinematic, interactive journey from conditioning toward inquiry.",
    images: ["/images/truth-cosmic-hero.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
