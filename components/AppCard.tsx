import type { App } from "@/data/apps";

const ArrowOut = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    aria-hidden
  >
    <path strokeLinecap="round" d="M7 17L17 7" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h8v8" />
  </svg>
);

export default function AppCard({ app }: { app: App }) {
  const host = (() => {
    try {
      return new URL(app.url).host.replace(/^www\./, "");
    } catch {
      return app.url;
    }
  })();

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-6 overflow-hidden border border-ink-700/70 bg-ink-900/60 p-6 transition-colors duration-300 hover:border-glow/40 hover:bg-ink-800/80 sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-[size:32px_32px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-glow/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <header className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-400">
          <span className="text-glow">{app.index}</span>
          <span className="h-px w-6 bg-ink-600" />
          <span>{app.subtitle}</span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-bone-400/80">
          <span className="size-1.5 rounded-full bg-glow shadow-[0_0_8px_rgba(158,252,255,0.7)]" />
          {app.status}
        </span>
      </header>

      <div className="space-y-3">
        <h2 className="font-serif text-3xl font-light tracking-tight text-bone-100 sm:text-4xl">
          {app.title}
        </h2>
        <p className="text-sm leading-relaxed text-bone-300 text-pretty sm:text-[15px]">
          {app.description}
        </p>
      </div>

      <blockquote className="border-l border-glow/40 pl-4 font-serif text-base italic text-bone-200/90">
        “{app.question}”
      </blockquote>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
        <ul className="flex flex-wrap gap-2">
          {app.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-ink-600/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-bone-400"
            >
              {t}
            </li>
          ))}
        </ul>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-bone-300 transition-colors group-hover:text-glow">
          {host}
          <ArrowOut />
        </span>
      </footer>
    </a>
  );
}

export function PlaceholderCard({ index }: { index: string }) {
  return (
    <div className="relative flex min-h-[320px] flex-col justify-between overflow-hidden border border-dashed border-ink-600/60 bg-ink-900/30 p-6 sm:p-8">
      <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-400/60">
        <span>{index}</span>
        <span className="h-px w-6 bg-ink-600" />
        <span>untitled</span>
      </div>
      <div className="space-y-2">
        <p className="font-serif text-2xl font-light text-bone-300/60">
          coming soon
        </p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-bone-400/50">
          // 次の問いを実装中
        </p>
      </div>
    </div>
  );
}
