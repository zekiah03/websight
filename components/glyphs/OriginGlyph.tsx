export default function OriginGlyph() {
  // 5 axes radiating from origin, one per category
  const axes = Array.from({ length: 5 }, (_, i) => {
    const angle = (-90 + i * 72) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * 320,
      y: Math.sin(angle) * 320,
      label: ["DGN", "REC", "RES", "GAM", "SVC"][i],
    };
  });

  return (
    <svg viewBox="-400 -400 800 800" className="w-full h-full glyph">
      {/* outer ring with tick marks */}
      <g opacity="0.6">
        <circle cx="0" cy="0" r="380" strokeWidth="0.4" />
        {Array.from({ length: 60 }, (_, i) => {
          const a = (i * 6 - 90) * (Math.PI / 180);
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          const inner = i % 5 === 0 ? 365 : 374;
          return (
            <line
              key={i}
              x1={cos * inner}
              y1={sin * inner}
              x2={cos * 380}
              y2={sin * 380}
              strokeWidth={i % 5 === 0 ? "0.7" : "0.3"}
              opacity={i % 5 === 0 ? "0.9" : "0.4"}
            />
          );
        })}
      </g>

      {/* concentric guide circles */}
      <g className="glyph-breathe">
        <circle cx="0" cy="0" r="280" strokeWidth="0.3" opacity="0.35" strokeDasharray="2 4" />
        <circle cx="0" cy="0" r="200" strokeWidth="0.4" opacity="0.5" />
        <circle cx="0" cy="0" r="120" strokeWidth="0.5" opacity="0.7" />
        <circle cx="0" cy="0" r="60" strokeWidth="0.6" opacity="0.85" />
      </g>

      {/* 5 radiating axes */}
      <g strokeWidth="0.7" opacity="0.85">
        {axes.map((ax, i) => (
          <g key={i}>
            <line x1="0" y1="0" x2={ax.x} y2={ax.y} />
            <circle cx={ax.x} cy={ax.y} r="6" fill="#f4f1ea" stroke="none" />
            <circle cx={ax.x} cy={ax.y} r="14" strokeWidth="0.5" opacity="0.6" />
          </g>
        ))}
      </g>

      {/* axis labels (small caps, at axis tips) */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        opacity="0.7"
      >
        {axes.map((ax, i) => (
          <text
            key={i}
            x={ax.x * 1.13}
            y={ax.y * 1.13 + 3}
            textAnchor="middle"
          >
            {ax.label}
          </text>
        ))}
      </g>

      {/* center point */}
      <g>
        <circle cx="0" cy="0" r="3" fill="#f4f1ea" stroke="none" />
        <circle cx="0" cy="0" r="10" strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* scattered seed points (research notes) */}
      <g fill="#f4f1ea" stroke="none" opacity="0.45">
        <circle cx="-260" cy="-180" r="1" />
        <circle cx="240" cy="-220" r="1.2" />
        <circle cx="280" cy="180" r="0.9" />
        <circle cx="-220" cy="240" r="1" />
        <circle cx="-330" cy="60" r="0.8" />
        <circle cx="320" cy="-50" r="0.7" />
        <circle cx="100" cy="-340" r="1" />
        <circle cx="-160" cy="320" r="0.9" />
      </g>

      <style>{`
        .glyph-breathe { animation: gb 5.4s ease-in-out infinite; transform-origin: center; }
        @keyframes gb { 0%,100% { transform: scale(1); } 50% { transform: scale(1.018); } }
      `}</style>
    </svg>
  );
}
