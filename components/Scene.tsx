"use client";

import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { App } from "@/data/apps";

const EXIT = 0.92;

export default function Scene({
  app,
  progress,
}: {
  app: App;
  progress: MotionValue<number>;
}) {
  const sceneOpacity = useTransform(
    progress,
    [0, 0.04, EXIT, 1],
    [0, 1, 1, 0],
  );

  // 1. Index (number) — swells up from bottom-right like fog, slow, faint
  const indexOpacity = useTransform(
    progress,
    [0.0, 0.1, 0.18, EXIT, 1],
    [0, 0.16, 0.24, 0.24, 0],
  );
  const indexScale = useTransform(progress, [0.0, 0.2], [0.6, 1]);
  const indexY = useTransform(progress, [0.0, 0.2, EXIT, 1], [80, 0, 0, -40]);

  // 2. Title — rises from below, settles mid-scene
  const titleOpacity = useTransform(
    progress,
    [0.08, 0.22, EXIT, 1],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(
    progress,
    [0.08, 0.3, EXIT, 1],
    [120, 0, 0, -30],
  );
  const titleBlur = useTransform(progress, [0.08, 0.3], ["8px", "0px"]);
  const titleFilter = useMotionTemplate`blur(${titleBlur})`;

  // 3. Subtitle — bleeds out of darkness below title (fade only)
  const subOpacity = useTransform(
    progress,
    [0.22, 0.38, EXIT, 1],
    [0, 1, 1, 0],
  );

  // 4. Status pip — ambient pulse once title lands
  const statusOpacity = useTransform(
    progress,
    [0.14, 0.24, EXIT, 1],
    [0, 1, 1, 0],
  );

  // 5. Question — drifts down slowly from the top
  const questionOpacity = useTransform(
    progress,
    [0.36, 0.55, EXIT, 1],
    [0, 1, 1, 0],
  );
  const questionY = useTransform(
    progress,
    [0.36, 0.55, EXIT, 1],
    [-80, 0, 0, 40],
  );

  // 6. Description — typed left-to-right by scrubbing clipPath
  const clip = useTransform(
    progress,
    [0.5, 0.76],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const descOpacity = useTransform(progress, [0.5, 0.58, EXIT, 1], [0, 1, 1, 0]);

  // 7. Tags — stagger rising from bottom
  const tagsContainer = useTransform(
    progress,
    [0.6, 0.78, EXIT, 1],
    [0, 1, 1, 0],
  );

  // 8. Year / URL — fade in late, lower-right
  const metaOpacity = useTransform(
    progress,
    [0.75, 0.9, EXIT, 1],
    [0, 1, 1, 0],
  );
  const metaY = useTransform(progress, [0.75, 0.9], [20, 0]);

  const statusWord =
    app.status === "live"
      ? "流れている"
      : app.status === "wip"
        ? "手入れ中"
        : "しまわれた";

  const host = (() => {
    try {
      return new URL(app.url).host.replace(/^www\./, "");
    } catch {
      return app.url;
    }
  })();

  return (
    <motion.section
      style={{ opacity: sceneOpacity }}
      className="absolute inset-0 grid grid-rows-[1fr] px-8 pb-24 pt-24 sm:px-16"
    >
      {/* 1. index (massive watermark behind everything) */}
      <motion.div
        aria-hidden
        style={{ opacity: indexOpacity, scale: indexScale, y: indexY }}
        className="pointer-events-none absolute right-[2vw] top-[8vh] select-none font-en font-normal leading-none text-paper"
      >
        <span className="block text-[44vw] tracking-tighter sm:text-[34vw]">
          {app.index}
        </span>
      </motion.div>

      {/* 4. status pip + year/URL live in the same corner group */}
      <motion.div
        style={{ opacity: statusOpacity }}
        className="absolute left-8 top-24 flex items-center gap-3 text-xs text-mist sm:left-16"
      >
        <span
          className="block size-1.5 rounded-full bg-paper"
          style={{ animation: "twinkle 3.6s ease-in-out infinite" }}
        />
        <span>{statusWord}</span>
        <span className="text-shadow">·</span>
        <span>作品 {app.index}</span>
      </motion.div>

      {/* main column */}
      <div className="relative flex h-full flex-col justify-center gap-10">
        {/* 5. question — from the top */}
        <motion.blockquote
          style={{ opacity: questionOpacity, y: questionY }}
          className="max-w-[22ch] text-balance text-md italic leading-[1.35] text-paper sm:text-[32px]"
        >
          「{app.question}」
        </motion.blockquote>

        {/* 2. title — rising, blurred in */}
        <motion.h2
          style={{
            opacity: titleOpacity,
            y: titleY,
            filter: titleFilter,
          }}
          className="font-light leading-[0.95] tracking-tight text-paper"
          aria-label={app.title}
        >
          <span className="block text-[12vw] sm:text-[9vw] lg:text-[128px]">
            {app.title}
          </span>
        </motion.h2>

        {/* 3. subtitle — bleed up from below title */}
        <motion.p
          style={{ opacity: subOpacity }}
          className="text-md font-light text-mist sm:text-[28px]"
        >
          {app.subtitle}
        </motion.p>

        {/* 6. description — typed */}
        <motion.p
          style={{ opacity: descOpacity, clipPath: clip }}
          className="max-w-[52ch] text-pretty text-sm leading-relaxed text-paper/90 sm:text-md"
        >
          {app.description}
        </motion.p>
      </div>

      {/* 7. tags — stagger rising */}
      <motion.ul
        style={{ opacity: tagsContainer }}
        className="absolute bottom-24 left-8 flex flex-wrap items-baseline gap-5 text-xs text-mist sm:left-16"
      >
        {app.tags.map((t, i) => (
          <TagItem key={t} tag={t} i={i} progress={progress} />
        ))}
      </motion.ul>

      {/* 8. meta (year + url + "覗く") */}
      <motion.a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ opacity: metaOpacity, y: metaY }}
        className="absolute bottom-24 right-8 flex flex-col items-end gap-1 text-right text-xs text-mist sm:right-16"
      >
        <span className="font-en tracking-[0.3em] text-shadow">{app.year}</span>
        <span className="text-paper/80">{host}</span>
        <span className="text-paper">覗く →</span>
      </motion.a>
    </motion.section>
  );
}

function TagItem({
  tag,
  i,
  progress,
}: {
  tag: string;
  i: number;
  progress: MotionValue<number>;
}) {
  const base = 0.6 + i * 0.03;
  const peak = Math.min(base + 0.07, 0.78);
  const opacity = useTransform(
    progress,
    [base, peak, EXIT, 1],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [base, peak], [24, 0]);
  return (
    <motion.li
      style={{ opacity, y }}
      className="font-en tracking-[0.28em] text-paper/90"
    >
      {tag}
    </motion.li>
  );
}
