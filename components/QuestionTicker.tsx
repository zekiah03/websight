"use client";

import { motion } from "motion/react";
import { apps } from "@/data/apps";

export default function QuestionTicker() {
  const items = [...apps, ...apps];
  return (
    <section
      aria-label="questions"
      className="relative overflow-hidden border-y border-ink-700/50 bg-ink-900/60 py-6 backdrop-blur"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-900 to-transparent" />
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap font-serif text-2xl italic text-bone-300/90 sm:text-3xl"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {items.map((a, i) => (
          <span key={`${a.id}-${i}`} className="flex items-center gap-12">
            <span className="text-glow">●</span>
            <span>{a.question}</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
