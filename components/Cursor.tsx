"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

type Variant = "default" | "link" | "card";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });
  const rx = useSpring(x, { stiffness: 60, damping: 20, mass: 1.2 });
  const ry = useSpring(y, { stiffness: 60, damping: 20, mass: 1.2 });
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
        setLabel("ひらく");
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

  const ringScale = variant === "card" ? 2.6 : variant === "link" ? 1.5 : 1;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/60 blur-[2px] md:block"
        style={{ x: sx, y: sy }}
        animate={{ scale: variant === "default" ? 1 : 0.4, opacity: variant === "default" ? 0.7 : 0.4 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[59] hidden size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow/30 md:block"
        style={{ x: rx, y: ry, backdropFilter: "blur(2px)" }}
        animate={{ scale: ringScale, opacity: variant === "default" ? 0.4 : 0.85 }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 grid place-items-center font-serif text-xs italic text-glow/90"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
