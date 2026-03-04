## Context

`TaskTable` is a stateless client component that receives a flat `tasks: TaskItem[]` array and renders a `<table>`. All sorting will live entirely inside this component — no state lifting required. The six sortable fields are: `title` (string), `status` (enum), `priority` (optional enum), `assignee` (optional string), `dueDate` (optional ISO date string), `description` (optional string).

## Goals / Non-Goals

**Goals:**
- Click a column header to sort ascending by that column
- Click the same header again to sort descending
- Click a third time to reset to the original (unsorted) order
- Visual arrow indicator on the active sort column (↑ ascending, ↓ descending, ⇅ inactive)
- All six columns are sortable

**Non-Goals:**
- Multi-column sorting (single active sort key only)
- Persisting sort state in URL params or localStorage
- Server-side sorting
- Filtering or search

## Decisions

### 1. Sort state lives in `TaskTable` component

**Decision:** Add `sortKey: SortKey | null` and `sortDir: 'asc' | 'desc'` state to `TaskTable`. Derive the displayed rows by sorting a copy of the `tasks` prop before rendering.

**Rationale:** The sort is purely visual; no parent component needs to know about it. Keeping it local avoids prop-threading through `ProjectTabs`. Alternatives: URL params (overkill for ephemeral UI), lifting to `ProjectTabs` (unnecessary coupling).

### 2. Three-click cycle: asc → desc → reset

**Decision:** Clicking a new column sets it as the sort key with `asc` direction. Clicking the same column while `asc` switches to `desc`. Clicking while `desc` resets `sortKey` to `null` (original order).

**Rationale:** Matches common table UX (GitHub, Linear, Notion). Allows users to return to insertion order without reloading.

### 3. Enum fields sorted by logical rank, not alphabetically

**Decision:** Status sorted in workflow order (`todo → in-progress → done`), Priority sorted by severity (`high → medium → low`). Both use a rank map for comparison.

**Rationale:** Alphabetical sort for "in-progress" would place it between "done" and "todo" which is unintuitive. Rank-based sort matches how users think about these fields.

### 4. Null/empty values always sort last

**Decision:** Optional fields (`priority`, `assignee`, `dueDate`, `description`) with no value sort to the bottom regardless of sort direction.

**Rationale:** Prevents empty rows from dominating either end of the list. Standard behavior in most productivity tools.

### 5. Sort indicator via Lucide icons

**Decision:** Use `ArrowUpDown` for unsorted columns, `ArrowUp` for ascending, `ArrowDown` for descending. Icons are placed inline in the `<th>` after the label text.

**Rationale:** `lucide-react` is already a project dependency. No new packages needed.

## Risks / Trade-offs

- **Sorting large task lists on every render** → Mitigation: `useMemo` on the sorted array to avoid recomputing when unrelated state changes (e.g., hover).
- **`dueDate` is an ISO string, not a `Date`** → Mitigation: Parse to `Date` only for comparison inside the sort comparator; no mutation of task data.
