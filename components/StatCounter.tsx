"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue } from "motion/react";

export default function StatCounter({
  to,
  duration = 1.4,
  pad = 2,
}: {
  to: number;
  duration?: number;
  pad?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  const v = useMotionValue(0);
  const [display, setDisplay] = useState("0".padStart(pad, "0"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(v, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) =>
        setDisplay(String(Math.round(latest)).padStart(pad, "0")),
    });
    return () => controls.stop();
  }, [inView, to, duration, pad, v]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  );
}
