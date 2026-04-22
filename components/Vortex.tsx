"use client";

import { useEffect, useRef } from "react";

type Particle = {
  angle: number;
  radius: number;
  baseRadius: number;
  speed: number;
  z: number;
  sink: number;
  hue: number;
};

type Wave = { x: number; y: number; born: number; strength: number };

const PARTICLE_COUNT = 520;
const COLORS = ["#aedfe4", "#7fb7c2", "#5e8d93", "#c8978a", "#7c9a8a"];

export default function Vortex() {
  const ref = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ mouseX: 0, mouseY: 0, scrollPull: 0, waves: [] as Wave[] });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const maxR = Math.hypot(w, h) * 0.8;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => spawn(w, h));

    function spawn(width: number, height: number, near = false): Particle {
      const r = Math.hypot(width, height);
      const baseRadius = near
        ? r * 0.05 + Math.random() * r * 0.2
        : r * (0.25 + Math.random() * 0.55);
      return {
        angle: Math.random() * Math.PI * 2,
        radius: baseRadius,
        baseRadius,
        speed: 0.3 + Math.random() * 1.2,
        z: Math.random(),
        sink: 0.18 + Math.random() * 0.7,
        hue: Math.floor(Math.random() * COLORS.length),
      };
    }

    const onMove = (e: PointerEvent) => {
      stateRef.current.mouseX = e.clientX;
      stateRef.current.mouseY = e.clientY;
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      stateRef.current.scrollPull = Math.min(1, window.scrollY / max);
    };
    const onClick = (e: PointerEvent) => {
      stateRef.current.waves.push({
        x: e.clientX,
        y: e.clientY,
        born: performance.now(),
        strength: 1,
      });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onClick);
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = performance.now();

    const tick = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;

      ctx.fillStyle = "rgba(2, 6, 10, 0.18)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      const pull = stateRef.current.scrollPull;
      const sinkBoost = 1 + pull * 1.6;
      const angularBoost = 1 + pull * 0.8;
      const mx = stateRef.current.mouseX || cx;
      const my = stateRef.current.mouseY || cy;

      stateRef.current.waves = stateRef.current.waves.filter(
        (wv) => t - wv.born < 2400,
      );

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const closeness = 1 - Math.min(1, p.radius / maxR);
        p.angle += (0.0006 * p.speed * (0.4 + closeness * 1.6) * angularBoost) * dt;
        p.radius -= p.sink * 0.045 * sinkBoost * dt;

        let x = cx + Math.cos(p.angle) * p.radius;
        let y = cy + Math.sin(p.angle) * p.radius * 0.92;

        const dxm = x - mx;
        const dym = y - my;
        const dm = Math.hypot(dxm, dym);
        if (dm < 220 && dm > 0.001) {
          const k = ((220 - dm) / 220) * 36;
          x += (dxm / dm) * k;
          y += (dym / dm) * k;
        }

        for (let j = 0; j < stateRef.current.waves.length; j++) {
          const wv = stateRef.current.waves[j];
          const age = (t - wv.born) / 2400;
          const ringR = age * Math.max(w, h) * 0.95;
          const dxw = x - wv.x;
          const dyw = y - wv.y;
          const dw = Math.hypot(dxw, dyw) + 0.001;
          const ring = Math.exp(-Math.pow(dw - ringR, 2) / 2400) * (1 - age) * 90;
          x += (dxw / dw) * ring;
          y += (dyw / dw) * ring;
        }

        const sizeBase = 0.5 + p.z * 1.6;
        const sizeFromRadius = 0.4 + closeness * 1.5;
        const size = sizeBase * sizeFromRadius;
        const alpha =
          (0.12 + p.z * 0.55) *
          Math.min(1, (p.radius - 6) / 90) *
          (0.4 + closeness * 0.6);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = withAlpha(COLORS[p.hue], alpha);
        ctx.fill();

        if (p.radius < 6) {
          const np = spawn(w, h);
          p.angle = np.angle;
          p.radius = np.baseRadius;
          p.baseRadius = np.baseRadius;
          p.speed = np.speed;
          p.z = np.z;
          p.sink = np.sink;
          p.hue = np.hue;
        }
      }

      for (let j = 0; j < stateRef.current.waves.length; j++) {
        const wv = stateRef.current.waves[j];
        const age = (t - wv.born) / 2400;
        if (age >= 1) continue;
        const ringR = age * Math.max(w, h) * 0.95;
        const a = (1 - age) * 0.18;
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(174, 223, 228, ${a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
    />
  );
}

function withAlpha(hex: string, a: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
