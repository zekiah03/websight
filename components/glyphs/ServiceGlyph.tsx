export default function ServiceGlyph() {
  // Bipartite graph with matchings (some matched, some unmatched)
  const left = [-260, -180, -100, -20, 60, 140, 220].map((y) => ({ x: -200, y }));
  const right = [-260, -180, -100, -20, 60, 140, 220].map((y) => ({ x: 200, y }));
  // Matchings: index → index (or -1 if unmatched)
  const matches: Record<number, number> = {
    0: 2,
    1: 4,
    2: 0,
    3: 5,
    4: 1,
    // 5 unmatched
    6: 6,
  };

  return (
    <svg viewBox="-400 -400 800 800" className="w-full h-full glyph">
      {/* column guides */}
      <g strokeWidth="0.3" opacity="0.3">
        <line x1="-200" y1="-320" x2="-200" y2="280" strokeDasharray="2 4" />
        <line x1="200" y1="-320" x2="200" y2="280" strokeDasharray="2 4" />
      </g>

      {/* matched edges */}
      <g strokeWidth="0.7" opacity="0.85" className="glyph-pulse">
        {Object.entries(matches).map(([li, ri]) => {
          const a = left[+li];
          const b = right[ri];
          return (
            <path
              key={li}
              d={`M ${a.x} ${a.y} C ${a.x + 100} ${a.y}, ${b.x - 100} ${b.y}, ${b.x} ${b.y}`}
              fill="none"
            />
          );
        })}
      </g>

      {/* unmatched (dashed, fading) */}
      <g strokeWidth="0.4" opacity="0.35" strokeDasharray="2 3">
        <path d="M -200 60 C -100 60, 100 -260, 200 -260" fill="none" />
        <path d="M -200 -260 C -100 -260, 100 -180, 200 -180" fill="none" />
      </g>

      {/* left nodes (A) */}
      <g fill="#f4f1ea" stroke="none">
        {left.map((p, i) => (
          <g key={`L${i}`}>
            <circle cx={p.x} cy={p.y} r="5" />
            <circle
              cx={p.x}
              cy={p.y}
              r="11"
              fill="none"
              stroke="#f4f1ea"
              strokeWidth="0.4"
              opacity="0.5"
            />
          </g>
        ))}
      </g>

      {/* right nodes (B) */}
      <g fill="#f4f1ea" stroke="none">
        {right.map((p, i) => (
          <g key={`R${i}`}>
            <circle cx={p.x} cy={p.y} r="5" />
            <circle
              cx={p.x}
              cy={p.y}
              r="11"
              fill="none"
              stroke="#f4f1ea"
              strokeWidth="0.4"
              opacity="0.5"
            />
          </g>
        ))}
      </g>

      {/* set labels */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        letterSpacing="3"
        opacity="0.7"
      >
        <text x="-200" y="-300" textAnchor="middle">A</text>
        <text x="200" y="-300" textAnchor="middle">B</text>
      </g>

      {/* μ caption */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="22"
        opacity="0.5"
      >
        <text x="0" y="-260" textAnchor="middle">μ</text>
      </g>

      {/* row labels (small) */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        opacity="0.5"
      >
        {left.map((p, i) => (
          <text key={`la${i}`} x={p.x - 28} y={p.y + 3} textAnchor="end">
            a{i + 1}
          </text>
        ))}
        {right.map((p, i) => (
          <text key={`lb${i}`} x={p.x + 28} y={p.y + 3} textAnchor="start">
            b{i + 1}
          </text>
        ))}
      </g>

      <style>{`
        .glyph-pulse { animation: gp 4.4s ease-in-out infinite; }
        @keyframes gp { 0%,100% { opacity: 0.65; } 50% { opacity: 1; } }
      `}</style>
    </svg>
  );
}
