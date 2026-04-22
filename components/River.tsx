import Card from "@/components/Card";
import { apps } from "@/data/apps";

const placements = [
  { x: "8%", y: "52%", depth: 1 },
  { x: "24%", y: "46%", depth: 0 },
  { x: "40%", y: "55%", depth: 2 },
  { x: "56%", y: "48%", depth: 1 },
  { x: "72%", y: "54%", depth: 0 },
  { x: "86%", y: "47%", depth: 1 },
  { x: "102%", y: "52%", depth: 2 },
];

export default function River() {
  return (
    <div
      aria-label="river lane"
      className="pointer-events-none absolute inset-0"
    >
      <div className="pointer-events-auto absolute inset-0">
        {apps.map((app, i) => {
          const p = placements[i % placements.length];
          return <Card key={app.id} app={app} x={p.x} y={p.y} depth={p.depth} />;
        })}
      </div>
    </div>
  );
}
