## 1. Setup

- [x] 1.1 Install the shadcn/ui `tabs` component via `npx shadcn add tabs`

## 2. Root Auth Page

- [x] 2.1 Rewrite `app/page.tsx` as a `"use client"` component with `activeTab` state (`"sign-in"` | `"sign-up"`)
- [x] 2.2 Add shadcn/ui `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent` wrapping the two forms
- [x] 2.3 Inline or extract the Sign In form (email + password, calls `POST /api/auth/login`, redirects to `/dashboard` on success, shows error on 401)
- [x] 2.4 Inline or extract the Sign Up form (email + password with client-side validation, calls `POST /api/auth/register`, switches to Sign In tab on success, shows field-level errors on 400/409)

## 3. Route Protection Update

- [x] 3.1 Update `proxy.ts` matcher to include `/` and remove `/login` and `/register`
- [x] 3.2 Update redirect target for unauthenticated `/dashboard/**` access from `/login` to `/`
- [x] 3.3 Update authenticated-user redirect to guard `/` (redirect to `/dashboard`) instead of `/login`/`/register`

## 4. Remove Old Routes

- [x] 4.1 Delete `app/login/page.tsx` and the `app/login/` directory
- [x] 4.2 Delete `app/register/page.tsx` and the `app/register/` directory

## 5. Verification

- [x] 5.1 Visit `/` unauthenticated — confirm tabbed Sign In / Sign Up page renders
- [x] 5.2 Sign up with a new account — confirm tab switches to Sign In after success
- [x] 5.3 Sign in with valid credentials — confirm redirect to `/dashboard`
- [x] 5.4 Visit `/dashboard` without a cookie — confirm redirect to `/`
- [x] 5.5 Sign out from dashboard — confirm redirect to `/`
- [x] 5.6 Visit `/` with a valid cookie — confirm redirect to `/dashboard`
- [x] 5.7 Confirm `/login` and `/register` return 404
