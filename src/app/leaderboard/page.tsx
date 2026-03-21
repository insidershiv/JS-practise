"use client";

import { Flame, Medal } from "lucide-react";

const ROWS = [
  { rank: 1, user: "alice_dev", solved: 142, streak: 24, score: 9800 },
  { rank: 2, user: "bob_codes", solved: 138, streak: 18, score: 9420 },
  { rank: 3, user: "carol_fe", solved: 131, streak: 21, score: 9100 },
  { rank: 4, user: "dev_dan", solved: 120, streak: 12, score: 8450 },
  { rank: 5, user: "erin_js", solved: 115, streak: 9, score: 8020 },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-full bg-[var(--shell-content)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">Leaderboard</h1>
          <p className="mt-2 text-zinc-500">Top performers this month (demo data)</p>
        </header>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#141414]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-500">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Solved</th>
                <th className="px-4 py-3 font-medium">Streak</th>
                <th className="px-4 py-3 font-medium text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {ROWS.map((row) => (
                <tr
                  key={row.user}
                  className={`hover:bg-white/[0.02] ${
                    row.rank <= 3 ? "bg-green-500/[0.04]" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 font-medium text-zinc-300">
                      {row.rank === 1 && <Medal className="h-4 w-4 text-amber-400" />}
                      {row.rank === 2 && <Medal className="h-4 w-4 text-zinc-300" />}
                      {row.rank === 3 && <Medal className="h-4 w-4 text-amber-700" />}
                      {row.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{row.user}</td>
                  <td className="px-4 py-3 text-zinc-300">{row.solved}</td>
                  <td className="px-4 py-3 text-zinc-300">
                    {row.streak} <Flame className="inline h-3.5 w-3.5 text-orange-400" />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-green-400">
                    {row.score.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
