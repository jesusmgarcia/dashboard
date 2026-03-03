## 1. Restructure ProfileForm Layout

- [x] 1.1 Replace the top header section in `ProfileForm.tsx` with a side-by-side `flex` wrapper: left panel (avatar + name + email) and right panel (form fields)
- [x] 1.2 Style the left panel with a fixed width, muted background, right border, and centered content (avatar, name, email stacked vertically)
- [x] 1.3 Add `md:flex-row` responsive class so the layout collapses to `flex-col` on small viewports

## 2. Unify Field Grid

- [x] 2.1 Replace the separate "Personal Information" and "Address" section grids with a single `grid grid-cols-2 gap-4` container inside the right panel
- [x] 2.2 Arrange fields in order: Full Name | Email, Phone | Role, Country | State, City | ZIP, Address (col-span-2)

## 3. Polish & Dark Mode

- [x] 3.1 Ensure the left panel background and border use theme tokens that work in both light and dark mode (`bg-muted/40 dark:bg-muted/20`, `border-border`)
- [x] 3.2 Verify the save button, feedback message, and form spacing look correct in the new layout
