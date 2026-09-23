import type { Metadata } from "next";
import type { ReactNode } from "react";
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
  category: "education",
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_US",
    title: "Truth — Question Yourself. Then, Question the World.",
    description:
      "A cinematic, interactive journey from conditioning toward inquiry.",
    siteName: "Truth",
    images: [
      {
        url: "/images/truth-cosmic-hero.png",
        width: 3000,
        height: 2000,
        alt: "Truth — a cinematic journey into self-knowledge and inquiry",
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Truth",
              url: siteUrl,
              description:
                "An interactive journey through self-inquiry, philosophy, knowledge and the questions that shape how we see ourselves and the world.",
              inLanguage: "en",
            }),
          }}
        />
      </body>
    </html>
  );
}
