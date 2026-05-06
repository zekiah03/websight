export default function GameGlyph() {
  // Decision tree with probability annotations + 3x3 payoff grid
  return (
    <svg viewBox="-400 -400 800 800" className="w-full h-full glyph">
      {/* binary decision tree, top-down */}
      <g strokeWidth="0.85" opacity="0.9" className="glyph-pulse">
        {/* root */}
        <line x1="-180" y1="-340" x2="-300" y2="-220" />
        <line x1="-180" y1="-340" x2="-60" y2="-220" />
        {/* left subtree */}
        <line x1="-300" y1="-220" x2="-340" y2="-100" />
        <line x1="-300" y1="-220" x2="-220" y2="-100" />
        <line x1="-220" y1="-100" x2="-260" y2="20" />
        <line x1="-220" y1="-100" x2="-160" y2="20" />
        {/* right subtree */}
        <line x1="-60" y1="-220" x2="-100" y2="-100" />
        <line x1="-60" y1="-220" x2="20" y2="-100" />
        <line x1="20" y1="-100" x2="-20" y2="20" />
        <line x1="20" y1="-100" x2="80" y2="20" />
      </g>

      {/* nodes */}
      <g fill="#f4f1ea" stroke="none">
        <circle cx="-180" cy="-340" r="6" />
        {[[-300, -220], [-60, -220], [-340, -100], [-220, -100], [-100, -100], [20, -100],
          [-260, 20], [-160, 20], [-20, 20], [80, 20]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" />
        ))}
      </g>

      {/* probability labels on edges */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        opacity="0.55"
      >
        <text x="-260" y="-275" textAnchor="middle">p</text>
        <text x="-100" y="-275" textAnchor="middle">1−p</text>
      </g>

      {/* payoff matrix: 3x3 grid on right */}
      <g transform="translate(160, -340)">
        <rect x="0" y="0" width="180" height="180" fill="none" strokeWidth="0.6" opacity="0.7" />
        {Array.from({ length: 3 }, (_, r) =>
          Array.from({ length: 3 }, (_, c) => {
            const v = [[3, -1, 0], [1, 2, -2], [-1, 0, 4]][r][c];
            return (
              <g key={`${r}-${c}`}>
                <line
                  x1={c * 60}
                  y1="0"
                  x2={c * 60}
                  y2="180"
                  strokeWidth="0.3"
                  opacity="0.5"
                />
                <line
                  x1="0"
                  y1={r * 60}
                  x2="180"
                  y2={r * 60}
                  strokeWidth="0.3"
                  opacity="0.5"
                />
                <text
                  x={c * 60 + 30}
                  y={r * 60 + 35}
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                  fontSize="14"
                  fill="#f4f1ea"
                  stroke="none"
                  opacity={v === 4 ? "1" : "0.6"}
                >
                  {v >= 0 ? `+${v}` : v}
                </text>
              </g>
            );
          }),
        )}
        {/* highlight max-payoff cell */}
        <rect
          x="120"
          y="120"
          width="60"
          height="60"
          fill="rgba(244,241,234,0.08)"
          strokeWidth="0.7"
        />
      </g>

      {/* matrix caption */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        opacity="0.55"
      >
        <text x="250" y="-355" textAnchor="middle">π(σᵢ, σ₋ᵢ)</text>
      </g>

      {/* dice (icosahedron-ish flat) bottom */}
      <g transform="translate(-180, 220)" strokeWidth="0.6" opacity="0.7">
        <polygon points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25" />
        <line x1="0" y1="-50" x2="0" y2="50" strokeWidth="0.3" />
        <line x1="-43" y1="-25" x2="43" y2="25" strokeWidth="0.3" />
        <line x1="43" y1="-25" x2="-43" y2="25" strokeWidth="0.3" />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="14"
          fill="#f4f1ea"
          stroke="none"
          opacity="0.7"
        >
          ?
        </text>
      </g>

      {/* tree caption */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        opacity="0.55"
      >
        <text x="-180" y="-360" textAnchor="middle">a*</text>
      </g>

      <style>{`
        .glyph-pulse { animation: gp 5s ease-in-out infinite; }
        @keyframes gp { 0%,100% { opacity: 0.75; } 50% { opacity: 1; } }
      `}</style>
    </svg>
  );
}
