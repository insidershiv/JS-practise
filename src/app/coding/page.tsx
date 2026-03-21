"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, Search, SlidersHorizontal } from "lucide-react";
import { getAllQuestions } from "@/lib/practiceQuestions";
import type { PracticeCategory, PracticeDifficulty } from "@/types/practice";

const PROGRESS_KEY = "practice-completed-ids";

function loadCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function diffTextClass(difficulty: PracticeDifficulty) {
  switch (difficulty) {
    case "easy":
      return "text-green-400";
    case "medium":
      return "text-amber-400";
    case "hard":
      return "text-red-400";
  }
}

function categoryLabel(category: PracticeCategory) {
  switch (category) {
    case "algorithmic-coding":
      return "Arrays";
    case "javascript-functions":
      return "JavaScript";
    case "ui-coding":
      return "UI";
  }
}

/** Mock acceptance % from stable hash of id */
function acceptance(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const pct = 45 + (h % 50);
  return `${pct}.${(h % 10)}%`;
}

const TOPIC_FILTERS = ["All", "Arrays", "Strings", "Trees", "JavaScript", "Recursion"] as const;

export default function CodingPracticePage() {
  const questions = useMemo(() => getAllQuestions(), []);
  const dsaQuestions = useMemo(() => questions.filter((q) => q.category !== "ui-coding"), [questions]);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<PracticeDifficulty | "all">("all");
  const [topicFilter, setTopicFilter] = useState<string>("All");
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompleted(loadCompleted());
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return dsaQuestions.filter((q) => {
      if (difficulty !== "all" && q.difficulty !== difficulty) return false;
      if (topicFilter !== "All") {
        if (topicFilter === "JavaScript" && q.category !== "javascript-functions") return false;
        if (topicFilter === "Arrays" && q.category !== "algorithmic-coding") return false;
        if (topicFilter === "Recursion" && !q.topics.includes("recursion")) return false;
        if (topicFilter === "Strings" && !q.title.toLowerCase().includes("string")) return false;
        if (topicFilter === "Trees" && !q.topics.some((t) => t.toLowerCase().includes("tree"))) return false;
      }
      if (s) {
        return (
          q.title.toLowerCase().includes(s) ||
          q.shortDescription.toLowerCase().includes(s) ||
          q.topics.some((t) => t.toLowerCase().includes(s))
        );
      }
      return true;
    });
  }, [dsaQuestions, difficulty, search, topicFilter]);

  return (
    <div className="min-h-full bg-[var(--shell-content)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">DSA Problems</h1>
          <p className="mt-2 text-zinc-500">
            Master data structures & algorithms for frontend interviews.
          </p>
        </header>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems..."
              className="w-full rounded-lg border border-zinc-800 bg-[#141414] py-2.5 pl-10 pr-12 text-sm text-white placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/50"
            />
            <SlidersHorizontal className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {TOPIC_FILTERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopicFilter(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                topicFilter === t
                  ? "bg-green-500 text-zinc-950"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Difficulty
          </span>
          {(["all", "easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize ${
                difficulty === d
                  ? "bg-zinc-800 text-white ring-1 ring-zinc-600"
                  : "bg-zinc-900/80 text-zinc-500 hover:bg-zinc-800"
              }`}
            >
              {d === "all" ? "All" : d}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#141414]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Topic</th>
                <th className="px-4 py-3 font-medium">Difficulty</th>
                <th className="px-4 py-3 font-medium text-right">Acceptance</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-zinc-500">
                    No problems match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((q) => {
                  const isDone = completed.has(q.id);
                  return (
                    <tr key={q.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 shrink-0 text-zinc-600" />
                          )}
                          <span className="font-medium text-white">{q.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-400">{categoryLabel(q.category)}</td>
                      <td className={`px-4 py-3 capitalize ${diffTextClass(q.difficulty)}`}>
                        {q.difficulty}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-zinc-500">
                        {acceptance(q.id)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/practice/${q.id}`}
                          className="inline-flex rounded-md bg-green-500 px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-green-400"
                        >
                          Solve
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
