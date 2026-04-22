import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "websight — 渦の中の七つの問い",
  description:
    "意識という深海。その渦に身を委ねながら、七つの小さな問いを覗く。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-abyss-950 text-foam-200 font-sans antialiased selection:bg-tide/30 selection:text-foam-100">
        {children}
      </body>
    </html>
  );
}
