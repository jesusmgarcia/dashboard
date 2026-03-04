## 1. Move Directory

- [x] 1.1 Move `components/ui/` to `app/components/ui/`
- [x] 1.2 Move `components/dashboard/` to `app/components/dashboard/`
- [x] 1.3 Move `components/ThemeToggle.tsx` to `app/components/ThemeToggle.tsx`
- [x] 1.4 Delete the now-empty root `components/` directory

## 2. Update Import Paths

- [x] 2.1 Update `app/(dashboard)/layout.tsx` — replace `@/components/` with `@/app/components/`
- [x] 2.2 Update `app/(dashboard)/projects/[id]/KanbanBoard.tsx` — replace `@/components/` with `@/app/components/`
- [x] 2.3 Update `app/(dashboard)/settings/ProfileAvatar.tsx` — replace `@/components/` with `@/app/components/`
- [x] 2.4 Update `app/(dashboard)/settings/ProfileForm.tsx` — replace `@/components/` with `@/app/components/`
- [x] 2.5 Update `app/page.tsx` — replace `@/components/` with `@/app/components/`
- [x] 2.6 Update any imports inside moved files (`components/dashboard/Header.tsx`, `MobileSidebar.tsx`, `ThemeToggle.tsx`) that reference `@/components/`

## 3. Update Configuration

- [x] 3.1 Update `components.json` aliases: change `"components": "@/components"` and `"ui": "@/components/ui"` to point to `@/app/components` and `@/app/components/ui`

## 4. Verify

- [x] 4.1 Run `npm run build` and confirm no TypeScript or import errors
- [x] 4.2 Confirm no `@/components/` references remain (except in openspec docs)
