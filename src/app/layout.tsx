import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "./components/AppShell";
import { ThemeProvider } from "./components/ThemeProvider";

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
    default: "FrontPrep — Frontend Interview Prep",
    template: "%s | FrontPrep",
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
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-[var(--shell-bg)] text-[var(--shell-fg)]`}
      >
        <a
          href="#main-content"
          className="absolute -left-[9999px] top-4 z-[100] rounded-lg bg-green-600 px-4 py-2 font-medium text-zinc-950 focus:left-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          Skip to main content
        </a>
        <ThemeProvider defaultTheme="dark">
          <AppShell>
            <main id="main-content" className="min-h-0 flex-1 bg-[var(--shell-content)]">
              {children}
            </main>
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
