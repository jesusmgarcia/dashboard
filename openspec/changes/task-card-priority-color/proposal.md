## Why

Task cards on the Kanban board currently look identical regardless of priority, making it impossible to visually distinguish urgent from low-priority work at a glance. Adding a subtle background color tint to each card based on its priority (red for high, yellow for medium, green for low) gives users an instant visual signal without requiring them to open the detail drawer.

## What Changes

- `TaskCard` in `KanbanBoard.tsx` reads the task's `priority` field (already available on `TaskItem`) and applies a background color class to the card
- High priority → red tint (`bg-red-50 dark:bg-red-950/30`)
- Medium priority → yellow tint (`bg-yellow-50 dark:bg-yellow-950/30`)
- Low priority → green tint (`bg-green-50 dark:bg-green-950/30`)
- No priority set → default card background (no tint)

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `task-detail-drawer`: The visual presentation of task cards changes to reflect priority via background color

## Impact

- `app/(dashboard)/projects/[id]/KanbanBoard.tsx` — `TaskCard` component only; no logic changes
- No server-side changes, no new dependencies
