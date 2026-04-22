"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function Hud() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  const depth = useTransform(smooth, (v) => `${Math.round(v * 1000)}m`);
  const angle = useTransform(smooth, [0, 1], [0, 360]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: smooth, transformOrigin: "0% 50%" }}
        className="fixed inset-x-0 top-0 z-[70] h-px bg-gradient-to-r from-transparent via-tide/60 to-transparent"
      />

      <header className="pointer-events-none fixed inset-x-0 top-6 z-[58] flex items-baseline justify-between px-6 font-serif italic text-foam-300/85 sm:top-8 sm:px-10">
        <motion.span
          className="text-base"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          websight
        </motion.span>
        <span className="hidden text-sm sm:inline">渦の中の七つの問い</span>
      </header>

      <footer className="pointer-events-none fixed inset-x-0 bottom-6 z-[58] flex items-end justify-between px-6 font-serif italic text-foam-300/85 sm:bottom-8 sm:px-10">
        <span className="text-sm">click ripples · move stirs · scroll descends</span>
        <span className="flex items-baseline gap-3 text-sm tabular-nums">
          <span className="text-foam-400">深度</span>
          <motion.span className="text-base text-foam-100">{depth}</motion.span>
          <motion.span
            className="text-foam-400"
            style={{ rotate: angle, display: "inline-block" }}
            aria-hidden
          >
            ↓
          </motion.span>
        </span>
      </footer>
    </>
  );
}
