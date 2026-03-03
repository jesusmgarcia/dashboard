## Context

The dashboard uses Tailwind CSS v4 with class-based dark mode: the `.dark` class on the `<html>` element activates dark styles. Currently, a client component toggles this class in memory, but the preference is never stored, so it resets on every page load. The goal is to persist the preference and apply it server-side before the first paint to avoid a flash of the wrong theme.

## Goals / Non-Goals

**Goals:**
- Persist the user's theme preference (dark/light) across sessions using an HTTP cookie.
- Apply the correct theme class on the server so there is no flash of unstyled/wrong-theme content (FOUC).
- Provide a toggle UI component that reads and updates the preference.

**Non-Goals:**
- System-level `prefers-color-scheme` auto-detection (can be added later).
- Per-page or per-component theme overrides.
- Syncing preference to a database / user profile (cookie-only for now).

## Decisions

### 1. Cookie over localStorage

**Decision**: Use an HTTP cookie (`theme`) to store the preference.

**Rationale**: Next.js Server Components can read cookies via `next/headers` before rendering, enabling server-side class injection into `<html>`. `localStorage` is only accessible client-side, which would require a `useEffect` that runs after hydration — causing a flash.

**Alternatives considered**:
- `localStorage` + `useEffect`: Simple but causes FOUC on every hard refresh.
- Database column on the user profile: Overkill for a UI preference; requires auth check on every load.

### 2. Cookie set from a Server Action

**Decision**: A dedicated Server Action (`setThemeCookie`) writes the `theme` cookie when the user toggles.

**Rationale**: Keeps cookie logic server-side (no `document.cookie` manipulation), works with Next.js App Router idioms, and avoids a separate API route just for theme toggling.

### 3. Apply class in `app/layout.tsx`

**Decision**: Read the cookie in the root layout (Server Component) and inject the class directly on the `<html>` element: `<html className={theme === 'dark' ? 'dark' : ''}>`.

**Rationale**: This is the earliest point in the render tree where the class can be set, guaranteeing correct styles before any child component renders.

### 4. Toggle component stays a Client Component

**Decision**: The `ThemeToggle` button is a `"use client"` component that calls the Server Action and updates the DOM class optimistically.

**Rationale**: Button clicks require client-side event handlers. Optimistic DOM update (toggling the class immediately) prevents a round-trip lag. The server action persists the new value for future sessions.

## Risks / Trade-offs

- **Cookie size**: Minimal (e.g., `theme=dark`). Not a concern.
- **Optimistic mismatch**: If the server action fails, the DOM class and cookie could diverge. Mitigation: on action error, revert the optimistic DOM change.
- **SSR hydration**: The `<html className>` set server-side must match what React hydrates. Since we're setting a static string from the cookie, this is deterministic and safe.
- **Cookie expiry**: Set to 1 year by default. Users clearing cookies will lose the preference — acceptable trade-off for a UI-only setting.
