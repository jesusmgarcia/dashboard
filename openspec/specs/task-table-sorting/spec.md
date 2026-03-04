## Requirements

### Requirement: Column headers are clickable sort triggers
The system SHALL allow users to click any column header in the task table to sort the rows by that column. The first click SHALL sort ascending, the second click on the same header SHALL sort descending, and the third click SHALL reset to the default (unsorted) order. Clicking a different header SHALL sort by that column ascending and reset any previous sort.

#### Scenario: First click on a column header sorts ascending
- **WHEN** the user clicks a column header that is not currently sorted
- **THEN** the table rows are sorted by that column in ascending order

#### Scenario: Second click on the same column header sorts descending
- **WHEN** the user clicks a column header that is already sorted ascending
- **THEN** the table rows are sorted by that column in descending order

#### Scenario: Third click on the same column header resets sort
- **WHEN** the user clicks a column header that is already sorted descending
- **THEN** the table returns to its default unsorted order

#### Scenario: Clicking a different column header resets and sorts ascending
- **WHEN** the user clicks a column header while another column is already sorted
- **THEN** the previous sort is cleared and the table rows are sorted by the newly clicked column in ascending order

### Requirement: Sort indicators are shown in column headers
The system SHALL display a visual icon in each column header reflecting the current sort state: a neutral icon when unsorted, an up-arrow icon when sorted ascending, and a down-arrow icon when sorted descending.

#### Scenario: Unsorted column shows neutral icon
- **WHEN** a column is not the active sort column
- **THEN** its header displays a neutral (no direction) sort indicator icon

#### Scenario: Ascending sort shows up-arrow icon
- **WHEN** a column is sorted ascending
- **THEN** its header displays an up-arrow sort indicator icon

#### Scenario: Descending sort shows down-arrow icon
- **WHEN** a column is sorted descending
- **THEN** its header displays a down-arrow sort indicator icon

### Requirement: Enum columns sort by logical rank, not alphabetically
The system SHALL sort status and priority columns by their logical rank rather than alphabetical order. For status ascending the order SHALL be: todo, in-progress, done. For priority ascending the order SHALL be: high, medium, low.

#### Scenario: Status ascending puts todo first
- **WHEN** the user sorts the Status column ascending
- **THEN** rows with status "todo" appear before "in-progress", which appear before "done"

#### Scenario: Priority ascending puts high first
- **WHEN** the user sorts the Priority column ascending
- **THEN** rows with priority "high" appear before "medium", which appear before "low"

### Requirement: Empty/null values sort last regardless of direction
The system SHALL place tasks with empty or null values in the sorted column at the end of the list regardless of whether the sort direction is ascending or descending.

#### Scenario: Tasks without priority sort last
- **WHEN** the user sorts the Priority column in either direction and some tasks have no priority set
- **THEN** tasks without a priority value appear after all tasks that have a priority value
