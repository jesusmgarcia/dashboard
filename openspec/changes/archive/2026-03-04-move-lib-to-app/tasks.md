## 1. Move Directory

- [x] 1.1 Copy `lib/` to `app/lib/`
- [x] 1.2 Delete the original root `lib/` directory

## 2. Update Imports — App Routes & Actions

- [x] 2.1 Update `app/layout.tsx` — replace `@/lib/` with `@/app/lib/`
- [x] 2.2 Update `app/api/auth/login/route.ts` — replace `@/lib/` with `@/app/lib/`
- [x] 2.3 Update `app/api/auth/register/route.ts` — replace `@/lib/` with `@/app/lib/`
- [x] 2.4 Update `app/(dashboard)/projects/actions.ts` — replace `@/lib/` with `@/app/lib/`
- [x] 2.5 Update `app/(dashboard)/projects/[id]/page.tsx` — replace `@/lib/` with `@/app/lib/`
- [x] 2.6 Update `app/(dashboard)/projects/[id]/AddTaskForm.tsx` — replace `@/lib/` with `@/app/lib/`
- [x] 2.7 Update `app/(dashboard)/projects/[id]/KanbanBoard.tsx` — replace `@/lib/` with `@/app/lib/`
- [x] 2.8 Update `app/(dashboard)/settings/actions.ts` — replace `@/lib/` with `@/app/lib/`
- [x] 2.9 Update `app/(dashboard)/settings/page.tsx` — replace `@/lib/` with `@/app/lib/`

## 3. Update Imports — Components

- [x] 3.1 Update `app/components/dashboard/DashboardLayout.tsx` — replace `@/lib/` with `@/app/lib/`
- [x] 3.2 Update `app/components/dashboard/NavLink.tsx` — replace `@/lib/` with `@/app/lib/`
- [x] 3.3 Update `app/components/dashboard/SidebarProjects.tsx` — replace `@/lib/` with `@/app/lib/`
- [x] 3.4 Update all `app/components/ui/*.tsx` files — replace `@/lib/utils` with `@/app/lib/utils` (avatar, button, card, dropdown-menu, input, label, sheet, tabs)

## 4. Update Configuration

- [x] 4.1 Update `components.json` alias: change `"utils": "@/lib/utils"` to `"utils": "@/app/lib/utils"`

## 5. Verify

- [x] 5.1 Confirm no `@/lib/` references remain in `*.ts`/`*.tsx` files (except openspec docs)
- [x] 5.2 Run `npm run build` and confirm no TypeScript or import errors
