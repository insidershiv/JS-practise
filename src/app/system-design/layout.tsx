import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design",
  description: "Frontend system design: architecture, caching, performance, a11y.",
};

export default function SystemDesignLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
