"use client";

import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { App } from "@/data/apps";

const EXIT = 0.92;

const appExtras: Record<string, { kana: string; ghostA: string; ghostB: string }> = {
  morpho:        { kana: "分", ghostA: "境界は人が引く",               ghostB: "where does one thing end" },
  profile:       { kana: "測", ghostA: "12軸 · 60の環境DNA",           ghostB: "coordinates of a person" },
  prism:         { kana: "像", ghostA: "光は分裂して初めて見える",       ghostB: "refraction of self" },
  "prism-mirror":{ kana: "鏡", ghostA: "鏡の向こうに同じ問いがある",   ghostB: "same signal · different path" },
  hanten:        { kana: "裏", ghostA: "感情の裏には感情がある",         ghostB: "flip once · flip again" },
  problemmach:   { kana: "解", ghostA: "問いを解くのではなく、解きほぐす", ghostB: "dialogue as instrument" },
  watashi:       { kana: "我", ghostA: "連続性とは何の錯覚か",           ghostB: "identity · recurring" },
};

export default function Scene({
  app,
  progress,
}: {
  app: App;
  progress: MotionValue<number>;
}) {
  const extra = appExtras[app.id] ?? { kana: app.index, ghostA: "", ghostB: "" };

  const sceneOpacity = useTransform(
    progress,
    [0, 0.04, EXIT, 1],
    [0, 1, 1, 0],
  );

  // 0. Ghost kana — enormous, behind everything, very faint
  const kanaOpacity = useTransform(
    progress,
    [0.0, 0.12, EXIT, 1],
    [0, 0.07, 0.07, 0],
  );
  const kanaScale = useTransform(progress, [0.0, 0.2], [0.85, 1]);

  // 1. Index watermark (number) — swells from bottom-right
  const indexOpacity = useTransform(
    progress,
    [0.0, 0.1, 0.2, EXIT, 1],
    [0, 0.22, 0.45, 0.45, 0],
  );
  const indexScale = useTransform(progress, [0.0, 0.2], [0.6, 1]);
  const indexY = useTransform(progress, [0.0, 0.2, EXIT, 1], [80, 0, 0, -40]);

  // 2. Title — rises from below
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

  // 3. Subtitle
  const subOpacity = useTransform(
    progress,
    [0.22, 0.38, EXIT, 1],
    [0, 1, 1, 0],
  );

  // 4. Status pip
  const statusOpacity = useTransform(
    progress,
    [0.14, 0.24, EXIT, 1],
    [0, 1, 1, 0],
  );

  // 5. Question — drifts down from top
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

  // 6. Description — typed via clipPath
  const clip = useTransform(
    progress,
    [0.5, 0.76],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const descOpacity = useTransform(progress, [0.5, 0.58, EXIT, 1], [0, 1, 1, 0]);

  // 7. Tags — stagger rising
  const tagsContainer = useTransform(
    progress,
    [0.6, 0.78, EXIT, 1],
    [0, 1, 1, 0],
  );

  // 8. Year / URL
  const metaOpacity = useTransform(
    progress,
    [0.75, 0.9, EXIT, 1],
    [0, 1, 1, 0],
  );
  const metaY = useTransform(progress, [0.75, 0.9], [20, 0]);

  // 9. Ghost phrase A — top area, enters mid-scene
  const ghostAOpacity = useTransform(
    progress,
    [0.3, 0.48, 0.62, 0.75],
    [0, 0.55, 0.55, 0],
  );
  const ghostAY = useTransform(progress, [0.3, 0.48], [-18, 0]);

  // 10. Ghost phrase B — lower area, enters late
  const ghostBOpacity = useTransform(
    progress,
    [0.65, 0.8, EXIT, 1],
    [0, 0.5, 0.5, 0],
  );
  const ghostBX = useTransform(progress, [0.65, 0.8], [-20, 0]);

  // 11. App ID stamp — appears early, stays
  const idOpacity = useTransform(
    progress,
    [0.06, 0.16, EXIT, 1],
    [0, 0.45, 0.45, 0],
  );

  // 12. Horizontal rule — slides in from left at 0.5
  const ruleScaleX = useTransform(progress, [0.44, 0.62], [0, 1]);
  const ruleOpacity = useTransform(
    progress,
    [0.44, 0.56, EXIT, 1],
    [0, 1, 1, 0],
  );

  // 13. In-scene progress fill bar
  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

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
      {/* 0. Ghost kana — enormous watermark, extremely faint */}
      <motion.div
        aria-hidden
        style={{ opacity: kanaOpacity, scale: kanaScale }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
      >
        <span
          className="font-en font-normal leading-none text-paper"
          style={{ fontSize: "65vw", letterSpacing: "-0.05em" }}
        >
          {extra.kana}
        </span>
      </motion.div>

      {/* 1. Index watermark (numeric) */}
      <motion.div
        aria-hidden
        style={{ opacity: indexOpacity, scale: indexScale, y: indexY }}
        className="pointer-events-none absolute right-[2vw] top-[8vh] select-none font-en font-normal leading-none text-paper"
      >
        <span className="block text-[44vw] tracking-tighter sm:text-[34vw]">
          {app.index}
        </span>
      </motion.div>

      {/* 11. App ID stamp */}
      <motion.div
        aria-hidden
        style={{ opacity: idOpacity }}
        className="pointer-events-none absolute right-8 top-24 text-right sm:right-16"
      >
        <span className="block font-en text-xx tracking-[0.45em] uppercase text-shadow">
          {app.id}
        </span>
        <span className="block font-en text-xx tracking-[0.3em] text-shadow/60 mt-1">
          {app.year} · {app.status}
        </span>
      </motion.div>

      {/* 4. Status pip */}
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
        <span className="text-shadow">·</span>
        <span className="text-shadow/70">{app.tags[0]}</span>
      </motion.div>

      {/* 9. Ghost phrase A */}
      <motion.p
        aria-hidden
        style={{ opacity: ghostAOpacity, y: ghostAY }}
        className="pointer-events-none absolute left-8 top-[38%] max-w-[30ch] select-none font-en italic text-xs text-mist/80 sm:left-16"
      >
        {extra.ghostA}
      </motion.p>

      {/* main column */}
      <div className="relative flex h-full flex-col justify-center gap-10">
        {/* 5. Question — from the top */}
        <motion.blockquote
          style={{ opacity: questionOpacity, y: questionY }}
          className="max-w-[22ch] text-balance text-md italic leading-[1.35] text-paper sm:text-[32px]"
        >
          「{app.question}」
        </motion.blockquote>

        {/* 2. Title — rising, blurred in */}
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

        {/* 3. Subtitle */}
        <motion.p
          style={{ opacity: subOpacity }}
          className="text-md font-light text-mist sm:text-[28px]"
        >
          {app.subtitle}
        </motion.p>

        {/* 12. Horizontal rule */}
        <motion.div
          style={{ opacity: ruleOpacity, scaleX: ruleScaleX, transformOrigin: "left center" }}
          className="h-px w-full bg-paper/12"
        />

        {/* 6. Description — typed */}
        <motion.p
          style={{ opacity: descOpacity, clipPath: clip }}
          className="max-w-[52ch] text-pretty text-sm leading-relaxed text-paper/90 sm:text-md"
        >
          {app.description}
        </motion.p>

        {/* 10. Ghost phrase B */}
        <motion.p
          aria-hidden
          style={{ opacity: ghostBOpacity, x: ghostBX }}
          className="pointer-events-none select-none font-en italic text-xs text-shadow"
        >
          {extra.ghostB}
        </motion.p>
      </div>

      {/* 7. Tags — stagger rising */}
      <motion.ul
        style={{ opacity: tagsContainer }}
        className="absolute bottom-24 left-8 flex flex-wrap items-baseline gap-5 text-xs text-mist sm:left-16"
      >
        {app.tags.map((t, i) => (
          <TagItem key={t} tag={t} i={i} progress={progress} />
        ))}
      </motion.ul>

      {/* 8. Meta (year + url + "覗く") */}
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

      {/* 13. In-scene progress bar — very thin, bottom edge */}
      <motion.div
        style={{ width: barWidth }}
        className="pointer-events-none absolute bottom-0 left-0 h-px bg-paper/20"
      />
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
