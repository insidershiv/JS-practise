import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Katas",
  description: "Build complex components from specs — tables, editors, drag-drop, virtualized lists.",
};

export default function UIKatasLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
