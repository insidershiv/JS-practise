import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Hexagon, Users } from "lucide-react";
import type { SystemDesignChallenge } from "@/types/system-design";
import {
  difficultyBadgeClass,
  difficultyLabel,
} from "@/lib/systemDesignRegistry";

function PointLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.+)\*\*$/);
        if (m) {
          return (
            <strong key={i} className="text-white">
              {m[1]}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function TopicDetailContent({ topic }: { topic: SystemDesignChallenge }) {
  const label = difficultyLabel(topic.difficulty);

  return (
    <div className="min-h-full bg-[var(--shell-content)]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/system-design"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-green-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to System Design
        </Link>

        <header className="mb-10 border-b border-zinc-800 pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${difficultyBadgeClass(label)}`}
            >
              {label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500">
              <Clock className="h-4 w-4" />
              {topic.estimatedTime}
            </span>
            <span className="text-sm text-zinc-600">{topic.category}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {topic.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            {topic.description}
          </p>
        </header>

        {topic.deepDive && (
          <section className="mb-10 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-green-400">
              <Hexagon className="h-4 w-4" />
              Interview angle
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300">{topic.deepDive}</p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-white">Requirements</h2>
          <ul className="space-y-3">
            {topic.requirements.map((req, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Architecture & components
          </h2>
          <ul className="space-y-3">
            {topic.architecture.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500/90" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Frontend & product focus
          </h2>
          <ul className="space-y-3">
            {topic.frontendAngle.map((line, i) => (
              <li key={i} className="text-sm leading-relaxed text-zinc-300">
                <PointLine text={line} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Tradeoffs & considerations
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {topic.considerations.map((c, i) => (
              <div
                key={i}
                className="rounded-lg border border-zinc-800 bg-[#141414] p-4 text-sm text-zinc-400"
              >
                {c}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-white">Key topics</h2>
          <div className="flex flex-wrap gap-2">
            {topic.topics.map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-zinc-800 pt-8 text-sm text-zinc-500">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            {topic.completionRateLabel}
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4" />
            {topic.attemptedLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
