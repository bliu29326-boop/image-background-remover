# Deployment Guide

## Required environment variables
Set these in Cloudflare Pages:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_URL` = your production domain, e.g. `https://backgroundremove.xyz`
- `AUTH_SECRET`
- `REMOVEBG_API_KEY`

## Google OAuth callback
Add the following callback URLs in Google Cloud Console:
- `http://localhost:3000/api/auth/callback/google`
- `https://backgroundremove.xyz/api/auth/callback/google`

## Build command
```bash
npm run pages:build
```

## Build output directory
```bash
.open-next/assets
```

## Local development
```bash
npm install
npm run dev
```

## Notes
- Current stable auth implementation uses `next-auth@4`
- OpenNext Cloudflare build is verified with `.open-next/assets` as Pages output
- D1 is configured in `wrangler.toml`, but not required for the currently verified login flow
