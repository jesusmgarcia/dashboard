## 1. Update TaskCard in KanbanBoard

- [x] 1.1 Remove the `PRIORITY_BG` constant and its usage from the `TaskCard` component in `app/(dashboard)/projects/[id]/KanbanBoard.tsx`
- [x] 1.2 Change the card body to a flex row (`flex items-center justify-between`) with the title on the left (`truncate`) and a right-aligned priority badge on the right
- [x] 1.3 Define an inline `PRIORITY_BADGE` map for the three priority levels (high → red, medium → yellow, low → green) and render the badge only when `task.priority` is set
