## Context

The settings page currently renders user profile information (email, account creation date) in a static, read-only layout. The project uses Next.js App Router with React 19, MongoDB for user data, shadcn/ui components, and Tailwind CSS v4. Authentication is JWT-based with user data stored in MongoDB.

The existing `User` MongoDB document likely contains only auth-related fields (email, passwordHash, createdAt). New profile fields need to be stored alongside these.

## Goals / Non-Goals

**Goals:**
- Redesign the `/settings` page with a centered, visually polished profile card
- Display a profile photo (avatar) at the top of the card
- Make all profile fields editable: full name, email, phone number, country, state/region, city, address, zip/postal code, user role
- Save changes to the MongoDB user document via a server action or API route
- Preserve existing authentication and route-protection behavior

**Non-Goals:**
- Uploading or changing the actual profile photo (avatar shows initials or a placeholder)
- Email verification flow after email change
- Role-based access control enforcement (role is stored but not enforced in this change)
- Pagination or multi-section settings tabs

## Decisions

### 1. Form handling: Server Action vs API Route

**Decision**: Use a Next.js Server Action.

**Rationale**: The settings page is a React Server Component route. A Server Action keeps the update logic co-located with the page, avoids a separate `app/api/` route, and works naturally with React 19's `useActionState` / `useFormStatus`. No extra fetch boilerplate on the client side.

**Alternatives considered**:
- `PUT /api/user/profile` route — extra indirection with no benefit for a single-page form.

### 2. Profile photo: upload vs initials avatar

**Decision**: Display an avatar using the user's initials (derived from full name), with a decorative circular frame. No file upload in this change.

**Rationale**: File upload (S3, Cloudinary, etc.) is a significant infrastructure concern outside this change's scope. An initials-based avatar provides the visual anchor the design calls for with zero new dependencies.

### 3. MongoDB schema extension

**Decision**: Extend the existing user document with an optional `profile` subdocument:
```ts
profile?: {
  fullName?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  zip?: string;
  role?: string;
}
```

**Rationale**: Grouping new fields under `profile` keeps auth fields (email, passwordHash, createdAt) separate and makes future profile expansions clean. No migration needed since fields are optional.

### 4. UI component approach

**Decision**: Build the card using shadcn/ui `Card`, `Input`, `Label`, `Button`, and `Select` components. Use a 2-column responsive grid for the address fields on wider viewports.

**Rationale**: Consistent with the existing component stack. shadcn/ui components integrate with the project's Tailwind v4 theme tokens automatically.

## Risks / Trade-offs

- **Email change without verification** → A user can change their email to one they don't own. Mitigation: document as known limitation; email verification can be added in a follow-up change.
- **Role field is display-only in terms of enforcement** → Storing the role does not change what the user can access. Mitigation: clearly label the field; access control is a separate concern.
- **No optimistic UI** → On slow connections the form submit may feel unresponsive. Mitigation: use `useFormStatus` to show a loading state on the save button.
