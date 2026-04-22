"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function Atmosphere() {
  const { scrollYProgress } = useScroll();
  const tint = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(120vw 120vh at 50% 100%, #0e2638 0%, #04101a 45%, #02060a 100%)",
      "radial-gradient(110vw 110vh at 50% 50%, #163448 0%, #04101a 50%, #02060a 100%)",
      "radial-gradient(90vw 90vh at 50% 0%, #1f475d 0%, #04101a 55%, #02060a 100%)",
    ],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ background: tint }} />

      <motion.div
        className="absolute -left-1/4 top-[-15%] size-[80vw] rounded-full bg-tide/10 blur-[180px]"
        animate={{ x: ["-4%", "4%", "-4%"], y: ["-3%", "3%", "-3%"], scale: [1, 1.08, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-20%] top-[20%] size-[70vw] rounded-full bg-kelp/10 blur-[200px]"
        animate={{ x: ["0%", "-6%", "0%"], y: ["3%", "-3%", "3%"], scale: [1, 0.92, 1] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[10%] bottom-[-30%] size-[65vw] rounded-full bg-coral/8 blur-[210px]"
        animate={{ x: ["-3%", "8%", "-3%"], y: ["-4%", "2%", "-4%"], scale: [1, 1.1, 1] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />

      <Caustics />

      <div className="absolute inset-0 bg-noise opacity-[0.18] mix-blend-overlay" />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 30%, rgba(2,6,10,0.7) 100%)",
        }}
      />
    </div>
  );
}

function Caustics() {
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 50%, rgba(174,223,228,0.6) 0 1px, transparent 1px 80px)",
        }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 30, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 30% 70%, rgba(127,183,194,0.5) 0 1px, transparent 1px 120px)",
        }}
        animate={{ rotate: [0, -40, 0] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
}
