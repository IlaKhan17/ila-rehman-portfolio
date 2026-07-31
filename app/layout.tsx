import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { profile, siteUrl } from "@/content/profile";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

const description = `${profile.role} in ${profile.location}. ${profile.pitch}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "AI Engineer",
    "LLM",
    "RAG",
    "LangChain",
    "LangGraph",
    "FastAPI",
    "Python",
    "Ila Rehman",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  openGraph: {
    type: "profile",
    siteName: profile.name,
    title: `${profile.name} · ${profile.role}`,
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-raised focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
