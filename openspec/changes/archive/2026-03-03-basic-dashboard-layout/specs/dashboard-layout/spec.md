## ADDED Requirements

### Requirement: Dashboard shell layout
The system SHALL provide a persistent dashboard layout composed of a sidebar, a header, and a main content area that wraps all dashboard routes.

#### Scenario: Layout renders all three regions
- **WHEN** any dashboard route is visited
- **THEN** the page SHALL display a sidebar on the left, a header at the top, and a scrollable main content area

#### Scenario: Content is rendered inside the layout
- **WHEN** a page component is rendered within a dashboard route
- **THEN** its output SHALL appear inside the main content area of the dashboard layout

### Requirement: Sidebar navigation
The sidebar SHALL display the application branding and a list of navigation links.

#### Scenario: Sidebar shows branding
- **WHEN** the dashboard layout is rendered
- **THEN** the sidebar SHALL display an application name or logo at the top

#### Scenario: Sidebar shows navigation links
- **WHEN** the dashboard layout is rendered
- **THEN** the sidebar SHALL display at least one navigation link with an icon and label

#### Scenario: Active navigation link is highlighted
- **WHEN** the current URL matches a navigation link's href
- **THEN** that link SHALL be visually distinguished from inactive links

### Requirement: Header bar
The header SHALL display the current page title and a slot for contextual actions.

#### Scenario: Header renders page title
- **WHEN** the dashboard layout is rendered
- **THEN** the header SHALL display a title identifying the current section

#### Scenario: Header renders action slot
- **WHEN** the dashboard layout is rendered
- **THEN** the header SHALL include a right-aligned area available for action buttons or a user menu

### Requirement: Responsive sidebar on mobile
On viewports below the `md` breakpoint the sidebar SHALL be hidden by default and accessible via an off-canvas drawer.

#### Scenario: Sidebar hidden on mobile
- **WHEN** the viewport width is below the `md` breakpoint
- **THEN** the sidebar SHALL NOT be visible in the page flow

#### Scenario: Mobile menu button opens sidebar
- **WHEN** the user taps the menu toggle button in the header on a mobile viewport
- **THEN** the sidebar SHALL slide in as an off-canvas drawer

#### Scenario: Closing the mobile drawer
- **WHEN** the user taps outside the open drawer or a navigation link inside it
- **THEN** the drawer SHALL close

### Requirement: Dark mode support
The dashboard layout SHALL respect the `.dark` class on the HTML element.

#### Scenario: Dark mode colors applied
- **WHEN** the `.dark` class is present on the `<html>` element
- **THEN** the sidebar, header, and content area SHALL use the dark-mode design tokens for background and foreground colors
