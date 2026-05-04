---
name: Architecture Map
description: FSD codebase map — where things live, what is off-limits, and where to start for common tasks
type: reference
---

# Codebase Architecture

## Layer Map

| Layer    | Path                | Purpose                                                                        |
| -------- | ------------------- | ------------------------------------------------------------------------------ |
| Pages    | `src/app/(web)/`    | Next.js routes and layouts — keep thin; delegate to modules                    |
| Modules  | `src/app/modules/`  | Page-level orchestration (`*.module.tsx`); compose widgets and features        |
| Widgets  | `src/app/widgets/`  | Self-contained reusable UI sections — used across multiple modules             |
| Features | `src/app/features/` | Scoped implementations: auth forms, toggle-favorite, session-provider, sync    |
| Entities | `src/app/entities/` | API clients, React Query hooks, data models                                    |
| Shared   | `src/app/shared/`   | Hooks, Zustand stores, minimal shared UI, interfaces                           |
| Config   | `src/config/`       | Env vars, fonts, global CSS                                                    |
| Pkg      | `src/pkg/`          | Third-party integrations (theme, locale, supabase, jwt, rate-limit)            |

## Route Groups under `src/app/(web)/[locale]/`

| Group           | Path           | Purpose                                                              |
| --------------- | -------------- | -------------------------------------------------------------------- |
| `(auth)`        | sign-in, sign-up | Auth pages — middleware redirects logged-in users away             |
| `(public)`      | home, games, game detail, favorites | Pages accessible without authentication     |
| `(protected)`   | *(empty)*      | Future auth-required pages — add here when needed                   |
| `[...not_found]`| catch-all      | 404 fallback                                                         |

## Key Locations

| What                    | Where                                                    |
| ----------------------- | -------------------------------------------------------- |
| shadcn components       | `src/pkg/theme/ui/*.tsx` — flat, no subfolders           |
| Custom theme components | `src/pkg/theme/components/` — shadcn `components` alias  |
| Toast service           | `src/pkg/theme/services/toast.service.ts`                |
| cn utility              | `src/pkg/theme/lib/utils.ts`                             |
| Locale Link/router      | `src/pkg/locale/`                                        |
| React Query provider    | `src/app/shared/ui/query-provider/`                      |
| Session store           | `src/app/shared/store/session.store.ts`                  |
| Favorites store hook    | `src/app/shared/hooks/use-favorites-store.hook.ts`       |
| Shared interfaces       | `src/app/shared/interfaces/`                             |
| API clients             | `src/app/entities/api/<name>/<name>.api.ts`              |
| React Query hooks       | `src/app/entities/api/<name>/<name>.query.ts`            |
| Translations            | `translations/en.json`, `translations/de.json`           |
| Env config              | `src/config/env/env.client.ts`, `env.server.ts`          |
| Global styles           | `src/config/styles/global.css`                           |
| API route handlers      | `src/app/(api)/api/<resource>/route.ts`                  |
| Middleware              | `src/middleware.ts`                                      |
| JWT sign/verify         | `src/pkg/jwt/jwt.ts`                                     |
| Rate limiter            | `src/pkg/rate-limit/rate-limit.ts`                       |
| Supabase browser client | `src/pkg/supabase/client.ts`                             |
| Supabase server client  | `src/pkg/supabase/server.ts`                             |
| Supabase admin client   | `src/pkg/supabase/admin.ts`                              |
| Font config             | `src/config/fonts/font.ts`                               |
| Shimmer utility         | `src/utils/shimmer.ts`                                   |
| Zod schemas             | `src/app/features/<name>/<name>.schema.ts`               |

## Widgets — Placement Notes

**`game-card`** (`src/app/widgets/game-card/`) — **widget is correct**.
Reused in both `games-list` and `favorites-list` modules. Contains favorites toggle business logic via `useToggleFavorites` (feature) + `useFavoritesStore` (shared). In FSD, widgets may import from features. Reuse across multiple modules justifies the widget layer.

**`game-filters`** — widget; used by `games-list` module.

**`nav-bar`** — widget; used by `layout` module. Has `elements/` subfolder for locale-switcher, mobile-menu, user-button.

## Off-Limits / Do Not Generate Into

- `src/pkg/theme/ui/` — only modify when intentionally customising a shadcn component
- `.next/` — generated output, never touch
- `node_modules/` — never touch

## Common Task Entry Points

**New public page**: `src/app/(web)/[locale]/(public)/new-route/page.tsx` → module in `src/app/modules/new-route/new-route.module.tsx` + `index.ts`

**New protected page**: `src/app/(web)/[locale]/(protected)/new-route/page.tsx` → add path to `PROTECTED_ROUTES` in `src/middleware.ts` → module in `src/app/modules/new-route/`

**New API integration**: `src/app/entities/api/<name>/` — create `<name>.api.ts` + `<name>.query.ts` + `index.ts`

**New shared store**: `src/app/shared/store/<name>.store.ts` — wrap with Zustand `devtools`

**Add a shadcn component**: `yarn dlx shadcn add <name>` → move output to `src/pkg/theme/ui/<name>.tsx` (flatten) → update `cn` import to `@/pkg/theme/lib/utils`

**New feature**: `src/app/features/<name>/<name>.component.tsx` (or `.service.ts`) + `index.ts`

**Add a new API route**: `src/app/(api)/api/<resource>/route.ts` — authenticate with Bearer token via `@/pkg/jwt`, use admin Supabase client, return `NextResponse.json()`

## Import Direction

(web) → modules → widgets → features → entities → shared → config → pkg

Upper layers import from lower. Never the reverse. No circular deps.
Every folder with public exports must have an `index.ts` barrel file.

## Type Conventions (company policy)

- **`interface` for all object shapes** — never `type` for objects
- `type` only for: string/discriminated unions, `z.infer<>`, `ReturnType<>`, `Parameters<>`, indexed access (`T[K]`)
- Do not use `cache` from `'react'` — Next.js request memoisation only works with native `fetch`; use React Query or accept duplicate calls
