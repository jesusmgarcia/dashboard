## Requirements

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
- **THEN** the rows are sorted by that column and the header shows a direction indicator

### Requirement: Clicking a table row opens TaskDetailDrawer
The system SHALL open the `TaskDetailDrawer` with the selected task's data when the user clicks any row in the task table.

#### Scenario: Row click opens drawer
- **WHEN** the user clicks any row in the task table
- **THEN** the `TaskDetailDrawer` opens populated with that task's current field values

#### Scenario: Drawer close after save updates table
- **WHEN** the user edits task fields in the drawer and closes it (triggering save)
- **THEN** the corresponding row in the table reflects the updated field values without a page reload

#### Scenario: Task deleted from drawer is removed from table
- **WHEN** the user deletes a task via the drawer's delete button
- **THEN** the task's row is removed from the table immediately

### Requirement: Status and priority displayed with visual badges
The system SHALL render status and priority values as styled badges in the table, using the same color scheme as the kanban view.

#### Scenario: Status badge colors
- **WHEN** a task row is displayed
- **THEN** the status badge uses: slate for "todo", blue for "in-progress", green for "done"

#### Scenario: Priority badge colors
- **WHEN** a task row with a priority is displayed
- **THEN** the priority badge uses: red for "high", yellow for "medium", green for "low"
