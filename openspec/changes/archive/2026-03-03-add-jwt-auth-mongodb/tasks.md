## 1. Dependencies & Environment

- [x] 1.1 Install `mongoose`, `bcryptjs`, `jose`, and `@types/bcryptjs` via npm
- [x] 1.2 Add `MONGODB_URI` and `JWT_SECRET` to `.env.local` and `.env.example`
- [x] 1.3 Remove `AUTH_EMAIL` and `AUTH_PASSWORD_HASH` from `.env.local` and `.env.example`

## 2. MongoDB Connection & User Model

- [x] 2.1 Create `lib/db/mongoose.ts` with a singleton `connectDB` function that caches the Mongoose connection on the `global` object
- [x] 2.2 Create `lib/models/User.ts` defining a Mongoose schema with `email` (unique, required), `password` (required), and `timestamps: true`; export the `User` model

## 3. JWT Utilities

- [x] 3.1 Create (or update) `lib/auth/jwt.ts` with `signToken(payload)` and `verifyToken(token)` functions using `jose` and the `JWT_SECRET` env var

## 4. Auth API Routes

- [x] 4.1 Create `app/api/auth/register/route.ts` — validate input, check for duplicate email, hash password with `bcryptjs`, save new `User` document, return 201
- [x] 4.2 Create (or update) `app/api/auth/login/route.ts` — find user by email, compare password hash with `bcryptjs`, sign JWT, set `auth-token` HTTP-only cookie, return 200
- [x] 4.3 Create (or update) `app/api/auth/logout/route.ts` — clear the `auth-token` cookie, return 200

## 5. Route Protection

- [x] 5.1 Create (or update) `proxy.ts` at project root — verify `auth-token` cookie using `verifyToken`; redirect to `/login` for `/dashboard/**` paths when token is missing or invalid; redirect authenticated users away from `/login` and `/register`

## 6. Sign-In Page

- [x] 6.1 Create (or update) `app/login/page.tsx` — client component with email + password fields, form submission to `POST /api/auth/login`, display error messages on 401 response, redirect to `/dashboard` on success

## 7. Sign-Up Page

- [x] 7.1 Create `app/register/page.tsx` — client component with email + password fields, client-side validation (email format, password ≥ 8 chars), form submission to `POST /api/auth/register`, display field-level errors on 400/409 responses, redirect to `/login` on success

## 8. Verification

- [x] 8.1 Verify sign-up flow: register a new user, confirm document appears in MongoDB `users` collection
- [x] 8.2 Verify sign-in flow: log in with new user, confirm `auth-token` cookie is set and `/dashboard` is accessible
- [x] 8.3 Verify route protection: access `/dashboard` without cookie, confirm redirect to `/login`
- [x] 8.4 Verify sign-out: after logout, confirm cookie is cleared and `/dashboard` redirects to `/login`
- [x] 8.5 Verify duplicate email: attempt to register with an existing email, confirm 409 error message is shown
