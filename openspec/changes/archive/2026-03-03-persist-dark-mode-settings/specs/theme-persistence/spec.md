## ADDED Requirements

### Requirement: Persist theme preference across sessions
The system SHALL store the user's selected theme (dark or light) in a cookie named `theme` so the preference survives page refreshes and new browser sessions.

#### Scenario: Dark mode preference is saved
- **WHEN** the user activates dark mode via the theme toggle
- **THEN** a cookie `theme=dark` SHALL be set with a 1-year expiry

#### Scenario: Light mode preference is saved
- **WHEN** the user deactivates dark mode via the theme toggle
- **THEN** a cookie `theme=light` SHALL be set with a 1-year expiry

#### Scenario: Preference persists on next visit
- **WHEN** the user returns to the dashboard in a new session
- **THEN** the system SHALL read the `theme` cookie and apply the corresponding theme without user interaction

### Requirement: Apply theme server-side to prevent flash
The system SHALL inject the correct theme class (`dark` or empty string) on the root `<html>` element during server-side rendering, so the correct theme is applied before any JavaScript executes.

#### Scenario: Dark mode applied before paint
- **WHEN** a user with a saved `theme=dark` cookie loads the dashboard
- **THEN** the `<html>` element SHALL have the `dark` class from the server response, with no visible flash of light theme

#### Scenario: Light mode applied before paint
- **WHEN** a user with a saved `theme=light` cookie (or no cookie) loads the dashboard
- **THEN** the `<html>` element SHALL NOT have the `dark` class

### Requirement: Theme toggle updates preference immediately
The system SHALL update the visible theme immediately when the user clicks the toggle, without waiting for a server round-trip.

#### Scenario: Optimistic dark mode toggle
- **WHEN** the user clicks the theme toggle to enable dark mode
- **THEN** the `dark` class SHALL be applied to the `<html>` element immediately AND the preference SHALL be persisted asynchronously

#### Scenario: Optimistic light mode toggle
- **WHEN** the user clicks the theme toggle to disable dark mode
- **THEN** the `dark` class SHALL be removed from the `<html>` element immediately AND the preference SHALL be persisted asynchronously

#### Scenario: Toggle failure reverts optimistic update
- **WHEN** the server action to persist the preference fails
- **THEN** the DOM class SHALL revert to the previous state and an error indicator SHALL be shown
