# NextJS Game Tracker

A small app built with Next.js 16 + App Router.
It fetches data from the RAWG API and allows browsing, searching, and filtering games.

## Deployed project

https://games-app-lime.vercel.app/

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form + Zod
- Zustand
- Supabase (Postgres + SSR)
- next-intl
- ky
- Playwright

## Features

- Browse games with pagination
- Search games by name
- Filter by genre and platform
- Sort by rating or release date
- Game detail pages
- Favorite games (synced to account on login)
- Email/password auth with JWT access token + refresh-token sessions
- Localised routing (English, German)

## Getting Started

1. Clone the repository

2. Install dependencies

```bash
yarn install
```

3. Create an `.env.local` file in the root:

```env
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
```

4. Run the development server

```bash
yarn dev
```

The development server will run on http://localhost:3000

## Scripts

- `yarn dev` — start dev server
- `yarn build` — production build
- `yarn format` — type-check, lint, and prettier
- `npx playwright test` — run E2E tests

## TODO

- Handle more edge cases
