"use client";

import { motion } from "motion/react";

export default function CharReveal({
  text,
  base = 0,
  step = 0.04,
  className = "",
  italic = false,
}: {
  text: string;
  base?: number;
  step?: number;
  className?: string;
  italic?: boolean;
}) {
  return (
    <span aria-label={text} className={`inline-flex flex-wrap ${className}`}>
      {Array.from(text).map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom leading-[0.92]"
        >
          <motion.span
            className={`inline-block ${italic ? "italic" : ""}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: base + i * step,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
