import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "From My Interview",
  description: "Questions and solutions from your FEI prep — categorized by section and difficulty.",
};

export default function FEIQuestionsLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
