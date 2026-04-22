"use client";

import { motion, useTransform } from "motion/react";
import { useScene } from "@/lib/stage";
import Float from "@/components/Float";
import { apps } from "@/data/apps";

const sentence = [
  "アプリは、",
  "答えを早く返す機械ではなく、",
  "問いを",
  "長く保つ",
  "ための",
  "器である。",
];

export default function Manifesto() {
  const { progress } = useScene();
  const stackY = useTransform(progress, [-0.6, 0, 0.6], [240, 0, -240]);

  return (
    <section className="relative grid h-full w-screen items-center gap-10 px-6 sm:grid-cols-[1.15fr_1fr] sm:gap-16 sm:px-16">
      <Float
        range={5}
        duration={11}
        as="span"
        className="absolute left-6 top-6 font-serif text-sm italic text-bone-300/80 sm:left-16 sm:top-12"
      >
        ことば、ひとつ
      </Float>

      <Float range={10} duration={9}>
        <p className="relative font-serif text-3xl font-light leading-[1.4] text-bone-100 sm:text-5xl">
          {sentence.map((word, i) => {
            const wStart = -0.55 + i * 0.06;
            const wEnd = wStart + 0.18;
            return (
              <Word
                key={i}
                word={word}
                start={wStart}
                end={wEnd}
                progress={progress}
                accent={word === "長く保つ"}
              />
            );
          })}
        </p>
      </Float>

      <div className="relative h-72 overflow-hidden sm:h-96">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-ink-950 via-ink-950/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent" />
        <motion.ul
          style={{ y: stackY }}
          className="flex flex-col items-start gap-10 font-serif text-[44px] font-light italic leading-none text-bone-200 sm:items-end sm:text-[64px]"
        >
          {[...apps, ...apps].map((a, i) => (
            <li key={`${a.id}-${i}`} style={{ color: a.accent }}>
              {a.subtitle}
            </li>
          ))}
        </motion.ul>
      </div>

      <Float
        range={5}
        duration={10}
        delay={0.5}
        as="span"
        className="absolute bottom-8 right-6 font-serif text-sm italic text-bone-400 sm:bottom-10 sm:right-16"
      >
        七つの器、まだ続く
      </Float>
    </section>
  );
}

function Word({
  word,
  start,
  end,
  progress,
  accent,
}: {
  word: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useScene>["progress"];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, [start, end, 0.4, 0.7], [0.05, 1, 1, 0.1]);
  const y = useTransform(progress, [start, end], [22, 0]);
  const blur = useTransform(progress, [start, end], ["6px", "0px"]);
  return (
    <motion.span
      style={{
        opacity,
        y,
        filter: useTransform(blur, (b) => `blur(${b})`),
        display: "inline-block",
      }}
      className={accent ? "italic text-glow" : ""}
    >
      {word}
    </motion.span>
  );
}
