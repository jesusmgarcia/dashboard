"use client"

import { navItems } from "./navItems"
import { NavLink } from "./NavLink"
import { SidebarProjects } from "./SidebarProjects"
import type { ProjectItem } from "./DashboardLayout"

export function Sidebar({ initialProjects }: { initialProjects: ProjectItem[] }) {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <span className="text-lg font-semibold">My App</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
        <SidebarProjects initialProjects={initialProjects} />
      </nav>
    </aside>
  )
}
