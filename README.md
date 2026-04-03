# image-background-remover

MVP web app for removing image backgrounds using remove.bg.

## Current status
- Upload image
- Remove background via remove.bg
- Preview and download PNG result
- Google sign-in via NextAuth v4
- Build verified locally

## Environment variables
Create `.env.local` based on `.env.local.example`:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=
REMOVEBG_API_KEY=
```

## Google Cloud Console
Authorized JavaScript origins:
- https://backgroundremove.xyz
- http://localhost:3000

Authorized redirect URIs:
- https://backgroundremove.xyz/api/auth/callback/google
- http://localhost:3000/api/auth/callback/google

## Local development
```bash
npm install
npm run dev
```

## Notes
- Current auth implementation uses `next-auth@4`
- D1 user persistence is not enabled in the current working version
- remove.bg requires a valid `REMOVEBG_API_KEY`
