# Architecture

The current app is a static, client-only MVP hosted through GitHub Pages.

## Current flow

Browser loads static assets from GitHub Pages. The Next.js app runs entirely in the browser. Seeded drill data lives in `lib/poker.ts`. Attempts and weak spots are stored in browser `localStorage`.

## Current files

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Setup, drill, and results UI |
| `app/globals.css` | Styling and disabled option visuals |
| `lib/poker.ts` | Types, seed questions, filter availability, drill selection, weakness summary |
| `next.config.js` | Static export and GitHub Pages base path |
| `.github/workflows/pages.yml` | Static build and Pages deployment workflow |

## Why static first

Static hosting is enough for the MVP because there is no auth, database, image upload, background job, or server parser yet. This keeps the app easy to demo and avoids infrastructure work while we validate the drill UI.

## Future stack

When the app needs real persistence or image parsing, migrate to:

- Vercel for the Next.js frontend and API routes
- Supabase Auth for login
- Supabase Postgres for ranges, attempts, and weakness stats
- Supabase Storage for uploaded range images
- OpenAI or Gemini vision API for range chart parsing

## Migration triggers

Move off pure GitHub Pages when we need user accounts, uploaded images, saved ranges across devices, server-side AI calls, or database-backed analytics.

## Deployment notes

The Pages workflow currently uses `npm install` because the repo does not have a lockfile. Later, commit `package-lock.json` and switch back to `npm ci` with npm cache enabled.

GitHub Pages must be enabled in repository settings with the source set to GitHub Actions.
