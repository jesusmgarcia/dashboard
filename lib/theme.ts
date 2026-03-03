import { cookies } from "next/headers"

export async function getThemeCookie(): Promise<"dark" | "light"> {
  const cookieStore = await cookies()
  const theme = cookieStore.get("theme")?.value
  return theme === "dark" ? "dark" : "light"
}
