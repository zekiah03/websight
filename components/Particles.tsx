"use client";

import { useEffect, useRef } from "react";
import { onScrollProgress } from "@/lib/scroll";

const PARTICLE_COUNT = 36;

type P = { r: number; theta: number; speed: number; size: number };

function spawn(): P {
  return {
    r: 0.3 + Math.random() * 0.7,
    theta: Math.random() * Math.PI * 2,
    speed: 0.05 + Math.random() * 0.25,
    size: 0.5 + Math.random() * 1.6,
  };
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ progress: 0, lastT: 0 });
  const particlesRef = useRef<P[]>([]);

  useEffect(() => {
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, spawn);
    }

    const canvas = canvasRef.current;
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
    window.addEventListener("resize", resize);

    const unsub = onScrollProgress((p) => {
      stateRef.current.progress = p;
    });

    let raf = 0;
    const tick = (t: number) => {
      const s = stateRef.current;
      const dt = s.lastT ? Math.min(64, t - s.lastT) : 16;
      s.lastT = t;

      // suction strength scales with scroll velocity (we approximate via
      // progress derivative). Use progress directly as a steady inward bias.
      const inward = 0.0018 * dt;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.hypot(w, h) / 2;

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // pull toward center; rotate slowly
        p.r -= inward * (1 + s.progress * 1.4);
        p.theta += p.speed * 0.0015 * dt;

        if (p.r < 0.02) {
          // respawn at outer edge
          const np = spawn();
          p.r = 0.85 + Math.random() * 0.25;
          p.theta = np.theta;
          p.speed = np.speed;
          p.size = np.size;
        }

        const x = cx + Math.cos(p.theta) * p.r * maxR;
        const y = cy + Math.sin(p.theta) * p.r * maxR;
        const alpha = (1 - p.r) * 0.6 + 0.15;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 241, 234, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      unsub();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-30 pointer-events-none"
    />
  );
}
