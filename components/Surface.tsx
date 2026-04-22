"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { apps } from "@/data/apps";

export default function Surface() {
  const { scrollYProgress } = useScroll();
  const o = useTransform(scrollYProgress, [0, 0.05, 0.12], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.12], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.12], [1, 1.1]);

  return (
    <motion.section
      style={{ opacity: o, y, scale }}
      className="pointer-events-none fixed inset-0 z-[5] flex items-center justify-center px-6"
    >
      <div className="relative w-full max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="font-serif text-sm italic text-foam-300"
        >
          意識という深海の、その渦のなかへ。
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-serif text-[15vw] font-light leading-[0.92] tracking-tight text-foam-100 sm:text-[10vw] lg:text-[8.5rem]"
        >
          <span className="block">沈むこと、</span>
          <span className="block italic text-tide">問うこと。</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 1.4 }}
          className="mx-auto mt-10 max-w-md font-serif text-base italic text-foam-300"
        >
          スクロールしてください。
          <br />
          {apps.length}つの問いが、渦の縁から流れて寄ります。
        </motion.p>
      </div>
    </motion.section>
  );
}
