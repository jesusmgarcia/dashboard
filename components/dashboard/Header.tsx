"use client"

import { useState } from "react"
import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "./MobileSidebar"

export function Header({ title }: { title?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)

  function toggleDark() {
    document.documentElement.classList.toggle("dark")
    setDark((d) => !d)
  }

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
        <Button variant="ghost" size="icon" onClick={toggleDark} title="Toggle dark mode">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
        <Button variant="outline" size="sm">Account</Button>
      </div>

      <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  )
}
