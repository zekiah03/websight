"use client";

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

type StageCtx = {
  progress: MotionValue<number>;
  total: number;
};

type SceneCtx = {
  progress: MotionValue<number>;
  index: number;
  total: number;
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

function useSceneProgress(
  parent: MotionValue<number>,
  index: number,
  total: number,
) {
  const slot = 1 / Math.max(1, total - 1);
  const center = slot * index;
  const prev = index === 0 ? center - 0.0001 : Math.max(0, center - slot);
  const next =
    index === total - 1 ? center + 0.0001 : Math.min(1, center + slot);
  return useTransform(parent, [prev, center, next], [-1, 0, 1], {
    clamp: true,
  });
}

export default function Stage({
  children,
  chrome,
}: {
  children: ReactNode;
  chrome?: ReactNode;
}) {
  const slots = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );
  const total = slots.length;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.4,
  });
  const stageValue: StageCtx = useMemo(
    () => ({ progress: smoothed, total }),
    [smoothed, total],
  );

  return (
    <StageContext.Provider value={stageValue}>
      {chrome}
      <div
        ref={ref}
        style={{ height: `${total * 100}vh` }}
        className="relative"
      >
        <div
          className="sticky top-0 h-screen w-screen overflow-hidden"
          style={{ perspective: "1600px" }}
        >
          {slots.map((child, i) => (
            <SceneSlot key={i} index={i} total={total} parent={smoothed}>
              {child}
            </SceneSlot>
          ))}
        </div>
      </div>
    </StageContext.Provider>
  );
}

function SceneSlot({
  index,
  total,
  parent,
  children,
}: {
  index: number;
  total: number;
  parent: MotionValue<number>;
  children: ReactNode;
}) {
  const local = useSceneProgress(parent, index, total);

  const opacity = useTransform(
    local,
    [-1, -0.55, -0.18, 0.18, 0.55, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const scale = useTransform(local, [-1, 0, 1], [0.78, 1, 1.22]);
  const y = useTransform(local, [-1, 0, 1], [80, 0, -100]);
  const blur = useTransform(local, [-1, -0.35, 0, 0.35, 1], [18, 4, 0, 5, 22]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  const value = useMemo(
    () => ({ progress: local, index, total }),
    [local, index, total],
  );

  return (
    <SceneContext.Provider value={value}>
      <motion.div
        className="absolute inset-0"
        style={{
          opacity,
          scale,
          y,
          filter,
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </motion.div>
    </SceneContext.Provider>
  );
}
