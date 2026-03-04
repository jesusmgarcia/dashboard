import type { LucideIcon } from "lucide-react"
import { LayoutDashboard } from "lucide-react"

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
]
