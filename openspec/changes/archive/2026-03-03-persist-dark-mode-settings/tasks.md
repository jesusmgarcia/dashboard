## 1. Cookie Utility

- [x] 1.1 Create `lib/theme.ts` with `getThemeCookie()` helper that reads the `theme` cookie via `next/headers` and returns `'dark' | 'light'` (defaulting to `'light'`)
- [x] 1.2 Create a Server Action `app/actions/setTheme.ts` that writes the `theme` cookie with a 1-year expiry using `cookies().set()`

## 2. Server-Side Theme Application

- [x] 2.1 Update `app/layout.tsx` to import `getThemeCookie()` and pass the result as the `className` prop on the `<html>` element (e.g., `className={theme === 'dark' ? 'dark' : ''}`)

## 3. Theme Toggle Component

- [x] 3.1 Create `app/components/ThemeToggle.tsx` as a `"use client"` component with a button that shows the current mode (sun/moon icon)
- [x] 3.2 Implement optimistic DOM update in `ThemeToggle`: toggle the `dark` class on `document.documentElement` immediately on click
- [x] 3.3 Call the `setTheme` Server Action from `ThemeToggle` after the optimistic update; revert the DOM class if the action throws
- [x] 3.4 Initialize toggle state from the `<html>` element's current `dark` class on mount (to sync with server-rendered value)

## 4. UI Integration

- [x] 4.1 Add `<ThemeToggle />` to the dashboard header/navbar so it is accessible from all pages

## 5. Verification

- [x] 5.1 Verify that loading the dashboard with `theme=dark` cookie applies the dark class without a visible flash
- [x] 5.2 Verify that toggling updates the cookie and survives a page refresh
- [x] 5.3 Verify that a new session (no cookie) defaults to light mode
