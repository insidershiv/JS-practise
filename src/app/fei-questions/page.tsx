"use client";

import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  CheckCircle2,
  Circle,
  Code2,
  Lightbulb,
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import {
  feiQuestions,
  FEI_SECTIONS,
  type FEIQuestion,
  type FEISection,
  type FEIDifficulty,
} from "@/data/fei-questions";

const DIFFICULTY_STYLES: Record<
  FEIDifficulty,
  { bg: string; text: string; border: string }
> = {
  easy: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  medium: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  hard: { bg: "bg-rose-50", text: "text-rose-800", border: "border-rose-200" },
};

const SECTION_COLORS: Record<FEISection, string> = {
  "core-js": "bg-blue-100 text-blue-800 border-blue-200",
  "js-utilities": "bg-violet-100 text-violet-800 border-violet-200",
  promises: "bg-cyan-100 text-cyan-800 border-cyan-200",
  "dom-browser": "bg-green-100 text-green-800 border-green-200",
  react: "bg-sky-100 text-sky-800 border-sky-200",
  concepts: "bg-slate-100 text-slate-800 border-slate-200",
  "system-design": "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  "event-loop": "bg-amber-100 text-amber-800 border-amber-200",
};

const STORAGE_KEY = "fei-questions-practiced";

function loadPracticed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function savePracticed(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {}
}

export default function FEIQuestionsPage() {
  const [sectionFilter, setSectionFilter] = useState<FEISection | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<FEIDifficulty | "all">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showSolutionId, setShowSolutionId] = useState<string | null>(null);
  const [practiced, setPracticed] = useState<Set<string>>(loadPracticed);

  const togglePracticed = useCallback((id: string) => {
    setPracticed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      savePracticed(next);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    return feiQuestions.filter((q) => {
      if (sectionFilter !== "all" && q.section !== sectionFilter) return false;
      if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter) return false;
      if (search.trim()) {
        const s = search.toLowerCase();
        const match =
          q.title.toLowerCase().includes(s) ||
          q.question.toLowerCase().includes(s) ||
          q.tags.some((t) => t.toLowerCase().includes(s));
        if (!match) return false;
      }
      return true;
    });
  }, [sectionFilter, difficultyFilter, search]);

  const stats = useMemo(() => {
    const total = feiQuestions.length;
    const done = feiQuestions.filter((q) => practiced.has(q.id)).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [practiced]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Page header */}
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                From My Interview
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Questions & solutions from your FEI prep — categorized and ready to drill
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm" aria-label={`Practiced ${stats.done} of ${stats.total} questions`}>
              <span className="text-slate-500">Practiced</span>
              <span className="font-semibold text-slate-900">
                {stats.done}/{stats.total}
              </span>
              <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden" role="progressbar" aria-valuenow={stats.pct} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${stats.pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-slate-600">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search by title, question, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <Filter className="w-4 h-4" />
              Section
            </span>
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value as FEISection | "all")}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All sections</option>
              {(Object.entries(FEI_SECTIONS) as [FEISection, typeof FEI_SECTIONS[FEISection]][]).map(
                ([id, { label }]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                )
              )}
            </select>
            <span className="text-sm text-slate-500">Difficulty</span>
            {(["all", "easy", "medium", "hard"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  difficultyFilter === d
                    ? d === "all"
                      ? "bg-slate-800 text-white"
                      : `${DIFFICULTY_STYLES[d as FEIDifficulty].bg} ${DIFFICULTY_STYLES[d as FEIDifficulty].text} border ${DIFFICULTY_STYLES[d as FEIDifficulty].border}`
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {d === "all" ? "All" : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-500">
            Showing {filtered.length} of {feiQuestions.length} questions
          </p>
        </div>

        {/* Question list */}
        <div className="space-y-4">
          {filtered.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isExpanded={expandedId === q.id}
              showSolution={showSolutionId === q.id}
              isPracticed={practiced.has(q.id)}
              onToggleExpand={() =>
                setExpandedId((id) => (id === q.id ? null : q.id))
              }
              onToggleSolution={() =>
                setShowSolutionId((id) => (id === q.id ? null : q.id))
              }
              onTogglePracticed={() => togglePracticed(q.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No questions match your filters. Try changing section or search.</p>
          </div>
        )}
      </main>
    </div>
  );
}

/** Shared code block styling — use for all code (question, solution, codeSnippet) */
const CODE_BLOCK_CLASS =
  "rounded-lg bg-slate-900 text-slate-100 p-4 font-mono text-sm overflow-x-auto my-2 border border-slate-700";

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className={CODE_BLOCK_CLASS}>
      <code className="block min-w-0">{code.trim()}</code>
    </pre>
  );
}

/** Splits text by ``` (optional lang)\n...``` and returns segments */
function parseCodeBlocks(text: string): { type: "text" | "code"; content: string }[] {
  const parts: { type: "text" | "code"; content: string }[] = [];
  const codeBlockRe = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = codeBlockRe.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, m.index) });
    }
    parts.push({ type: "code", content: m[2].trim() });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }
  if (parts.length === 0) {
    parts.push({ type: "text", content: text });
  }
  return parts;
}

/** Renders question text with ```...``` as proper code blocks */
function QuestionBody({ text }: { text: string }) {
  const parts = parseCodeBlocks(text);
  return (
    <div className="space-y-3">
      {parts.map((part, i) =>
        part.type === "code" ? (
          <CodeBlock key={i} code={part.content} />
        ) : (
          <p key={i} className="whitespace-pre-wrap text-slate-800 text-sm leading-relaxed">
            {part.content.trim()}
          </p>
        )
      )}
    </div>
  );
}

/** Renders solution text with code blocks (```...```), **bold**, lists (• / -), and paragraphs */
function SolutionBody({ text }: { text: string }) {
  const parts = parseCodeBlocks(text);

  return (
    <div className="space-y-3">
      {parts.map((part, i) =>
        part.type === "code" ? (
          <CodeBlock key={i} code={part.content} />
        ) : (
          <SolutionParagraphs key={i} text={part.content} />
        )
      )}
    </div>
  );
}

function SolutionParagraphs({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
  return (
    <>
      {paragraphs.map((block, i) => {
        const trimmed = block.trim();
        const lines = trimmed.split("\n");
        const isList = lines.every(
          (l) => /^[\s]*[•\-]\s/.test(l) || /^[\s]*\d+[.)]\s/.test(l)
        );
        if (isList && lines.length > 0) {
          return (
            <ul key={i} className="list-disc list-inside mb-2 space-y-1 ml-1">
              {lines.map((line, j) => (
                <li key={j} className="leading-relaxed">
                  {renderInlineBold(line.replace(/^[\s]*[•\-]\s|^[\s]*\d+[.)]\s/, ""))}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mb-2 last:mb-0 leading-relaxed whitespace-pre-wrap">
            {trimmed.split("\n").map((line, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {renderInlineBold(line)}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

function renderInlineBold(str: string): React.ReactNode {
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function QuestionCard({
  question: q,
  isExpanded,
  showSolution,
  isPracticed,
  onToggleExpand,
  onToggleSolution,
  onTogglePracticed,
}: {
  question: FEIQuestion;
  isExpanded: boolean;
  showSolution: boolean;
  isPracticed: boolean;
  onToggleExpand: () => void;
  onToggleSolution: () => void;
  onTogglePracticed: () => void;
}) {
  const diffStyle = DIFFICULTY_STYLES[q.difficulty];
  const sectionStyle = SECTION_COLORS[q.section];

  return (
    <article
      className={`rounded-xl border-2 bg-white shadow-sm overflow-hidden transition-all ${
        isExpanded ? "border-indigo-300 shadow-md" : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Card header — always visible */}
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full flex items-start gap-3 p-4 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset rounded-t-xl"
      >
        <span className="mt-0.5 text-slate-400">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${sectionStyle}`}
            >
              {FEI_SECTIONS[q.section].label}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border}`}
            >
              {q.difficulty}
            </span>
          </div>
          <h2 className="font-semibold text-slate-900">{q.title}</h2>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePracticed();
          }}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label={isPracticed ? "Mark as not practiced" : "Mark as practiced"}
        >
          {isPracticed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300" />
          )}
        </button>
      </button>

      {/* Expanded: question + solution */}
      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-4 pb-4 pt-2">
          <div className="space-y-4">
            {/* Question */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Code2 className="w-4 h-4" />
                Question
              </div>
              <div className="rounded-lg bg-white border border-slate-200 p-4">
                <QuestionBody text={q.question} />
              </div>
            </div>

            {/* Code snippet if any — rendered as code block */}
            {q.codeSnippet && (
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">Reference</div>
                <CodeBlock code={q.codeSnippet} />
              </div>
            )}

            {/* Solution toggle */}
            <div>
              <button
                type="button"
                onClick={onToggleSolution}
                className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                <Lightbulb className="w-4 h-4" />
                {showSolution ? "Hide solution" : "Show solution"}
              </button>
              {showSolution && (
                <div className="mt-2 rounded-lg bg-amber-50/80 border border-amber-200 p-4 text-slate-800 text-sm leading-relaxed">
                  <SolutionBody text={q.solution} />
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {q.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-600 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
