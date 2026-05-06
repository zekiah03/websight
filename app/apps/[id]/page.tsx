import Link from "next/link";
import { notFound } from "next/navigation";
import { apps, host } from "@/data/apps";
import { categories } from "@/data/categories";
import Katex from "@/components/Katex";
import OriginGlyph from "@/components/glyphs/OriginGlyph";
import DiagnoseGlyph from "@/components/glyphs/DiagnoseGlyph";
import RecordGlyph from "@/components/glyphs/RecordGlyph";
import ResearchGlyph from "@/components/glyphs/ResearchGlyph";
import GameGlyph from "@/components/glyphs/GameGlyph";
import ServiceGlyph from "@/components/glyphs/ServiceGlyph";

export function generateStaticParams() {
  return apps.map((a) => ({ id: a.id }));
}

const GLYPH_FOR = {
  diagnosis: DiagnoseGlyph,
  record: RecordGlyph,
  research: ResearchGlyph,
  game: GameGlyph,
  service: ServiceGlyph,
} as const;

const STATUS_LABEL = { live: "LIVE", wip: "WIP", archived: "ARCH" } as const;

type Params = Promise<{ id: string }>;

export default async function AppPage({ params }: { params: Params }) {
  const { id } = await params;
  const app = apps.find((a) => a.id === id);
  if (!app) notFound();

  const meta = categories[app.category];
  const Glyph = GLYPH_FOR[app.category] ?? OriginGlyph;
  const indexInCategory =
    apps.filter((a) => a.category === app.category).findIndex((a) => a.id === id) + 1;
  const cardN = `${meta.index}.${String(indexInCategory).padStart(2, "0")}`;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* faint glyph backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center opacity-[0.07]"
      >
        <div className="w-[min(120vh,120vmin)] h-[min(120vh,120vmin)]">
          <Glyph />
        </div>
      </div>

      {/* HUD */}
      <div className="fixed top-6 left-6 sm:top-8 sm:left-10 z-40 font-en text-[10px] tracking-[0.25em] text-paper/40 uppercase">
        <div className="font-serif italic font-medium text-[14px] tracking-[0.02em] text-paper mb-1">
          ∞ solnova
        </div>
        <Link href="/" className="hover:text-paper transition-colors">
          ← back to map
        </Link>
      </div>
      <div className="fixed top-6 right-6 sm:top-8 sm:right-10 z-40 font-en text-[10px] tracking-[0.25em] text-paper/40 uppercase text-right">
        <div className="text-paper/40">DEPTH</div>
        <div className="text-paper text-[13px] mt-1 tabular-nums">
          {meta.index}
          <span className="text-paper/30 mx-1">/</span>
          {meta.labelEn}
        </div>
        <div className="mt-1 text-paper/50 tracking-[0.2em]">{meta.labelJa}</div>
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto max-w-[860px] px-6 sm:px-12 pt-[20vh] pb-[16vh]">
        {/* card spec line */}
        <div className="font-en text-[10px] tracking-[0.4em] text-paper/45 uppercase flex items-center gap-3 mb-6">
          <span>{cardN}</span>
          <span className="text-paper/20">·</span>
          <span>{STATUS_LABEL[app.status]}</span>
          <span className="block w-12 h-px bg-paper/15" />
          <span>{meta.labelEn}</span>
          <span className="text-paper/30">{meta.labelJa}</span>
        </div>

        {/* title */}
        <h1
          className="font-serif font-light text-paper leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
        >
          {app.title}
        </h1>

        {/* question */}
        <p className="mt-6 font-serif italic text-paper/80 text-[18px] sm:text-[22px] leading-[1.5]">
          「{app.question}」
        </p>

        {/* category thesis */}
        <div className="mt-12 pt-8 border-t border-paper/10">
          <div className="font-en text-[9px] tracking-[0.4em] text-paper/35 uppercase mb-3">
            category thesis
          </div>
          <Katex math={meta.thesis} display className="text-paper/80" />
          <p className="mt-2 italic text-paper/55 text-[13px]">{meta.oneliner}</p>
        </div>

        {/* app formula */}
        <div className="mt-10 pt-8 border-t border-paper/10">
          <div className="font-en text-[9px] tracking-[0.4em] text-paper/35 uppercase mb-3">
            this app
          </div>
          <Katex math={app.formula} display className="text-paper/85" />
        </div>

        {/* description */}
        <p className="mt-10 max-w-[60ch] text-paper/75 text-[15px] leading-[1.85]">
          {app.description}
        </p>

        {/* dimensions + tags */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="font-en text-[9px] tracking-[0.4em] text-paper/35 uppercase mb-2">
              dimensions
            </div>
            <ul className="space-y-1 text-[12px] font-en uppercase tracking-[0.2em] text-paper/60">
              {app.dimensions.map((d) => (
                <li key={d.label} className="flex items-baseline justify-between">
                  <span>{d.label}</span>
                  <span className="text-paper tabular-nums">
                    {d.value > 0 ? d.value : "—"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-en text-[9px] tracking-[0.4em] text-paper/35 uppercase mb-2">
              tags
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] font-en text-paper/55">
              {app.tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* external link */}
        <div className="mt-14 pt-8 border-t border-paper/10">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-baseline gap-4 group"
          >
            <span className="font-en text-[10px] tracking-[0.35em] uppercase text-paper/45 group-hover:text-paper transition-colors">
              open
            </span>
            <span
              className="font-serif italic font-medium text-paper group-hover:text-paper transition-colors"
              style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}
            >
              {host(app.url)} ↗
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const app = apps.find((a) => a.id === id);
  if (!app) return { title: "not found — solnova" };
  return {
    title: `${app.title} — solnova / ${categories[app.category].labelEn}`,
    description: app.description,
  };
}
