import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding Practice",
  description: "DSA and coding problems for senior frontend interviews.",
};

export default function CodingLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
