export default function RecordGlyph() {
  // Cumulative curves over time axis. Stepped accumulation + smooth integral.
  return (
    <svg viewBox="-400 -400 800 800" className="w-full h-full glyph">
      {/* axes */}
      <g strokeWidth="0.6" opacity="0.8">
        <line x1="-340" y1="280" x2="320" y2="280" />
        <line x1="-340" y1="-280" x2="-340" y2="280" />
      </g>

      {/* axis ticks bottom */}
      <g strokeWidth="0.4" opacity="0.5">
        {Array.from({ length: 12 }, (_, i) => {
          const x = -340 + i * 60;
          return <line key={i} x1={x} y1="280" x2={x} y2="288" />;
        })}
      </g>

      {/* axis ticks left */}
      <g strokeWidth="0.4" opacity="0.5">
        {Array.from({ length: 8 }, (_, i) => {
          const y = -280 + i * 70;
          return <line key={i} x1="-340" y1={y} x2="-348" y2={y} />;
        })}
      </g>

      {/* horizontal grid */}
      <g strokeWidth="0.2" opacity="0.25">
        {[210, 140, 70, 0, -70, -140, -210].map((y) => (
          <line key={y} x1="-340" y1={y} x2="320" y2={y} />
        ))}
      </g>

      {/* stepped accumulation trace */}
      <g strokeWidth="0.9" className="glyph-pulse" opacity="0.9">
        <path
          d="M -340 280
             L -300 280 L -300 220 L -240 220 L -240 160
             L -180 160 L -180 100 L -120 100 L -120 80
             L -60 80 L -60 40 L 0 40 L 0 -10
             L 60 -10 L 60 -50 L 120 -50 L 120 -80
             L 180 -80 L 180 -120 L 240 -120 L 240 -160
             L 300 -160 L 320 -160"
        />
      </g>

      {/* smooth integral curve */}
      <g strokeWidth="0.6" opacity="0.6" strokeDasharray="3 3">
        <path d="M -340 280 Q -200 260, -100 100 Q 0 -50, 320 -200" />
      </g>

      {/* scatter dots ON trace */}
      <g fill="#f4f1ea" stroke="none">
        {[
          [-300, 280], [-240, 220], [-180, 160], [-120, 100],
          [-60, 80], [0, 40], [60, -10], [120, -50],
          [180, -80], [240, -120], [300, -160],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? "3" : "2"} />
        ))}
      </g>

      {/* horizontal "memory bands" — multiple traces stacking */}
      <g strokeWidth="0.4" opacity="0.4">
        <path d="M -340 -240 Q -200 -250 -100 -240 Q 0 -230 320 -250" />
        <path d="M -340 -180 Q -200 -200 -100 -180 Q 0 -170 320 -190" strokeDasharray="1 2" />
        <path d="M -340 -120 Q -200 -130 -100 -110 Q 0 -100 320 -130" />
      </g>

      {/* integral symbol — large, top-left */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="120"
        opacity="0.18"
      >
        <text x="-300" y="-180">∫</text>
      </g>

      {/* axis labels */}
      <g
        fill="#f4f1ea"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        opacity="0.55"
      >
        <text x="320" y="305" textAnchor="end">
          t →
        </text>
        <text x="-345" y="-285" textAnchor="end">
          Self(t)
        </text>
      </g>

      <style>{`
        .glyph-pulse { animation: gp 5.2s ease-in-out infinite; }
        @keyframes gp { 0%,100% { opacity: 0.75; } 50% { opacity: 1; } }
      `}</style>
    </svg>
  );
}
