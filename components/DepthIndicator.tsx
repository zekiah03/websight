"use client";

import { useEffect, useRef } from "react";
import { onScrollProgress } from "@/lib/scroll";
import { NUM_LAYERS } from "@/lib/zoom";
import { categoryOrder, categories } from "@/data/categories";

const STEPS = [
  { en: "ORIGIN", ja: "起点" },
  ...categoryOrder.map((c) => ({
    en: categories[c].labelEn,
    ja: categories[c].labelJa,
  })),
];

export default function DepthIndicator() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handle = (p: number) => {
      const idx = Math.round(Math.min(NUM_LAYERS - 1, Math.max(0, p * NUM_LAYERS)));
      refs.current.forEach((el, i) => {
        if (!el) return;
        el.dataset.active = i === idx ? "1" : "0";
      });
    };
    return onScrollProgress(handle);
  }, []);

  return (
    <nav
      aria-label="depth"
      className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-5 font-en text-[10px] tracking-[0.2em] uppercase pointer-events-none"
    >
      {STEPS.map((s, i) => (
        <div
          key={s.en}
          ref={(el) => {
            refs.current[i] = el;
          }}
          data-active="0"
          className="depth-row flex items-center gap-3 text-paper/15 transition-colors duration-500 data-[active=1]:text-paper"
        >
          <span className="hidden sm:inline tabular-nums text-paper/30 group-data-[active=1]:text-paper/70">
            {String(i).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline">{s.en}</span>
          <span className="dot block size-[6px] rounded-full bg-paper/15 transition-all duration-500" />
        </div>
      ))}
      <style>{`
        .depth-row[data-active="1"] .dot {
          background: #f4f1ea;
          transform: scale(1.5);
          box-shadow: 0 0 12px rgba(244,241,234,0.6);
        }
      `}</style>
    </nav>
  );
}
