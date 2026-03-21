import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "Frontend interview coding practice with in-browser IDE, tests, and IntelliSense (Monaco).",
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
