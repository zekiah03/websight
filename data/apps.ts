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
    id: "comparedna",
    index: "01",
    title: "compareDNA",
    subtitle: "差異の系譜学",
    description:
      "二つのものを並べたとき、何が同じで何が違うのかを言語化する。比較という最も素朴な思考を、構造として可視化する試み。",
    question: "比較は理解か、それとも分類による暴力か。",
    url: "https://comparedna.vercel.app/",
    tags: ["compare", "structure", "diff"],
    status: "live",
    year: 2025,
  },
  {
    id: "life-tracker",
    index: "02",
    title: "life tracker",
    subtitle: "生の記録装置",
    description:
      "日々の出来事を淡々と記録する。記録された「生」は、生きているそれとどう違うのか。観測が対象を変えるという問題への、ささやかな実装。",
    question: "記録された一日と、生きた一日は同じ一日か。",
    url: "https://v0-life-tracker-app-zeta.vercel.app/",
    tags: ["log", "habit", "self"],
    status: "live",
    year: 2025,
  },
  {
    id: "micron",
    index: "03",
    title: "micron",
    subtitle: "微小と総和",
    description:
      "ミクロン単位の積み重ねが、いつしかシグマ──総体になる。小さな入力が大きな帰結に変わる瞬間を、数字で確かめるためのアプリ。",
    question: "塵も積もれば山となる、その「積もる」とは何か。",
    url: "https://micron-sigma.vercel.app/",
    tags: ["accumulate", "sum", "scale"],
    status: "live",
    year: 2025,
  },
  {
    id: "exchange",
    index: "04",
    title: "exchange",
    subtitle: "交換の倫理",
    description:
      "通貨であれ、言葉であれ、視線であれ。交換が成立する条件と、そこで何が等価とみなされているのかを問い直すための小さな道具。",
    question: "等価交換は本当に等価か。",
    url: "https://exchangeapp2.vercel.app/",
    tags: ["currency", "value", "trade"],
    status: "live",
    year: 2025,
  },
  {
    id: "problem-mach",
    index: "05",
    title: "problem mach",
    subtitle: "問題の高速化",
    description:
      "問いを次々と投げてくる装置。答えを出すことよりも、問いに晒されつづけることが思考を鍛えるという仮説に基づく。",
    question: "解かれない問いは、問いとして残るのか消えるのか。",
    url: "https://problemmach.vercel.app/",
    tags: ["question", "drill", "thinking"],
    status: "live",
    year: 2025,
  },
  {
    id: "whoyournot",
    index: "06",
    title: "who you're not",
    subtitle: "否定による自画像",
    description:
      "「あなたは何者か」ではなく「あなたは何者でないか」を積み上げる。否定神学的なアプローチで、自己の輪郭を描く実験。",
    question: "自己とは、削り出された残余のことではないか。",
    url: "https://whoyournot.vercel.app/",
    tags: ["identity", "negation", "self"],
    status: "live",
    year: 2025,
  },
  {
    id: "wrong-seven",
    index: "07",
    title: "wrong seven",
    subtitle: "七つの誤謬",
    description:
      "正しさが一つに見えるのに対し、誤りは無数にある。そのうち代表的な七つを並べ、なぜそれが誤りとされるのかを辿り直す。",
    question: "誤りは、別の正しさの未満なのか、それとも別の正しさそのものか。",
    url: "https://wrong-seven.vercel.app/",
    tags: ["fallacy", "ethics", "list"],
    status: "live",
    year: 2025,
  },
];

export const placeholderSlots = 3;
