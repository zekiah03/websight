import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07141a",
          900: "#0d2128",
          800: "#173038",
          700: "#22414a",
          600: "#2f535c",
          500: "#3f6770",
        },
        bone: {
          100: "#f4f2ea",
          200: "#e7e9e0",
          300: "#c4d0d1",
          400: "#7d979d",
        },
        glow: {
          DEFAULT: "#aedfe4",
          dim: "#5e8d93",
        },
        ember: "#d8a18a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        horizon:
          "linear-gradient(to bottom, transparent 0%, rgba(174,223,228,0.06) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
