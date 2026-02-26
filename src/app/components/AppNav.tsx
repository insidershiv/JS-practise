"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, Home, Target, BookOpen, FileQuestion } from "lucide-react";

const navItems = [
  { href: "/", label: "Roadmap", icon: Home },
  { href: "/coding", label: "Coding", icon: Code2 },
  { href: "/ui-katas", label: "UI Katas", icon: Target },
  { href: "/system-design", label: "System Design", icon: BookOpen },
  { href: "/fei-questions", label: "From My Interview", icon: FileQuestion },
] as const;

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between gap-4 h-14 sm:h-16"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-slate-900 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-md transition-colors"
          >
            <span className="text-lg">Interview Prep</span>
          </Link>
          <ul className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 -mx-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-label={label}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" aria-hidden />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
