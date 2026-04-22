"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useSpring, useTransform } from "motion/react";
import { useStage } from "@/lib/stage";
import { apps } from "@/data/apps";
import Float from "@/components/Float";

export default function Hud() {
  const { progress, total } = useStage();
  const [scene, setScene] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const i = Math.round(v * (total - 1));
    setScene(i);
  });

  const labels = [
    "intro",
    "manifesto",
    ...apps.map((a) => a.subtitle),
    "outro",
  ];

  const widthMV = useSpring(progress, { stiffness: 110, damping: 28 });
  const widthPct = useTransform(widthMV, (v) => `${v * 100}%`);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: widthMV, transformOrigin: "0% 50%" }}
        className="fixed inset-x-0 top-0 z-[70] h-px bg-gradient-to-r from-glow via-[#b59eff] to-ember shadow-[0_0_8px_rgba(158,252,255,0.6)]"
      />

      <Float
        as="span"
        range={5}
        duration={9}
        className="fixed bottom-6 right-6 z-[58] hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400 sm:flex"
      >
        <span className="tabular-nums text-bone-200">
          {String(scene + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-6 bg-bone-400/40" />
        <span className="tabular-nums text-bone-400/70">
          {String(total).padStart(2, "0")}
        </span>
        <span className="ml-3 text-bone-300/90">{labels[scene]}</span>
      </Float>

      <nav
        aria-label="scenes"
        className="fixed right-4 top-1/2 z-[58] hidden -translate-y-1/2 flex-col items-end gap-3 sm:flex"
      >
        {labels.map((label, i) => (
          <Dot key={i} index={i} active={scene === i} label={label} total={total} />
        ))}
      </nav>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[55] hidden items-center justify-center gap-2 pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400/70 sm:flex">
        <span>scroll ↓ to descend</span>
      </div>
    </>
  );
}

function Dot({
  index,
  active,
  label,
  total,
}: {
  index: number;
  active: boolean;
  label: string;
  total: number;
}) {
  const onClick = () => {
    if (typeof window === "undefined") return;
    const top = (index / Math.max(1, total - 1)) * (window.innerHeight * (total - 1));
    window.scrollTo({ top, behavior: "smooth" });
  };
  return (
    <button
      type="button"
      data-cursor="link"
      onClick={onClick}
      className="group relative flex items-center gap-3"
      aria-label={`scene ${index + 1}: ${label}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400 opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
      <motion.span
        className="block rounded-full"
        animate={{
          width: active ? 22 : 6,
          height: 6,
          backgroundColor: active ? "rgb(158 252 255)" : "rgb(189 189 179 / 0.4)",
          boxShadow: active ? "0 0 12px rgba(158,252,255,0.8)" : "none",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      />
    </button>
  );
}
