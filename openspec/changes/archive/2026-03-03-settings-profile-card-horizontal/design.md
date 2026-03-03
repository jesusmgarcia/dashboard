## Context

The settings profile card was implemented with a vertical layout: a top header section containing the avatar (centered), the user's name, and email, followed by form fields stacked below in separate "Personal Information" and "Address" sections. The change is purely visual — no data model, server action, or routing changes are involved.

The card lives in `app/(dashboard)/settings/ProfileForm.tsx`. It uses shadcn/ui `Card`, `CardContent`, `Input`, `Label`, and `Button` with Tailwind CSS v4 utility classes.

## Goals / Non-Goals

**Goals:**
- Restructure the card to a horizontal split: avatar panel on the left, form fields on the right
- Display all form fields in a unified 2-column grid on the right side, with personal info and address fields arranged side by side
- Preserve all existing functionality (field values, server action, loading state, feedback message)
- Maintain dark mode and responsive behaviour

**Non-Goals:**
- Any changes to the server action, data model, or MongoDB logic
- Adding new fields or removing existing ones
- Changing the avatar component itself

## Decisions

### 1. Left/right split structure

**Decision**: Use a `flex-row` outer wrapper on the card body. The left panel is a fixed width (`w-64` or similar) with a vertical stack (avatar + name + email). The right panel takes the remaining space (`flex-1`) and contains the form.

**Rationale**: `flex-row` with a fixed left panel and `flex-1` right panel is the simplest approach that naturally handles the split without needing CSS grid at the card level. Collapses to `flex-col` on small screens via a responsive prefix (`md:flex-row`).

**Alternatives considered**:
- CSS grid at the card level (`grid-cols-[auto_1fr]`) — equivalent result but slightly more verbose for a two-column case with unequal widths.

### 2. Field grid on the right side

**Decision**: Use a single `grid grid-cols-2` container for all nine fields on the right. Fields that benefit from full width (Address) span both columns via `col-span-2`. All other fields occupy one column each.

**Rationale**: A flat grid removes the need for separate "Personal Information" and "Address" section headers, achieving the side-by-side layout the design calls for in a clean and scannable way.

**Field arrangement (left-to-right, top-to-bottom):**
- Full Name | Email Address
- Phone Number | User Role
- Country | State / Region
- City | ZIP / Postal Code
- Address (col-span-2)

### 3. Left panel styling

**Decision**: Give the left panel a subtle background (`bg-muted/40`) with a right border (`border-r border-border`) to visually separate it from the form area, consistent with the previous header treatment.

**Rationale**: Keeps the visual language of the original design (muted background for the avatar area) while adapting it to a vertical strip rather than a horizontal banner.

## Risks / Trade-offs

- **Narrow sidebar viewports** → On screens narrower than the `md` breakpoint the card collapses back to a vertical layout (avatar on top), so the experience degrades gracefully.
- **Long field labels** → In a 2-column grid, long labels may wrap. All current labels are short enough that this is not a concern.
