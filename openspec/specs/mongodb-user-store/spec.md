## Requirements

### Requirement: Mongoose connection singleton
The system SHALL maintain a single reusable Mongoose connection to MongoDB across all API route invocations.

#### Scenario: Connection reused on repeated calls
- **WHEN** multiple API routes call the `connectDB` utility within the same process
- **THEN** only one `mongoose.connect()` call SHALL be made; subsequent calls SHALL reuse the cached connection

#### Scenario: Connection established on first call
- **WHEN** `connectDB` is called and no cached connection exists
- **THEN** the utility SHALL call `mongoose.connect` with the value of the `MONGODB_URI` environment variable

#### Scenario: Missing MONGODB_URI throws
- **WHEN** `connectDB` is called and `MONGODB_URI` is not defined in the environment
- **THEN** the utility SHALL throw a descriptive error before attempting to connect

### Requirement: User model schema
The system SHALL define a `User` Mongoose model representing an authenticated principal.

#### Scenario: User document created with valid fields
- **WHEN** a new User is saved with a unique email and a bcrypt-hashed password string
- **THEN** the document SHALL be persisted to the `users` collection in MongoDB

#### Scenario: Email field is unique and required
- **WHEN** a User document is saved without an email, or with an email that duplicates an existing document
- **THEN** Mongoose SHALL throw a validation or duplicate-key error before the document is persisted

#### Scenario: Password field is required
- **WHEN** a User document is saved without a password
- **THEN** Mongoose SHALL throw a validation error before the document is persisted

#### Scenario: Timestamps recorded automatically
- **WHEN** a User document is created or updated
- **THEN** Mongoose SHALL automatically set `createdAt` and `updatedAt` timestamps on the document

### Requirement: Project model schema
The system SHALL define a `Project` Mongoose model representing a user-owned project.

#### Scenario: Project document created with valid fields
- **WHEN** a new Project is saved with a non-empty name and a valid userId referencing an existing User
- **THEN** the document SHALL be persisted to the `projects` collection in MongoDB with `createdAt` and `updatedAt` timestamps

#### Scenario: Projects are indexed by userId
- **WHEN** the Project collection is queried for all projects belonging to a specific user
- **THEN** the query SHALL use the `userId` index for efficient retrieval
