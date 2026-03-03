## MODIFIED Requirements

### Requirement: Profile information display
The settings page SHALL display the authenticated user's profile information in an editable card centered on the page, with a profile avatar at the top and form fields for all profile data.

#### Scenario: Profile card is rendered centered on the page
- **WHEN** the settings page is rendered
- **THEN** the system SHALL display a centered card containing a circular avatar and form fields for all profile fields

#### Scenario: Avatar shows user initials
- **WHEN** the settings page is rendered
- **THEN** the avatar SHALL display the user's initials derived from their full name, or a default placeholder if no name is set

#### Scenario: All profile fields are pre-populated
- **WHEN** the settings page is rendered
- **THEN** each editable field SHALL be pre-populated with the current value stored in the user's profile (full name, email address, phone number, country, state/region, city, address, zip/postal code, user role)

#### Scenario: User can edit profile fields
- **WHEN** the user modifies one or more fields and submits the form
- **THEN** the system SHALL persist the updated values to the user's MongoDB document and confirm success

#### Scenario: Save action shows loading state
- **WHEN** the user submits the profile form
- **THEN** the save button SHALL display a loading indicator until the server action completes

## ADDED Requirements

### Requirement: Profile photo section
The settings card SHALL display a circular profile photo area at the top of the card, above all form fields.

#### Scenario: Avatar is displayed with initials
- **WHEN** the user has a full name stored
- **THEN** the avatar SHALL render the first letter of the first name and first letter of the last name in a styled circle

#### Scenario: Avatar displays placeholder when no name is set
- **WHEN** the user has no full name stored
- **THEN** the avatar SHALL render a generic person icon or the first character of the email address

### Requirement: Extended profile fields
The settings page SHALL provide editable inputs for the following fields: full name, email address, phone number, country, state/region, city, address, zip/postal code, and user role.

#### Scenario: All fields are visible and labeled
- **WHEN** the settings page is rendered
- **THEN** each of the nine profile fields SHALL be visible with a clear label and an input control

#### Scenario: Profile data is saved to MongoDB
- **WHEN** the user submits the form with valid data
- **THEN** the server action SHALL update the user's `profile` subdocument in MongoDB with all submitted field values

#### Scenario: Email field retains current authenticated email by default
- **WHEN** the settings page is rendered
- **THEN** the email field SHALL be pre-populated with the authenticated user's current email address
