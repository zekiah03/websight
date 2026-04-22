import { apps } from "@/data/apps";

export default function Footer() {
  const live = apps.filter((a) => a.status === "live").length;
  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-baseline justify-between px-8 pb-6 text-xs text-mist sm:px-12 sm:pb-8">
      <div className="pointer-events-auto flex items-baseline gap-3">
        <span className="text-paper">{apps.length}</span>
        <span>作品</span>
        <span className="text-shadow">·</span>
        <span>{live}つが いま流れている</span>
        <span className="text-shadow">·</span>
        <span>まだ続く</span>
      </div>

      <div className="pointer-events-auto flex items-baseline gap-3">
        <span>流速</span>
        <span className="text-paper">静か</span>
        <span className="text-shadow">·</span>
        <span>夜</span>
      </div>
    </footer>
  );
}
