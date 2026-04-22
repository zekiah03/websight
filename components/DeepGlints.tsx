const glints = Array.from({ length: 22 }, (_, i) => {
  const seeds = [0.12, 0.78, 0.34, 0.56, 0.91, 0.22, 0.67, 0.45, 0.83, 0.08, 0.71, 0.39, 0.62, 0.17, 0.95, 0.29, 0.54, 0.86, 0.03, 0.73, 0.48, 0.6];
  const yseeds = [0.1, 0.18, 0.08, 0.22, 0.14, 0.06, 0.2, 0.16, 0.1, 0.24, 0.12, 0.19, 0.07, 0.21, 0.15, 0.09, 0.23, 0.13, 0.17, 0.11, 0.2, 0.14];
  const left = `${(seeds[i] * 94 + 3).toFixed(1)}%`;
  const top = `${(yseeds[i] * 100).toFixed(1)}%`;
  const size = 1 + (i % 3) * 0.5;
  const max = 0.2 + (i % 5) * 0.06;
  const duration = 5 + (i % 7);
  const delay = (i * 0.6) % 6;
  return { left, top, size, max, duration, delay };
});

export default function DeepGlints() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[32vh]"
    >
      {glints.map((g, i) => (
        <span
          key={i}
          className="twinkle absolute block rounded-full bg-paper"
          style={
            {
              left: g.left,
              top: g.top,
              width: `${g.size}px`,
              height: `${g.size}px`,
              boxShadow: `0 0 ${g.size * 6}px rgba(232,230,223,${g.max * 0.6})`,
              animationDuration: `${g.duration}s`,
              animationDelay: `-${g.delay}s`,
              ["--twinkle-min" as never]: `${Math.max(0.05, g.max * 0.3)}`,
              ["--twinkle-max" as never]: `${g.max}`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
