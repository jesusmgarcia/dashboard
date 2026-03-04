## Context

The project detail page at `/projects/[id]` currently renders a static card showing project name, ID, and creation date. There is no task management capability. The `Project` Mongoose model exists but has no related `Task` model. The database is MongoDB, accessed via Mongoose; the app uses Next.js App Router server components and server actions.

## Goals / Non-Goals

**Goals:**
- Introduce a `Task` Mongoose model linked to a project
- Replace the static card with a three-column Kanban board (To Do, In Progress, Done)
- Load tasks from the database server-side on page render
- Keep the UI consistent with the existing shadcn/ui + Tailwind CSS v4 design system

**Non-Goals:**
- Drag-and-drop reordering of tasks (future enhancement)
- Real-time updates via WebSockets or polling
- Task creation, editing, or deletion UI in this change
- Task assignments, due dates, or labels

## Decisions

### 1. Separate `Task` model (vs. embedding tasks inside `Project`)

Tasks are stored as a separate `Task` collection with a `projectId` foreign key rather than embedded in the `Project` document.

**Rationale**: Projects can accumulate many tasks over time; embedding would cause unbounded document growth and make querying tasks across projects harder. A separate collection is more scalable and aligns with how MongoDB handles one-to-many relations in practice.

**Alternative considered**: Embedding an array of tasks in `Project.tasks`. Rejected due to document size limits and query flexibility.

### 2. Server-side data fetching in the page component (vs. client-side fetch)

Tasks are fetched in the Next.js Server Component (`page.tsx`) before render.

**Rationale**: Avoids a loading spinner on initial page load, keeps the data fetch co-located with the route, and requires no additional API route. Consistent with the existing pattern used for `Project` fetching on the same page.

### 3. Status values as a string union (`todo | in-progress | done`)

Task status is stored as a string enum in MongoDB.

**Rationale**: Simple and readable. The three statuses map directly to the Kanban columns with no ambiguity. A numeric enum would reduce readability in the database.

### 4. Kanban board as a client component (for future interactivity)

The `KanbanBoard` component is marked `"use client"` even though initial render is static, to allow future drag-and-drop or optimistic updates without a structural refactor.

**Alternative considered**: Pure server component. Rejected because adding interactivity later would require extracting a new client wrapper anyway.

## Risks / Trade-offs

- **No task CRUD in this change** → Users can see the board but cannot add tasks yet. Mitigated by designing the `Task` model to support future mutations.
- **Empty board on first visit** → Projects will show an empty Kanban until tasks are seeded or created. Mitigated by showing an empty-state message per column.
- **No pagination** → Large numbers of tasks are all loaded at once. Acceptable for now given the scope.

## Migration Plan

1. Deploy the new `Task` model (additive schema change, no data migration needed)
2. Deploy updated `page.tsx` — existing projects will show an empty board
3. No rollback complexity: reverting removes the Kanban UI but leaves the `Task` collection intact
