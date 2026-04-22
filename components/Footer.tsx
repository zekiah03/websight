export default function Footer() {
  return (
    <footer className="border-t border-ink-700/60 bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-400 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getUTCFullYear()} websight</span>
        <span className="text-bone-400/60">
          built quietly · {new Date().toISOString().slice(0, 10)}
        </span>
      </div>
    </footer>
  );
}
