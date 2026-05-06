export default function ResearchGlyph() {
  // Dendrogram / classification tree from top, with comparison cells on side
  return (
    <svg viewBox="-400 -400 800 800" className="w-full h-full glyph">
      {/* dendrogram trunk */}
      <g strokeWidth="0.9" opacity="0.95" className="glyph-breathe">
        {/* root → first split */}
        <line x1="0" y1="-340" x2="0" y2="-220" />
        <line x1="-200" y1="-220" x2="200" y2="-220" />
        <line x1="-200" y1="-220" x2="-200" y2="-100" />
        <line x1="200" y1="-220" x2="200" y2="-100" />

        {/* second splits */}
        <line x1="-280" y1="-100" x2="-120" y2="-100" />
        <line x1="-280" y1="-100" x2="-280" y2="20" />
        <line x1="-120" y1="-100" x2="-120" y2="20" />

        <line x1="120" y1="-100" x2="280" y2="-100" />
        <line x1="120" y1="-100" x2="120" y2="20" />
        <line x1="280" y1="-100" x2="280" y2="20" />

        {/* third splits (only some) */}
        <line x1="-310" y1="20" x2="-250" y2="20" />
        <line x1="-310" y1="20" x2="-310" y2="120" />
        <line x1="-250" y1="20" x2="-250" y2="120" />

        <line x1="250" y1="20" x2="310" y2="20" />
        <line x1="250" y1="20" x2="250" y2="120" />
        <line x1="310" y1="20" x2="310" y2="120" />
      </g>

      {/* leaf nodes */}
      <g fill="#f4f1ea" stroke="none">
        {[
          [-310, 130], [-250, 130], [-120, 30], [120, 30],
          [250, 130], [310, 130],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" />
            <circle cx={x} cy={y} r="11" fill="none" stroke="#f4f1ea" strokeWidth="0.5" opacity="0.5" />
          </g>
        ))}
      </g>

      {/* leaf labels */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="1.5"
        opacity="0.6"
      >
        {["c₁", "c₂", "c₃", "c₄", "c₅", "c₆"].map((label, i) => {
          const xs = [-310, -250, -120, 120, 250, 310];
          return (
            <text key={i} x={xs[i]} y={155} textAnchor="middle">
              {label}
            </text>
          );
        })}
      </g>

      {/* root node */}
      <g>
        <circle cx="0" cy="-340" r="6" fill="#f4f1ea" stroke="none" />
        <circle cx="0" cy="-340" r="14" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* comparison matrix on the right (small grid showing pairwise distances) */}
      <g strokeWidth="0.4" opacity="0.5" transform="translate(180, 220)">
        {Array.from({ length: 6 }, (_, r) =>
          Array.from({ length: 6 }, (_, c) => {
            const intensity = Math.abs(r - c) / 5;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * 18}
                y={r * 18}
                width="16"
                height="16"
                fill={`rgba(244,241,234,${0.05 + intensity * 0.35})`}
                stroke="none"
              />
            );
          }),
        )}
        {/* matrix border */}
        <rect x="0" y="0" width="108" height="108" fill="none" strokeWidth="0.5" />
      </g>

      {/* matrix label */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="2"
        opacity="0.55"
      >
        <text x="234" y="210" textAnchor="middle">d(cᵢ, cⱼ)</text>
      </g>

      {/* scattered comparison hexagon on the left */}
      <g strokeWidth="0.4" opacity="0.45" transform="translate(-220, 220)">
        <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        <polygon points="0,-15 13,-7 13,7 0,15 -13,7 -13,-7" />
        <circle cx="0" cy="0" r="3" fill="#f4f1ea" stroke="none" />
      </g>

      {/* category label at root */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="3"
        opacity="0.7"
      >
        <text x="0" y="-360" textAnchor="middle">X</text>
      </g>

      <style>{`
        .glyph-breathe { animation: gb 6s ease-in-out infinite; transform-origin: center top; }
        @keyframes gb { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.012); } }
      `}</style>
    </svg>
  );
}
