export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-baseline justify-between px-8 pt-6 text-xs text-mist sm:px-12 sm:pt-8">
      <div className="pointer-events-auto flex items-baseline gap-3">
        <span className="text-paper">saiki</span>
        <span className="text-shadow">──</span>
        <span>記録</span>
      </div>
      <div className="pointer-events-auto flex items-baseline gap-3 text-right">
        <span>websight</span>
        <span className="text-shadow">/</span>
        <span className="text-paper">solnova</span>
      </div>
    </header>
  );
}
