import type { Metadata } from "next";
import { Noto_Serif_JP, Fraunces, JetBrains_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const serifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-serif-jp",
  display: "swap",
});

const serifEN = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif-en",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "solnova — a small research studio modelling the human at five scales",
  description:
    "solnova のリサーチトラック。診断・記録・研究・ゲーム・サービスの五つの尺度で人を観測する研究所。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${serifJP.variable} ${serifEN.variable} ${mono.variable}`}
    >
      <body className="bg-void text-paper font-serif font-light antialiased">
        {children}
      </body>
    </html>
  );
}
