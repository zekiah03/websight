import type { App } from "@/data/apps";

type Depth = 0 | 1 | 2;

export default function FloatingWord({
  app,
  y,
  depth = 1,
  delay,
  duration,
  bobDuration = 6,
  bobDelay = 0,
}: {
  app: App;
  y: string;
  depth?: Depth;
  delay: number;
  duration: number;
  bobDuration?: number;
  bobDelay?: number;
}) {
  const scale = depth === 0 ? 0.7 : depth === 2 ? 1.12 : 0.9;
  const blur = depth === 0 ? 1.4 : depth === 2 ? 0 : 0.3;
  const tone = depth === 0 ? "text-mist" : depth === 2 ? "text-paper" : "text-paper/90";

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${app.title} — ${app.subtitle}`}
      className="drift group absolute inline-block"
      style={{
        top: y,
        left: 0,
        animationDuration: `${duration}s`,
        animationDelay: `${-delay}s`,
        filter: `blur(${blur}px)`,
      }}
    >
      <div
        className="bob"
        style={{
          animationDuration: `${bobDuration}s`,
          animationDelay: `${bobDelay}s`,
          transform: `scale(${scale})`,
          transformOrigin: "left center",
        }}
      >
        <div className={`flex items-baseline gap-4 ${tone}`}>
          <span className="font-en text-xs tracking-[0.35em] text-paper/70">
            {app.index}
          </span>
          <span className="text-md font-light leading-none">{app.title}</span>
          <span className="text-shadow">·</span>
          <span className="text-xs text-mist">{app.subtitle}</span>
        </div>

        <div className="reveal-on-hover max-w-[36ch]">
          <p className="text-sm leading-relaxed text-paper/85">
            「{app.question}」
          </p>
          <p className="mt-3 text-xs leading-relaxed text-mist">
            {app.description}
          </p>
          <p className="mt-4 text-xx text-shadow">
            {app.year}
            <span className="mx-2">—</span>
            {(() => {
              try {
                return new URL(app.url).host.replace(/^www\./, "");
              } catch {
                return app.url;
              }
            })()}
            <span className="ml-3 text-paper/80">覗く →</span>
          </p>
        </div>
      </div>
    </a>
  );
}
