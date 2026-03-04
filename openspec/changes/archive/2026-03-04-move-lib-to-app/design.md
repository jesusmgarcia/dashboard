## Context

The project has a `lib/` directory at the repository root containing server-side utilities and shared code:
- `lib/auth/` — JWT signing/verification and session helpers
- `lib/db/` — Mongoose connection
- `lib/models/` — Mongoose models (Project, Task, User)
- `lib/theme.ts` — Theme utility
- `lib/utils.ts` — `cn()` Tailwind merge helper

This mirrors the previous state of `components/`, which was also at the root and was moved to `app/components/` in the prior change. Moving `lib/` to `app/lib/` completes the consolidation.

Approximately 20 files import from `@/lib/...` — primarily `app/` routes, server actions, and `app/components/ui/` shadcn primitives (which all import `@/lib/utils`).

## Goals / Non-Goals

**Goals:**
- Move `lib/` from the project root to `app/lib/`
- Update all `@/lib/...` import paths to `@/app/lib/...`
- Update `components.json` utils alias

**Non-Goals:**
- Reorganizing the internal structure of `lib/`
- Changing any module logic
- Updating the `@/` TypeScript path alias

## Decisions

### Update imports by global find-and-replace
All `@/lib/` occurrences in `*.ts` and `*.tsx` files are replaced with `@/app/lib/`. This is safe and mechanical — `@/` is deterministic and there are no external consumers.

**Alternative considered**: Keeping a re-export barrel at `lib/index.ts`. Rejected — adds indirection with no benefit; no external consumers exist.

### Move directory as-is (no internal restructuring)
`lib/auth/`, `lib/db/`, `lib/models/`, `lib/theme.ts`, and `lib/utils.ts` all move intact. Internal cross-references within `lib/` (e.g., `auth/session.ts` importing from `db/`) also need to be updated.

## Risks / Trade-offs

- **Missed import** → TypeScript/build error. Mitigation: run `npm run build` after the move.
- **Internal lib cross-references** → Files within `lib/` that import other `@/lib/` modules must also be updated. Mitigation: grep for `@/lib/` inside the moved files before finalizing.
- **components.json utils alias** → shadcn uses this when generating new components; must be updated to `@/app/lib/utils`.

## Migration Plan

1. Copy `lib/` to `app/lib/`
2. Replace all `@/lib/` references with `@/app/lib/` across the entire codebase (including inside moved files)
3. Update `components.json` utils alias
4. Delete the original root `lib/` directory
5. Run `npm run build` to confirm no broken imports
6. Commit

**Rollback**: Revert the commit. No infrastructure changes involved.
