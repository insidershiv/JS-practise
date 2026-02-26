import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>
      <p className="mt-2 text-slate-600">This page could not be found.</p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-colors"
      >
        Back to Roadmap
      </Link>
    </div>
  );
}
