## Why

The project detail page currently shows a static card with name, ID, and creation date — providing no actionable workspace. Replacing it with a Kanban board lets users manage tasks within a project directly from the dashboard.

## What Changes

- Replace the static "Project Details" card on `/projects/[id]` with a Kanban board UI
- Add a `Task` MongoDB model with fields: `title`, `status` (`todo` | `in-progress` | `done`), `projectId`, and `createdAt`
- Add a server action to fetch tasks for a project, grouped by status column
- Kanban board renders three columns: **To Do**, **In Progress**, **Done**
- Each column lists its task cards loaded from the database

## Capabilities

### New Capabilities

- `project-kanban-board`: Kanban board on the project detail page with columns (To Do, In Progress, Done) populated from the database tasks for that project

### Modified Capabilities

- `project-page`: The project detail page requirement changes — it now renders a Kanban board instead of a static details card

## Impact

- `lib/models/Task.ts` — new Mongoose model
- `app/(dashboard)/projects/[id]/page.tsx` — replace card with Kanban board component
- `app/(dashboard)/projects/actions.ts` — new server action to fetch tasks by project
- No new external dependencies required (MongoDB already in use)
