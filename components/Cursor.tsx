"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 250, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 28, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 80, damping: 20, mass: 1 });
  const ry = useSpring(y, { stiffness: 80, damping: 20, mass: 1 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow shadow-[0_0_18px_4px_rgba(158,252,255,0.55)] md:block"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[59] hidden size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow/40 md:block"
        style={{ x: rx, y: ry }}
      />
    </>
  );
}
