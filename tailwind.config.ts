import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050507",
          900: "#0a0a0d",
          800: "#111116",
          700: "#1a1a22",
          600: "#26262f",
          500: "#3a3a45",
        },
        bone: {
          100: "#f4f4ee",
          200: "#e9e9e1",
          300: "#bdbdb3",
          400: "#7d7d77",
        },
        glow: {
          DEFAULT: "#9efcff",
          dim: "#3a8a8e",
        },
        ember: "#ff6b3d",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(158,252,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(158,252,255,0.04) 1px, transparent 1px)",
        noise:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        flicker: "flicker 4s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "47%": { opacity: "1" },
          "48%": { opacity: "0.4" },
          "49%": { opacity: "1" },
          "62%": { opacity: "1" },
          "63%": { opacity: "0.6" },
          "64%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
