"use client";

import { useEffect, useRef } from "react";
import { onScrollProgress } from "@/lib/scroll";

export default function ScrollHint() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (p: number) => {
      if (!ref.current) return;
      ref.current.style.opacity = p > 0.005 ? "0" : "1";
    };
    return onScrollProgress(handle);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 font-en text-[10px] tracking-[0.4em] text-paper/40 uppercase pointer-events-none transition-opacity duration-700"
      style={{ animation: "hint-pulse 2.4s ease-in-out infinite" }}
    >
      ↓ SCROLL ↓
      <style>{`
        @keyframes hint-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
