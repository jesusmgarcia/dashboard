import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { getSession } from "@/lib/auth/session"

export async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession()

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={user ?? undefined} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
