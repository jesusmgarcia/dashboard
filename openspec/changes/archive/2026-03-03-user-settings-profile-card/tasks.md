## 1. MongoDB User Model Extension

- [x] 1.1 Add optional `profile` subdocument type to the User TypeScript interface/model (fullName, phone, country, state, city, address, zip, role)
- [x] 1.2 Update the MongoDB user document read/write logic to include the `profile` fields when fetching and saving user data

## 2. Server Action for Profile Update

- [x] 2.1 Create `app/settings/actions.ts` with an `updateProfile` server action that accepts profile form data and updates the user's MongoDB document
- [x] 2.2 Validate input inside the server action and return a typed result (success/error) for the client to consume

## 3. Avatar Component

- [x] 3.1 Create `app/settings/ProfileAvatar.tsx` — a client component that renders a circular avatar with the user's initials (from fullName) or a fallback icon/email initial

## 4. Settings Page UI

- [x] 4.1 Install any missing shadcn/ui components needed (Card, Input, Label, Button, Select) via `npx shadcn add`
- [x] 4.2 Rewrite `app/settings/page.tsx` to fetch the current user's profile data server-side and pass it as props to the form
- [x] 4.3 Create `app/settings/ProfileForm.tsx` — a `"use client"` component with `useActionState` / `useFormStatus` wired to the `updateProfile` action, containing all nine editable fields laid out in the card

## 5. Layout & Styling

- [x] 5.1 Center the card on the page using Tailwind flex/grid utilities; apply a max-width so it looks good on wide viewports
- [x] 5.2 Arrange form fields in a responsive 2-column grid for address-related fields (country, state, city, address, zip) and single-column for personal fields (full name, email, phone, role)
- [x] 5.3 Apply dark mode variants (`dark:`) to all custom color usages in the card and form

## 6. UX Polish

- [x] 6.1 Add a loading state to the save button (disable + spinner) while the server action is in flight using `useFormStatus`
- [x] 6.2 Display a success or error message below the form after save completes
