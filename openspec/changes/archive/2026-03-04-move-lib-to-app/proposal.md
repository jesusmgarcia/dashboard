## Why

The `lib/` directory sits at the project root, alongside `app/`, creating a split between application code and its supporting utilities. Moving `lib/` into `app/lib/` consolidates all application code under `app/`, making the project structure more idiomatic for a Next.js App Router project and consistent with the recent move of `components/` to `app/components/`.

## What Changes

- Move `lib/` directory from the project root to `app/lib/`
- Update all import paths across the codebase from `@/lib/...` to `@/app/lib/...`
- Update `components.json` alias `"utils": "@/lib/utils"` → `"utils": "@/app/lib/utils"`
- Remove the old `lib/` directory at the root

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
<!-- This is a pure structural refactor — no spec-level behavior changes -->

## Impact

- All files importing from `@/lib/...` will need updated import paths (~20 files across `app/` and `app/components/ui/`)
- `components.json` utils alias requires updating
- No behavior, API, or dependency changes
- `tsconfig.json` path alias `@/` remains unchanged (still maps to project root)
