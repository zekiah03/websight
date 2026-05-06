import type { Category } from "@/data/apps";
import { appsByCategory } from "@/data/apps";
import { categories } from "@/data/categories";
import { clockAngles, polar } from "@/lib/math";
import AppCard from "./AppCard";
import Katex from "./Katex";

// Per-card-count radius offset so 7 cards don't collide with the central glyph.
const RADIUS_BY_COUNT: Record<number, number> = {
  1: 30,
  2: 32,
  3: 34,
  4: 34,
  5: 36,
  6: 36,
  7: 38,
};

// Starting angle (deg) for the n-card distribution. We rotate so cards never
// land at exactly 0° (top, occupied by the thesis row).
const START_ANGLE_BY_COUNT: Record<number, number> = {
  1: 0,    // single card at right
  2: 0,
  3: 30,
  4: 45,
  5: 18,
  6: 30,
  7: 25.7,
};

export default function CategoryLayer({ category }: { category: Category }) {
  const meta = categories[category];
  const list = appsByCategory(category);
  const count = list.length;
  const radius = RADIUS_BY_COUNT[count] ?? 34;
  const offset = START_ANGLE_BY_COUNT[count] ?? 0;
  const angles = clockAngles(count).map((a) => a + offset);

  return (
    <div className="absolute inset-0">
      {/* center spec — index, label, thesis, oneliner */}
      <div className="absolute top-[12vh] left-1/2 -translate-x-1/2 text-center px-4 max-w-[640px]">
        <div className="font-en text-[10px] tracking-[0.4em] text-paper/45 uppercase flex items-center justify-center gap-3">
          <span className="block w-8 h-px bg-paper/15" />
          <span>
            {meta.index} — {meta.labelEn} · {meta.labelJa}
          </span>
          <span className="block w-8 h-px bg-paper/15" />
        </div>
        <div className="mt-4">
          <Katex math={meta.thesis} display className="text-paper/85" />
        </div>
        <p className="mt-2 font-serif italic text-paper/55 text-[13px]">
          {meta.oneliner}
        </p>
      </div>

      {/* radial app cards */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="relative w-0 h-0">
          {list.map((app, i) => {
            const { x, y } = polar(radius, angles[i]);
            return (
              <div
                key={app.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${x}vmin`,
                  top: `${y}vmin`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <AppCard
                  app={app}
                  n={`${meta.index}.${String(i + 1).padStart(2, "0")}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* bottom-left dense readout */}
      <div className="absolute bottom-[6vh] left-6 sm:left-10 font-en text-[9px] tracking-[0.3em] uppercase text-paper/40 leading-[1.9]">
        <div>
          tracks · {count} <span className="text-paper/20">/</span>{" "}
          <span className="text-paper/70">19</span>
        </div>
        <div>thesis · valid for {meta.labelEn.toLowerCase()}</div>
        <div className="text-paper/25">live · wip · archived</div>
      </div>

      {/* bottom-right scale ladder */}
      <div className="absolute bottom-[6vh] right-6 sm:right-10 font-en text-[9px] tracking-[0.3em] uppercase text-paper/40 leading-[1.9] text-right">
        <div>
          radius · <span className="text-paper/70 tabular-nums">{radius}</span> vmin
        </div>
        <div>
          arc · <span className="text-paper/70 tabular-nums">{count}</span> · 360°
        </div>
        <div className="text-paper/25 italic">— solnova / {meta.labelEn}</div>
      </div>
    </div>
  );
}
