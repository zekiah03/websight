import Stage from "@/components/Stage";
import HUD from "@/components/HUD";
import DepthIndicator from "@/components/DepthIndicator";
import ScrollHint from "@/components/ScrollHint";
import Particles from "@/components/Particles";
import ZoomLayer from "@/components/ZoomLayer";
import ContentLayer from "@/components/ContentLayer";
import ManifestoLayer from "@/components/ManifestoLayer";
import CategoryLayer from "@/components/CategoryLayer";
import OriginGlyph from "@/components/glyphs/OriginGlyph";
import DiagnoseGlyph from "@/components/glyphs/DiagnoseGlyph";
import RecordGlyph from "@/components/glyphs/RecordGlyph";
import ResearchGlyph from "@/components/glyphs/ResearchGlyph";
import GameGlyph from "@/components/glyphs/GameGlyph";
import ServiceGlyph from "@/components/glyphs/ServiceGlyph";

export default function Page() {
  return (
    <Stage>
      <ZoomLayer index={0}><OriginGlyph /></ZoomLayer>
      <ZoomLayer index={1}><DiagnoseGlyph /></ZoomLayer>
      <ZoomLayer index={2}><RecordGlyph /></ZoomLayer>
      <ZoomLayer index={3}><ResearchGlyph /></ZoomLayer>
      <ZoomLayer index={4}><GameGlyph /></ZoomLayer>
      <ZoomLayer index={5}><ServiceGlyph /></ZoomLayer>

      <ContentLayer index={0}><ManifestoLayer /></ContentLayer>
      <ContentLayer index={1}><CategoryLayer category="diagnosis" /></ContentLayer>
      <ContentLayer index={2}><CategoryLayer category="record" /></ContentLayer>
      <ContentLayer index={3}><CategoryLayer category="research" /></ContentLayer>
      <ContentLayer index={4}><CategoryLayer category="game" /></ContentLayer>
      <ContentLayer index={5}><CategoryLayer category="service" /></ContentLayer>

      <Particles />
      <HUD />
      <DepthIndicator />
      <ScrollHint />
    </Stage>
  );
}
