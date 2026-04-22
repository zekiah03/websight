"use client";

import { motion, useTransform } from "motion/react";
import { useScene } from "@/lib/stage";
import KineticText from "@/components/KineticText";
import Float from "@/components/Float";

export default function Intro() {
  const { progress } = useScene();
  const subOpacity = useTransform(progress, [-0.4, -0.1, 0.4, 0.7], [0, 1, 1, 0]);
  const subY = useTransform(progress, [-0.4, -0.1, 0.4, 0.7], [40, 0, 0, -30]);
  const cueOpacity = useTransform(progress, [-0.2, 0, 0.3], [0, 1, 0]);

  return (
    <section className="relative grid h-full w-screen place-items-center px-6">
      <Float
        range={6}
        duration={9}
        as="span"
        className="absolute left-6 top-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400 sm:left-10 sm:top-10"
      >
        <span className="size-1.5 rounded-full bg-glow shadow-[0_0_10px_rgba(158,252,255,0.7)]" />
        websight / index
      </Float>

      <Float
        range={5}
        duration={11}
        delay={0.4}
        as="span"
        className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400 sm:right-10 sm:top-10"
      >
        seven small philosophies
      </Float>

      <div className="relative w-full max-w-6xl text-center">
        <Float range={8} duration={9}>
          <h1 className="font-serif text-[14vw] font-light leading-[0.9] tracking-tight text-bone-100 sm:text-[10vw] lg:text-[8.5rem]">
            <span className="block">
              <KineticText
                text="問い、"
                progress={progress}
                from="top"
                start={-0.7}
                end={-0.05}
                step={0.6}
              />
            </span>
            <span className="block">
              <KineticText
                text="ここに集める。"
                progress={progress}
                from="bottom"
                start={-0.55}
                end={0.05}
                step={0.6}
                className="text-glow"
                italic
              />
            </span>
          </h1>
        </Float>

        <Float range={4} duration={7} delay={0.6}>
          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="mx-auto mt-12 max-w-md text-pretty font-mono text-[11px] uppercase leading-relaxed tracking-[0.25em] text-bone-300"
          >
            scroll ↓ to pan ↔
          </motion.p>
        </Float>
      </div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <Float range={8} duration={2.4}>
          <div className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-400">
            <span>scroll</span>
            <span className="block h-8 w-px bg-gradient-to-b from-glow/70 to-transparent" />
          </div>
        </Float>
      </motion.div>
    </section>
  );
}
