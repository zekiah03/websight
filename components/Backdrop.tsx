"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useStage } from "@/lib/stage";
import { apps } from "@/data/apps";

const accents = ["#ffffff", "#ffffff", ...apps.map((a) => a.accent), "#ffffff"];

export default function Backdrop() {
  const { progress, total } = useStage();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const points = accents.map((_, i) => i / Math.max(1, accents.length - 1));
  const accent = useTransform(progress, points, accents);
  const tint = useMotionTemplate`radial-gradient(60vw 60vh at 50% 40%, ${accent}26, transparent 70%)`;

  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);
  const cursorLight = useMotionTemplate`radial-gradient(420px circle at ${spotX} ${spotY}, ${accent}33, transparent 60%)`;

  const blobShiftY = useTransform(progress, [0, 1], ["0%", "-15%"]);
  const blob2ShiftY = useTransform(progress, [0, 1], ["0%", "20%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <motion.div
        className="absolute -left-1/4 top-[-15%] size-[70vw] rounded-full bg-glow/15 blur-[140px]"
        style={{ y: blobShiftY }}
        animate={{ x: ["-5%", "5%", "-5%"], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[10%] size-[60vw] rounded-full bg-[#7a4dff]/15 blur-[160px]"
        style={{ y: blob2ShiftY }}
        animate={{ x: ["0%", "10%", "0%"], scale: [1, 0.9, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[20%] bottom-[-25%] size-[55vw] rounded-full bg-ember/10 blur-[180px]"
        animate={{ x: ["-5%", "10%", "-5%"], y: ["0%", "-10%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="absolute inset-0" style={{ background: tint }} />
      <motion.div className="absolute inset-0" style={{ background: cursorLight }} />

      <div className="absolute inset-0 bg-grid bg-[size:60px_60px] opacity-[0.05]" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />

      <motion.div
        aria-hidden
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-glow/40 to-transparent"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
