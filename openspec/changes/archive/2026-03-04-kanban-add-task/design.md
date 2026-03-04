## Context

The Kanban board (`KanbanBoard.tsx`) is already a `"use client"` component that receives pre-fetched `GroupedTasks` as props. The `Task` Mongoose model and `getTasksByProject` server action exist. There is no mutation path yet — no server action for creating tasks and no UI for it.

## Goals / Non-Goals

**Goals:**
- Add an "Add task" button to the To Do and In Progress columns
- Show an inline input within the column when the button is clicked
- Persist the new task via a `createTask` server action
- Reflect the new task in the UI immediately (optimistic update)

**Non-Goals:**
- Task creation in the Done column
- Task editing or deletion
- Form validation beyond requiring a non-empty title
- Toast/error notifications (silent failure on network error is acceptable for now)

## Decisions

### 1. Optimistic UI via `useOptimistic` (vs. full page re-render)

The board uses optimistic state: after the user submits, the task appears immediately in the column before the server responds. On error, the optimistic state rolls back.

**Rationale**: `KanbanBoard` is already a client component. Using `useOptimistic` (React 19, available in this project) gives instant feedback without a loading spinner and without converting the page to a full client-side data-fetching pattern.

**Alternative considered**: Re-fetching via `router.refresh()` after server action resolves. Rejected because it causes a visible flash/delay.

### 2. Inline input form within the column (vs. a modal dialog)

Clicking "Add task" expands an inline text input at the bottom of the column, with a confirm button and an escape/cancel affordance.

**Rationale**: Inline editing is the standard Kanban UX pattern (Trello, Linear, GitHub Projects). A modal would be heavier for a single-field form.

### 3. `createTask` server action in `actions.ts` (vs. a new API route)

The new `createTask(projectId, title, status)` function lives in the existing `app/(dashboard)/projects/actions.ts` server actions file.

**Rationale**: Consistent with `createProject` and `getTasksByProject` already in that file. Server actions avoid a separate API route and work natively with React's `useTransition` / `useOptimistic`.

### 4. Session-based authorization in the server action

`createTask` verifies the session and that the project belongs to the authenticated user before inserting the task.

**Rationale**: The client passes `projectId`; without server-side ownership check, any authenticated user could craft a request to add tasks to another user's project.

## Risks / Trade-offs

- **Optimistic rollback UX** → If the server action fails, the task disappears silently. Mitigation: acceptable for now per Non-Goals; can add error toast in a future change.
- **No title length cap in UI** → Long titles won't break layout but may look awkward. Mitigation: model has `trim: true`; a `maxLength` attribute on the input is sufficient.
- **Concurrent submissions** → Two rapid submits could race. Mitigation: disable the input while the transition is pending.
