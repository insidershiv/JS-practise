"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileQuestion,
  LayoutDashboard,
  PanelLeft,
  Settings,
  SquareCode,
  Sun,
  Moon,
  Target,
  Trophy,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: (pathname: string) => boolean;
  /** Show as disabled with “Coming soon” (no navigation) */
  comingSoon?: boolean;
};

const PREPARE: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/coding", label: "DSA Problems", icon: Code2 },
  { href: "/system-design", label: "System Design", icon: BookOpen },
  {
    href: "/practice",
    label: "Practice Questions",
    icon: FileQuestion,
    isActive: (p) => p === "/practice",
  },
  { href: "/ui-katas", label: "UI Katas", icon: Target, comingSoon: true },
  { href: "/fei-questions", label: "From My Interview", icon: SquareCode },
];

const TOOLS: NavItem[] = [
  {
    href: "/practice/debounce",
    label: "Code Playground",
    icon: Code2,
    isActive: (p) => p.startsWith("/practice/"),
  },
  { href: "/study-plans", label: "Study Plans", icon: GraduationCap },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

function NavLink({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const { href, label, icon: Icon, isActive: activeFn, comingSoon } = item;

  if (comingSoon) {
    return (
      <div
        className={`pointer-events-none relative flex items-center gap-3 rounded-lg py-2.5 pr-3 text-sm font-medium text-zinc-500 opacity-70 ${
          collapsed ? "justify-center px-0" : "pl-3"
        }`}
        title={collapsed ? `${label} (Coming soon)` : undefined}
        aria-disabled="true"
        aria-label={`${label}, coming soon`}
      >
        <Icon className="h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
        {!collapsed && (
          <span className="flex min-w-0 flex-1 flex-col gap-0.5 leading-tight">
            <span>{label}</span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-600">
              Coming soon
            </span>
          </span>
        )}
      </div>
    );
  }

  const isActive = activeFn
    ? activeFn(pathname)
    : href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-lg py-2.5 pr-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 ${
        collapsed ? "justify-center px-0" : "pl-3"
      } ${
        isActive
          ? "bg-green-500/10 text-green-400"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
      }`}
      title={collapsed ? label : undefined}
    >
      {isActive && (
        <span
          className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-green-500"
          aria-hidden
        />
      )}
      <Icon
        className={`h-4 w-4 shrink-0 ${isActive ? "text-green-400" : "text-zinc-500 group-hover:text-zinc-300"}`}
      />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex min-h-screen bg-[var(--shell-bg)] text-[var(--shell-fg)]">
      <aside
        className={`${
          collapsed ? "w-[72px]" : "w-64"
        } shrink-0 border-r border-[var(--shell-border)] bg-[var(--shell-sidebar)] transition-[width] duration-200 ease-out flex flex-col`}
      >
        <div className="flex h-14 items-center gap-2 border-b border-[var(--shell-border)] px-3">
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 font-semibold text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-green-500/15 text-green-500 ring-1 ring-green-500/30">
              <SquareCode className="h-5 w-5" strokeWidth={2} />
            </span>
            {!collapsed && (
              <span className="truncate text-[15px] font-semibold tracking-tight">
                <span className="text-white">Front</span>
                <span className="text-green-500">Prep</span>
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Sidebar">
          <p
            className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 ${collapsed ? "sr-only" : ""}`}
          >
            Prepare
          </p>
          <div className="space-y-0.5">
            {PREPARE.map((item) => (
              <NavLink key={item.href + item.label} item={item} collapsed={collapsed} />
            ))}
          </div>

          <p
            className={`mb-2 mt-6 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 ${collapsed ? "sr-only" : ""}`}
          >
            Tools
          </p>
          <div className="space-y-0.5">
            {TOOLS.map((item) => (
              <NavLink key={item.href + item.label} item={item} collapsed={collapsed} />
            ))}
          </div>
        </nav>

        <div className="border-t border-[var(--shell-border)] p-2">
          <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 ${
              collapsed ? "justify-center px-0" : "px-3"
            } ${pathname === "/settings" ? "bg-green-500/10 text-green-400" : ""}`}
            title={collapsed ? "Settings" : undefined}
          >
            <Settings className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </Link>
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs text-zinc-500 hover:bg-white/5 hover:text-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <PanelLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-[var(--shell-border)] bg-[var(--shell-header)]/90 px-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            {pathname !== "/" && (
              <Link
                href="/"
                className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 font-medium text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              >
                <ChevronLeft className="h-4 w-4" />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className="hidden text-xs text-zinc-500 sm:inline"
              title="Google sign-in & Firebase sync — coming soon"
            >
              Sign in
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="cursor-pointer rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden />
              ) : (
                <Moon className="h-4 w-4" aria-hidden />
              )}
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 ring-2 ring-green-500/20" />
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-[var(--shell-border)] bg-[var(--shell-sidebar)] px-4 py-2.5 text-center text-[11px] text-zinc-600">
          Local practice data · Firebase later
        </footer>
      </div>
    </div>
  );
}
