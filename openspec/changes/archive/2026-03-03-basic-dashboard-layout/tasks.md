## 1. Route Structure

- [x] 1.1 Create `app/(dashboard)/` route group directory
- [x] 1.2 Create `app/(dashboard)/layout.tsx` that renders `DashboardLayout` around `{children}`
- [x] 1.3 Create `app/(dashboard)/page.tsx` as the default dashboard home page (placeholder content)

## 2. DashboardLayout Component

- [x] 2.1 Create `components/dashboard/DashboardLayout.tsx` as a Server Component with sidebar + header + main slots
- [x] 2.2 Apply `bg-background text-foreground` and dark-mode tokens to all three regions
- [x] 2.3 Wire `Sidebar` and `Header` into `DashboardLayout`; render `{children}` in the main area

## 3. Sidebar Component

- [x] 3.1 Create `components/dashboard/Sidebar.tsx` with app branding at the top
- [x] 3.2 Define a static nav items array (icon + label + href) in the sidebar file
- [x] 3.3 Create `components/dashboard/NavLink.tsx` as a `"use client"` component that uses `usePathname()` to highlight the active link
- [x] 3.4 Render the nav items list using `NavLink` in the sidebar
- [x] 3.5 Style the sidebar with `--sidebar-*` design tokens and fixed width on desktop (`md:` breakpoint)

## 4. Header Component

- [x] 4.1 Create `components/dashboard/Header.tsx` as a Client Component
- [x] 4.2 Render the current section title (static prop or slot) left-aligned in the header
- [x] 4.3 Render a right-aligned action slot (placeholder button or user avatar)
- [x] 4.4 Add a hamburger menu button visible only on mobile (`md:hidden`) that opens the mobile drawer

## 5. Mobile Sidebar Drawer

- [x] 5.1 Install (or verify already installed) `shadcn/ui Sheet` component
- [x] 5.2 Create `components/dashboard/MobileSidebar.tsx` as a `"use client"` component using `Sheet` to wrap the sidebar content
- [x] 5.3 Wire the `Header` hamburger button to open `MobileSidebar` via shared state or a context
- [x] 5.4 Close the drawer when a nav link is clicked or the overlay is tapped

## 6. Dark Mode

- [x] 6.1 Verify `--sidebar-background`, `--sidebar-foreground`, and other sidebar tokens are defined in `app/globals.css` for both light and dark modes
- [x] 6.2 Add a temporary dark mode toggle button to the header to visually verify dark mode during development

## 7. Verification

- [x] 7.1 Confirm layout renders correctly on desktop (sidebar visible, header, content area)
- [x] 7.2 Confirm responsive behavior: sidebar hidden on mobile, drawer opens on hamburger click
- [x] 7.3 Confirm active nav link is highlighted when navigating between routes
- [x] 7.4 Confirm dark mode tokens apply correctly when `.dark` class is on `<html>`
- [x] 7.5 Run `npm run build` and confirm no TypeScript or lint errors
