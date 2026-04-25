import { cookies } from "next/headers";

const COOKIE = "edit_session";

export async function isEditor(): Promise<boolean> {
  const expected = process.env.EDIT_PASSWORD;
  if (!expected) return false;
  const jar = await cookies();
  return jar.get(COOKIE)?.value === expected;
}

export async function signIn(password: string): Promise<boolean> {
  const expected = process.env.EDIT_PASSWORD;
  if (!expected || password !== expected) return false;
  const jar = await cookies();
  jar.set(COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function signOut() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
