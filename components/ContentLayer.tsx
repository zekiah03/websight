"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { onScrollProgress } from "@/lib/scroll";
import { NUM_LAYERS } from "@/lib/zoom";
import { bell } from "@/lib/math";

type Props = {
  index: number;
  children: ReactNode;
};

// Tighter than the zoom-layer bell so text only appears when this layer is
// truly "at rest" — gives the user time to read.
const TEXT_HALF_WIDTH = 0.45;

export default function ContentLayer({ index, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (p: number) => {
      const layered = p * NUM_LAYERS;
      const distance = layered - index;
      const opacity = bell(distance, TEXT_HALF_WIDTH);
      const el = ref.current;
      if (!el) return;
      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `translateY(${(distance * -32).toFixed(1)}px)`;
      el.style.pointerEvents = opacity > 0.55 ? "auto" : "none";
      el.style.visibility = opacity < 0.001 ? "hidden" : "visible";
    };
    return onScrollProgress(handle);
  }, [index]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-20 will-change-[opacity,transform]"
    >
      {children}
    </div>
  );
}
