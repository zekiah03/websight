"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollCue() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.06], [1, 1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed inset-x-0 bottom-20 z-30 flex flex-col items-center gap-3 text-xs italic text-mist"
    >
      <span>スクロールして、沈む</span>
      <motion.span
        className="block h-10 w-px bg-paper/40"
        animate={{ scaleY: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
