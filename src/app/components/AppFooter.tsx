export function AppFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm text-slate-500">
          Senior Frontend Interview Prep · {year}
        </p>
      </div>
    </footer>
  );
}
