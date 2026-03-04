import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { getSession } from "@/app/lib/auth/session"
import { connectDB } from "@/app/lib/db/mongoose"
import Project from "@/app/lib/models/Project"

export type ProjectItem = { id: string; name: string }

export async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession()

  let initialProjects: ProjectItem[] = []
  if (user) {
    try {
      await connectDB()
      const docs = await Project.find({ userId: user.id }).select("name").lean()
      initialProjects = docs.map((d) => ({ id: (d._id as { toString(): string }).toString(), name: d.name as string }))
    } catch {
      // non-fatal — sidebar will show empty list
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar initialProjects={initialProjects} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={user ?? undefined} initialProjects={initialProjects} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
