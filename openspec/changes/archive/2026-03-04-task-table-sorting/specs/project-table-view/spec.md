## MODIFIED Requirements

### Requirement: Task table displays all project tasks in rows
The system SHALL render a table listing every task in the project (across all statuses) with one row per task. The table SHALL display columns for: Title, Status, Priority, Assignee, Due Date, and Description. Each column header SHALL be clickable to sort the table by that column.

#### Scenario: Table renders all tasks
- **WHEN** the user is on the project page and selects the Table tab
- **THEN** the table shows one row per task from all status groups (todo, in-progress, done)

#### Scenario: Empty table state
- **WHEN** the project has no tasks and the user selects the Table tab
- **THEN** the table shows an empty state message (e.g., "No tasks yet")

#### Scenario: Task fields shown in columns
- **WHEN** a task has all fields populated (title, status, priority, assignee, due date, description)
- **THEN** each field is visible in its corresponding column in the task's row

#### Scenario: Optional fields are blank when missing
- **WHEN** a task has no assignee, due date, priority, or description
- **THEN** those columns show an empty/dash value without error

#### Scenario: Column headers are sortable
- **WHEN** the user clicks any column header
- **THEN** the table rows are sorted by that column and the header shows a sort direction indicator
