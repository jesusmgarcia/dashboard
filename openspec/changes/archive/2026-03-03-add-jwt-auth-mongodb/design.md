## Context

The dashboard has no user identity system. The `feat-jwt-auth` branch exists but contains only static placeholder credentials (`AUTH_EMAIL` / `AUTH_PASSWORD_HASH` in env). This change replaces that with a full sign-up / sign-in flow backed by MongoDB, using Mongoose for schema management and `jose` for stateless JWT tokens stored in HTTP-only cookies.

Stack constraints:
- Next.js 16 App Router (Node.js runtime, not Edge)
- TypeScript strict mode
- Tailwind CSS v4 / shadcn/ui for UI components
- `proxy.ts` (Next.js 16 middleware naming convention) for route protection

## Goals / Non-Goals

**Goals:**
- Users can register with email + password; credentials are stored in MongoDB via Mongoose
- Users can sign in and receive a JWT in an HTTP-only cookie
- All `/dashboard/**` routes are protected — unauthenticated visitors are redirected to `/login`
- A `/register` page allows new account creation
- The `/login` page is updated to call the new API-backed route

**Non-Goals:**
- OAuth / social login (GitHub, Google, etc.)
- Email verification or password reset flows
- Role-based access control (RBAC)
- Refresh tokens or token rotation
- Rate limiting on auth endpoints

## Decisions

### 1. Mongoose over raw MongoDB driver

**Chosen**: `mongoose`
**Rationale**: The user explicitly requested Mongoose. It provides schema validation, virtual fields, and a familiar ODM API. The `User` model is straightforward enough that Mongoose overhead is negligible.
**Alternative**: `mongodb` driver with plain TypeScript types — less abstraction but more boilerplate.

### 2. Singleton connection pattern for serverless

**Chosen**: Cache the Mongoose connection on the `global` object to prevent exhausting the connection pool across hot-reload cycles in development and across serverless invocations.

```ts
// lib/db/mongoose.ts
const cached = (global as any).__mongooseConn ?? { conn: null, promise: null };
```

**Alternative**: Connect on every request — simpler but causes `MongoServerSelectionError` under load in serverless.

### 3. `jose` for JWT (not `jsonwebtoken`)

**Chosen**: `jose` — Web Crypto API-based, works in both Node.js and Edge runtimes. Already in the ecosystem from prior auth work.
**Alternative**: `jsonwebtoken` — Node-only, cannot be used in Edge middleware.

### 4. `bcryptjs` for password hashing

**Chosen**: `bcryptjs` — pure JS, works without native bindings in all Next.js runtimes.
**Alternative**: `argon2` — stronger, but requires native bindings that can break on some hosting platforms.

### 5. HTTP-only cookie for token storage

**Chosen**: `auth-token` cookie with `httpOnly: true`, `sameSite: "lax"`, `secure` in production.
**Rationale**: Prevents XSS token theft. `sameSite: lax` allows top-level GET navigations.
**Alternative**: `localStorage` — accessible to JavaScript, vulnerable to XSS.

### 6. Route protection in `proxy.ts`

**Chosen**: Verify JWT in the Next.js 16 proxy (middleware). Redirect to `/login` on missing or invalid token for all `/dashboard/**` paths.
**Rationale**: Centralised protection; page components remain simple server components.
**Alternative**: Per-page `redirect()` calls — duplicated logic, easy to forget on new routes.

## Risks / Trade-offs

- **Stateless JWT — no revocation**: A compromised token remains valid until expiry. → Mitigation: short TTL (e.g., 7 days); sign-out only clears the cookie client-side.
- **MongoDB cold start in serverless**: First request on a cold function can be slow while the connection is established. → Mitigation: singleton connection cache; consider Atlas serverless tier.
- **Plain-text password never stored**: bcrypt salt rounds default to 12 — adequate security but adds ~300 ms to sign-up. Acceptable for a dashboard with low signup frequency.
- **No CSRF protection on cookie auth**: `sameSite: lax` mitigates most CSRF vectors for this use case, but is not a complete defence. Full CSRF tokens are out of scope.

## Migration Plan

1. Add env vars: `MONGODB_URI` (required), `JWT_SECRET` (required). Remove `AUTH_EMAIL` and `AUTH_PASSWORD_HASH` from `.env.local`.
2. Install new dependencies: `mongoose`, `bcryptjs`, `jose`, `@types/bcryptjs`.
3. Deploy database-first: ensure MongoDB Atlas cluster is ready before deploying new API routes.
4. The existing `/login` page (if any) is replaced; no data migration needed for the initial rollout since there are no existing user records.

## Open Questions

- **Token TTL**: 7 days assumed — confirm if shorter/longer is preferred.
- **MongoDB Atlas vs self-hosted**: `MONGODB_URI` format works for both; no code change needed.
