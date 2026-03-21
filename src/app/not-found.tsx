import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-slate-200">404</h1>
      <p className="mt-2 text-slate-400">This page could not be found.</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-4 py-2 font-medium text-zinc-950 transition-colors hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
      >
        Back to Roadmap
      </Link>
    </div>
  );
}
