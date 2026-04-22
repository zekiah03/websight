import FloatingWord from "@/components/FloatingWord";
import { apps } from "@/data/apps";

type Lane = {
  y: string;
  depth: 0 | 1 | 2;
  delay: number;
  duration: number;
  bobDuration: number;
  bobDelay: number;
};

const lanes: Lane[] = [
  { y: "36%", depth: 0, delay: 5, duration: 78, bobDuration: 8, bobDelay: 0 },
  { y: "44%", depth: 1, delay: 32, duration: 58, bobDuration: 6, bobDelay: 0.6 },
  { y: "52%", depth: 2, delay: 12, duration: 46, bobDuration: 5.2, bobDelay: 1.3 },
  { y: "60%", depth: 1, delay: 42, duration: 54, bobDuration: 7, bobDelay: 0.3 },
  { y: "40%", depth: 2, delay: 28, duration: 44, bobDuration: 5.6, bobDelay: 2.0 },
  { y: "56%", depth: 0, delay: 18, duration: 72, bobDuration: 8.4, bobDelay: 1.1 },
  { y: "48%", depth: 1, delay: 0, duration: 62, bobDuration: 6.6, bobDelay: 0.8 },
];

export default function River() {
  return (
    <div
      aria-label="流れる作品"
      className="absolute inset-0 overflow-hidden"
    >
      {apps.map((app, i) => {
        const l = lanes[i % lanes.length];
        return (
          <FloatingWord
            key={app.id}
            app={app}
            y={l.y}
            depth={l.depth}
            delay={l.delay}
            duration={l.duration}
            bobDuration={l.bobDuration}
            bobDelay={l.bobDelay}
          />
        );
      })}
    </div>
  );
}
