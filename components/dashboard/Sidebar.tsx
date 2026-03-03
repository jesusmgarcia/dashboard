"use client"

import { navItems } from "./navItems"
import { NavLink } from "./NavLink"

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <span className="text-lg font-semibold">My App</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
    </aside>
  )
}
