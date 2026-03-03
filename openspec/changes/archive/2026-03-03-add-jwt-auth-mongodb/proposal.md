## Why

The dashboard currently has no user authentication or registration flow. Adding JWT-based auth backed by MongoDB lets real users sign up, log in, and access protected routes — replacing the placeholder single-credential approach with a proper, database-driven identity system.

## What Changes

- Add MongoDB connection layer using Mongoose
- Add `User` Mongoose model with email and hashed password fields
- Add sign-up API route (`POST /api/auth/register`) that creates a user record
- Add sign-in API route (`POST /api/auth/login`) that validates credentials and issues a JWT in an HTTP-only cookie
- Add sign-out API route (`POST /api/auth/logout`) that clears the auth cookie
- Add `proxy.ts` route-protection logic (Next.js 16 middleware) to guard dashboard routes
- Add `/login` page with a sign-in form
- Add `/register` page with a sign-up form
- Wire `JWT_SECRET` and `MONGODB_URI` into `.env.local` / `.env.example`

## Capabilities

### New Capabilities

- `user-auth`: End-to-end JWT authentication — sign-up, sign-in, sign-out, and route protection via HTTP-only cookie
- `mongodb-user-store`: Mongoose-backed `User` model and MongoDB connection utility used by auth API routes

### Modified Capabilities

<!-- No existing auth specs to modify -->

## Impact

- **New dependencies**: `mongoose`, `bcryptjs`, `jose`, `@types/bcryptjs`
- **New files**: `lib/db/mongoose.ts`, `lib/models/User.ts`, `lib/auth/jwt.ts`, `app/api/auth/login/route.ts`, `app/api/auth/logout/route.ts`, `app/api/auth/register/route.ts`, `app/login/page.tsx`, `app/register/page.tsx`, `proxy.ts`
- **Env vars**: `JWT_SECRET`, `MONGODB_URI`, removed hardcoded `AUTH_EMAIL` / `AUTH_PASSWORD_HASH`
- **Route protection**: All `/dashboard/**` routes require a valid JWT cookie; unauthenticated requests redirect to `/login`
