"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

type Variant = "default" | "link" | "card";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 30, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 90, damping: 20, mass: 1 });
  const ry = useSpring(y, { stiffness: 90, damping: 20, mass: 1 });

  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const t = e.target as Element | null;
      if (!t) return setVariant("default");
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

  const ringScale = variant === "card" ? 2.4 : variant === "link" ? 1.6 : 1;
  const ringBorder = variant === "default" ? "border-glow/40" : "border-glow/70";

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow shadow-[0_0_20px_4px_rgba(158,252,255,0.6)] md:block"
        style={{ x: sx, y: sy }}
        animate={{ scale: variant === "default" ? 1 : 0.4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      <motion.div
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[59] hidden size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border ${ringBorder} backdrop-blur-[1px] md:block`}
        style={{ x: rx, y: ry }}
        animate={{ scale: ringScale, opacity: variant === "default" ? 0.7 : 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
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
