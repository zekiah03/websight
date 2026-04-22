"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, opacity, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[70] h-px bg-gradient-to-r from-glow via-[#7a4dff] to-ember shadow-[0_0_8px_rgba(158,252,255,0.6)]"
    />
  );
}
