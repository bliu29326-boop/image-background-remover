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

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run pages:build
```

## Notes
- Current stable auth implementation uses `next-auth@4`
- D1 is configured in `wrangler.toml`, but not required for the currently verified login flow
