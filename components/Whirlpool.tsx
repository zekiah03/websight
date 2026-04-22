"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { apps, type App } from "@/data/apps";

const SCROLL_PER_ITEM_VH = 90;

export default function Whirlpool() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const cameraScale = useTransform(smoothed, [0, 1], [1, 1.55]);
  const cameraRotate = useTransform(smoothed, [0, 1], [0, 70]);
  const cameraBlur = useTransform(
    smoothed,
    [0, 0.5, 1],
    ["blur(0px)", "blur(0.4px)", "blur(0px)"],
  );

  const totalH = apps.length * SCROLL_PER_ITEM_VH + 120;

  return (
    <div ref={wrapperRef} style={{ height: `${totalH}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            scale: cameraScale,
            rotate: cameraRotate,
            filter: cameraBlur,
          }}
        >
          {apps.map((app, i) => (
            <SpiralItem
              key={app.id}
              app={app}
              i={i}
              total={apps.length}
              scroll={smoothed}
            />
          ))}
        </motion.div>

        <CameraHaze scroll={smoothed} />
      </div>
    </div>
  );
}

function CameraHaze({ scroll }: { scroll: MotionValue<number> }) {
  const intensity = useTransform(scroll, [0, 0.5, 1], [0.0, 0.18, 0.0]);
  const bg = useMotionTemplate`radial-gradient(60vw 60vh at 50% 50%, rgba(127,183,194,${intensity}), transparent 70%)`;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 mix-blend-screen"
      style={{ background: bg }}
    />
  );
}

function SpiralItem({
  app,
  i,
  total,
  scroll,
}: {
  app: App;
  i: number;
  total: number;
  scroll: MotionValue<number>;
}) {
  const slot = 1 / total;
  const center = (i + 0.5) * slot;
  const enter = Math.max(0, center - slot * 1.3);
  const exit = Math.min(1, center + slot * 1.3);

  const local = useTransform(scroll, [enter, center, exit], [-1, 0, 1], {
    clamp: true,
  });

  const baseAngle = (i / total) * Math.PI * 2 + i * 0.6;
  const startRadius = 60;
  const endRadius = 5;
  const radiusPct = useTransform(local, [-1, 0, 1], [startRadius, 28, endRadius]);
  const angleAdd = useTransform(local, [-1, 0, 1], [-1.4, 0, 2.6]);

  const x = useTransform([radiusPct, angleAdd] as MotionValue<number>[], (latest) => {
    const [r, a] = latest as [number, number];
    return Math.cos(baseAngle + a) * r;
  });
  const y = useTransform([radiusPct, angleAdd] as MotionValue<number>[], (latest) => {
    const [r, a] = latest as [number, number];
    return Math.sin(baseAngle + a) * r * 0.92;
  });

  const scale = useTransform(local, [-1.1, -0.6, 0, 0.5, 1.1], [0.4, 0.7, 1, 0.55, 0.18]);
  const opacity = useTransform(
    local,
    [-1.2, -0.7, -0.2, 0.2, 0.7, 1.1],
    [0, 0.6, 1, 1, 0.5, 0],
  );
  const blurMV = useTransform(local, [-1.1, 0, 1.1], [10, 0, 14]);
  const filter = useMotionTemplate`blur(${blurMV}px)`;
  const itemRotate = useTransform(local, [-1, 0, 1], [-12, 0, 28]);

  const left = useTransform(x, (v) => `calc(50% + ${v}vmin)`);
  const top = useTransform(y, (v) => `calc(50% + ${v}vmin)`);

  return (
    <motion.article
      style={{
        left,
        top,
        translate: "-50% -50%",
        opacity,
        scale,
        filter,
        rotate: itemRotate,
      }}
      className="absolute w-[78vmin] max-w-[680px] origin-center"
    >
      <Card app={app} accent={app.accent} local={local} />
    </motion.article>
  );
}

function Card({
  app,
  accent,
  local,
}: {
  app: App;
  accent: string;
  local: MotionValue<number>;
}) {
  const indexFloat = useTransform(local, [-1, 0, 1], [12, 0, -8]);
  return (
    <div
      data-cursor="card"
      className="relative isolate cursor-none rounded-[28px] border border-foam-400/15 bg-abyss-900/50 px-7 py-7 backdrop-blur-md sm:px-9 sm:py-9"
      style={{
        boxShadow: `0 30px 80px -30px ${accent}40, inset 0 0 0 1px rgba(255,255,255,0.02)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] opacity-60"
        style={{
          background: `radial-gradient(60% 80% at 50% 0%, ${accent}26, transparent 70%)`,
        }}
      />
      <header className="flex items-center justify-between gap-4 font-serif italic text-foam-300">
        <motion.span
          style={{ y: indexFloat, color: accent }}
          className="text-2xl tabular-nums"
        >
          {app.index}
        </motion.span>
        <span className="text-sm text-foam-400">{app.subtitle}</span>
      </header>
      <h2
        className="mt-5 font-serif text-4xl font-light leading-[1.05] text-foam-100 sm:text-5xl"
        style={{ textShadow: `0 0 40px ${accent}33` }}
      >
        {app.title}
      </h2>
      <blockquote
        className="mt-5 max-w-[44ch] border-l pl-4 font-serif text-base italic leading-relaxed text-foam-200 sm:text-lg"
        style={{ borderColor: `${accent}66` }}
      >
        「{app.question}」
      </blockquote>
      <p className="mt-4 max-w-[52ch] text-pretty font-serif text-sm leading-relaxed text-foam-300/90 sm:text-base">
        {app.description}
      </p>
      <footer className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2">
          {app.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border px-2.5 py-0.5 font-serif text-xs italic text-foam-200"
              style={{ borderColor: `${accent}55`, background: `${accent}12` }}
            >
              {t}
            </li>
          ))}
        </ul>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="card"
          className="group inline-flex items-center gap-2 font-serif text-sm italic transition-opacity hover:opacity-100"
          style={{ color: accent }}
        >
          <span>覗く</span>
          <span className="h-px w-8" style={{ background: accent }} />
          <span className="text-foam-400">
            {(() => {
              try {
                return new URL(app.url).host.replace(/^www\./, "");
              } catch {
                return app.url;
              }
            })()}
          </span>
        </a>
      </footer>
    </div>
  );
}
