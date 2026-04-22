"use client";

import { motion } from "motion/react";

export default function SectionHeading({
  label,
  meta,
}: {
  label: string;
  meta?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="relative mb-12 flex items-end justify-between gap-4 border-b border-ink-700/60 pb-6"
    >
      <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400">
        {label}
      </h2>
      {meta && (
        <span className="font-mono text-[11px] uppercase tracking-widest text-bone-400/70">
          {meta}
        </span>
      )}
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 h-px origin-left bg-glow/40"
        style={{ bottom: 0 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </motion.header>
  );
}
