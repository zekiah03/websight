export type Category = "diagnosis" | "record" | "research" | "game" | "service";
export type Status = "live" | "wip" | "archived";

export type App = {
  id: string;
  title: string;
  category: Category;
  description: string;
  url: string;
  tags: string[];
  status: Status;
  question: string;
  dimensions: { label: string; value: number }[];
  formula: string; // KaTeX source
};

export const apps: App[] = [
  // ── 診断 ──────────────────────────────────────────
  {
    id: "evolve",
    title: "進化診断",
    category: "diagnosis",
    description: "自分の進化段階・成長フェーズを可視化する診断。",
    url: "https://evolve-five-gamma.vercel.app/",
    tags: ["成長", "フェーズ", "自己理解"],
    status: "live",
    question: "いま自分は、どの段階を生きているか",
    dimensions: [{ label: "stages", value: 5 }],
    formula: "f: t \\mapsto \\mathrm{stage}(t) \\in \\{0,1,\\ldots,n\\}",
  },
  {
    id: "consciousness",
    title: "意識診断",
    category: "diagnosis",
    description: "自分の意識のあり方・自己認識を測る診断。",
    url: "https://whoyournot.vercel.app/",
    tags: ["意識", "自己認識", "メタ認知"],
    status: "live",
    question: "自分は、どう自分を見ているか",
    dimensions: [{ label: "axes", value: 4 }],
    formula: "\\mathcal{S} = (I, \\lnot I) \\times (\\mathrm{seen}, \\mathrm{seeing})",
  },
  {
    id: "past",
    title: "過去診断",
    category: "diagnosis",
    description: "過去の傾向やパターンから自分を読み解く診断。",
    url: "https://pazst.vercel.app/result",
    tags: ["過去", "パターン", "自己理解"],
    status: "live",
    question: "過去のどのパターンが、いまを決めているか",
    dimensions: [{ label: "patterns", value: 7 }],
    formula: "\\pi^* = \\arg\\max_p\\, P(p \\mid h_{<t})",
  },
  {
    id: "minus",
    title: "負の診断",
    category: "diagnosis",
    description: "自分のネガティブ面・弱みを言語化する診断。",
    url: "https://minus-kappa.vercel.app/",
    tags: ["弱み", "ネガティブ", "自己理解"],
    status: "live",
    question: "弱さの形を、どう名づけるか",
    dimensions: [{ label: "types", value: 6 }],
    formula: "-V = \\sum_i w_i \\cdot |a_i|",
  },
  {
    id: "opportunity",
    title: "機会診断",
    category: "diagnosis",
    description: "掴めていない機会・可能性を見つける診断。",
    url: "https://a-irobot.vercel.app/",
    tags: ["機会", "可能性"],
    status: "live",
    question: "見過ごしている可能性は、どこにあるか",
    dimensions: [{ label: "domains", value: 8 }],
    formula:
      "\\Omega = \\{x \\in X : \\mathbb{E}[v(x)] > 0,\\, \\mathrm{taken}(x) = 0\\}",
  },
  {
    id: "workstyle",
    title: "作業法診断",
    category: "diagnosis",
    description: "自分に合う作業スタイル・進め方を診断。",
    url: "https://micron-sigma.vercel.app/",
    tags: ["作業", "スタイル", "生産性"],
    status: "live",
    question: "どのリズムで進めば、いちばん整うか",
    dimensions: [{ label: "axes", value: 6 }],
    formula: "\\mathrm{flow} = \\tau \\cdot \\mathrm{focus}^2 / \\mathrm{noise}",
  },
  {
    id: "values",
    title: "価値観診断",
    category: "diagnosis",
    description: "自分の価値観を整理する診断。",
    url: "https://valuse.vercel.app/",
    tags: ["価値観", "自己理解"],
    status: "live",
    question: "あなたが手放さないものは、何か",
    dimensions: [{ label: "axes", value: 7 }],
    formula: "V = \\sum_i w_i \\cdot a_i",
  },

  // ── 記録 ──────────────────────────────────────────
  {
    id: "habit",
    title: "習慣記録",
    category: "record",
    description: "日々の習慣をログするアプリ。",
    url: "https://solnova.biz/ja",
    tags: ["習慣", "ログ"],
    status: "live",
    question: "繰り返したものだけが、あなたを作る",
    dimensions: [{ label: "streak", value: 0 }],
    formula: "h_n = h_{n-1} + \\delta_n",
  },
  {
    id: "life-tracker",
    title: "生活記録",
    category: "record",
    description: "生活全般の出来事を記録するアプリ。",
    url: "https://v0-life-tracker-app-zeta.vercel.app/",
    tags: ["ライフログ", "記録"],
    status: "live",
    question: "平均的な一日は、どんな形をしているか",
    dimensions: [{ label: "categories", value: 12 }],
    formula: "\\bar{L} = \\frac{1}{T}\\int_{0}^{T} L(t)\\, dt",
  },
  {
    id: "inner-outer",
    title: "内面外面記録",
    category: "record",
    description: "内面の状態と外面の行動のギャップを記録するアプリ。",
    url: "https://gap-steel.vercel.app/",
    tags: ["内面", "外面", "ギャップ"],
    status: "live",
    question: "思っていることと、していることの距離",
    dimensions: [{ label: "pairs", value: 2 }],
    formula: "\\Delta(t) = \\bigl| \\mathrm{inner}(t) - \\mathrm{outer}(t) \\bigr|",
  },
  {
    id: "exchange",
    title: "交換可視化",
    category: "record",
    description: "他者と何を交換しているか（時間・価値など）を可視化するアプリ。",
    url: "https://exchangeapp2.vercel.app/",
    tags: ["可視化", "関係性", "交換"],
    status: "live",
    question: "あなたは、誰に、何を渡したか",
    dimensions: [{ label: "edges", value: 0 }],
    formula:
      "\\mathrm{net}_i = \\sum_j \\bigl( \\mathrm{out}_{i,j} - \\mathrm{in}_{i,j} \\bigr)",
  },

  // ── 研究 ──────────────────────────────────────────
  {
    id: "dna",
    title: "生命分類",
    category: "research",
    description: "DNA比較で生命を分類・比較するアプリ。",
    url: "https://comparedna.vercel.app/",
    tags: ["DNA", "生物", "分類"],
    status: "live",
    question: "二つの生命は、どこから別れたのか",
    dimensions: [{ label: "bases", value: 4 }],
    formula:
      "d(x_i, x_j) = \\frac{1}{L}\\sum_{k=1}^{L}\\mathbb{1}\\bigl[x_i^{(k)} \\neq x_j^{(k)}\\bigr]",
  },
  {
    id: "conversation",
    title: "会話分類",
    category: "research",
    description: "会話の種類やパターンを分類するアプリ。",
    url: "https://resonance-eta-woad.vercel.app/",
    tags: ["会話", "コミュニケーション", "分類"],
    status: "live",
    question: "この会話は、どの型に属するか",
    dimensions: [{ label: "types", value: 8 }],
    formula: "\\rho(c_a, c_b) = \\cos\\bigl(\\vec{c_a},\\, \\vec{c_b}\\bigr)",
  },
  {
    id: "ai-talk",
    title: "AI対話実験",
    category: "research",
    description: "AI同士や人とAIの対話を観察する実験アプリ。",
    url: "https://people-talking.vercel.app/",
    tags: ["AI", "対話", "実験"],
    status: "live",
    question: "対話は、どこから始まるか",
    dimensions: [{ label: "agents", value: 2 }],
    formula: "P_{\\theta}(u_t \\mid u_{<t}, A)",
  },
  {
    id: "feelings",
    title: "感情分類論文",
    category: "research",
    description: "感情の仕組みを論文形式で整理するアプリ。",
    url: "https://how-feelings-work.vercel.app/",
    tags: ["感情", "論文", "分類"],
    status: "live",
    question: "感情には、いくつの根があるか",
    dimensions: [{ label: "primaries", value: 6 }],
    formula:
      "E = \\sum_i \\alpha_i\\, e_i,\\quad \\textstyle\\sum_i \\alpha_i = 1",
  },

  // ── ゲーム ────────────────────────────────────────
  {
    id: "scale",
    title: "スケールゲーム",
    category: "game",
    description: "スケールを変えて遊ぶゲーム。",
    url: "https://skalegame.vercel.app/",
    tags: ["スケール", "体験"],
    status: "live",
    question: "あなたが今いる桁は、どこか",
    dimensions: [{ label: "orders", value: 60 }],
    formula: "s = \\log_{10}\\bigl(L / L_0\\bigr)",
  },
  {
    id: "babysit",
    title: "子守ゲーム",
    category: "game",
    description: "子守をテーマにしたゲーム。",
    url: "https://wrong-seven.vercel.app/",
    tags: ["育成", "シミュレーション"],
    status: "live",
    question: "育てるとは、どんな選択の連続か",
    dimensions: [{ label: "states", value: 0 }],
    formula: "a^* = \\arg\\max_a \\mathbb{E}\\bigl[r \\mid s, a\\bigr]",
  },
  {
    id: "self-image",
    title: "自分の姿",
    category: "game",
    description: "自分が見ている自分の姿（虚像）を扱うアプリ。",
    url: "https://lie-six.vercel.app/",
    tags: ["虚像", "自己認識"],
    status: "live",
    question: "自分が見ている自分は、誰か",
    dimensions: [{ label: "layers", value: 3 }],
    formula: "\\hat{x} = x + \\epsilon",
  },

  // ── サービス ──────────────────────────────────────
  {
    id: "problem-match",
    title: "悩みマッチング",
    category: "service",
    description: "似た悩みを持つ人同士をマッチングするサービス。",
    url: "https://problemmach.vercel.app/",
    tags: ["マッチング", "コミュニティ", "悩み"],
    status: "live",
    question: "同じ重さの悩みは、どこにあるか",
    dimensions: [{ label: "features", value: 12 }],
    formula:
      "\\mu(a) = \\arg\\max_{b \\in B}\\, \\mathrm{sim}\\bigl(\\phi(a),\\, \\phi(b)\\bigr)",
  },
];

export function appsByCategory(category: Category): App[] {
  return apps.filter((a) => a.category === category);
}

export function host(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
