"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ambient from "@/components/Ambient";
import Scene from "@/components/Scene";
import ScrollCue from "@/components/ScrollCue";
import Stage from "@/lib/stage";
import { apps } from "@/data/apps";

export default function Page() {
  return (
    <>
      <Ambient />
      <Stage
        scenes={apps.length}
        chrome={
          <>
            <Header />
            <Footer />
            <ScrollCue />
          </>
        }
      >
        {(progress, i) => <Scene app={apps[i]} progress={progress} />}
      </Stage>
    </>
  );
}
