"use client";

import { motion, useMotionValueEvent, useSpring, useTransform } from "motion/react";
import { useState } from "react";
import { useStage } from "@/lib/stage";
import { apps } from "@/data/apps";

export default function Footer() {
  const { progress, scenes } = useStage();
  const [scene, setScene] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const i = Math.min(scenes - 1, Math.floor(v * scenes));
    setScene(i);
  });

  const pct = useTransform(progress, (v) => Math.round(v * 100));
  const pctSpring = useSpring(pct, { stiffness: 90, damping: 28 });

  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-baseline justify-between px-8 pb-6 text-xs text-mist sm:px-12 sm:pb-8">
      <div className="pointer-events-auto flex items-baseline gap-3">
        <span className="text-paper">{String(scene + 1).padStart(2, "0")}</span>
        <span className="text-shadow">/</span>
        <span>{String(scenes).padStart(2, "0")}</span>
        <span className="text-shadow ml-4">·</span>
        <span>{apps.length} 作品 · まだ続く</span>
      </div>
      <div className="pointer-events-auto flex items-baseline gap-3">
        <span>深度</span>
        <motion.span className="text-paper tabular-nums">{pctSpring}</motion.span>
        <span className="text-shadow">%</span>
        <span className="text-shadow ml-4">·</span>
        <span>夜</span>
      </div>
    </footer>
  );
}
