# Games Hub — Client

## Build & Dev

- `yarn` — install dependencies
- `yarn dev` — dev server at http://localhost:3000
- `yarn build` — production build
- `yarn lint` — ESLint with auto-fix
- `yarn prettier` — format all src files
- `yarn type-check` — tsc --noEmit
- `yarn format` — runs type-check + lint + prettier in sequence
- `yarn seed` — seed Supabase games table from RAWG API (requires env vars)
- `yarn playwright test` — run E2E tests
- `yarn playwright test --ui` — interactive test runner
- Copy `.env.example` → `.env.local` and fill values before starting

## Architecture — FSD

Layer hierarchy (imports flow downward only):

(web) → modules → widgets → features → entities → shared → config → pkg

src/
├── app/
│ ├── (web)/[locale]/ ← Next.js pages/layouts — keep thin
│ │ ├── (auth)/ ← sign-in, sign-up — redirect logged-in users away
│ │ ├── (public)/ ← publicly accessible pages (home, games, game detail, favorites)
│ │ ├── (protected)/ ← routes requiring auth (empty — add future protected pages here)
│ │ ├── [...not_found]/ ← catch-all 404
│ │ └── layout.tsx ← locale root layout (fonts, dark class, providers)
│ ├── (api)/api/ ← Next.js API route handlers
│ ├── modules/ ← page-level orchestration (*.module.tsx)
│ ├── widgets/ ← self-contained reusable UI sections (*.component.tsx)
│ ├── features/ ← small reusable implementations (*.component.tsx / *.service.ts)
│ ├── entities/ ← API clients, React Query hooks, data models
│ │ ├── api/ ← _.api.ts, _.query.ts (one subfolder per resource + index.ts)
│ │ └── models/ ← _.model.ts
│ └── shared/ ← hooks, global stores, minimal shared UI, interfaces
│   ├── hooks/ ← use-_.hook.ts
│   ├── store/ ← _.store.ts (Zustand)
│   ├── ui/ ← error-state, field, loading-state, query-provider, spinner only
│   └── interfaces/ ← _.interface.ts
├── config/ ← env, fonts, global.css
├── pkg/ ← third-party integrations
│ ├── jwt/ ← JWT sign/verify (jose, HS256, 15m expiry)
│ ├── locale/ ← next-intl routing, Link, useRouter
│ ├── rate-limit/ ← in-memory rate limiter for API routes
│ ├── supabase/ ← client / server / admin Supabase clients
│ └── theme/ui/ ← shadcn components (flat .tsx, no subfolders)
└── utils/ ← misc utilities (shimmer)

Never import upward. No circular deps. `middleware.ts` lives at `src/middleware.ts`.

Every folder with public exports must have an `index.ts` barrel file.

## API Routes — src/app/(api)/api/

- `GET  /api/auth/me` — verify Bearer token, return user
- `POST /api/auth/refresh` — refresh access token via refresh_token cookie
- `GET/POST/DELETE /api/favorites` — manage user favorites (Bearer required)
- `POST /api/favorites/sync` — merge local favorites into DB on login

All API routes authenticate via `Authorization: Bearer <accessToken>`.
Add new routes under `src/app/(api)/api/<resource>/route.ts`.

## Middleware — src/middleware.ts

- Runs next-intl locale routing on all non-API routes
- `PROTECTED_ROUTES` — paths that redirect to `/{locale}/sign-in?from=...` when no `refresh_token` cookie; currently empty (favorites are local-first via Zustand, so no protected routes yet)
- `AUTH_ROUTES` (`/sign-in`, `/sign-up`) → redirects logged-in users to `/{locale}/games`
- Matcher excludes `api`, `_next`, `favicon`, static files

## Component Conventions

- Every component: `interface IProps {}` + `const Foo: FC<Readonly<IProps>> = (props) => { const { x } = props }`
- Files: `export default ComponentName`; barrel: `export { default as Foo } from './foo.component'`
- Naming: `foo.component.tsx`, `foo-skeleton.component.tsx`, `foo.service.ts`, `foo.schema.ts`, `foo.store.ts`
- `'use client'` only when strictly needed — default to Server Components
- Skeleton loaders named `{name}-skeleton.component.tsx`, co-located with their component

## Type Conventions (company policy)

- **Always use `interface` for object shapes** — never `type` for objects
- `type` is only acceptable for: union types (`'a' | 'b'`), discriminated unions, derived types (`z.infer<>`, `ReturnType<>`, indexed access `T[K]`, `Parameters<>`)
- Do not use `type` where `interface` would work — linting enforces this

## Key Import Paths

- shadcn components: `@/pkg/theme/ui/<name>` — never `@/components/ui/`
- cn utility: `@/pkg/theme/lib/utils`
- Locale-aware Link/router: `@/pkg/locale`
- Supabase clients: `@/pkg/supabase/client`, `/server`, `/admin`
- JWT utils: `@/pkg/jwt`
- Rate limiter: `@/pkg/rate-limit`
- Shared UI: `@/app/shared/ui/<name>` — error-state, field, loading-state, query-provider, spinner only
- Shared interfaces: `@/app/shared/interfaces`
- Toast service: `@/pkg/theme/services/toast.service` — use `toastService.error/success/info/warning(msg)` instead of raw `sonner` toast
- Custom theme components: `@/pkg/theme/components` — shadcn `components` alias target; place non-UI theme components here

## Backend — Supabase + Auth

- Database: Supabase PostgreSQL — games, favorites tables
- Auth: custom JWT flow; access token (15m, HS256), refresh via `refresh_token` cookie
- Supabase admin client (`@/pkg/supabase/admin`) used only in API routes
- Browser client (`@/pkg/supabase/client`) for SSR pages
- Rate limiting applied to auth endpoints via `@/pkg/rate-limit`
- Zod schemas for all form/API validation in `{feature}.schema.ts` files

## State & Data

- Zustand stores: wrap with `devtools({ enabled: process.env.NODE_ENV !== 'production' && typeof window !== 'undefined', name: 'StoreName' })`
- `useSessionStore` — `{ accessToken, user, isInitialised }` — cleared on sign-out
- `useFavoritesStore` — persisted to localStorage (`favorites-storage`) — cleared on sign-out
- React Query: all server data in `src/app/entities/api/`; queries in `.query.ts`, mutations in `.mutation.ts`

## Internationalisation

- `next-intl`, locales: `['en', 'de']`, default: `en`
- Translation files: `translations/en.json`, `translations/de.json`
- Add keys to ALL locale files when adding strings — never leave one missing
- Import `Link`, `useRouter`, `usePathname`, `redirect` from `@/pkg/locale` (ESLint will error on `next/link` or `next/navigation`)

## ESLint Rules (enforced)

- Imports sorted: node → external → `@` scoped → `@/` internal → relative → CSS
- `next/link` is banned — use `@/pkg/locale`
- `next/navigation` router/redirect hooks are banned — use `@/pkg/locale`
- `no-console` warns — remove before commit

## Testing

- E2E tests: `tests/e2e/flows/`
- Playwright: `playwright.config.ts` — tests at `http://localhost:3000`
- CI: `.github/workflows/playwright.yml` — runs on push/PR to main

## Styling & Fonts

- Tailwind CSS v4 — config in `src/config/styles/global.css` via `@theme`
- shadcn style: `radix-lyra`; `components.json` aliases point to `src/pkg/theme/`
- Fonts: `Figtree` (heading, `--font-heading`) and `Nunito Sans` (body, `--font-sans`) via `next/font/google`
- No code comments unless WHY is non-obvious; no emojis

## Repository Etiquette

- Branches: `feat/`, `fix/`, `chore/` prefix
- Commits: imperative mood, under 72 chars, English
- All content (comments, commits, docs) in English
- Confirm before: deleting files/branches, force-pushing, schema changes, production deploys

## Gotchas

- shadcn components are flat `.tsx` in `src/pkg/theme/ui/` — add with `yarn dlx shadcn add <name>`, then move and flatten; update `cn` imports to `@/pkg/theme/lib/utils`
- `translate-y-*` and `-translate-y-1/2` share `--tw-translate-y`; use `-mt-5` for centering when translate must be free for animation
- Tailwind v4 — no `tailwind.config.ts`; `postcss.config.mjs` must use `@tailwindcss/postcss`
- `next.config.ts` wraps with `createNextIntlPlugin({ requestConfig: './src/pkg/locale/request.ts' })`
- SVGs handled via `@svgr/webpack` — import as React components
- `yarn format` is the single pre-PR validation command
- Do not use `cache` from `'react'` — use React Query or accept duplicate fetch calls; Next.js request memoisation only applies to native `fetch`, not Supabase or ky
