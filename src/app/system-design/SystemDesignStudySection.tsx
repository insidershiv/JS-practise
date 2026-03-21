"use client";

import { useState } from "react";
import { BookMarked, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import study from "@/data/system-design-study.json";

function PointLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.+)\*\*$/);
        if (m) return <strong key={i} className="text-slate-200">{m[1]}</strong>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function SystemDesignStudySection() {
  const [open, setOpen] = useState<string | null>("framework");

  return (
    <section className="mb-10 rounded-xl border border-slate-700 bg-slate-900/50 p-6">
      <div className="mb-4 flex items-start gap-3">
        <BookMarked className="mt-0.5 h-6 w-6 shrink-0 text-green-400" />
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Study guide</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            {study.intro}
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {study.sections.map((sec) => {
          const isOpen = open === sec.id;
          return (
            <li key={sec.id} className="rounded-lg border border-slate-700/80 bg-slate-950/40">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : sec.id)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-slate-200 hover:bg-slate-800/50"
              >
                <span>{sec.title}</span>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                )}
              </button>
              {isOpen && (
                <ul className="space-y-2 border-t border-slate-700/80 px-4 py-3 text-sm text-slate-400">
                  {sec.points.map((p, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      <span>
                        <PointLine text={p} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-6 border-t border-slate-700 pt-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Further reading
        </h3>
        <ul className="flex flex-wrap gap-3">
          {study.readings.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-1.5 text-xs text-green-300 hover:border-green-500/50 hover:text-green-200"
              >
                {r.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
