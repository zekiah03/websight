import Stage from "@/lib/stage";
import Backdrop from "@/components/Backdrop";
import Cursor from "@/components/Cursor";
import Hud from "@/components/Hud";
import Intro from "@/components/scenes/Intro";
import Manifesto from "@/components/scenes/Manifesto";
import AppScene from "@/components/scenes/AppScene";
import Outro from "@/components/scenes/Outro";
import { apps } from "@/data/apps";

export default function Page() {
  return (
    <>
      <Cursor />
      <main>
        <Stage
          chrome={
            <>
              <Backdrop />
              <Hud />
            </>
          }
        >
          <Intro />
          <Manifesto />
          {apps.map((app, i) => (
            <AppScene key={app.id} app={app} slot={i} />
          ))}
          <Outro />
        </Stage>
      </main>
    </>
  );
}
