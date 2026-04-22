"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { apps } from "@/data/apps";

const TITLE_LINE_1 = "小さなアプリを、";
const TITLE_LINE_2 = "問いとして並べる。";

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
  const titleX = useTransform(smx, (v) => (v - 0.5) * -14);
  const titleY = useTransform(smy, (v) => (v - 0.5) * -10);

  const live = apps.filter((a) => a.status === "live").length;

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] overflow-hidden border-b border-ink-700/50"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([x, y]) =>
              `radial-gradient(420px circle at ${x} ${y}, rgba(158,252,255,0.18), transparent 60%)`,
          ),
        }}
      />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-between px-6 pb-16 pt-10 sm:pt-14">
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
            transmitting · {new Date().getUTCFullYear()}
          </span>
        </motion.div>

        <motion.div style={{ x: titleX, y: titleY }} className="flex-1 py-16">
          <h1 className="font-serif text-[14vw] font-light leading-[0.92] tracking-tight text-bone-100 sm:text-[10vw] lg:text-[9rem]">
            <Reveal text={TITLE_LINE_1} />
            <span className="block">
              <ItalicReveal text="問いとして" />
              <Reveal text="並べる。" delay={0.9} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
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
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <dl className="grid w-full max-w-md grid-cols-3 gap-px overflow-hidden rounded-md border border-ink-700/60 bg-ink-700/60 font-mono text-[10px] uppercase tracking-widest sm:text-[11px]">
            <Stat label="live" value={String(live).padStart(2, "0")} />
            <Stat label="archived" value="00" />
            <Stat label="next" value="∞" />
          </dl>
          <motion.div
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            scroll
            <span className="block h-px w-10 bg-bone-400/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Reveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function ItalicReveal({ text, delay = 0.55 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block italic text-glow"
        initial={{ y: "100%", opacity: 0.4 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 bg-ink-900/80 px-4 py-4 backdrop-blur">
      <dt className="text-bone-400/70">{label}</dt>
      <dd className="font-sans text-2xl font-light tracking-tight text-bone-100">
        {value}
      </dd>
    </div>
  );
}
