## ADDED Requirements

### Requirement: Column headers are clickable sort triggers
The task table SHALL support sorting by clicking any column header. Clicking a header SHALL cycle through three states: ascending → descending → unsorted (original order). Only one column SHALL be active as the sort key at a time.

#### Scenario: First click on a header sorts ascending
- **WHEN** the user clicks a column header that is not currently sorted
- **THEN** the table rows are sorted by that column in ascending order and the header shows an up-arrow indicator

#### Scenario: Second click reverses to descending
- **WHEN** the user clicks the currently active ascending sort column header
- **THEN** the table rows are sorted by that column in descending order and the header shows a down-arrow indicator

#### Scenario: Third click resets to original order
- **WHEN** the user clicks the currently active descending sort column header
- **THEN** the sort is cleared, rows return to their original order, and the header shows the neutral double-arrow indicator

#### Scenario: Clicking a different header changes the sort key
- **WHEN** the user clicks a column header that is different from the current sort column
- **THEN** the new column becomes the active sort key in ascending order and the previous column header returns to the neutral indicator

### Requirement: Sort indicators are shown in column headers
Every sortable column header SHALL display a sort direction indicator. The inactive state SHALL show a neutral double-arrow icon. The active ascending state SHALL show an up-arrow. The active descending state SHALL show a down-arrow.

#### Scenario: Neutral indicator on unsorted columns
- **WHEN** no sort is active or a column is not the active sort key
- **THEN** that column header displays the neutral double-arrow (⇅) icon

#### Scenario: Up-arrow on ascending sort
- **WHEN** a column is the active sort key and direction is ascending
- **THEN** that column header displays an up-arrow (↑) icon

#### Scenario: Down-arrow on descending sort
- **WHEN** a column is the active sort key and direction is descending
- **THEN** that column header displays a down-arrow (↓) icon

### Requirement: Enum columns sort by logical rank, not alphabetically
Status SHALL sort in workflow order (todo → in-progress → done). Priority SHALL sort by severity (high → medium → low).

#### Scenario: Status ascending sorts todo first
- **WHEN** the user sorts the Status column ascending
- **THEN** "todo" rows appear before "in-progress" rows, which appear before "done" rows

#### Scenario: Priority ascending sorts high first
- **WHEN** the user sorts the Priority column ascending
- **THEN** "high" priority rows appear before "medium", which appear before "low"

### Requirement: Empty/null values sort last regardless of direction
Optional fields (Priority, Assignee, Due Date, Description) with no value SHALL appear at the bottom of the list whether sorting ascending or descending.

#### Scenario: Tasks without priority sort last
- **WHEN** the user sorts by Priority in either direction
- **THEN** tasks with no priority value appear at the bottom of the sorted list
