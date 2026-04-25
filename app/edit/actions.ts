"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isEditor, signIn, signOut } from "@/lib/auth";
import { adminClient, TABLE, type App } from "@/lib/supabase";

async function requireEditor() {
  if (!(await isEditor())) {
    redirect("/edit");
  }
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await signIn(password);
  if (!ok) redirect("/edit?error=1");
  redirect("/edit");
}

export async function logoutAction() {
  await signOut();
  redirect("/edit");
}

function parsed(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const sort_order = Number(formData.get("sort_order") ?? 0);
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const question = String(formData.get("question") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const status = String(formData.get("status") ?? "live") as App["status"];
  const yearRaw = String(formData.get("year") ?? "").trim();
  const year = yearRaw === "" ? null : Number(yearRaw);

  return {
    id,
    sort_order: Number.isFinite(sort_order) ? sort_order : 0,
    title,
    subtitle,
    description,
    question,
    url,
    tags,
    status,
    year: year != null && Number.isFinite(year) ? year : null,
  };
}

export async function createAppAction(formData: FormData) {
  await requireEditor();
  const row = parsed(formData);
  if (!row.id || !row.title) {
    redirect("/edit?error=missing");
  }
  const { error } = await adminClient().from(TABLE).insert(row);
  if (error) {
    console.error("[createAppAction]", error);
    redirect(`/edit?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/");
  revalidatePath("/edit");
  redirect("/edit");
}

export async function updateAppAction(formData: FormData) {
  await requireEditor();
  const originalId = String(formData.get("original_id") ?? "");
  const row = parsed(formData);
  if (!originalId || !row.id || !row.title) {
    redirect("/edit?error=missing");
  }
  const { error } = await adminClient()
    .from(TABLE)
    .update(row)
    .eq("id", originalId);
  if (error) {
    console.error("[updateAppAction]", error);
    redirect(`/edit?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/");
  revalidatePath("/edit");
  redirect("/edit");
}

export async function deleteAppAction(formData: FormData) {
  await requireEditor();
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/edit");
  const { error } = await adminClient().from(TABLE).delete().eq("id", id);
  if (error) {
    console.error("[deleteAppAction]", error);
    redirect(`/edit?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/");
  revalidatePath("/edit");
  redirect("/edit");
}
