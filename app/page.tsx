import Atmosphere from "@/components/Atmosphere";
import Vortex from "@/components/Vortex";
import Whispers from "@/components/Whispers";
import Whirlpool from "@/components/Whirlpool";
import Cursor from "@/components/Cursor";
import Hud from "@/components/Hud";
import Surface from "@/components/Surface";

export default function Page() {
  return (
    <>
      <Atmosphere />
      <Vortex />
      <Whispers />
      <Cursor />
      <Hud />
      <Surface />
      <main>
        <Whirlpool />
      </main>
    </>
  );
}
