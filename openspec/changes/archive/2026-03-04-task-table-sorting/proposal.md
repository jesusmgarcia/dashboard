## Why

The task table lists all project tasks but provides no way to reorder them, making it hard to find tasks when a project grows. Clicking column headers to sort is the standard table UX pattern and immediately unlocks quick scanning by any field.

## What Changes

- Each column header in the task table (Title, Status, Priority, Assignee, Due Date, Description) becomes a clickable sort trigger
- Clicking a header sorts the table by that column ascending; clicking again reverses to descending; a third click resets to unsorted (original order)
- The active sort column and direction are indicated by an arrow icon in the header
- Sorting is client-side only — no server round-trips or URL changes
- All six sortable columns use appropriate comparison logic (string, enum-rank, date)

## Capabilities

### New Capabilities

- `task-table-sorting`: Column-header-driven client-side sorting for the task table, with visual sort indicators and cycle-through sort direction logic

### Modified Capabilities

- `project-table-view`: The table view requirement for column display now includes sortable column headers with direction indicators

## Impact

- **Modified file**: `app/(dashboard)/projects/[id]/TaskTable.tsx` — adds sort state, click handlers on `<th>` elements, sort logic, and arrow indicators
- **No new dependencies** — uses existing Lucide icons (`ArrowUpDown`, `ArrowUp`, `ArrowDown`) already available via `lucide-react`
- **No API or schema changes** — purely client-side UI
