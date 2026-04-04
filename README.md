# image-background-remover

MVP web app for removing image backgrounds using remove.bg.

Last redeploy trigger: 2026-03-21T07:10:09Z

## Google OAuth (NextAuth)

### Environment variables
Create `.env.local` based on `.env.local.example`:

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=https://backgroundremove.xyz
AUTH_SECRET=
NEXTAUTH_SECRET=
```

Notes:
- Runtime secret is read from `AUTH_SECRET` first.
- `NEXTAUTH_SECRET` is kept as a fallback for compatibility.
- On Cloudflare Pages, D1 is provided via the `DB` binding, not `process.env.DB`.

### Google Cloud Console
Authorized JavaScript origins:
- https://backgroundremove.xyz
- http://localhost:3000 (dev)

Authorized redirect URIs:
- https://backgroundremove.xyz/api/auth/callback/google
- http://localhost:3000/api/auth/callback/google (dev)

## D1 user storage

### D1 binding name
- DB

### Schema
Create the table in your D1 database:

```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  image TEXT,
  created_at TEXT NOT NULL,
  last_login_at TEXT NOT NULL
);
```

### Behavior
- On Google sign-in, the user is upserted into D1 by `id` (Google `sub`).
- `last_login_at` is updated on every login.
