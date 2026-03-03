## Why

The dashboard already supports dark mode toggling via a CSS class on the HTML element, but the user's preference is lost on every page refresh or new session. This creates a jarring experience where users must re-toggle dark mode each visit.

## What Changes

- Add a `theme-preference` cookie (or localStorage) to persist the user's light/dark preference across sessions.
- Apply the saved preference on the server (or before first paint) to eliminate flash of wrong theme (FOUT).
- Expose a theme toggle component that reads and writes the persisted preference.

## Capabilities

### New Capabilities

- `theme-persistence`: Stores the user's dark/light mode preference between sessions and applies it on load without a visible flash.

### Modified Capabilities

<!-- No existing spec-level behavior changes. -->

## Impact

- **New files**: Theme toggle component, a server action or cookie utility for reading/writing theme.
- **Modified files**: `app/layout.tsx` — must read the cookie and apply the `dark` class before render.
- **Dependencies**: No new npm packages required (native cookies via `next/headers` or `js-cookie` pattern).
- **No breaking changes**.
