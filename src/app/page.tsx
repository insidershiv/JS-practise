"use client";

import {
  Activity,
  ArrowRight,
  BookOpen,
  Clock,
  Code2,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAllQuestions } from "@/lib/practiceQuestions";

const PROGRESS_KEY = "practice-completed-ids";

function loadCompletedCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return 0;
    const arr = JSON.parse(raw) as string[];
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

export default function DashboardPage() {
  const totalProblems = useMemo(() => getAllQuestions().length, []);
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    setSolved(loadCompletedCount());
  }, []);

  const accuracy = 82;
  const streak = 12;
  const hours = 38;

  const recent = [
    {
      problem: "Debounce Function",
      category: "JavaScript",
      difficulty: "medium" as const,
      status: "solved" as const,
    },
    {
      problem: "Virtual DOM Implementation",
      category: "React",
      difficulty: "hard" as const,
      status: "attempted" as const,
    },
    {
      problem: "Flatten Array",
      category: "Arrays",
      difficulty: "easy" as const,
      status: "not-started" as const,
    },
  ];

  const diffPill = (d: "easy" | "medium" | "hard") => {
    const map = {
      easy: "bg-emerald-950/60 text-emerald-400 border-emerald-800/60",
      medium: "bg-amber-950/60 text-amber-400 border-amber-800/60",
      hard: "bg-red-950/60 text-red-400 border-red-800/60",
    };
    return (
      <span className={`rounded-full border px-2 py-0.5 text-xs capitalize ${map[d]}`}>
        {d}
      </span>
    );
  };

  const statusCell = (s: "solved" | "attempted" | "not-started") => {
    if (s === "solved")
      return <span className="font-medium text-green-400">Solved</span>;
    if (s === "attempted")
      return <span className="font-medium text-amber-400">Attempted</span>;
    return <span className="text-zinc-500">Not Started</span>;
  };

  return (
    <div className="min-h-full bg-[var(--shell-content)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back, <span className="text-green-500">Developer</span>
          </h1>
          <p className="mt-2 text-zinc-500">
            Keep your streak going — practice makes perfect.
          </p>
        </header>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Problems Solved",
              value: `${solved}/${totalProblems}`,
              icon: Code2,
              iconBg: "bg-blue-500/15 text-blue-400",
            },
            {
              label: "Current Streak",
              value: `${streak} days`,
              icon: Flame,
              iconBg: "bg-orange-500/15 text-orange-400",
            },
            {
              label: "Time Practiced",
              value: `${hours}h`,
              icon: Clock,
              iconBg: "bg-violet-500/15 text-violet-400",
            },
            {
              label: "Accuracy",
              value: `${accuracy}%`,
              icon: TrendingUp,
              iconBg: "bg-green-500/15 text-green-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-[#141414] p-4"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${s.iconBg}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold tabular-nums text-white">{s.value}</p>
                <p className="text-xs text-zinc-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            href="/coding"
            className="group flex flex-col rounded-xl border border-zinc-800 bg-[#141414] p-6 transition-colors hover:border-green-500/30"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15 text-green-500">
              <Code2 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">DSA Problems</h2>
            <p className="mt-2 flex-1 text-sm text-zinc-500">
              Arrays, strings, trees, graphs — solve in the built-in IDE with tests.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-500 group-hover:gap-2">
              {totalProblems}+ problems <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/system-design"
            className="group flex flex-col rounded-xl border border-zinc-800 bg-[#141414] p-6 transition-colors hover:border-green-500/30"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15 text-green-500">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">System Design</h2>
            <p className="mt-2 flex-1 text-sm text-zinc-500">
              Frontend architecture, scaling, caching, and real-time patterns.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-500 group-hover:gap-2">
              Open drills <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/practice"
            className="group flex flex-col rounded-xl border border-zinc-800 bg-[#141414] p-6 transition-colors hover:border-green-500/30"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15 text-green-500">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">Practice Questions</h2>
            <p className="mt-2 flex-1 text-sm text-zinc-500">
              Hands-on JS challenges — Monaco editor, IntelliSense, and test runner.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-500 group-hover:gap-2">
              Browse bank <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Recent activity */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-zinc-500" />
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#141414]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="px-4 py-3 font-medium">Problem</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Difficulty</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {recent.map((row) => (
                  <tr key={row.problem} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white">{row.problem}</td>
                    <td className="px-4 py-3 text-zinc-400">{row.category}</td>
                    <td className="px-4 py-3">{diffPill(row.difficulty)}</td>
                    <td className="px-4 py-3">{statusCell(row.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick links row */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="pointer-events-none flex cursor-not-allowed items-center gap-3 rounded-xl border border-zinc-800/80 bg-[#141414] p-4 opacity-70"
            title="Coming soon"
            aria-disabled="true"
          >
            <Target className="h-8 w-8 text-zinc-600" />
            <div>
              <p className="font-medium text-zinc-400">UI Katas</p>
              <p className="text-xs text-zinc-600">Coming soon</p>
            </div>
          </div>
          <Link
            href="/fei-questions"
            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#141414] p-4 transition-colors hover:border-green-500/25"
          >
            <Sparkles className="h-8 w-8 text-green-500/90" />
            <div>
              <p className="font-medium text-white">From My Interview</p>
              <p className="text-xs text-zinc-500">Curated Q&A + AI practice</p>
            </div>
          </Link>
          <Link
            href="/study-plans"
            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#141414] p-4 transition-colors hover:border-green-500/25"
          >
            <BookOpen className="h-8 w-8 text-green-500/90" />
            <div>
              <p className="font-medium text-white">Study Plans</p>
              <p className="text-xs text-zinc-500">8-week structured roadmap</p>
            </div>
          </Link>
          <Link
            href="/leaderboard"
            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#141414] p-4 transition-colors hover:border-green-500/25"
          >
            <TrendingUp className="h-8 w-8 text-green-500/90" />
            <div>
              <p className="font-medium text-white">Leaderboard</p>
              <p className="text-xs text-zinc-500">Top performers (demo)</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
