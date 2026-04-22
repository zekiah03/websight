"use client";

import { motion } from "motion/react";

export default function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />

      <motion.div
        className="absolute -left-1/4 top-[-10%] size-[60vw] rounded-full bg-glow/20 blur-[140px]"
        animate={{
          x: ["0%", "30%", "-10%", "0%"],
          y: ["0%", "20%", "40%", "0%"],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[20%] size-[55vw] rounded-full bg-[#7a4dff]/15 blur-[160px]"
        animate={{
          x: ["0%", "-25%", "10%", "0%"],
          y: ["0%", "30%", "-10%", "0%"],
          scale: [1, 0.85, 1.2, 1],
        }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[20%] bottom-[-20%] size-[50vw] rounded-full bg-ember/10 blur-[180px]"
        animate={{
          x: ["0%", "20%", "-15%", "0%"],
          y: ["0%", "-20%", "10%", "0%"],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-grid bg-[size:56px_56px] opacity-[0.07]" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
