## Context

The settings card uses a horizontal layout: a left panel with the avatar and identity, and a right panel with all editable fields. Currently the right panel contains a single `grid grid-cols-2 gap-4` with all nine fields arranged without any sub-grouping. This change introduces two named sections within that right panel.

No data model, server action, or API changes are involved. The change is confined to the JSX and Tailwind classes inside `ProfileForm.tsx`.

## Goals / Non-Goals

**Goals:**
- Add a visible "Information" section header above the personal fields (Full Name, Email, Phone, User Role)
- Add a visible "Address" section header above the location fields (Country, State/Region, City, ZIP, Address)
- Each section has its own independent 2-column grid
- Section headers use a consistent style (small, uppercase, muted, tracking-widest)

**Non-Goals:**
- Collapsible / accordion sections
- Any changes to field names, order within a section, server action, or data model
- Adding or removing fields

## Decisions

### Section structure

**Decision**: Replace the single flat `grid` with two `<section>` blocks, each containing a `<h3>` header and its own `grid grid-cols-2 gap-4`. Wrap both sections in a `flex flex-col gap-6` container (already used for the outer form).

**Rationale**: Minimal structural change — each section is self-contained. Using semantic `<section>` + `<h3>` is accessible and consistent with the previous vertical-layout implementation.

**Field assignment:**
- **Information**: Full Name, Email Address, Phone Number, User Role (2×2 grid)
- **Address**: Country, State/Region, City, ZIP/Postal Code (2×2 grid) + Address (col-span-2)

### Section header style

**Decision**: `text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3` — matches the style used in the earlier vertical layout and common dashboard patterns.

## Risks / Trade-offs

- No meaningful risks. The change is purely additive visual structure with no logic impact.
