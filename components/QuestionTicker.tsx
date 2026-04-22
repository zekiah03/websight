"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useVelocity,
  wrap,
} from "motion/react";
import { apps } from "@/data/apps";

export default function QuestionTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 280,
  });

  const baseSpeed = -40;
  const directionRef = useRef(1);

  useEffect(() => {
    return smoothVelocity.on("change", (v) => {
      if (v < -10) directionRef.current = -1;
      else if (v > 10) directionRef.current = 1;
    });
  }, [smoothVelocity]);

  useAnimationFrame((_, delta) => {
    const v = smoothVelocity.get();
    const factor = Math.min(1 + Math.abs(v) / 600, 4);
    const dx = (baseSpeed * factor * directionRef.current * delta) / 1000;
    x.set(wrap(-50, 0, x.get() + dx));
  });

  const items = [...apps, ...apps];

  return (
    <section
      aria-label="questions"
      className="relative overflow-hidden border-y border-ink-700/50 bg-ink-900/60 py-7 backdrop-blur"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-900 to-transparent" />
      <motion.div
        ref={ref}
        style={{ x: useMotionTemplatePercent(x) }}
        className="flex w-max gap-12 whitespace-nowrap font-serif text-2xl italic text-bone-300/90 sm:text-3xl"
      >
        {items.map((a, i) => (
          <span key={`${a.id}-${i}`} className="flex items-center gap-12">
            <motion.span
              className="text-glow"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: (i % 7) * 0.2 }}
            >
              ●
            </motion.span>
            <span>{a.question}</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function useMotionTemplatePercent(v: ReturnType<typeof useMotionValue<number>>) {
  const out = useMotionValue("0%");
  useEffect(() => {
    const update = () => out.set(`${v.get()}%`);
    update();
    return v.on("change", update);
  }, [v, out]);
  return out;
}
