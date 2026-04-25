import Link from "next/link";
import { isEditor } from "@/lib/auth";
import { adminClient, TABLE, type App } from "@/lib/supabase";
import {
  createAppAction,
  deleteAppAction,
  loginAction,
  logoutAction,
  updateAppAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function EditPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const authed = await isEditor();

  if (!authed) {
    return <Login error={error} />;
  }

  const { data, error: dbError } = await adminClient()
    .from(TABLE)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  const apps = (data ?? []) as App[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:px-8">
      <header className="mb-10 flex items-baseline justify-between">
        <h1 className="text-md font-light text-paper">編集</h1>
        <div className="flex items-baseline gap-4 text-xs text-mist">
          <Link href="/" className="hover:text-paper">
            ← サイトに戻る
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="hover:text-paper">
              ログアウト
            </button>
          </form>
        </div>
      </header>

      {error && (
        <p className="mb-6 rounded border border-red-900/40 bg-red-950/20 px-3 py-2 text-xs text-red-300">
          エラー: {error === "missing" ? "id と title は必須です" : error}
        </p>
      )}
      {dbError && (
        <p className="mb-6 rounded border border-red-900/40 bg-red-950/20 px-3 py-2 text-xs text-red-300">
          DBエラー: {dbError.message}
        </p>
      )}

      <section className="mb-12">
        <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-mist">
          新規追加
        </h2>
        <AppForm action={createAppAction} mode="create" />
      </section>

      <section>
        <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-mist">
          現在の作品 ({apps.length})
        </h2>
        {apps.length === 0 ? (
          <p className="text-xs text-mist">まだありません。</p>
        ) : (
          <ul className="space-y-8">
            {apps.map((app) => (
              <li
                key={app.id}
                className="rounded border border-paper/10 bg-ink-raised/40 p-5"
              >
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="font-en text-xs tracking-[0.25em] text-mist">
                    {String(app.sort_order).padStart(2, "0")} · {app.id}
                  </span>
                  <form action={deleteAppAction}>
                    <input type="hidden" name="id" value={app.id} />
                    <button
                      type="submit"
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      削除
                    </button>
                  </form>
                </div>
                <AppForm action={updateAppAction} mode="update" app={app} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function Login({ error }: { error?: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="mb-2 text-md font-light text-paper">編集</h1>
      <p className="mb-8 text-xs text-mist">パスワードを入力</p>
      <form action={loginAction} className="space-y-4">
        <input
          type="password"
          name="password"
          autoFocus
          className="w-full border border-paper/15 bg-ink-raised px-3 py-2 text-sm text-paper outline-none focus:border-paper/40"
        />
        <button
          type="submit"
          className="w-full border border-paper/15 px-3 py-2 text-xs text-paper hover:border-paper/40"
        >
          ログイン
        </button>
      </form>
      {error && (
        <p className="mt-4 text-xs text-red-400">パスワードが違います</p>
      )}
    </main>
  );
}

function AppForm({
  action,
  mode,
  app,
}: {
  action: (formData: FormData) => Promise<void>;
  mode: "create" | "update";
  app?: App;
}) {
  return (
    <form action={action} className="space-y-3">
      {mode === "update" && app && (
        <input type="hidden" name="original_id" value={app.id} />
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_120px]">
        <Field
          label="id (slug)"
          name="id"
          defaultValue={app?.id}
          required
          placeholder="morpho"
          readOnly={mode === "update"}
        />
        <Field
          label="sort_order"
          name="sort_order"
          type="number"
          defaultValue={String(app?.sort_order ?? 0)}
        />
      </div>
      <Field
        label="title"
        name="title"
        defaultValue={app?.title}
        required
      />
      <Field label="subtitle" name="subtitle" defaultValue={app?.subtitle} />
      <Textarea
        label="question"
        name="question"
        defaultValue={app?.question}
        rows={2}
      />
      <Textarea
        label="description"
        name="description"
        defaultValue={app?.description}
        rows={3}
      />
      <Field label="url" name="url" defaultValue={app?.url} />
      <Field
        label="tags (comma-separated)"
        name="tags"
        defaultValue={app?.tags.join(", ")}
        placeholder="taxonomy, ai, classify"
      />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xx uppercase tracking-[0.25em] text-mist">
            status
          </label>
          <select
            name="status"
            defaultValue={app?.status ?? "live"}
            className="w-full border border-paper/15 bg-ink-raised px-3 py-2 text-sm text-paper"
          >
            <option value="live">live</option>
            <option value="wip">wip</option>
            <option value="archived">archived</option>
          </select>
        </div>
        <Field
          label="year"
          name="year"
          type="number"
          defaultValue={app?.year != null ? String(app.year) : ""}
        />
      </div>
      <button
        type="submit"
        className="border border-paper/20 px-4 py-2 text-xs text-paper hover:border-paper/50"
      >
        {mode === "create" ? "追加" : "保存"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
  required,
  readOnly,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xx uppercase tracking-[0.25em] text-mist">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className="w-full border border-paper/15 bg-ink-raised px-3 py-2 text-sm text-paper outline-none focus:border-paper/40 read-only:opacity-60"
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-xx uppercase tracking-[0.25em] text-mist">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="w-full resize-y border border-paper/15 bg-ink-raised px-3 py-2 text-sm leading-relaxed text-paper outline-none focus:border-paper/40"
      />
    </div>
  );
}
