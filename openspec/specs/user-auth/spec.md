## Requirements

### Requirement: User registration
The system SHALL allow a new visitor to create an account by providing an email address and password.

#### Scenario: Successful registration
- **WHEN** a visitor submits the registration form with a valid email and a password of at least 8 characters
- **THEN** the system SHALL hash the password, persist a new User document in MongoDB, and redirect the user to the `/login` page

#### Scenario: Duplicate email rejected
- **WHEN** a visitor submits the registration form with an email that already exists in the database
- **THEN** the API SHALL return a 409 response and the form SHALL display an "Email already in use" error message

#### Scenario: Invalid input rejected
- **WHEN** a visitor submits the registration form with a missing email, invalid email format, or password shorter than 8 characters
- **THEN** the API SHALL return a 400 response and the form SHALL display a field-level validation error

### Requirement: User sign-in
The system SHALL allow a registered user to authenticate with their email and password and receive a session token.

#### Scenario: Successful sign-in
- **WHEN** a registered user submits the login form with correct credentials
- **THEN** the API SHALL return a 200 response, set an HTTP-only `auth-token` cookie containing a signed JWT, and redirect the browser to `/dashboard`

#### Scenario: Wrong credentials rejected
- **WHEN** a user submits the login form with an unrecognised email or incorrect password
- **THEN** the API SHALL return a 401 response and the form SHALL display an "Invalid email or password" error message

#### Scenario: Already authenticated user
- **WHEN** a user who already has a valid `auth-token` cookie visits `/login` or `/register`
- **THEN** the system SHALL redirect them to `/dashboard`

### Requirement: User sign-out
The system SHALL allow an authenticated user to end their session.

#### Scenario: Sign-out clears cookie
- **WHEN** an authenticated user triggers sign-out
- **THEN** the system SHALL call `POST /api/auth/logout`, clear the `auth-token` cookie, and redirect the browser to `/login`

### Requirement: Protected route enforcement
All dashboard routes SHALL be inaccessible to unauthenticated users.

#### Scenario: Unauthenticated access redirected
- **WHEN** a visitor with no `auth-token` cookie navigates to any path under `/dashboard`
- **THEN** the proxy SHALL redirect them to `/login`

#### Scenario: Invalid token treated as unauthenticated
- **WHEN** a visitor presents an `auth-token` cookie that is expired, malformed, or signed with the wrong secret
- **THEN** the proxy SHALL redirect them to `/login`

#### Scenario: Authenticated access permitted
- **WHEN** a user with a valid `auth-token` cookie navigates to any path under `/dashboard`
- **THEN** the proxy SHALL allow the request to proceed normally
