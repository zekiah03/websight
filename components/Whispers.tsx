"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { apps } from "@/data/apps";

const extras = [
  "問いは流される、答えは沈む。",
  "わたしは、なに、ここに。",
  "言葉のあとに、まだ言葉。",
  "渦は中心を持たない。",
];

const phrases = [...apps.map((a) => a.question), ...extras];

const seeds = [
  { x: 8, y: 18, size: 5.5, rot: -6, depth: 0.2 },
  { x: 62, y: 12, size: 4.4, rot: 8, depth: 0.5 },
  { x: 78, y: 38, size: 3.6, rot: -3, depth: 0.7 },
  { x: 14, y: 52, size: 4.8, rot: 12, depth: 0.35 },
  { x: 48, y: 64, size: 3.2, rot: -8, depth: 0.6 },
  { x: 70, y: 78, size: 5.0, rot: 5, depth: 0.45 },
  { x: 6, y: 80, size: 3.8, rot: -2, depth: 0.55 },
  { x: 36, y: 30, size: 3.0, rot: 14, depth: 0.75 },
  { x: 88, y: 60, size: 4.2, rot: -10, depth: 0.4 },
  { x: 28, y: 88, size: 3.4, rot: 6, depth: 0.65 },
  { x: 56, y: 6, size: 3.6, rot: -4, depth: 0.5 },
];

export default function Whispers() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {seeds.map((s, i) => {
        const phrase = phrases[i % phrases.length];
        return (
          <Whisper
            key={i}
            phrase={phrase}
            x={s.x}
            y={s.y}
            size={s.size}
            rot={s.rot}
            depth={s.depth}
            i={i}
            scroll={scrollYProgress}
          />
        );
      })}
    </div>
  );
}

function Whisper({
  phrase,
  x,
  y,
  size,
  rot,
  depth,
  i,
  scroll,
}: {
  phrase: string;
  x: number;
  y: number;
  size: number;
  rot: number;
  depth: number;
  i: number;
  scroll: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const drift = useTransform(scroll, [0, 1], [0, 80 * (1 - depth) * (i % 2 ? 1 : -1)]);
  const rotateScroll = useTransform(scroll, [0, 1], [rot, rot + (i % 2 ? -28 : 28)]);
  const fade = useTransform(
    scroll,
    [0, 0.1 * depth, 0.85 - 0.4 * depth, 1],
    [0, 0.06 + depth * 0.08, 0.06 + depth * 0.08, 0],
  );
  const scale = useTransform(scroll, [0, 1], [1, 1 + depth * 0.4]);

  return (
    <motion.span
      className="absolute whitespace-nowrap font-serif italic text-tide/70"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}vw`,
        opacity: fade,
        x: drift,
        rotate: rotateScroll,
        scale,
        filter: `blur(${(1 - depth) * 3}px)`,
        translate: "-50% -50%",
      }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 12 + depth * 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.4,
      }}
    >
      {phrase}
    </motion.span>
  );
}
