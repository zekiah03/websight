"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

type Variant = "default" | "link" | "card";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 30, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 70, damping: 18, mass: 1.2 });
  const ry = useSpring(y, { stiffness: 70, damping: 18, mass: 1.2 });
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      if (!t) return;
      const card = t.closest('[data-cursor="card"]');
      if (card) {
        setVariant("card");
        setLabel("open");
        return;
      }
      const link = t.closest('a, button, [data-cursor="link"]');
      if (link) {
        setVariant("link");
        setLabel(null);
        return;
      }
      setVariant("default");
      setLabel(null);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  const ringScale = variant === "card" ? 2.6 : variant === "link" ? 1.6 : 1;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow shadow-[0_0_22px_5px_rgba(158,252,255,0.6)] md:block"
        style={{ x: sx, y: sy }}
        animate={{ scale: variant === "default" ? 1 : 0.4 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[59] hidden size-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow/50 backdrop-blur-[1px] md:block"
        style={{ x: rx, y: ry }}
        animate={{ scale: ringScale, opacity: variant === "default" ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 grid place-items-center font-mono text-[9px] uppercase tracking-[0.2em] text-glow"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
