import { EXTRA_CHALLENGES } from "@/data/_challenges-extra";
import { SYSTEM_DESIGN_CHALLENGES_RAW } from "@/data/_challenges-raw";
import type { SystemDesignChallenge } from "@/types/system-design";

type RawChallenge = Omit<
  SystemDesignChallenge,
  "attemptedLabel" | "completionRateLabel" | "frontendAngle"
> & {
  frontendAngle?: string[];
  deepDive?: string;
};

function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function enrich(c: RawChallenge): SystemDesignChallenge {
  const h = hash(c.id);
  const attempted = 500 + (h % 9500);
  const rate = h % 38;
  return {
    ...c,
    attemptedLabel: `${attempted.toLocaleString()} attempted`,
    completionRateLabel: `${rate}% rate`,
    frontendAngle:
      c.frontendAngle ?? [
        `Ship a resilient first load for **${c.title}** — skeleton UI, critical CSS, and edge caching where possible.`,
        `Instrument interaction-heavy surfaces with INP and long-task observers; keep bundles predictable with route-based splitting.`,
        `Define clear API contracts between client teams, design system, and platform (auth, flags, observability).`,
      ],
    deepDive: c.deepDive,
  };
}

const merged: RawChallenge[] = [
  ...(SYSTEM_DESIGN_CHALLENGES_RAW as unknown as RawChallenge[]),
  ...(EXTRA_CHALLENGES as unknown as RawChallenge[]),
];

export const SYSTEM_DESIGN_CHALLENGES: SystemDesignChallenge[] = merged.map(enrich);

export function getChallengeBySlug(slug: string): SystemDesignChallenge | undefined {
  return SYSTEM_DESIGN_CHALLENGES.find((c) => c.id === slug);
}

export function getAllChallengeSlugs(): string[] {
  return SYSTEM_DESIGN_CHALLENGES.map((c) => c.id);
}

export function difficultyLabel(
  d: SystemDesignChallenge["difficulty"]
): "medium" | "hard" {
  return d === "intermediate" ? "medium" : "hard";
}

export function difficultyBadgeClass(label: "medium" | "hard"): string {
  return label === "medium"
    ? "border border-amber-700/50 bg-amber-950/70 text-amber-300"
    : "border border-red-700/50 bg-red-950/70 text-red-300";
}
