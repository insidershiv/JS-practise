"use client";

import Link from "next/link";
import { CheckCircle2, Hexagon, Users } from "lucide-react";
import { SystemDesignStudySection } from "./SystemDesignStudySection";
import {
  SYSTEM_DESIGN_CHALLENGES,
  difficultyBadgeClass,
  difficultyLabel,
} from "@/lib/systemDesignRegistry";

export default function SystemDesignPage() {
  return (
    <div className="min-h-full bg-[var(--shell-content)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            System Design
          </h1>
          <p className="mt-2 text-zinc-500">
            Practice frontend system design interview questions.
          </p>
        </header>

        <SystemDesignStudySection />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {SYSTEM_DESIGN_CHALLENGES.map((challenge) => {
            const label = difficultyLabel(challenge.difficulty);
            return (
              <Link
                key={challenge.id}
                href={`/system-design/${challenge.id}`}
                className="group flex flex-col rounded-xl border border-zinc-800 bg-[#141414] p-5 transition-colors hover:border-green-500/35"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/15 text-green-500 ring-1 ring-green-500/25">
                      <Hexagon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h2 className="font-semibold leading-snug text-white group-hover:text-green-50">
                      {challenge.title}
                    </h2>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${difficultyBadgeClass(label)}`}
                  >
                    {label}
                  </span>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {challenge.topics.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-zinc-700/80 bg-zinc-900/50 px-2 py-0.5 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1.5 text-green-400/90">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {challenge.completionRateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-zinc-500" />
                    {challenge.attemptedLabel}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
