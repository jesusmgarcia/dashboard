## ADDED Requirements

### Requirement: Project model schema
The system SHALL define a `Project` Mongoose model representing a user-owned project.

#### Scenario: Project document created with valid fields
- **WHEN** a new Project is saved with a non-empty name and a valid userId referencing an existing User
- **THEN** the document SHALL be persisted to the `projects` collection in MongoDB with `createdAt` and `updatedAt` timestamps

#### Scenario: Projects are indexed by userId
- **WHEN** the Project collection is queried for all projects belonging to a specific user
- **THEN** the query SHALL use the `userId` index for efficient retrieval
