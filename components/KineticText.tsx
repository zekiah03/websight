"use client";

import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "motion/react";

type From = "top" | "bottom";

const offsets: Record<From, number> = {
  top: -140,
  bottom: 160,
};

export default function KineticText({
  text,
  progress,
  from = "top",
  start = -0.7,
  end = -0.05,
  exit = 0.5,
  step = 0.55,
  className = "",
  italic = false,
}: {
  text: string;
  progress: MotionValue<number>;
  from?: From;
  start?: number;
  end?: number;
  exit?: number;
  step?: number;
  className?: string;
  italic?: boolean;
}) {
  const chars = Array.from(text);
  const span = end - start;
  const charSpan = span * (1 - step);
  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {chars.map((c, i) => {
        const t = chars.length === 1 ? 0 : i / (chars.length - 1);
        const cStart = start + t * span * step;
        const cEnd = cStart + charSpan;
        return (
          <KineticChar
            key={i}
            char={c}
            from={from}
            start={cStart}
            end={cEnd}
            exit={exit}
            progress={progress}
            italic={italic}
          />
        );
      })}
    </span>
  );
}

function KineticChar({
  char,
  from,
  start,
  end,
  exit,
  progress,
  italic,
}: {
  char: string;
  from: From;
  start: number;
  end: number;
  exit: number;
  progress: MotionValue<number>;
  italic: boolean;
}) {
  const o = offsets[from];
  const opacity = useTransform(
    progress,
    [start, end, exit, exit + 0.4],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, end, exit, exit + 0.4],
    [o, 0, 0, -o / 3],
  );
  const scale = useTransform(
    progress,
    [start, end, exit, exit + 0.4],
    [0.62, 1, 1, 1.18],
  );
  const blurMV = useTransform(
    progress,
    [start, end, exit, exit + 0.4],
    ["12px", "0px", "0px", "10px"],
  );
  const filter = useMotionTemplate`blur(${blurMV})`;
  return (
    <motion.span
      aria-hidden
      style={{
        y,
        scale,
        opacity,
        filter,
        display: "inline-block",
      }}
      className={italic ? "italic" : ""}
    >
      {char === " " ? " " : char}
    </motion.span>
  );
}
