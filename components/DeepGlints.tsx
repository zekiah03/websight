const glints = [
  { left: "6%", top: "14%", size: 1.5, opacity: 0.18 },
  { left: "14%", top: "22%", size: 2, opacity: 0.24 },
  { left: "22%", top: "11%", size: 1, opacity: 0.12 },
  { left: "31%", top: "24%", size: 1.5, opacity: 0.2 },
  { left: "39%", top: "16%", size: 2, opacity: 0.3 },
  { left: "48%", top: "12%", size: 1, opacity: 0.14 },
  { left: "55%", top: "22%", size: 1.5, opacity: 0.22 },
  { left: "63%", top: "15%", size: 1, opacity: 0.16 },
  { left: "71%", top: "19%", size: 2, opacity: 0.26 },
  { left: "79%", top: "13%", size: 1.5, opacity: 0.2 },
  { left: "87%", top: "21%", size: 1, opacity: 0.12 },
  { left: "94%", top: "17%", size: 1.5, opacity: 0.22 },
];

export default function DeepGlints() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[35vh]"
    >
      {glints.map((g, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-paper"
          style={{
            left: g.left,
            top: g.top,
            width: `${g.size}px`,
            height: `${g.size}px`,
            opacity: g.opacity,
            boxShadow: `0 0 ${g.size * 4}px rgba(232,230,223,${g.opacity * 0.6})`,
          }}
        />
      ))}
    </div>
  );
}
