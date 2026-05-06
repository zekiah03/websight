export default function DiagnoseGlyph() {
  // 6 axes, 3 vectors of varying length, polar grid
  const SPOKES = 12;
  const RINGS = [80, 160, 240, 320];
  const VECTORS = [
    { angle: -75, length: 260 },
    { angle: 30, length: 200 },
    { angle: 150, length: 290 },
  ];

  return (
    <svg viewBox="-400 -400 800 800" className="w-full h-full glyph">
      {/* concentric rings (measurement levels) */}
      <g opacity="0.45">
        {RINGS.map((r, i) => (
          <circle
            key={i}
            cx="0"
            cy="0"
            r={r}
            strokeWidth={i === RINGS.length - 1 ? "0.6" : "0.3"}
            strokeDasharray={i % 2 ? "2 3" : undefined}
          />
        ))}
      </g>

      {/* 12 radial spokes */}
      <g strokeWidth="0.3" opacity="0.5">
        {Array.from({ length: SPOKES }, (_, i) => {
          const a = (i * (360 / SPOKES) - 90) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={Math.cos(a) * 30}
              y1={Math.sin(a) * 30}
              x2={Math.cos(a) * 320}
              y2={Math.sin(a) * 320}
            />
          );
        })}
      </g>

      {/* highlighted vectors */}
      <g strokeWidth="1.2" opacity="0.95" className="glyph-pulse">
        {VECTORS.map((v, i) => {
          const a = v.angle * (Math.PI / 180);
          const x = Math.cos(a) * v.length;
          const y = Math.sin(a) * v.length;
          return (
            <g key={i}>
              <line x1="0" y1="0" x2={x} y2={y} />
              {/* arrow head */}
              <g transform={`translate(${x},${y}) rotate(${v.angle})`}>
                <line x1="0" y1="0" x2="-12" y2="-5" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="-12" y2="5" strokeWidth="0.8" />
              </g>
              {/* vector dot */}
              <circle cx={x} cy={y} r="4" fill="#f4f1ea" stroke="none" />
            </g>
          );
        })}
      </g>

      {/* partition arc — ⅙ slice highlighted */}
      <g opacity="0.6">
        <path
          d="M 0 -240 A 240 240 0 0 1 207.85 -120"
          strokeWidth="1"
        />
        <line x1="0" y1="0" x2="0" y2="-240" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="207.85" y2="-120" strokeWidth="0.4" />
      </g>

      {/* tick numerals along one ring */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        opacity="0.55"
      >
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const a = (deg - 90) * (Math.PI / 180);
          return (
            <text
              key={deg}
              x={Math.cos(a) * 350}
              y={Math.sin(a) * 350 + 3}
              textAnchor="middle"
            >
              {String(deg).padStart(3, "0")}°
            </text>
          );
        })}
      </g>

      {/* center origin dot */}
      <circle cx="0" cy="0" r="3" fill="#f4f1ea" stroke="none" />

      <style>{`
        .glyph-pulse { animation: gp 4.6s ease-in-out infinite; transform-origin: center; }
        @keyframes gp { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
      `}</style>
    </svg>
  );
}
