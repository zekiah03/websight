"use client";

import Lenis from "lenis";

let lenis: Lenis | null = null;
let listeners = new Set<(progress: number) => void>();
let raf = 0;
let installed = false;
let prefersReduced = false;

function tick(t: number) {
  if (lenis) lenis.raf(t);
  raf = requestAnimationFrame(tick);
}

function emit() {
  const vh = window.innerHeight;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  const progress = window.scrollY / max;
  listeners.forEach((fn) => fn(progress));
}

export function installSmoothScroll() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });
    lenis.on("scroll", emit);
    raf = requestAnimationFrame(tick);
  } else {
    window.addEventListener("scroll", emit, { passive: true });
  }

  emit();
  window.addEventListener("resize", emit);
}

export function onScrollProgress(fn: (p: number) => void) {
  listeners.add(fn);
  if (typeof window !== "undefined") {
    queueMicrotask(emit);
  }
  return () => {
    listeners.delete(fn);
  };
}

export function destroyScroll() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  cancelAnimationFrame(raf);
  installed = false;
  listeners.clear();
}
