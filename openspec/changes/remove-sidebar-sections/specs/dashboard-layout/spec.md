## MODIFIED Requirements

### Requirement: Sidebar navigation
The sidebar SHALL display the application branding and a single navigation link for the Dashboard.

#### Scenario: Sidebar shows branding
- **WHEN** the dashboard layout is rendered
- **THEN** the sidebar SHALL display an application name or logo at the top

#### Scenario: Sidebar shows only the Dashboard navigation link
- **WHEN** the dashboard layout is rendered
- **THEN** the sidebar SHALL display exactly one navigation link: Dashboard (`/dashboard`)
- **THEN** the sidebar SHALL NOT display Analytics, Users, or Settings navigation links

#### Scenario: Active navigation link is highlighted
- **WHEN** the current URL matches a navigation link's href
- **THEN** that link SHALL be visually distinguished from inactive links
