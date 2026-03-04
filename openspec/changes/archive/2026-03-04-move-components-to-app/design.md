## Context

The project currently has a `components/` directory at the repository root containing shared UI components (`ui/`, `dashboard/`, `ThemeToggle.tsx`). The Next.js App Router convention encourages co-locating application code inside `app/`. Moving `components/` to `app/components/` makes the structure more idiomatic and easier to navigate.

This is a purely structural refactor — no runtime behavior, API surface, or component logic changes.

## Goals / Non-Goals

**Goals:**
- Move `components/` from the project root to `app/components/`
- Update all import paths from `@/components/...` to `@/app/components/...`
- Delete the old root-level `components/` directory

**Non-Goals:**
- Changing any component logic or styling
- Reorganizing the internal structure of `components/`
- Updating the `@/` TypeScript path alias (it stays mapped to the project root)

## Decisions

### Update imports by search-and-replace
All imports using `@/components/` will be updated to `@/app/components/`. This is safe because `@/` resolves to the project root, so both paths are deterministic. A global find-and-replace across `*.ts`, `*.tsx`, `*.css`, and `*.json` files is sufficient.

**Alternative considered**: Keeping a re-export barrel at `components/index.ts` for backwards compatibility. Rejected — there are no external consumers and re-exports add indirection for no benefit.

### Move directory as-is (no internal reorganization)
The internal structure of `components/` (`ui/`, `dashboard/`, `ThemeToggle.tsx`) stays intact. Only the parent folder location changes.

**Alternative considered**: Reorganizing subfolders while moving. Rejected — out of scope; increases diff noise and risk.

## Risks / Trade-offs

- **Missed import** → Any file not updated will produce a TypeScript/build error. Mitigation: run `npm run build` after the move to catch any missed references.
- **IDE caches** → Some editors may cache the old path. Mitigation: reload the project after the move.

## Migration Plan

1. Copy `components/` to `app/components/`
2. Find all occurrences of `@/components/` across the codebase and replace with `@/app/components/`
3. Delete the original root `components/` directory
4. Run `npm run build` (or `npm run lint`) to confirm no broken imports
5. Commit the change

**Rollback**: Revert the commit. No database or infrastructure changes involved.
