"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-full bg-[var(--shell-content)]">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-2 text-zinc-500">Preferences for your workspace</p>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-[#141414] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Appearance
          </h2>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-white">Theme</p>
              <p className="text-sm text-zinc-500">Dark mode matches FrontPrep UI</p>
            </div>
            <div className="flex rounded-lg border border-zinc-700 p-1">
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
                  theme === "dark"
                    ? "bg-green-500/20 text-green-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Moon className="h-4 w-4" />
                Dark
              </button>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
                  theme === "light"
                    ? "bg-green-500/20 text-green-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Sun className="h-4 w-4" />
                Light
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-zinc-600">
          Account sync and Firebase sign-in will land here next.
        </p>
      </div>
    </div>
  );
}
