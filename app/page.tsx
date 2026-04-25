import Link from "next/link";
import { publicClient, TABLE, type App } from "@/lib/supabase";

export const revalidate = 30;

async function fetchApps(): Promise<App[]> {
  const { data, error } = await publicClient()
    .from(TABLE)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[fetchApps]", error);
    return [];
  }
  return (data ?? []) as App[];
}

const STATUS_LABEL: Record<App["status"], string> = {
  live: "流れている",
  wip: "手入れ中",
  archived: "しまわれた",
};

export default async function Page() {
  const apps = await fetchApps();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <header className="mb-16 flex items-baseline justify-between">
        <div className="flex items-baseline gap-3 text-xs text-mist">
          <span className="text-paper">saiki</span>
          <span className="text-shadow">──</span>
          <span>記録</span>
        </div>
        <div className="flex items-baseline gap-3 text-xs text-mist">
          <span>websight</span>
          <span className="text-shadow">/</span>
          <span className="text-paper">solnova</span>
        </div>
      </header>

      <h1 className="mb-2 text-lg font-light text-paper">作品</h1>
      <p className="mb-12 text-xs text-mist">{apps.length} 件</p>

      {apps.length === 0 ? (
        <p className="text-xs text-mist">
          まだ何もありません。
          <Link href="/edit" className="ml-2 text-paper underline">
            /edit
          </Link>{" "}
          から追加してください。
        </p>
      ) : (
        <ul className="divide-y divide-paper/8">
          {apps.map((app, i) => (
            <li key={app.id} className="py-8">
              <AppRow app={app} index={i + 1} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function AppRow({ app, index }: { app: App; index: number }) {
  const num = String(index).padStart(2, "0");
  return (
    <article className="grid grid-cols-[3rem_1fr] gap-6">
      <span className="font-en text-xs tracking-[0.3em] text-shadow">{num}</span>
      <div className="space-y-3">
        <div className="flex flex-wrap items-baseline gap-3">
          <h2 className="text-md font-light text-paper">{app.title}</h2>
          {app.subtitle && (
            <span className="text-xs text-mist">— {app.subtitle}</span>
          )}
        </div>
        {app.question && (
          <blockquote className="text-xs italic text-paper/80">
            「{app.question}」
          </blockquote>
        )}
        {app.description && (
          <p className="text-xs leading-relaxed text-paper/80">
            {app.description}
          </p>
        )}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xx text-mist">
          <span>{STATUS_LABEL[app.status]}</span>
          {app.year != null && (
            <>
              <span className="text-shadow">·</span>
              <span className="font-en tracking-[0.25em]">{app.year}</span>
            </>
          )}
          {app.tags.length > 0 && (
            <>
              <span className="text-shadow">·</span>
              <span className="font-en tracking-[0.2em] text-paper/70">
                {app.tags.join(" · ")}
              </span>
            </>
          )}
          {app.url && (
            <>
              <span className="text-shadow">·</span>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline-offset-4 hover:underline"
              >
                覗く →
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
