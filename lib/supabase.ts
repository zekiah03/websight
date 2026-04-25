import { createClient } from "@supabase/supabase-js";

export type App = {
  id: string;
  sort_order: number;
  title: string;
  subtitle: string;
  description: string;
  question: string;
  url: string;
  tags: string[];
  status: "live" | "wip" | "archived";
  year: number | null;
  created_at: string;
  updated_at: string;
};

export const TABLE = "solnova_apps";

export function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

export function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
