"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useScene } from "@/lib/stage";
import KineticText from "@/components/KineticText";
import Float from "@/components/Float";
import type { App } from "@/data/apps";

const titleFroms: Array<"top" | "bottom"> = [
  "top",
  "bottom",
  "top",
  "bottom",
  "top",
  "bottom",
  "top",
];
const subFroms: Array<"top" | "bottom"> = [
  "bottom",
  "top",
  "bottom",
  "top",
  "bottom",
  "top",
  "bottom",
];

export default function AppScene({ app, slot }: { app: App; slot: number }) {
  const { progress } = useScene();

  const indexY = useTransform(progress, [-0.8, 0, 0.8], [180, 0, -200]);
  const indexScale = useTransform(progress, [-0.7, 0, 0.7], [0.6, 1, 1.4]);
  const indexOpacity = useTransform(
    progress,
    [-0.6, -0.1, 0.4, 0.7],
    [0, 0.2, 0.2, 0],
  );

  const descOpacity = useTransform(
    progress,
    [-0.4, -0.05, 0.4, 0.7],
    [0, 1, 1, 0],
  );
  const descY = useTransform(progress, [-0.4, -0.05, 0.4, 0.7], [60, 0, 0, -40]);
  const descScale = useTransform(progress, [-0.4, 0, 0.7], [0.94, 1, 1.06]);

  const tagsY = useTransform(progress, [-0.4, -0.05, 0.4, 0.7], [-50, 0, 0, 30]);
  const tagsOpacity = useTransform(
    progress,
    [-0.4, -0.05, 0.4, 0.7],
    [0, 1, 1, 0],
  );
  const tagsScale = useTransform(progress, [-0.4, 0, 0.7], [0.85, 1, 1.1]);

  const ctaY = useTransform(progress, [-0.3, 0, 0.4, 0.7], [70, 0, 0, -50]);
  const ctaScale = useTransform(progress, [-0.3, 0, 0.7], [0.78, 1, 1.15]);
  const ctaOpacity = useTransform(
    progress,
    [-0.3, 0, 0.4, 0.7],
    [0, 1, 1, 0],
  );

  const subRailY = useTransform(progress, [-0.5, -0.05, 0.4, 0.7], [40, 0, 0, -30]);
  const subRailOpacity = useTransform(
    progress,
    [-0.5, -0.05, 0.4, 0.7],
    [0, 1, 1, 0],
  );

  const accentSpot = useTransform(
    progress,
    [-0.7, 0, 0.7],
    [`${app.accent}00`, `${app.accent}3a`, `${app.accent}00`],
  );

  const titleFrom = titleFroms[slot % titleFroms.length];
  const subFrom = subFroms[slot % subFroms.length];

  return (
    <section className="relative grid h-full w-screen grid-rows-[auto_1fr_auto] gap-6 px-6 pb-10 pt-10 sm:px-16 sm:pb-16 sm:pt-12">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: useMotionTemplate`radial-gradient(60vw 60vh at 50% 55%, ${accentSpot}, transparent 70%)`,
        }}
      />

      <motion.span
        aria-hidden
        style={{
          y: indexY,
          scale: indexScale,
          opacity: indexOpacity,
          color: app.accent,
        }}
        className="pointer-events-none absolute right-[-2vw] top-[10vh] select-none font-serif text-[28vw] font-light leading-none tracking-tighter sm:right-[5vw] sm:text-[22vw]"
      >
        {app.index}
      </motion.span>

      <header className="relative z-10 flex items-start justify-between gap-4">
        <Float
          range={5}
          duration={9}
          as="span"
          className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400"
        >
          <span style={{ color: app.accent }}>{app.index}</span>
          <span className="h-px w-6 bg-bone-400/50" />
          <span>{app.subtitle}</span>
        </Float>
        <Float
          range={5}
          duration={10}
          delay={0.3}
          as="span"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400"
        >
          <span
            className="size-1.5 rounded-full"
            style={{
              background: app.accent,
              boxShadow: `0 0 10px ${app.accent}cc`,
            }}
          />
          {app.status} · {app.accentName}
        </Float>
      </header>

      <div className="relative z-10 flex flex-col items-start justify-center gap-8">
        <Float range={9} duration={9}>
          <h2 className="font-serif text-[12vw] font-light leading-[0.95] tracking-tight text-bone-100 sm:text-[8vw] lg:text-[6.5rem]">
            <KineticText
              text={app.title}
              progress={progress}
              from={titleFrom}
              start={-0.55}
              end={-0.05}
              step={0.55}
              className="will-change-transform"
            />
          </h2>
        </Float>

        <Float range={6} duration={8} delay={0.4}>
          <blockquote className="max-w-3xl font-serif text-2xl italic leading-snug text-bone-100/95 sm:text-4xl">
            <KineticText
              text={`“${app.question}”`}
              progress={progress}
              from={subFrom}
              start={-0.4}
              end={0.05}
              step={0.7}
            />
          </blockquote>
        </Float>
      </div>

      <footer className="relative z-10 grid grid-cols-1 items-end gap-6 sm:grid-cols-[1fr_auto]">
        <Float range={5} duration={8} delay={0.2}>
          <motion.p
            style={{ opacity: descOpacity, y: descY, scale: descScale }}
            className="max-w-md text-pretty text-sm leading-relaxed text-bone-300 sm:text-base"
          >
            {app.description}
          </motion.p>
        </Float>

        <div className="flex flex-col items-end gap-5">
          <motion.ul
            style={{ y: tagsY, scale: tagsScale, opacity: tagsOpacity }}
            className="flex flex-wrap justify-end gap-2"
          >
            {app.tags.map((t, ti) => (
              <Float key={t} range={4} duration={6 + ti * 0.4} delay={ti * 0.1}>
                <li
                  data-cursor="link"
                  className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-300"
                  style={{ borderColor: `${app.accent}55` }}
                >
                  {t}
                </li>
              </Float>
            ))}
          </motion.ul>

          <motion.div style={{ y: ctaY, scale: ctaScale, opacity: ctaOpacity }}>
            <Magnetic accent={app.accent}>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="card"
                className="group relative flex items-center gap-3 overflow-hidden border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors"
                style={{ borderColor: app.accent, color: app.accent }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `${app.accent}1a` }}
                />
                <span className="relative">visit</span>
                <span
                  aria-hidden
                  className="relative h-px w-8"
                  style={{ background: app.accent }}
                />
                <span className="relative">
                  {new URL(app.url).host.replace(/^www\./, "")}
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          style={{ y: subRailY, opacity: subRailOpacity }}
          className="absolute bottom-0 left-0 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400 sm:block"
        >
          <Float range={4} duration={9} as="span">
            ⌖ {app.year} — entry {app.index} of 07
          </Float>
        </motion.div>
      </footer>
    </section>
  );
}

function Magnetic({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > 240) {
        x.set(0);
        y.set(0);
        return;
      }
      const k = 0.32;
      x.set(dx * k);
      y.set(dy * k);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, filter: `drop-shadow(0 0 22px ${accent}40)` }}
    >
      {children}
    </motion.div>
  );
}
