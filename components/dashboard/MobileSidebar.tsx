"use client"

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { navItems } from "./navItems"
import { NavLink } from "./NavLink"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 gap-0 bg-sidebar p-0 text-sidebar-foreground">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <span className="text-lg font-semibold">My App</span>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} onClick={() => onOpenChange(false)} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
