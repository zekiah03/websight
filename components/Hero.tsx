import { apps } from "@/data/apps";

export default function Hero() {
  const live = apps.filter((a) => a.status === "live").length;

  return (
    <section className="relative overflow-hidden border-b border-ink-700/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid bg-[size:48px_48px] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-noise opacity-40 mix-blend-screen"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-glow/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pt-36">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400">
          <span className="inline-block size-1.5 animate-flicker rounded-full bg-glow shadow-[0_0_12px_2px_rgba(158,252,255,0.7)]" />
          <span>websight / index</span>
          <span className="text-bone-400/40">—</span>
          <span>{new Date().getUTCFullYear()}</span>
        </div>

        <h1 className="mt-8 max-w-3xl font-serif text-5xl font-light leading-[1.05] text-balance text-bone-100 sm:text-7xl">
          小さなアプリを、
          <br />
          <span className="italic text-glow">問いとして</span>
          並べる。
        </h1>

        <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-bone-300 sm:text-lg">
          ここは、これまで書いてきた哲学系アプリを束ねる索引です。
          <br />
          コードは小さく、問いだけが大きい。
        </p>

        <dl className="mt-14 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-md border border-ink-700/60 bg-ink-700/60 font-mono text-[11px] uppercase tracking-widest">
          <Stat label="live" value={String(live).padStart(2, "0")} />
          <Stat label="archived" value="00" />
          <Stat label="next" value="∞" />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 bg-ink-900 px-4 py-4">
      <dt className="text-bone-400/70">{label}</dt>
      <dd className="font-sans text-2xl font-light tracking-tight text-bone-100">
        {value}
      </dd>
    </div>
  );
}
