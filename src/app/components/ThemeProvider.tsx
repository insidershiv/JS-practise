"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
} | null>(null);

/**
 * Single source of truth for theme. Default is **dark** for a consistent IDE-like UI.
 * Tailwind `dark:` variants apply when `class="dark"` is on `<html>`.
 */
export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const THEME_KEY = "theme";
  // Match SSR on first client render; hydrate from localStorage in useLayoutEffect (before paint).
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const hydratedRef = useRef(false);

  useLayoutEffect(() => {
    let resolved: Theme = theme;

    if (!hydratedRef.current) {
      hydratedRef.current = true;
      try {
        const raw = localStorage.getItem(THEME_KEY);
        if (raw === "dark" || raw === "light") {
          resolved = raw;
          if (raw !== theme) {
            setThemeState(raw);
          }
        }
      } catch {
        /* ignore */
      }
    }

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    root.style.colorScheme = resolved === "dark" ? "dark" : "light";
    try {
      localStorage.setItem(THEME_KEY, resolved);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return { theme: "dark" as const, setTheme: () => {} };
  }
  return ctx;
}
