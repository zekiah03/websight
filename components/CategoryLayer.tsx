import type { Category } from "@/data/apps";
import { appsByCategory } from "@/data/apps";
import { categories } from "@/data/categories";
import { clockAngles, polar } from "@/lib/math";
import AppCard from "./AppCard";
import Katex from "./Katex";

const RADIUS_BY_COUNT: Record<number, number> = {
  1: 34, 2: 38, 3: 40, 4: 40, 5: 42, 6: 44, 7: 46,
};
const START_ANGLE_BY_COUNT: Record<number, number> = {
  1: 0, 2: 0, 3: 30, 4: 45, 5: 18, 6: 30, 7: 25.7,
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
      {/* center spec — index, label, thesis, oneliner (top of layer) */}
      <div className="absolute top-[6vh] md:top-[10vh] left-1/2 -translate-x-1/2 text-center px-4 w-[92%] sm:w-auto sm:max-w-[640px]">
        <div className="font-en text-[9px] sm:text-[10px] tracking-[0.4em] text-paper/45 uppercase flex items-center justify-center gap-3">
          <span className="block w-6 sm:w-8 h-px bg-paper/15" />
          <span>{meta.index} — {meta.labelEn} · {meta.labelJa}</span>
          <span className="block w-6 sm:w-8 h-px bg-paper/15" />
        </div>
        <div className="mt-3 sm:mt-4 overflow-x-auto">
          <Katex math={meta.thesis} display className="text-paper/85" />
        </div>
        <p className="mt-2 font-serif italic text-paper/55 text-[12px] sm:text-[13px]">
          {meta.oneliner}
        </p>
      </div>

      {/* DESKTOP — radial card layout */}
      <div className="hidden md:grid absolute inset-0 place-items-center pointer-events-none">
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

      {/* MOBILE — 1-col stack at bottom, scrollable in-layer */}
      <div className="md:hidden absolute inset-x-0 bottom-[10vh] top-[42vh] overflow-y-auto px-3 [scrollbar-width:none]">
        <div
          aria-hidden
          className="sticky top-0 h-6 -mt-6 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,1), rgba(10,10,10,0))",
          }}
        />
        <ul className="flex flex-col divide-y divide-paper/8">
          {list.map((app, i) => (
            <li key={app.id} className="py-1">
              <AppCard
                app={app}
                n={`${meta.index}.${String(i + 1).padStart(2, "0")}`}
              />
            </li>
          ))}
        </ul>
        <div
          aria-hidden
          className="sticky bottom-0 h-8 -mb-8 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,1), rgba(10,10,10,0))",
          }}
        />
      </div>

      {/* corner readouts (desktop only) */}
      <div className="hidden md:block absolute bottom-[6vh] left-10 font-en text-[9px] tracking-[0.3em] uppercase text-paper/40 leading-[1.9]">
        <div>tracks · {count} <span className="text-paper/20">/</span> <span className="text-paper/70">19</span></div>
        <div>thesis · valid for {meta.labelEn.toLowerCase()}</div>
        <div className="text-paper/25">live · wip · archived</div>
      </div>
      <div className="hidden md:block absolute bottom-[6vh] right-10 font-en text-[9px] tracking-[0.3em] uppercase text-paper/40 leading-[1.9] text-right">
        <div>radius · <span className="text-paper/70 tabular-nums">{radius}</span> vmin</div>
        <div>arc · <span className="text-paper/70 tabular-nums">{count}</span> · 360°</div>
        <div className="text-paper/25 italic">— solnova / {meta.labelEn}</div>
      </div>
    </div>
  );
}
