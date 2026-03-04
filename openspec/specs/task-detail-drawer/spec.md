### Requirement: Task card click opens detail drawer
The system SHALL open a right-side drawer when a user clicks a task card on the Kanban board, without interfering with drag-and-drop.

#### Scenario: Clicking a task card opens the drawer
- **WHEN** a user clicks (without dragging) a task card
- **THEN** the system SHALL open a right-side drawer displaying that task's details

#### Scenario: Dragging a task card does not open the drawer
- **WHEN** a user drags a task card to another column
- **THEN** the drawer SHALL NOT open

### Requirement: Drawer header shows task status and close button
The drawer SHALL display the task's current status as a badge at the top, alongside a delete button and a close button.

#### Scenario: Drawer header renders status badge
- **WHEN** the task detail drawer is open
- **THEN** the header SHALL display a badge showing the task's current status (e.g. "To Do", "In Progress", "Done")

#### Scenario: Delete button is visible in the header
- **WHEN** the task detail drawer is open
- **THEN** the header SHALL display a delete (trash) icon button to the left of the close button

#### Scenario: Close button dismisses the drawer
- **WHEN** a user clicks the close button in the drawer header
- **THEN** the drawer SHALL close and trigger a save of any pending edits

#### Scenario: Delete button removes the task
- **WHEN** a user clicks the delete button
- **THEN** the system SHALL call deleteTask with the task's id
- **THEN** on success the drawer SHALL close and the task card SHALL be removed from the Kanban board

#### Scenario: Delete button is disabled while an operation is in flight
- **WHEN** the drawer is saving or deleting
- **THEN** both the delete button and the close button SHALL be disabled

#### Scenario: Failed delete keeps drawer open with error feedback
- **WHEN** deleteTask returns null (error or unauthorized)
- **THEN** the drawer SHALL remain open and SHALL display an error message

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

### Requirement: deleteTask server action removes a task
The system SHALL provide a `deleteTask(taskId)` server action that deletes a Task document, verifying session and project ownership before deletion.

#### Scenario: Authenticated owner deletes their task
- **WHEN** an authenticated user calls deleteTask with a taskId belonging to their project
- **THEN** the system SHALL delete the Task document and return `true`

#### Scenario: Unauthenticated request is rejected
- **WHEN** an unauthenticated call is made to deleteTask
- **THEN** the system SHALL return `false` without modifying any document

#### Scenario: Task belonging to another user's project is rejected
- **WHEN** an authenticated user calls deleteTask with a taskId whose project belongs to a different user
- **THEN** the system SHALL return `false` without modifying any document

### Requirement: Task card background reflects priority
Task cards on the Kanban board SHALL display a right-aligned colored badge with a text label indicating the task's priority. Cards with no priority set SHALL display no badge and use the default card background. All cards SHALL use the default card background regardless of priority.

#### Scenario: High priority card shows red badge
- **WHEN** a task card has priority set to "high"
- **THEN** the card SHALL display a right-aligned red badge with the label "High"
- **THEN** the card SHALL use the default card background (no red tint)

#### Scenario: Medium priority card shows yellow badge
- **WHEN** a task card has priority set to "medium"
- **THEN** the card SHALL display a right-aligned yellow badge with the label "Medium"
- **THEN** the card SHALL use the default card background (no yellow tint)

#### Scenario: Low priority card shows green badge
- **WHEN** a task card has priority set to "low"
- **THEN** the card SHALL display a right-aligned green badge with the label "Low"
- **THEN** the card SHALL use the default card background (no green tint)

#### Scenario: Unprioritized card has default background and no badge
- **WHEN** a task card has no priority set
- **THEN** the card SHALL display the default card background with no color tint
- **THEN** the card SHALL NOT display a priority badge
