import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppNav } from "./components/AppNav";
import { AppFooter } from "./components/AppFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Senior Frontend Interview Prep",
    template: "%s | Interview Prep",
  },
  description:
    "8-week roadmap for senior frontend and React Native engineers: DSA, UI katas, system design, React/RN depth, and behavioral prep.",
  keywords: ["frontend interview", "React", "React Native", "system design", "DSA"],
  authors: [{ name: "Interview Prep" }],
  openGraph: {
    title: "Senior Frontend Interview Prep",
    description: "8-week roadmap for senior FE & RN engineers.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]`}
      >
        <a
          href="#main-content"
          className="absolute -left-[9999px] top-4 z-[100] px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium focus:left-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
        >
          Skip to main content
        </a>
        <AppNav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <AppFooter />
      </body>
    </html>
  );
}
