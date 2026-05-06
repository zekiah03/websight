import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0a0a0a",
        mid: "#1a1a1a",
        paper: "#f4f1ea",
        // legacy tokens (kept so existing classes still resolve)
        ink: {
          DEFAULT: "#0a0a0a",
          raised: "#1a1a1a",
          deeper: "#050505",
        },
        mist: "#8a8a86",
        shadow: "#4a4a47",
      },
      fontFamily: {
        serif: ["var(--font-serif-jp)", "var(--font-serif-en)", "ui-serif", "Georgia", "serif"],
        en: ["var(--font-serif-en)", "var(--font-serif-jp)", "ui-serif", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        xx: ["10px", "1.5"],
        xs: ["13px", "1.55"],
        sm: ["15px", "1.7"],
        md: ["20px", "1.45"],
        lg: ["36px", "1.15"],
        xl: ["72px", "1.02"],
        "2xl": ["128px", "0.95"],
      },
    },
  },
  plugins: [],
};

export default config;
