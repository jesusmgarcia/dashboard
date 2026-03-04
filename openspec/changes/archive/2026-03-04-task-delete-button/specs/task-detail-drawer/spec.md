## MODIFIED Requirements

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

## ADDED Requirements

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
