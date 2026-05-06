"use client";

import { useEffect, type ReactNode } from "react";
import { installSmoothScroll } from "@/lib/scroll";
import { LAYER_VH, NUM_LAYERS } from "@/lib/zoom";
import Backdrop from "./Backdrop";

export default function Stage({ children }: { children: ReactNode }) {
  useEffect(() => {
    installSmoothScroll();
  }, []);

  return (
    <>
      <div
        aria-hidden
        style={{ height: `${NUM_LAYERS * LAYER_VH}vh` }}
        className="w-full pointer-events-none"
      />
      <div className="fixed inset-0 overflow-hidden">
        <Backdrop />
        {children}
      </div>
    </>
  );
}
