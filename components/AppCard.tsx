import Link from "next/link";
import type { App } from "@/data/apps";
import { host } from "@/data/apps";
import Katex from "./Katex";

const STATUS_DOT: Record<App["status"], string> = {
  live: "bg-paper",
  wip: "bg-paper/50",
  archived: "bg-paper/20",
};

const STATUS_LABEL: Record<App["status"], string> = {
  live: "LIVE",
  wip: "WIP",
  archived: "ARCH",
};

export default function AppCard({ app, n }: { app: App; n: string }) {
  return (
    <Link
      href={`/apps/${app.id}`}
      className="card-anchor block w-full sm:w-[240px] p-3 sm:p-3 transition-opacity duration-300 hover:opacity-100 opacity-90 cursor-crosshair"
    >
      {/* status row */}
      <div className="flex items-baseline justify-between text-[9px] tracking-[0.3em] font-en uppercase text-paper/40">
        <div className="flex items-center gap-2">
          <span className={`block size-[5px] rounded-full ${STATUS_DOT[app.status]}`} />
          <span>{STATUS_LABEL[app.status]}</span>
        </div>
        <span className="tabular-nums">{n}</span>
      </div>

      {/* title */}
      <h3 className="mt-2 text-[15px] sm:text-[16px] leading-tight text-paper font-light tracking-tight">
        {app.title}
      </h3>

      {/* question */}
      <p className="mt-1 text-[10px] leading-relaxed italic text-paper/55">
        「{app.question}」
      </p>

      {/* formula */}
      <div className="mt-2 overflow-x-auto">
        <Katex
          math={app.formula}
          className="text-[11px] text-paper/75 katex-card"
        />
      </div>

      {/* description */}
      <p className="mt-2 text-[10px] leading-relaxed text-paper/65">
        {app.description}
      </p>

      {/* meta row */}
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[9px] tracking-[0.18em] font-en uppercase text-paper/40">
        {app.dimensions.map((d) => (
          <span key={d.label}>
            {d.label}
            <span className="ml-1 text-paper/70 tabular-nums">
              {d.value > 0 ? d.value : "—"}
            </span>
          </span>
        ))}
        {app.tags.map((t) => (
          <span key={t} className="text-paper/30">
            #{t}
          </span>
        ))}
      </div>

      {/* host + arrow */}
      <div className="mt-2 flex items-baseline justify-between text-[9px] tracking-[0.2em] font-en uppercase">
        <span className="text-paper/50 normal-case tracking-normal">
          {host(app.url)}
        </span>
        <span className="text-paper/70">→</span>
      </div>
    </Link>
  );
}
