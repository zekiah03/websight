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

const accents = ["#aedfe4", "#aedfe4", ...apps.map((a) => a.accent), "#aedfe4"];

export default function Backdrop() {
  const { progress } = useStage();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });

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
  const tint = useMotionTemplate`radial-gradient(70vw 70vh at 50% 45%, ${accent}1f, transparent 70%)`;

  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);
  const cursorLight = useMotionTemplate`radial-gradient(520px circle at ${spotX} ${spotY}, ${accent}26, transparent 60%)`;

  const blobShiftY = useTransform(progress, [0, 1], ["0%", "-20%"]);
  const blob2ShiftY = useTransform(progress, [0, 1], ["0%", "25%"]);
  const blob3ShiftY = useTransform(progress, [0, 1], ["0%", "-12%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(140vw 140vh at 50% 110%, #0d2128 0%, #07141a 60%, #050d11 100%)",
      }}
    >
      <motion.div
        className="absolute -left-1/4 top-[-15%] size-[80vw] rounded-full bg-[#5e8d93]/15 blur-[180px]"
        style={{ y: blobShiftY }}
        animate={{ x: ["-4%", "5%", "-4%"], scale: [1, 1.08, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-20%] top-[15%] size-[70vw] rounded-full bg-[#94a886]/12 blur-[200px]"
        style={{ y: blob2ShiftY }}
        animate={{ x: ["0%", "-7%", "0%"], scale: [1, 0.92, 1] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[15%] bottom-[-30%] size-[65vw] rounded-full bg-[#b8aac9]/10 blur-[210px]"
        style={{ y: blob3ShiftY }}
        animate={{ x: ["-3%", "8%", "-3%"], scale: [1, 1.1, 1] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="absolute inset-0" style={{ background: tint }} />
      <motion.div
        className="absolute inset-0"
        style={{ background: cursorLight }}
      />

      <Ripples />

      <div className="absolute inset-0 bg-noise opacity-[0.18] mix-blend-overlay" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}

function Ripples() {
  const seeds = [
    { left: "12%", top: "28%", size: 320, duration: 9, delay: 0 },
    { left: "78%", top: "62%", size: 420, duration: 11, delay: 2 },
    { left: "42%", top: "82%", size: 260, duration: 8, delay: 4 },
    { left: "62%", top: "18%", size: 360, duration: 12, delay: 1.5 },
    { left: "22%", top: "70%", size: 300, duration: 10, delay: 3.5 },
  ];
  return (
    <>
      {seeds.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full border border-glow/15"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            translate: "-50% -50%",
          }}
          animate={{ scale: [0.6, 1.4], opacity: [0.0, 0.35, 0] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeOut",
            times: [0, 0.5, 1],
          }}
        />
      ))}
    </>
  );
}
