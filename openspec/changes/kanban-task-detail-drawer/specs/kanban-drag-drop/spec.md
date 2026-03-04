## MODIFIED Requirements

### Requirement: Task cards are draggable between Kanban columns
The system SHALL allow users to drag task cards from any column and drop them onto any other column, updating the task's status accordingly. The PointerSensor SHALL use an activation distance of 4px so that short pointer movements do not trigger a drag, allowing click events to fire normally.

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

#### Scenario: Short pointer movement does not trigger drag
- **WHEN** a user presses and releases a pointer on a task card with displacement ≤ 4px
- **THEN** no drag SHALL be activated and the click event SHALL fire
