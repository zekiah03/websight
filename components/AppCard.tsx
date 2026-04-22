"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import type { App } from "@/data/apps";

const ArrowOut = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    aria-hidden
  >
    <path strokeLinecap="round" d="M7 17L17 7" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h8v8" />
  </svg>
);

export default function AppCard({ app, i = 0 }: { app: App; i?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 140, damping: 18 });
  const smy = useSpring(my, { stiffness: 140, damping: 18 });

  const rotateY = useTransform(smx, [0, 1], [7, -7]);
  const rotateX = useTransform(smy, [0, 1], [-6, 6]);
  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${spotX} ${spotY}, rgba(158,252,255,0.22), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const host = (() => {
    try {
      return new URL(app.url).host.replace(/^www\./, "");
    } catch {
      return app.url;
    }
  })();

  const statusPip =
    app.status === "live"
      ? "bg-glow shadow-[0_0_8px_rgba(158,252,255,0.7)]"
      : app.status === "wip"
        ? "bg-ember shadow-[0_0_8px_rgba(255,107,61,0.7)]"
        : "bg-bone-400";

  return (
    <motion.a
      ref={ref}
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="card"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: (i % 6) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ scale: 1.015 }}
      className="group relative flex flex-col gap-6 overflow-hidden border border-ink-700/70 bg-ink-900/70 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-glow/50 sm:p-8"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-[size:32px_32px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left bg-gradient-to-r from-transparent via-glow/70 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: (i % 6) * 0.07 + 0.2 }}
      />

      <header className="relative flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-400">
          <motion.span
            className="text-glow"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          >
            {app.index}
          </motion.span>
          <span className="h-px w-6 bg-ink-600" />
          <span>{app.subtitle}</span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-bone-400/80">
          <motion.span
            className={`size-1.5 rounded-full ${statusPip}`}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
          />
          {app.status}
        </span>
      </header>

      <div className="relative space-y-3">
        <h2 className="font-serif text-3xl font-light tracking-tight text-bone-100 transition-colors duration-300 group-hover:text-glow sm:text-4xl">
          {app.title}
        </h2>
        <p className="text-pretty text-sm leading-relaxed text-bone-300 sm:text-[15px]">
          {app.description}
        </p>
      </div>

      <blockquote className="relative border-l border-glow/40 pl-4 font-serif text-base italic text-bone-200/90">
        “{app.question}”
      </blockquote>

      <footer className="relative mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
        <ul className="flex flex-wrap gap-2">
          {app.tags.map((t, ti) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.3 + ti * 0.06 }}
              className="rounded-full border border-ink-600/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-bone-400 transition-colors group-hover:border-glow/30 group-hover:text-bone-200"
            >
              {t}
            </motion.li>
          ))}
        </ul>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-bone-300 transition-colors group-hover:text-glow">
          {host}
          <ArrowOut />
        </span>
      </footer>
    </motion.a>
  );
}

export function PlaceholderCard({ index, i = 0 }: { index: string; i?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (i % 6) * 0.07 }}
      className="relative flex min-h-[320px] flex-col justify-between overflow-hidden border border-dashed border-ink-600/60 bg-ink-900/30 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-400/60">
        <span>{index}</span>
        <span className="h-px w-6 bg-ink-600" />
        <span>untitled</span>
      </div>
      <div className="space-y-2">
        <motion.p
          className="font-serif text-2xl font-light text-bone-300/60"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          coming soon
        </motion.p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-bone-400/50">
          // 次の問いを実装中
        </p>
      </div>
    </motion.div>
  );
}
