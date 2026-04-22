"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

type StageCtx = {
  progress: MotionValue<number>;
  scenes: number;
};

type SceneCtx = {
  progress: MotionValue<number>;
  index: number;
};

const StageContext = createContext<StageCtx | null>(null);
const SceneContext = createContext<SceneCtx | null>(null);

export function useStage() {
  const v = useContext(StageContext);
  if (!v) throw new Error("useStage must be used inside Stage");
  return v;
}

export function useScene() {
  const v = useContext(SceneContext);
  if (!v) throw new Error("useScene must be used inside Scene");
  return v;
}

export const SCENE_SCROLL_VH = 160;

export default function Stage({
  scenes,
  children,
  chrome,
}: {
  scenes: number;
  children: (sceneProgress: MotionValue<number>, i: number) => ReactNode;
  chrome?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const stageValue: StageCtx = useMemo(
    () => ({ progress: smoothed, scenes }),
    [smoothed, scenes],
  );

  return (
    <StageContext.Provider value={stageValue}>
      {chrome}
      <div
        ref={ref}
        style={{ height: `${scenes * SCENE_SCROLL_VH}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          {Array.from({ length: scenes }, (_, i) => (
            <SceneMount key={i} index={i} total={scenes} parent={smoothed}>
              {(progress) => children(progress, i)}
            </SceneMount>
          ))}
        </div>
      </div>
    </StageContext.Provider>
  );
}

function SceneMount({
  index,
  total,
  parent,
  children,
}: {
  index: number;
  total: number;
  parent: MotionValue<number>;
  children: (p: MotionValue<number>) => ReactNode;
}) {
  const slot = 1 / total;
  const start = slot * index;
  const end = slot * (index + 1);
  const local = useTransform(parent, [start, end], [0, 1], { clamp: true });
  const gate = useTransform(parent, (v) => (v >= start - slot * 0.05 && v <= end + slot * 0.05 ? 1 : 0));

  const value = useMemo(() => ({ progress: local, index }), [local, index]);

  return (
    <SceneContext.Provider value={value}>
      <motion.div className="absolute inset-0" style={{ opacity: gate }}>
        {children(local)}
      </motion.div>
    </SceneContext.Provider>
  );
}
