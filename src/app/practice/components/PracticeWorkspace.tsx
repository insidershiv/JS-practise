"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  Clock,
  Flame,
  Loader2,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  XCircle,
} from "lucide-react";
import type { PracticeQuestion } from "@/types/practice";
import { runPracticeTests, type TestResult } from "@/lib/runCode";
import { CodePlayground } from "./CodePlayground";

const PROGRESS_KEY = "practice-completed-ids";
const SPLIT_STORAGE_KEY = "practice-ide-left-pct";
const COLLAPSE_STORAGE_KEY = "practice-ide-left-collapsed";

const MIN_LEFT_PCT = 24;
const MAX_LEFT_PCT = 68;
const DEFAULT_LEFT_PCT = 42;

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

function saveCompleted(ids: Set<string>) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

function loadSplitPct(): number {
  if (typeof window === "undefined") return DEFAULT_LEFT_PCT;
  try {
    const raw = localStorage.getItem(SPLIT_STORAGE_KEY);
    if (!raw) return DEFAULT_LEFT_PCT;
    const n = Number(raw);
    if (Number.isNaN(n)) return DEFAULT_LEFT_PCT;
    return Math.min(MAX_LEFT_PCT, Math.max(MIN_LEFT_PCT, n));
  } catch {
    return DEFAULT_LEFT_PCT;
  }
}

function loadCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(COLLAPSE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function saveSplitPct(pct: number) {
  try {
    localStorage.setItem(SPLIT_STORAGE_KEY, String(Math.round(pct)));
  } catch {
    /* ignore */
  }
}

function saveCollapsed(collapsed: boolean) {
  try {
    localStorage.setItem(COLLAPSE_STORAGE_KEY, collapsed ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function notifyResize() {
  requestAnimationFrame(() => {
    window.dispatchEvent(new Event("resize"));
    requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
  });
}

export function PracticeWorkspace({ question }: { question: PracticeQuestion }) {
  const [leftTab, setLeftTab] = useState<"description" | "solution">("description");
  const [rightTab, setRightTab] = useState<"code" | "tests">("code");
  const [code, setCode] = useState(question.starterCode);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const [leftPct, setLeftPct] = useState(DEFAULT_LEFT_PCT);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [splitHydrated, setSplitHydrated] = useState(false);
  const [isWideLayout, setIsWideLayout] = useState(false);

  const splitContainerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const dragLatestRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setCode(question.starterCode);
    setResults(null);
    setLeftTab("description");
    setRightTab("code");
    setCompleted(loadCompleted());
  }, [question.id, question.starterCode]);

  useEffect(() => {
    setLeftPct(loadSplitPct());
    setLeftCollapsed(loadCollapsed());
    setSplitHydrated(true);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsWideLayout(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!splitHydrated) return;
    saveSplitPct(leftPct);
  }, [leftPct, splitHydrated]);

  const startResizeDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (leftCollapsed) return;
    e.preventDefault();
    draggingRef.current = true;
    dragLatestRef.current = leftPct;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const move = (ev: PointerEvent) => {
      const el = splitContainerRef.current;
      if (!el || !draggingRef.current) return;
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      if (w <= 0) return;
      const x = ev.clientX - rect.left;
      const pct = (x / w) * 100;
      const clamped = Math.min(MAX_LEFT_PCT, Math.max(MIN_LEFT_PCT, pct));
      dragLatestRef.current = clamped;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const v = dragLatestRef.current;
          if (v != null) setLeftPct(v);
        });
      }
    };

    const up = () => {
      draggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const final = dragLatestRef.current;
      dragLatestRef.current = null;
      if (final != null) setLeftPct(final);
      notifyResize();
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  }, [leftCollapsed, leftPct]);

  const toggleLeftPanel = useCallback(() => {
    setLeftCollapsed((c) => {
      const next = !c;
      saveCollapsed(next);
      queueMicrotask(notifyResize);
      return next;
    });
  }, []);

  const runTests = useCallback(async () => {
    setRunning(true);
    setResults(null);
    setRightTab("tests");
    try {
      const r = await runPracticeTests(code, question.tests);
      setResults(r);
      const allPass = r.length > 0 && r.every((x) => x.pass);
      if (allPass) {
        setCompleted((prev) => {
          const next = new Set(prev);
          next.add(question.id);
          saveCompleted(next);
          return next;
        });
      }
    } catch (e) {
      setResults([
        {
          name: "Runner",
          pass: false,
          error: e instanceof Error ? e.message : String(e),
        },
      ]);
    } finally {
      setRunning(false);
    }
  }, [code, question.tests, question.id]);

  const diffClass =
    question.difficulty === "easy"
      ? "text-green-400 border-green-500/40"
      : question.difficulty === "medium"
        ? "text-amber-400 border-amber-500/40"
        : "text-red-400 border-red-500/40";

  const isDone = completed.has(question.id);

  const leftPanelStyle: React.CSSProperties | undefined =
    !leftCollapsed && splitHydrated && isWideLayout
      ? { flex: `0 0 ${leftPct}%`, minWidth: 0 }
      : !leftCollapsed
        ? { flex: "1 1 auto", minWidth: 0 }
        : undefined;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 bg-[#0a0a0a] px-4 py-3">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          All questions
        </Link>
        <span className="text-zinc-600">/</span>
        <h1 className="min-w-0 flex-1 text-lg font-semibold text-white">{question.title}</h1>
        {isDone && (
          <span className="rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
            Completed
          </span>
        )}
        <button
          type="button"
          onClick={toggleLeftPanel}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-green-500/40 hover:bg-zinc-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
          aria-expanded={!leftCollapsed}
          aria-controls="problem-panel"
          title={leftCollapsed ? "Show problem statement" : "Hide problem statement"}
        >
          {leftCollapsed ? (
            <>
              <PanelLeftOpen className="h-4 w-4 text-green-500" />
              <span className="hidden sm:inline">Show problem</span>
            </>
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4 text-zinc-400" />
              <span className="hidden sm:inline">Hide problem</span>
            </>
          )}
        </button>
      </div>

      <div
        ref={splitContainerRef}
        className="flex min-h-0 flex-1 flex-col lg:flex-row"
      >
        {!leftCollapsed && (
          <div
            id="problem-panel"
            className="flex min-h-[36vh] flex-col border-b border-zinc-800 lg:min-h-0 lg:max-h-none lg:border-b-0 lg:border-r-0"
            style={leftPanelStyle}
          >
            <div className="flex shrink-0 border-b border-zinc-800">
              {(["description", "solution"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLeftTab(t)}
                  className={`cursor-pointer px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                    leftTab === t
                      ? "border-b-2 border-green-500 text-green-400"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto bg-[#0a0a0a] p-4 text-sm leading-relaxed text-zinc-300">
              {leftTab === "description" ? (
                <>
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded border border-zinc-700 px-2 py-0.5 text-zinc-500">
                      JS / TS
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 ${diffClass}`}
                    >
                      <Flame className="h-3.5 w-3.5" />
                      {question.difficulty}
                    </span>
                    <span className="inline-flex items-center gap-1 text-zinc-500">
                      <Clock className="h-3.5 w-3.5" />
                      {question.estimatedMinutes} mins
                    </span>
                    <span className="text-zinc-500">{question.doneCountLabel}</span>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                    {question.description.split("\n").map((para, i) => (
                      <p key={i} className="mb-3 last:mb-0">
                        {para.split("**").map((chunk, j) =>
                          j % 2 === 1 ? (
                            <strong key={j} className="text-white">
                              {chunk}
                            </strong>
                          ) : (
                            chunk
                          )
                        )}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <pre className="overflow-x-auto rounded-lg bg-[#1e1e1e] p-4 font-mono text-xs text-slate-200">
                  {question.solutionCode}
                </pre>
              )}
            </div>
          </div>
        )}

        {!leftCollapsed && (
          <div
            role="separator"
            aria-orientation="vertical"
            aria-valuemin={MIN_LEFT_PCT}
            aria-valuemax={MAX_LEFT_PCT}
            aria-valuenow={Math.round(leftPct)}
            className="group relative z-10 hidden h-auto w-3 shrink-0 cursor-col-resize flex-col items-center justify-center lg:flex"
            onPointerDown={startResizeDrag}
          >
            <span className="pointer-events-none absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-zinc-700 group-hover:bg-green-500/60" />
            <span className="pointer-events-none rounded border border-zinc-600 bg-zinc-800 px-0.5 py-2 text-[10px] text-zinc-500 group-hover:border-green-500/50 group-hover:text-green-400">
              ⋮
            </span>
          </div>
        )}

        <div
          className="flex min-h-[50vh] min-w-0 flex-1 flex-col bg-[#0a0a0a] lg:min-h-0"
          id="ide-panel"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-zinc-800">
            <div className="flex">
              {(["code", "tests"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setRightTab(t)}
                  className={`cursor-pointer px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                    rightTab === t
                      ? "border-b-2 border-green-500 text-green-400"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {t === "code" ? "Code" : "Test results"}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={runTests}
              disabled={running}
              className="m-2 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-green-500 disabled:opacity-50"
            >
              {running ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Run tests
            </button>
          </div>
          {rightTab === "code" ? (
            <div className="flex min-h-0 flex-1">
              <CodePlayground value={code} onChange={setCode} language="javascript" />
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {!results && !running && (
                <p className="text-sm text-zinc-500">Run tests to see results.</p>
              )}
              {running && (
                <p className="flex items-center gap-2 text-sm text-zinc-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running…
                </p>
              )}
              {results && (
                <ul className="space-y-2">
                  {results.map((r) => (
                    <li
                      key={r.name}
                      className="flex items-start gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-sm"
                    >
                      {r.pass ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                      )}
                      <div>
                        <div className="font-medium text-white">{r.name}</div>
                        {!r.pass && r.error && (
                          <pre className="mt-1 whitespace-pre-wrap text-xs text-rose-300/90">
                            {r.error}
                          </pre>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
