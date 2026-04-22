"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useSpring } from "motion/react";
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
    "序",
    "ことば",
    ...apps.map((a) => a.subtitle),
    "終",
  ];

  const widthMV = useSpring(progress, { stiffness: 110, damping: 28 });

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: widthMV, transformOrigin: "0% 50%" }}
        className="fixed inset-x-0 top-0 z-[70] h-px bg-gradient-to-r from-transparent via-glow/70 to-transparent"
      />

      <Float
        as="span"
        range={4}
        duration={9}
        className="fixed bottom-6 right-6 z-[58] hidden items-baseline gap-3 font-serif text-bone-300 sm:flex"
      >
        <span className="text-base italic tabular-nums text-bone-100/90">
          {String(scene + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-6 bg-bone-400/40" />
        <span className="text-xs italic tabular-nums text-bone-400/80">
          / {String(total).padStart(2, "0")}
        </span>
        <span className="ml-2 text-sm italic text-bone-200/90">{labels[scene]}</span>
      </Float>

      <nav
        aria-label="scenes"
        className="fixed right-4 top-1/2 z-[58] hidden -translate-y-1/2 flex-col items-end gap-4 sm:flex"
      >
        {labels.map((label, i) => (
          <Drop key={i} index={i} active={scene === i} label={label} total={total} />
        ))}
      </nav>
    </>
  );
}

function Drop({
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
      className="group relative flex items-center gap-3 py-1"
      aria-label={`scene ${index + 1}: ${label}`}
    >
      <span className="font-serif text-sm italic text-bone-300/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {label}
      </span>
      <motion.span
        className="block rounded-full"
        animate={{
          width: active ? 18 : 6,
          height: active ? 6 : 6,
          backgroundColor: active ? "rgb(174 223 228)" : "rgb(196 208 209 / 0.3)",
          boxShadow: active ? "0 0 14px rgba(174,223,228,0.6)" : "none",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      />
    </button>
  );
}
