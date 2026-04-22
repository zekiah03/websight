import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeepGlints from "@/components/DeepGlints";
import Whispers from "@/components/Whispers";
import River from "@/components/River";

export default function Page() {
  return (
    <>
      <Header />
      <main className="relative h-screen w-screen overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 100%, #0a0d11 0%, #05070a 45%, #03050a 100%)",
          }}
        />

        <DeepGlints />
        <Whispers />
        <River />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[20vh]"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,5,10,0.9) 0%, rgba(5,7,10,0.4) 60%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[25vh]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(5,7,10,0.5) 60%, rgba(5,7,10,0.95) 100%)",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
