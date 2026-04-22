import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: {
          950: "#02060a",
          900: "#04101a",
          800: "#081a28",
          700: "#0e2638",
          600: "#163448",
          500: "#1f475d",
        },
        foam: {
          100: "#eef3f4",
          200: "#dbe5e7",
          300: "#a8bcc1",
          400: "#6c858d",
          500: "#496268",
        },
        tide: "#7fb7c2",
        coral: "#c8978a",
        kelp: "#7c9a8a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
};

export default config;
