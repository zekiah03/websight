"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  z: number;
  vy: number;
  vx: number;
  life: number;
};

const PARTICLE_COUNT = 340;

export default function Ambient() {
  const ref = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    scrollY: 0,
    scrollV: 0,
    lastScroll: 0,
    lastT: 0,
    mouseX: 0,
    mouseY: 0,
  });

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

    const spawn = (offscreen: boolean): Particle => {
      const z = Math.random();
      return {
        x: offscreen ? w + Math.random() * 180 : Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + z * 1.8,
        z,
        vy: (Math.random() - 0.5) * 0.04,
        vx: -(0.08 + z * 0.28),
        life: 0,
      };
    };
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      spawn(false),
    );

    const onScroll = () => {
      stateRef.current.scrollY = window.scrollY;
    };
    const onMove = (e: PointerEvent) => {
      stateRef.current.mouseX = e.clientX;
      stateRef.current.mouseY = e.clientY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    let raf = 0;

    const tick = (t: number) => {
      const s = stateRef.current;
      const dt = s.lastT ? Math.min(64, t - s.lastT) : 16;
      s.lastT = t;

      const dY = s.scrollY - s.lastScroll;
      s.lastScroll = s.scrollY;
      const instantV = dY / Math.max(1, dt);
      s.scrollV = s.scrollV * 0.88 + instantV * 0.12;

      const speedBoost = 1 + Math.min(6, Math.abs(s.scrollV) * 1.2);
      const directionBias = Math.sign(s.scrollV) || 0;

      ctx.fillStyle = "rgba(5, 7, 10, 0.12)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * speedBoost * dt * 0.08;
        p.y += (p.vy + directionBias * 0.05 * p.z) * dt * 0.08;

        const mdx = p.x - s.mouseX;
        const mdy = p.y - s.mouseY;
        const md = Math.hypot(mdx, mdy);
        if (md < 160 && md > 0.001) {
          const k = ((160 - md) / 160) * 8 * p.z;
          p.x += (mdx / md) * k;
          p.y += (mdy / md) * k;
        }

        if (p.x < -80 || p.y < -20 || p.y > h + 20) {
          const np = spawn(true);
          p.x = np.x;
          p.y = np.y;
          p.r = np.r;
          p.z = np.z;
          p.vx = np.vx;
          p.vy = np.vy;
        }

        const alpha = (0.06 + p.z * 0.28) * (0.5 + Math.min(1, speedBoost / 3));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 230, 223, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
      />
      <Mist />
    </>
  );
}

function Mist() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 60%, #0a0d11 0%, #05070a 50%, #02030a 100%)",
        }}
      />
      <div
        className="absolute -left-1/4 top-[-10%] h-[70vh] w-[70vw] rounded-full blur-[160px] opacity-40"
        style={{ background: "radial-gradient(circle, #0e1620, transparent 70%)" }}
      />
      <div
        className="absolute right-[-15%] bottom-[-20%] h-[70vh] w-[70vw] rounded-full blur-[180px] opacity-40"
        style={{ background: "radial-gradient(circle, #0c1620, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
