"use client";

import { BookOpen, Clock, Target } from "lucide-react";
import { useState } from "react";
import { ROADMAP_WEEKS } from "@/data/roadmap-weeks";

const PLANS = [
  {
    id: "js-30",
    title: "30-Day JavaScript Mastery",
    difficulty: "Beginner" as const,
    duration: "30 days",
    problems: 45,
    progress: 4,
    total: 15,
    started: true,
  },
  {
    id: "fe-sprint",
    title: "Frontend Interview Sprint",
    difficulty: "Intermediate" as const,
    duration: "14 days",
    problems: 28,
    progress: 0,
    total: 20,
    started: false,
  },
  {
    id: "sys-fe",
    title: "System Design for FE",
    difficulty: "Intermediate" as const,
    duration: "21 days",
    problems: 12,
    progress: 2,
    total: 10,
    started: true,
  },
];

export default function StudyPlansPage() {
  const [week, setWeek] = useState(1);
  const w = ROADMAP_WEEKS.find((x) => x.id === week) ?? ROADMAP_WEEKS[0];

  return (
    <div className="min-h-full bg-[var(--shell-content)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">Study Plans</h1>
          <p className="mt-2 text-zinc-500">
            Structured learning paths for your interview prep
          </p>
        </header>

        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PLANS.map((p) => {
            const pct = p.total > 0 ? Math.round((p.progress / p.total) * 100) : 0;
            return (
              <div
                key={p.id}
                className="flex flex-col rounded-xl border border-zinc-800 bg-[#141414] p-6"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15 text-green-500">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">{p.title}</h2>
                      <p className="text-sm text-zinc-500">{p.difficulty}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {p.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {p.problems} problems
                  </span>
                </div>
                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-xs text-zinc-500">
                    <span>Progress</span>
                    <span>
                      {p.progress}/{p.total}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className={`mt-auto w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                    p.started
                      ? "bg-green-500 text-zinc-950 hover:bg-green-400"
                      : "border border-zinc-700 bg-transparent text-white hover:border-green-500/50 hover:bg-green-500/5"
                  }`}
                >
                  {p.started ? "Continue" : "Start Plan"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#141414] p-6">
          <h2 className="mb-2 text-lg font-semibold text-white">8-week roadmap</h2>
          <p className="mb-6 text-sm text-zinc-500">
            Deep-dive weekly focus — align with your calendar.
          </p>
          <label className="mb-4 block text-sm text-zinc-400">
            <span className="sr-only">Select week</span>
            <select
              value={week}
              onChange={(e) => setWeek(Number(e.target.value))}
              className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              {ROADMAP_WEEKS.map((x) => (
                <option key={x.id} value={x.id}>
                  Week {x.id}: {x.title}
                </option>
              ))}
            </select>
          </label>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-white">Focus</h3>
              <p className="text-zinc-400">{w.focus}</p>
            </div>
            <div>
              <h3 className="font-medium text-white">Topics</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-zinc-400">
                {w.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <h3 className="text-sm font-medium text-green-400">Coding target</h3>
              <p className="mt-1 text-sm text-zinc-300">{w.codingTarget}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
