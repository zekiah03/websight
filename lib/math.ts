export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Bell curve peaking at 0, smoothly fading to 0 at |distance| = halfWidth.
export const bell = (distance: number, halfWidth = 0.85) => {
  const t = clamp(1 - Math.abs(distance) / halfWidth);
  return t * t * (3 - 2 * t);
};

export const polar = (radius: number, angleDeg: number) => {
  const r = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(r) * radius, y: Math.sin(r) * radius };
};

// Even angular distribution starting at top (-90deg), going clockwise.
export const clockAngles = (n: number) =>
  Array.from({ length: n }, (_, i) => -90 + (360 / n) * i);
