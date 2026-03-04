## Why

The `components/` folder lives at the project root, outside the `app/` directory, which doesn't align with Next.js App Router conventions. Moving it to `app/components/` co-locates shared UI components with the application code, improving discoverability and making the project structure more idiomatic.

## What Changes

- Move `components/` directory from the project root to `app/components/`
- Update all import paths across the codebase from `@/components/...` to `@/app/components/...`
- Remove the old `components/` directory at the root

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `dashboard-layout`: Import paths for layout components change location
- `kanban-drag-drop`: Import paths for kanban UI components change
- `kanban-task-creation`: Import paths update
- `project-kanban-board`: Import paths update
- `project-page`: Import paths update
- `sidebar-projects`: Import paths update
- `theme-persistence`: Import paths for ThemeToggle update
- `user-auth`: Import paths for auth-related UI components update
- `user-profile-menu`: Import paths update
- `user-settings`: Import paths update

## Impact

- All files importing from `@/components/...` will need updated import paths
- No behavior changes — this is a pure structural refactor
- `tsconfig.json` path alias `@/` remains unchanged (still maps to project root)
- No new dependencies required
