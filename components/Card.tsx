import type { App } from "@/data/apps";

export default function Card({
  app,
  x,
  y,
  depth = 1,
}: {
  app: App;
  x: string;
  y: string;
  depth?: number;
}) {
  const scale = depth === 0 ? 0.82 : depth === 2 ? 1.08 : 1;
  const opacity = depth === 0 ? 0.62 : depth === 2 ? 1 : 0.9;

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${app.title} — ${app.subtitle}`}
      className="group absolute block"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      <article className="relative w-[260px] select-none rounded-[2px] border border-line bg-ink-raised/70 px-6 py-6 backdrop-blur-[2px] transition-[transform,border-color,opacity] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:border-paper/30 group-hover:opacity-100">
        <div
          aria-hidden
          className="glint pointer-events-none absolute inset-0 rounded-[2px]"
        />

        <header className="flex items-baseline justify-between text-xx text-mist">
          <span className="font-en tracking-widest text-paper/80">
            {app.index}
          </span>
          <span className="text-shadow">
            {app.status === "live"
              ? "流れている"
              : app.status === "wip"
                ? "手入れ中"
                : "しまわれた"}
          </span>
        </header>

        <h2 className="mt-6 text-md font-light leading-[1.2] text-paper">
          {app.title}
        </h2>
        <p className="mt-1 text-xs text-mist">{app.subtitle}</p>

        <div
          aria-hidden
          className="mt-5 h-px w-10 bg-line transition-[width,background-color] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-24 group-hover:bg-paper/30"
        />

        <blockquote className="mt-5 max-h-0 overflow-hidden text-xs leading-relaxed text-paper/80 opacity-0 transition-[max-height,opacity,margin] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:mt-5 group-hover:max-h-32 group-hover:opacity-100">
          「{app.question}」
        </blockquote>

        <p className="mt-3 max-h-0 overflow-hidden text-xs leading-relaxed text-mist opacity-0 transition-[max-height,opacity,margin] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:mt-3 group-hover:max-h-48 group-hover:opacity-100">
          {app.description}
        </p>

        <footer className="mt-5 flex items-center justify-between text-xx text-shadow">
          <span>{app.year}</span>
          <span className="inline-flex items-baseline gap-2 text-mist transition-colors duration-[1000ms] group-hover:text-paper">
            <span>覗く</span>
            <span aria-hidden>→</span>
          </span>
        </footer>
      </article>
    </a>
  );
}
