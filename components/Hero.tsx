"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { apps } from "@/data/apps";
import CharReveal from "@/components/CharReveal";
import StatCounter from "@/components/StatCounter";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX} ${spotY}, rgba(158,252,255,0.22), transparent 60%)`;
  const titleX = useTransform(smx, (v) => (v - 0.5) * -18);
  const titleY = useTransform(smy, (v) => (v - 0.5) * -12);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const heroFilter = useMotionTemplate`blur(${heroBlur}px)`;

  const live = apps.filter((a) => a.status === "live").length;

  return (
    <section
      ref={ref}
      className="relative min-h-[96vh] overflow-hidden border-b border-ink-700/50"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, filter: heroFilter }}
        className="relative mx-auto flex min-h-[96vh] max-w-6xl flex-col justify-between px-6 pb-16 pt-10 sm:pt-14"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400"
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="inline-block size-1.5 rounded-full bg-glow shadow-[0_0_12px_2px_rgba(158,252,255,0.7)]"
              animate={{ opacity: [1, 0.3, 1, 0.6, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span>websight</span>
            <span className="text-bone-400/40">/</span>
            <span>index</span>
          </div>
          <span className="hidden sm:inline">
            transmitting · <StatCounter to={new Date().getUTCFullYear()} pad={4} duration={1.2} />
          </span>
        </motion.div>

        <motion.div style={{ x: titleX, y: titleY }} className="flex-1 py-16">
          <h1 className="font-serif text-[14vw] font-light leading-[0.92] tracking-tight text-bone-100 sm:text-[10vw] lg:text-[9rem]">
            <span className="block">
              <CharReveal text="小さなアプリを、" base={0.1} step={0.05} />
            </span>
            <span className="block">
              <CharReveal text="問いとして" base={0.55} step={0.06} className="text-glow" italic />
              <CharReveal text="並べる。" base={1.05} step={0.05} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-10 max-w-xl text-pretty text-base leading-relaxed text-bone-300 sm:text-lg"
          >
            これまで書いてきた小さなアプリを、ひとつずつ並べる索引。
            <br />
            コードはどれも軽く、抱えている問いだけが少し重い。
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <dl className="grid w-full max-w-md grid-cols-3 gap-px overflow-hidden rounded-md border border-ink-700/60 bg-ink-700/60 font-mono text-[10px] uppercase tracking-widest sm:text-[11px]">
            <Stat label="live" value={<StatCounter to={live} duration={1.4} />} />
            <Stat label="archived" value={<StatCounter to={0} duration={1.4} />} />
            <Stat label="next" value={<motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>∞</motion.span>} />
          </dl>
          <motion.div
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            scroll
            <motion.span
              className="block h-px bg-bone-400/50"
              animate={{ width: ["1.5rem", "3rem", "1.5rem"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 bg-ink-900/80 px-4 py-4 backdrop-blur">
      <dt className="text-bone-400/70">{label}</dt>
      <dd className="font-sans text-2xl font-light tracking-tight text-bone-100">
        {value}
      </dd>
    </div>
  );
}
