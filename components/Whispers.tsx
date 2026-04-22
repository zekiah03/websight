const whispers = [
  { text: "わたしは、なに、ここに。", left: "4%", top: "72%", size: 32, opacity: 0.09 },
  { text: "問いは流され、答えは沈む。", left: "48%", top: "80%", size: 40, opacity: 0.08 },
  { text: "言葉のあとに、まだ言葉。", left: "72%", top: "70%", size: 28, opacity: 0.1 },
];

export default function Whispers() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {whispers.map((w, i) => (
        <span
          key={i}
          className="absolute whitespace-nowrap font-serif text-paper"
          style={{
            left: w.left,
            top: w.top,
            fontSize: `${w.size}px`,
            opacity: w.opacity,
            letterSpacing: "0.04em",
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}
