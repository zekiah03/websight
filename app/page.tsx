import Hero from "@/components/Hero";
import AppCard, { PlaceholderCard } from "@/components/AppCard";
import Footer from "@/components/Footer";
import { apps, placeholderSlots } from "@/data/apps";

export default function Page() {
  const startIndex = apps.length + 1;
  const slots = Array.from({ length: placeholderSlots }, (_, i) =>
    String(startIndex + i).padStart(2, "0"),
  );

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <header className="mb-12 flex items-end justify-between gap-4 border-b border-ink-700/60 pb-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400">
            // index of works
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-widest text-bone-400/70">
            {String(apps.length).padStart(2, "0")} entries
          </span>
        </header>

        <div className="grid gap-px bg-ink-700/40 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
          {slots.map((idx) => (
            <PlaceholderCard key={idx} index={idx} />
          ))}
        </div>
      </section>

      <section className="border-t border-ink-700/60 bg-ink-900/40">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-400">
            // colophon
          </p>
          <p className="mt-6 font-serif text-2xl font-light leading-relaxed text-bone-200 sm:text-3xl">
            「アプリ」とは、答えを早く返す機械ではなく、
            <br className="hidden sm:block" />
            問いを長く保つための器である。
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
