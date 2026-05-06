import Katex from "./Katex";
import { manifesto } from "@/data/manifesto";

export default function ManifestoLayer() {
  return (
    <div className="absolute inset-0 grid place-items-center px-6">
      <div className="max-w-[760px] text-center">
        <div className="font-en text-[10px] tracking-[0.4em] text-paper/40 uppercase mb-6 flex items-center justify-center gap-3">
          <span className="block w-8 h-px bg-paper/15" />
          <span>000 — ORIGIN · 起点</span>
          <span className="block w-8 h-px bg-paper/15" />
        </div>

        <h1
          className="font-serif font-light text-paper leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(48px, 9vw, 112px)" }}
        >
          <span style={{ fontStyle: "italic" }}>{manifesto.brand}</span>
          <span className="text-paper/40 mx-3">/</span>
          <em className="not-italic font-medium">∞</em>
        </h1>

        <p
          className="mt-7 font-serif font-light text-paper/80 italic"
          style={{ fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.7 }}
        >
          {manifesto.taglineEn}
        </p>
        <p className="mt-2 font-serif text-paper/60 text-[14px] tracking-[0.05em]">
          {manifesto.taglineJa}
        </p>

        <div className="mt-10">
          <Katex math={manifesto.thesis} display className="text-paper/75" />
        </div>

        <p className="mt-8 max-w-[520px] mx-auto font-serif text-paper/50 text-[13px] leading-[1.85]">
          {manifesto.body}
        </p>
      </div>

      {/* corner spec marks (desktop only) */}
      <div className="hidden md:block absolute top-1/2 left-6 -translate-y-1/2 font-en text-[9px] tracking-[0.35em] text-paper/30 uppercase rotate-180" style={{ writingMode: "vertical-rl" }}>
        five scales · diagnose / record / research / play / serve
      </div>
      <div className="hidden md:block absolute top-1/2 right-6 -translate-y-1/2 font-en text-[9px] tracking-[0.35em] text-paper/30 uppercase" style={{ writingMode: "vertical-rl" }}>
        a small research studio · est. 2025
      </div>
    </div>
  );
}
