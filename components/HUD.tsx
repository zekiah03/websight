"use client";

import { useEffect, useRef } from "react";
import { onScrollProgress } from "@/lib/scroll";
import { NUM_LAYERS } from "@/lib/zoom";
import { categoryOrder, categories } from "@/data/categories";
import { manifesto } from "@/data/manifesto";

const LABELS = [
  { index: "00", labelEn: "ORIGIN", labelJa: "起点" },
  ...categoryOrder.map((c) => ({
    index: categories[c].index,
    labelEn: categories[c].labelEn,
    labelJa: categories[c].labelJa,
  })),
];

const SUPER: Record<string, string> = {
  "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³",
  "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
};

const sup = (n: number) =>
  String(n)
    .split("")
    .map((c) => SUPER[c] ?? c)
    .join("");

export default function HUD() {
  const indexRef = useRef<HTMLSpanElement>(null);
  const enRef = useRef<HTMLSpanElement>(null);
  const jaRef = useRef<HTMLSpanElement>(null);
  const depthRef = useRef<HTMLSpanElement>(null);
  const scaleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handle = (p: number) => {
      const layered = p * NUM_LAYERS;
      const idx = Math.min(NUM_LAYERS - 1, Math.max(0, Math.round(layered)));
      const label = LABELS[idx];
      if (indexRef.current) indexRef.current.textContent = label.index;
      if (enRef.current) enRef.current.textContent = label.labelEn;
      if (jaRef.current) jaRef.current.textContent = label.labelJa;
      if (depthRef.current)
        depthRef.current.textContent = `${(p * 100).toFixed(2)}`;
      if (scaleRef.current) {
        const exp = Math.floor(layered * 1.4);
        scaleRef.current.textContent = `10${sup(-exp)}`;
      }
    };
    return onScrollProgress(handle);
  }, []);

  return (
    <>
      {/* top-left brand */}
      <div className="fixed top-5 left-5 sm:top-8 sm:left-10 z-40 font-en text-[9px] sm:text-[10px] tracking-[0.25em] text-paper/40 uppercase pointer-events-none">
        <div
          className="font-serif italic font-medium text-[13px] sm:text-[14px] tracking-[0.02em] text-paper mb-1"
          style={{ fontStyle: "italic" }}
        >
          ∞ {manifesto.brand}
        </div>
        <div>SCROLL · TO · DESCEND</div>
        <div className="mt-1 text-paper/30 hidden sm:block">{manifesto.taglineJa}</div>
      </div>

      {/* top-right depth + category */}
      <div className="fixed top-5 right-5 sm:top-8 sm:right-10 z-40 font-en text-[9px] sm:text-[10px] tracking-[0.25em] text-paper/40 uppercase text-right pointer-events-none">
        <div className="text-paper/40">DEPTH</div>
        <div className="text-paper text-[12px] sm:text-[13px] mt-1 tabular-nums">
          <span ref={indexRef}>00</span>
          <span className="text-paper/30 mx-1">/</span>
          <span ref={enRef}>ORIGIN</span>
        </div>
        <div className="mt-1 text-paper/50 tracking-[0.2em]">
          <span ref={jaRef}>起点</span>
        </div>
        <div className="mt-3 text-paper/30 tabular-nums hidden sm:block">
          <span ref={scaleRef}>10⁰</span>
          <span className="mx-2">·</span>
          <span ref={depthRef}>0.00</span>%
        </div>
      </div>
    </>
  );
}
