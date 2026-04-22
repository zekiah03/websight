const whispers = [
  { text: "わたしは、なに、ここに。", y: "22%", size: 28, delay: 8, duration: 120, opacity: 0.09 },
  { text: "問いは流され、答えは沈む。", y: "78%", size: 40, delay: 32, duration: 150, opacity: 0.08 },
  { text: "言葉のあとに、まだ言葉。", y: "30%", size: 24, delay: 62, duration: 140, opacity: 0.1 },
  { text: "夜は、まだ続いている。", y: "82%", size: 32, delay: 95, duration: 160, opacity: 0.07 },
  { text: "名前のない場所を、ただ通り過ぎる。", y: "68%", size: 22, delay: 18, duration: 130, opacity: 0.09 },
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
          className="drift-slow absolute whitespace-nowrap font-serif font-light text-paper"
          style={{
            top: w.y,
            left: 0,
            fontSize: `${w.size}px`,
            opacity: w.opacity,
            letterSpacing: "0.06em",
            animationDuration: `${w.duration}s`,
            animationDelay: `${-w.delay}s`,
          }}
        >
          <span
            className="bob-slow inline-block"
            style={{ animationDelay: `${(i * 0.7) % 3}s` }}
          >
            {w.text}
          </span>
        </span>
      ))}
    </div>
  );
}
