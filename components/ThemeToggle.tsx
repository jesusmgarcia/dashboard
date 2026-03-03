"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { setTheme } from "@/app/actions/setTheme"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  // 3.4 — Initialize from the server-rendered <html> class
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  async function handleToggle() {
    const next = !dark
    const nextTheme = next ? "dark" : "light"

    // 3.2 — Optimistic DOM update
    document.documentElement.classList.toggle("dark", next)
    setDark(next)

    // 3.3 — Persist via Server Action; revert on failure
    try {
      await setTheme(nextTheme)
    } catch {
      document.documentElement.classList.toggle("dark", !next)
      setDark(!next)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle} title="Toggle dark mode">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  )
}
