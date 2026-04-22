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
      className="mb-12 flex items-end justify-between gap-4 border-b border-ink-700/60 pb-6"
    >
      <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400">
        {label}
      </h2>
      {meta && (
        <span className="font-mono text-[11px] uppercase tracking-widest text-bone-400/70">
          {meta}
        </span>
      )}
    </motion.header>
  );
}
