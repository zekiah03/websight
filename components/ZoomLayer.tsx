"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { onScrollProgress } from "@/lib/scroll";
import { NUM_LAYERS, VISIBLE_HALF_WIDTH, ZOOM } from "@/lib/zoom";
import { bell } from "@/lib/math";

type Props = {
  index: number;
  children: ReactNode;
  size?: string;
};

export default function ZoomLayer({ index, children, size = "65vmin" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (p: number) => {
      const layered = p * NUM_LAYERS;
      const distance = layered - index;
      const scale = Math.pow(ZOOM, distance);
      const opacity = bell(distance, VISIBLE_HALF_WIDTH);
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.visibility = opacity < 0.001 ? "hidden" : "visible";
    };
    return onScrollProgress(handle);
  }, [index]);

  return (
    <div
      ref={ref}
      className="absolute top-1/2 left-1/2 will-change-[transform,opacity] z-10 pointer-events-none"
      style={{ width: size, height: size, transformOrigin: "center center" }}
    >
      {children}
    </div>
  );
}
