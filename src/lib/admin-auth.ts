import { createUserClient } from "./supabase";

/** Returns the admin's email if the bearer token belongs to an admin, otherwise null. */
export async function verifyAdmin(request: Request): Promise<string | null> {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;

  const sb = createUserClient(token);
  if (!sb) return null;

  const { data: userData, error } = await sb.auth.getUser(token);
  if (error || !userData.user?.email) return null;

  const { data: isAdmin } = await sb.rpc("is_admin");
  return isAdmin === true ? userData.user.email : null;
}
