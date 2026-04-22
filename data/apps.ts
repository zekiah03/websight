export type AppStatus = "live" | "wip" | "archived";

export type App = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  question: string;
  url: string;
  tags: string[];
  status: AppStatus;
  year: number;
};

export const apps: App[] = [
  {
    id: "morpho",
    index: "01",
    title: "Morpho",
    subtitle: "万物の分類学",
    description:
      "目の前のものを「何であるか」ではなく「どこに位置するか」で捉え直す。分類という古い営みを、AIで再起動する。",
    question: "分類された瞬間、それは何を失うのか。",
    url: "https://comparedna.vercel.app/",
    tags: ["taxonomy", "ai", "classify"],
    status: "wip",
    year: 2025,
  },
  {
    id: "profile",
    index: "02",
    title: "存在をプロファイリングする",
    subtitle: "12軸 × 60環境DNA",
    description:
      "対象を12の軸と60のDNAで多面解析するAI分類学。観察対象の「らしさ」を数値と座標として記述する。",
    question: "プロファイルされた存在は、まだ未知でいられるか。",
    url: "https://v0-life-tracker-app-zeta.vercel.app/",
    tags: ["profile", "ai", "library"],
    status: "live",
    year: 2025,
  },
  {
    id: "prism",
    index: "03",
    title: "Prism",
    subtitle: "六つの角度から見る自分",
    description:
      "人との関わり方、努力、学び方など6つの観点で自分を診断し、AIが6つの像を一枚のレポートに結び直す。",
    question: "六面から見られた自己は、一つの自己か、六つの像か。",
    url: "https://micron-sigma.vercel.app/",
    tags: ["self", "diagnose", "report"],
    status: "live",
    year: 2025,
  },
  {
    id: "prism-mirror",
    index: "04",
    title: "Prism — 別経路",
    subtitle: "同じ装置・別の入口",
    description:
      "Prismと同じ診断を別ドメインから提供する鏡像。同じ問いに、二度たどりつくための裏口。",
    question: "二つの入口は、同じ場所にたどりつくか。",
    url: "https://exchangeapp2.vercel.app/",
    tags: ["self", "mirror", "alt"],
    status: "live",
    year: 2025,
  },
  {
    id: "hanten",
    index: "05",
    title: "反転",
    subtitle: "自分の中の別の位置を見にいく",
    description:
      "好きなこと・つらいことを書き出し、4ステップでその裏側にある別の側面を引き出す。一面的な感情を、もう一度ひっくり返す。",
    question: "好きの反対は嫌いか、それとも別の好きか。",
    url: "https://problemmach.vercel.app/",
    tags: ["reframe", "emotion", "4-step"],
    status: "live",
    year: 2025,
  },
  {
    id: "problemmach",
    index: "06",
    title: "problemmach",
    subtitle: "悩みを、対話で整理する",
    description:
      "AIとの対話で悩みを時系列にほどき、情報型・行動型など5つの解決タイプから次の一歩を提案する。口調も自分で選べる。",
    question: "整理された悩みは、まだ悩みのままか。",
    url: "https://whoyournot.vercel.app/",
    tags: ["dialogue", "ai", "mental"],
    status: "live",
    year: 2025,
  },
  {
    id: "watashi",
    index: "07",
    title: "わたしの定義",
    subtitle: "99の思考実験",
    description:
      "記憶が、身体が、意識が変わっても、あなたはあなたでいられるか。同一性をめぐる思考実験を「抄・選・全」の三層で読む。",
    question: "わたしを「わたし」たらしめるものは、どこにあるか。",
    url: "https://wrong-seven.vercel.app/",
    tags: ["identity", "experiment", "self"],
    status: "live",
    year: 2025,
  },
];
