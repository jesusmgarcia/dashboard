## 1. Task Model

- [x] 1.1 Create `lib/models/Task.ts` with `title`, `status` (enum: `todo | in-progress | done`, default `todo`), `projectId` (ObjectId ref to Project), and timestamps
- [x] 1.2 Export the `ITask` interface and `Task` model using the same singleton pattern as `Project.ts`

## 2. Data Fetching

- [x] 2.1 Add a `getTasksByProject(projectId: string)` server action in `app/(dashboard)/projects/actions.ts` that queries tasks by `projectId` and returns them as plain objects grouped by status
- [x] 2.2 Ensure the action is only callable server-side (no `"use client"` in actions file)

## 3. Kanban Board Component

- [x] 3.1 Create `app/(dashboard)/projects/[id]/KanbanBoard.tsx` as a client component (`"use client"`)
- [x] 3.2 Define the three column configs (To Do / `todo`, In Progress / `in-progress`, Done / `done`) inside the component
- [x] 3.3 Render each column with its task cards and an empty-state message ("No tasks") when the column has no tasks
- [x] 3.4 Style columns and cards using Tailwind CSS v4 utility classes consistent with the existing design system (shadcn/ui `Card` for task cards)

## 4. Project Detail Page

- [x] 4.1 Update `app/(dashboard)/projects/[id]/page.tsx` to call `getTasksByProject` and pass grouped tasks as props to `KanbanBoard`
- [x] 4.2 Remove the static "Project Details" card and replace it with the `KanbanBoard` component
- [x] 4.3 Keep the project name + creation date header section above the board
