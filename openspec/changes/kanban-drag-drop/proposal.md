## Why

Tasks can be created but their status can only change by directly editing the database. Drag-and-drop between columns is the standard Kanban interaction — it lets users move tasks to To Do, In Progress, or Done with a single gesture and immediately reflects that change in the database.

## What Changes

- Task cards in all three columns become draggable
- Each column accepts drops from any other column
- Dropping a card on a different column updates its `status` both in local state (instant) and in the database (via server action)
- A visual drop indicator highlights the target column while dragging
- Uses `@dnd-kit/core` library (React 19-compatible, accessible)

## Capabilities

### New Capabilities

- `kanban-drag-drop`: Drag-and-drop interaction for Kanban task cards — move between columns, persist status change to database

### Modified Capabilities

- `project-kanban-board`: The board requirement changes — task cards are now draggable and column drop targets are defined

## Impact

- `app/(dashboard)/projects/[id]/KanbanBoard.tsx` — wrap board with DnD context, make cards draggable, columns droppable
- `app/(dashboard)/projects/actions.ts` — new `updateTaskStatus(taskId, status)` server action
- New dependency: `@dnd-kit/core` + `@dnd-kit/utilities`
