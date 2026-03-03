import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export type SessionUser = {
  email: string;
  id: string;
};

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  try {
    const payload = await verifyToken(token);
    const email = payload.email as string;
    const id = (payload.sub ?? payload.id) as string;
    if (!email) return null;
    return { email, id };
  } catch {
    return null;
  }
}
