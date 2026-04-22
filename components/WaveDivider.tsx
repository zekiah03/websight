"use client";

import { motion } from "motion/react";

export default function WaveDivider() {
  return (
    <div aria-hidden className="relative h-24 w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="wave-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#9efcff" stopOpacity="0" />
            <stop offset="50%" stopColor="#9efcff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#9efcff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          fill="none"
          stroke="url(#wave-grad)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-30%" }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          d="M0,50 Q150,10 300,50 T600,50 T900,50 T1200,50"
        />
        <motion.path
          fill="none"
          stroke="url(#wave-grad)"
          strokeWidth="1"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-30%" }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          d="M0,55 Q150,90 300,55 T600,55 T900,55 T1200,55"
        />
      </svg>
    </div>
  );
}
