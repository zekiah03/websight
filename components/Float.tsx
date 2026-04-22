"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  range?: number;
  drift?: number;
  duration?: number;
  delay?: number;
  rotate?: number;
  className?: string;
  as?: "div" | "span";
} & Omit<HTMLMotionProps<"div">, "animate" | "transition" | "ref">;

export default function Float({
  children,
  range = 6,
  drift = 0,
  duration = 6,
  delay = 0,
  rotate = 0,
  className = "",
  as = "div",
  ...rest
}: Props) {
  const Component = as === "span" ? motion.span : motion.div;
  return (
    <Component
      {...rest}
      className={className}
      animate={{
        y: [-range, range, -range],
        x: drift ? [-drift, drift, -drift] : 0,
        rotate: rotate ? [-rotate, rotate, -rotate] : 0,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </Component>
  );
}
