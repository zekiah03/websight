"use client";

import { motion } from "motion/react";

export default function Colophon() {
  return (
    <section className="relative border-t border-ink-700/60 bg-ink-900/30 backdrop-blur">
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400"
        >
          // colophon
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-8 font-serif text-3xl font-light leading-relaxed text-bone-200 sm:text-4xl"
        >
          「アプリ」とは、答えを早く返す機械ではなく、
          <br className="hidden sm:block" />
          <span className="italic text-glow">問いを長く保つ</span>ための器である。
        </motion.p>
      </div>
    </section>
  );
}
