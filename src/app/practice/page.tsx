"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Clock, Search } from "lucide-react";
import { getAllQuestions, getTopics } from "@/lib/practiceQuestions";
import type { PracticeDifficulty } from "@/types/practice";

const DIFFICULTY_ORDER: PracticeDifficulty[] = ["easy", "medium", "hard"];

function diffBadge(diff: PracticeDifficulty) {
  switch (diff) {
    case "easy":
      return "bg-emerald-950/60 text-emerald-400 border-emerald-800/50";
    case "medium":
      return "bg-amber-950/60 text-amber-400 border-amber-800/50";
    case "hard":
      return "bg-red-950/60 text-red-400 border-red-800/50";
  }
}

const FORMAT_CHIPS = ["All", "JavaScript", "CSS", "HTML", "React", "TypeScript"] as const;

export default function PracticeListPage() {
  const questions = useMemo(() => getAllQuestions(), []);
  const topics = useMemo(() => getTopics(), []);
  const [search, setSearch] = useState("");
  const [formatChip, setFormatChip] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<PracticeDifficulty | "all">("all");

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (difficulty !== "all" && q.difficulty !== difficulty) return false;

      if (formatChip !== "All") {
        if (formatChip === "JavaScript" && !q.languages.includes("javascript")) return false;
        if (formatChip === "TypeScript" && !q.languages.includes("typescript")) return false;
        if (formatChip === "React" && q.category !== "ui-coding") return false;
        if (formatChip === "CSS" || formatChip === "HTML") {
          /* placeholder — no dedicated items in JSON yet */
          return false;
        }
      }

      if (search.trim()) {
        const s = search.toLowerCase();
        if (
          !q.title.toLowerCase().includes(s) &&
          !q.shortDescription.toLowerCase().includes(s)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [questions, formatChip, difficulty, search]);

  const totalMins = filtered.reduce((acc, q) => acc + q.estimatedMinutes, 0);

  return (
    <div className="min-h-full bg-[var(--shell-content)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Practice Questions</h1>
          <p className="mt-2 text-zinc-500">Hands-on frontend coding challenges</p>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-lg border border-zinc-800 bg-[#141414] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/50"
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {FORMAT_CHIPS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormatChip(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                formatChip === f
                  ? "bg-green-500 text-zinc-950"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Difficulty
          </span>
          {(["all", ...DIFFICULTY_ORDER] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${
                difficulty === d
                  ? "bg-zinc-800 text-white ring-1 ring-zinc-600"
                  : "bg-zinc-900/80 text-zinc-500 hover:bg-zinc-800"
              }`}
            >
              {d === "all" ? "All" : d}
            </button>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-zinc-500">
          <span>
            <strong className="text-white">{filtered.length}</strong> questions
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" />~{totalMins} min total
          </span>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((q) => (
            <li key={q.id}>
              <Link
                href={`/practice/${q.id}`}
                className="flex h-full flex-col rounded-xl border border-zinc-800 bg-[#141414] p-5 transition-colors hover:border-green-500/30"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    {q.format === "coding" ? "JavaScript" : q.format}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs capitalize ${diffBadge(q.difficulty)}`}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-white">{q.title}</h2>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-zinc-500">{q.shortDescription}</p>
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-zinc-500">No questions match your filters.</p>
        )}

        <aside className="mt-10 rounded-xl border border-zinc-800 bg-[#141414] p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Topics
          </h3>
          <ul className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <li key={t.id}>
                <span className="inline-block rounded-md border border-zinc-700 bg-zinc-900/50 px-2 py-1 text-xs text-zinc-400">
                  {t.label}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
