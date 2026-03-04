### Requirement: Task card click opens detail drawer
The system SHALL open a right-side drawer when a user clicks a task card on the Kanban board, without interfering with drag-and-drop.

#### Scenario: Clicking a task card opens the drawer
- **WHEN** a user clicks (without dragging) a task card
- **THEN** the system SHALL open a right-side drawer displaying that task's details

#### Scenario: Dragging a task card does not open the drawer
- **WHEN** a user drags a task card to another column
- **THEN** the drawer SHALL NOT open

### Requirement: Drawer header shows task status and close button
The drawer SHALL display the task's current status as a badge at the top, alongside a button to close the drawer.

#### Scenario: Drawer header renders status badge
- **WHEN** the task detail drawer is open
- **THEN** the header SHALL display a badge showing the task's current status (e.g. "To Do", "In Progress", "Done")

#### Scenario: Close button dismisses the drawer
- **WHEN** a user clicks the close button in the drawer header
- **THEN** the drawer SHALL close and trigger a save of any pending edits

### Requirement: Drawer body contains editable task fields
The drawer SHALL render editable fields for task name, assignee, due date, priority, and description.

#### Scenario: Task name is editable
- **WHEN** the drawer is open
- **THEN** the task name SHALL be displayed in an editable text input pre-filled with the current title

#### Scenario: Assignee field is editable
- **WHEN** the drawer is open
- **THEN** an assignee text input SHALL be displayed, pre-filled with the current assignee if set

#### Scenario: Due date is editable
- **WHEN** the drawer is open
- **THEN** a due date input SHALL be displayed, pre-filled with the current due date if set

#### Scenario: Priority badge is selectable
- **WHEN** the drawer is open
- **THEN** the priority SHALL be displayed as a colored badge and the user SHALL be able to select High (red), Medium (yellow), or Low (green)

#### Scenario: Description is editable
- **WHEN** the drawer is open
- **THEN** a description textarea SHALL be displayed, pre-filled with the current description if set

### Requirement: Closing the drawer saves changes to database and updates frontend
The system SHALL persist all editable field changes when the drawer is closed, and reflect the updated task in the Kanban board.

#### Scenario: Successful save updates the board
- **WHEN** the user closes the drawer after editing one or more fields
- **THEN** the system SHALL call updateTask with the new values, and the task card SHALL reflect the updated title in its column

#### Scenario: Failed save keeps drawer open with error feedback
- **WHEN** updateTask returns null (error or unauthorized)
- **THEN** the drawer SHALL remain open and SHALL display an error message

### Requirement: updateTask server action persists task edits
The system SHALL provide an `updateTask(taskId, patch)` server action that updates a Task document's editable fields, verifying session and project ownership.

#### Scenario: Authenticated owner updates task fields
- **WHEN** an authenticated user calls updateTask with a taskId belonging to their project and valid field values
- **THEN** the system SHALL update the Task document and return the updated TaskItem

#### Scenario: Unauthenticated request is rejected
- **WHEN** an unauthenticated call is made to updateTask
- **THEN** the system SHALL return null without modifying any document

#### Scenario: Task belonging to another user's project is rejected
- **WHEN** an authenticated user calls updateTask with a taskId whose project belongs to a different user
- **THEN** the system SHALL return null without modifying any document

### Requirement: Task card background reflects priority
Task cards on the Kanban board SHALL display a background color tint that corresponds to the task's priority: red for high, yellow for medium, green for low. Cards with no priority set SHALL use the default card background.

#### Scenario: High priority card has red background
- **WHEN** a task card has priority set to "high"
- **THEN** the card SHALL display a red background tint

#### Scenario: Medium priority card has yellow background
- **WHEN** a task card has priority set to "medium"
- **THEN** the card SHALL display a yellow background tint

#### Scenario: Low priority card has green background
- **WHEN** a task card has priority set to "low"
- **THEN** the card SHALL display a green background tint

#### Scenario: Unprioritized card has default background
- **WHEN** a task card has no priority set
- **THEN** the card SHALL display the default card background with no color tint
