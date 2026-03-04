## Context

`TaskCard` in `KanbanBoard.tsx` already receives a `TaskItem` which includes the optional `priority` field (`"high" | "medium" | "low" | undefined`) added in the previous `kanban-task-detail-drawer` change. The card renders a shadcn `Card` component. Adding a background color is a pure presentational change — no data model or server changes needed.

## Goals / Non-Goals

**Goals:**
- Apply a colored background tint to `TaskCard` based on `task.priority`
- Support dark mode with appropriate dark variants
- Cards with no priority set remain unchanged

**Non-Goals:**
- Changing the priority badge or any other UI element
- Adding a priority indicator icon or label to the card
- Changing the drag-and-drop behavior

## Decisions

### Apply color via `className` on the `Card` component
The shadcn `Card` accepts `className`. A lookup map from priority to Tailwind class keeps the logic minimal and colocated.

```ts
const PRIORITY_BG: Record<string, string> = {
  high:   "bg-red-50    dark:bg-red-950/30",
  medium: "bg-yellow-50 dark:bg-yellow-950/30",
  low:    "bg-green-50  dark:bg-green-950/30",
};
```

No priority → no extra class → default `Card` background.

**Alternative considered**: Using a left border accent instead of background. Rejected — the user's request specifically asks for background color.

## Risks / Trade-offs

- **Tailwind purge** → All color classes must appear as complete strings (not dynamically assembled) so Tailwind includes them in the build. Using the lookup map with full class strings ensures this.
- **Subtle vs obvious** → Using `bg-*-50 / dark:bg-*-950/30` keeps the tint subtle enough not to clash with text or drag states.
