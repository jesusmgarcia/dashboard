"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { MobileSidebar } from "./MobileSidebar"
import { ThemeToggle } from "@/app/components/ThemeToggle"
import { UserProfileMenu } from "@/app/components/UserProfileMenu"
import type { ProjectItem } from "./DashboardLayout"

type Props = {
  title?: string
  user?: { email: string }
  initialProjects: ProjectItem[]
}

export function Header({ title, user, initialProjects }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      <h1 className="flex-1 text-lg font-semibold">{title ?? "Dashboard"}</h1>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user && <UserProfileMenu user={user} />}
      </div>

      <MobileSidebar
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        initialProjects={initialProjects}
      />
    </header>
  )
}
