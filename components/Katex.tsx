"use client";

import { useMemo } from "react";
import katex from "katex";

type Props = {
  math: string;
  display?: boolean;
  className?: string;
};

export default function Katex({ math, display = false, className }: Props) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        output: "html",
        strict: "ignore",
        trust: false,
      });
    } catch {
      return math;
    }
  }, [math, display]);

  return (
    <span
      className={className}
      // KaTeX output is trusted (we control the input).
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
