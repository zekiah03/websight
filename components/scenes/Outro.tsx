"use client";

import { motion, useTransform } from "motion/react";
import { useScene } from "@/lib/stage";
import KineticText from "@/components/KineticText";
import Float from "@/components/Float";

export default function Outro() {
  const { progress } = useScene();
  const subOpacity = useTransform(progress, [-0.4, -0.1, 0.6], [0, 1, 1]);
  const subY = useTransform(progress, [-0.4, -0.1], [40, 0]);

  return (
    <section className="relative grid h-full w-screen place-items-center px-6">
      <Float
        range={5}
        duration={11}
        as="span"
        className="absolute left-6 top-6 font-serif text-sm italic text-bone-300/90 sm:left-10 sm:top-10"
      >
        ここまで、ひとまず
      </Float>

      <div className="relative w-full max-w-5xl text-center">
        <Float range={9} duration={10}>
          <h2 className="font-serif text-[14vw] font-light leading-[0.92] tracking-tight text-bone-100 sm:text-[10vw] lg:text-[8rem]">
            <span className="block">
              <KineticText
                text="次の問いは、"
                progress={progress}
                from="top"
                start={-0.6}
                end={-0.05}
                step={0.6}
              />
            </span>
            <span className="block">
              <KineticText
                text="まだ書かれていない。"
                progress={progress}
                from="bottom"
                start={-0.45}
                end={0.1}
                step={0.6}
                className="text-glow"
                italic
              />
            </span>
          </h2>
        </Float>

        <Float range={4} duration={8} delay={0.6}>
          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="mx-auto mt-12 max-w-md text-pretty font-serif text-base italic leading-relaxed text-bone-300"
          >
            websight ・ {new Date().getUTCFullYear()} ・ 静かに作っています
          </motion.p>
        </Float>
      </div>
    </section>
  );
}
