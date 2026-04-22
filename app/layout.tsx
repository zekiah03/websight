import type { Metadata } from "next";
import { Noto_Serif_JP, EB_Garamond } from "next/font/google";
import "./globals.css";

const serifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-serif-jp",
  display: "swap",
});

const serifEN = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif-en",
  display: "swap",
});

export const metadata: Metadata = {
  title: "websight — saiki / solnova",
  description:
    "saiki が solnova で作った小さなアプリを、夜の川のように並べた記録。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${serifJP.variable} ${serifEN.variable}`}>
      <body className="bg-ink text-paper font-serif font-light antialiased">
        {children}
      </body>
    </html>
  );
}
