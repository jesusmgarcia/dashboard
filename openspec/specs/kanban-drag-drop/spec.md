### Requirement: Task cards are draggable between Kanban columns
The system SHALL allow users to drag task cards from any column and drop them onto any other column, updating the task's status accordingly.

#### Scenario: User drags a card to a different column
- **WHEN** a user drags a task card and drops it onto a different column
- **THEN** the card SHALL move to the target column immediately in the UI and the task's status SHALL be updated to the target column's status

#### Scenario: User drags a card to the same column
- **WHEN** a user drags a task card and drops it back onto its original column
- **THEN** no status change SHALL occur and the card SHALL remain in place

#### Scenario: Drop target column is visually highlighted during drag
- **WHEN** a user is dragging a task card over a column
- **THEN** the target column SHALL display a visual highlight to indicate it is a valid drop target

#### Scenario: Status is persisted to the database after drop
- **WHEN** a task is dropped into a different column
- **THEN** the system SHALL call the updateTaskStatus server action and persist the new status in the database

#### Scenario: Failed persistence rolls back the card
- **WHEN** the updateTaskStatus server action returns null (error or unauthorized)
- **THEN** the card SHALL revert to its original column in the UI

### Requirement: updateTaskStatus server action persists status changes
The system SHALL provide an `updateTaskStatus(taskId, status)` server action that updates a Task document's status, verifying session and project ownership before writing.

#### Scenario: Authenticated owner updates task status
- **WHEN** an authenticated user calls updateTaskStatus with a taskId belonging to their project and a valid status
- **THEN** the system SHALL update the Task document's status and return the updated TaskItem

#### Scenario: Unauthenticated request is rejected
- **WHEN** an unauthenticated call is made to updateTaskStatus
- **THEN** the system SHALL return null without modifying any document

#### Scenario: Task belonging to another user's project is rejected
- **WHEN** an authenticated user calls updateTaskStatus with a taskId whose project belongs to a different user
- **THEN** the system SHALL return null without modifying any document
