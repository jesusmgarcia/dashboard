## 1. Sort State & Types

- [x] 1.1 Add a `SortKey` type to `TaskTable.tsx` covering all six sortable columns: `'title' | 'status' | 'priority' | 'assignee' | 'dueDate' | 'description'`
- [x] 1.2 Add `sortKey: SortKey | null` and `sortDir: 'asc' | 'desc'` state variables inside `TaskTable`

## 2. Sort Logic

- [x] 2.1 Add rank maps for enum fields: `STATUS_RANK` (`todo: 0, in-progress: 1, done: 2`) and `PRIORITY_RANK` (`high: 0, medium: 1, low: 2`)
- [x] 2.2 Implement a `compareTasks(a, b, key, dir)` function that:
  - Returns `0` if both values are null/undefined (both stay in place)
  - Returns `1` if `a`'s value is null/undefined (nulls sort last, regardless of direction)
  - Returns `-1` if `b`'s value is null/undefined
  - Uses rank maps for `status` and `priority`
  - Parses ISO strings to `Date` for `dueDate`
  - Uses `localeCompare` for string fields (`title`, `assignee`, `description`)
  - Negates the result when `dir === 'desc'`
- [x] 2.3 Wrap the sorted array derivation in `useMemo`, depending on `[tasks, sortKey, sortDir]`, so the sort only recomputes when inputs change

## 3. Click Handler & Cycle Logic

- [x] 3.1 Implement `handleHeaderClick(key: SortKey)`:
  - If `key !== sortKey`: set `sortKey = key`, `sortDir = 'asc'`
  - If `key === sortKey && sortDir === 'asc'`: set `sortDir = 'desc'`
  - If `key === sortKey && sortDir === 'desc'`: set `sortKey = null` (reset)

## 4. Column Header UI

- [x] 4.1 Import `ArrowUpDown`, `ArrowUp`, `ArrowDown` from `lucide-react`
- [x] 4.2 Create a `SortIcon` helper (inline component or function) that returns `ArrowUp` when active+asc, `ArrowDown` when active+desc, and `ArrowUpDown` otherwise
- [x] 4.3 Replace each plain `<th>` text with a `<button>` (or make the `<th>` itself a flex container) that calls `handleHeaderClick(key)` and renders the label + `SortIcon`
- [x] 4.4 Apply a visual cue to the active sort column header (e.g., `text-foreground` instead of `text-muted-foreground`) so the active column is easy to identify
- [x] 4.5 Add `cursor-pointer select-none` to sortable `<th>` elements so the pointer and text-selection behavior feel correct
