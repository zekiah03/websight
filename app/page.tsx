import Hero from "@/components/Hero";
import AppCard, { PlaceholderCard } from "@/components/AppCard";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Cursor from "@/components/Cursor";
import QuestionTicker from "@/components/QuestionTicker";
import SectionHeading from "@/components/SectionHeading";
import Colophon from "@/components/Colophon";
import ScrollProgress from "@/components/ScrollProgress";
import WaveDivider from "@/components/WaveDivider";
import { apps, placeholderSlots } from "@/data/apps";

export default function Page() {
  const startIndex = apps.length + 1;
  const slots = Array.from({ length: placeholderSlots }, (_, i) =>
    String(startIndex + i).padStart(2, "0"),
  );

  return (
    <>
      <AnimatedBackground />
      <Cursor />
      <ScrollProgress />
      <main className="relative">
        <Hero />
        <QuestionTicker />

        <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <SectionHeading
            label="// index of works"
            meta={`${String(apps.length).padStart(2, "0")} entries`}
          />
          <div className="grid gap-px bg-ink-700/30 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, i) => (
              <AppCard key={app.id} app={app} i={i} />
            ))}
            {slots.map((idx, i) => (
              <PlaceholderCard key={idx} index={idx} i={apps.length + i} />
            ))}
          </div>
        </section>

        <WaveDivider />
        <Colophon />
        <Footer />
      </main>
    </>
  );
}
