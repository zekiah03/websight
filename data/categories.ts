import type { Category } from "./apps";

export type CategoryMeta = {
  key: Category;
  index: string;          // "01"
  labelEn: string;        // "DIAGNOSE"
  labelJa: string;        // "診断"
  thesis: string;         // KaTeX
  oneliner: string;       // 1-line description in JA
};

export const categoryOrder: Category[] = [
  "diagnosis",
  "record",
  "research",
  "game",
  "service",
];

export const categories: Record<Category, CategoryMeta> = {
  diagnosis: {
    key: "diagnosis",
    index: "01",
    labelEn: "DIAGNOSE",
    labelJa: "診断",
    thesis:
      "\\hat{p} = \\arg\\min_{p \\in \\mathcal{P}}\\, \\lVert x - p \\rVert",
    oneliner: "観測点 x を、もっとも近い型 p に写す。",
  },
  record: {
    key: "record",
    index: "02",
    labelEn: "RECORD",
    labelJa: "記録",
    thesis:
      "\\mathrm{Self}(t) = \\int_{0}^{t} \\mathrm{action}(\\tau)\\, d\\tau",
    oneliner: "行為の積分が、自己になる。",
  },
  research: {
    key: "research",
    index: "03",
    labelEn: "RESEARCH",
    labelJa: "研究",
    thesis:
      "\\mathcal{T}: X \\to \\mathcal{C} = \\{c_1, c_2, \\ldots, c_n\\}",
    oneliner: "観測対象を、有限の分類集合へ写す。",
  },
  game: {
    key: "game",
    index: "04",
    labelEn: "GAME",
    labelJa: "ゲーム",
    thesis:
      "U(\\sigma_i, \\sigma_{-i}) = \\mathbb{E}_{a \\sim \\sigma}[\\pi_i(a)]",
    oneliner: "選択の期待値で、世界を歩く。",
  },
  service: {
    key: "service",
    index: "05",
    labelEn: "SERVICE",
    labelJa: "サービス",
    thesis:
      "\\mu: A \\to B \\cup \\{\\emptyset\\}",
    oneliner: "誰かと、誰かを結ぶ。",
  },
};
