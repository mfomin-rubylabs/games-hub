# Layer Rules

## Layer Map

| Layer    | Path                | Purpose                                                                            |
| -------- | ------------------- | ---------------------------------------------------------------------------------- |
| Pages    | `src/app/(web)/`    | Next.js routes — `page.tsx` renders one module, `loading.tsx` renders one skeleton |
| Modules  | `src/app/modules/`  | Page-level orchestration (`*.module.tsx`); composes widgets and features           |
| Widgets  | `src/app/widgets/`  | Self-contained reusable UI sections — used across 2+ modules                       |
| Features | `src/app/features/` | Scoped implementations: auth forms, toggle-favorite, sync                          |
| Entities | `src/app/entities/` | API clients, React Query hooks, data models                                        |
| Shared   | `src/app/shared/`   | Hooks, Zustand stores, minimal shared UI, interfaces                               |
| Config   | `src/config/`       | Env vars, fonts, global CSS                                                        |
| Pkg      | `src/pkg/`          | Third-party integrations (theme, locale, supabase, jwt, rate-limit)                |

## Import Direction

```
(web) → modules → widgets → features → entities → shared → config → pkg
```

Upper layers import from lower. Never the reverse. No circular deps.
Every folder with public exports must have an `index.ts` barrel file.

## Route Groups under `src/app/(web)/[locale]/`

| Group            | Path                                | Purpose                                                |
| ---------------- | ----------------------------------- | ------------------------------------------------------ |
| `(auth)`         | sign-in, sign-up                    | Auth pages — middleware redirects logged-in users away |
| `(public)`       | home, games, favorites, game detail | Publicly accessible without authentication             |
| `(protected)`    | _(empty)_                           | Future auth-required pages — add here when needed      |
| `[...not_found]` | catch-all                           | 404 fallback                                           |

## Key Locations

| What                    | Where                                              |
| ----------------------- | -------------------------------------------------- |
| shadcn components       | `src/pkg/theme/ui/*.tsx` — flat, no subfolders     |
| Custom theme components | `src/pkg/theme/components/`                        |
| Toast service           | `src/pkg/theme/services/toast.service.ts`          |
| cn utility              | `src/pkg/theme/lib/utils.ts`                       |
| Locale Link/router      | `src/pkg/locale/`                                  |
| React Query provider    | `src/app/shared/ui/query-provider/`                |
| Session store           | `src/app/shared/store/session.store.ts`            |
| Favorites store hook    | `src/app/shared/hooks/use-favorites-store.hook.ts` |
| Shared interfaces       | `src/app/shared/interfaces/`                       |
| API clients             | `src/app/entities/api/<name>/<name>.api.ts`        |
| React Query hooks       | `src/app/entities/api/<name>/<name>.query.ts`      |
| Translations            | `translations/en.json`, `translations/de.json`     |
| Env config              | `src/config/env/env.client.ts`, `env.server.ts`    |
| Global styles           | `src/config/styles/global.css`                     |
| API route handlers      | `src/app/(api)/api/<resource>/route.ts`            |
| Middleware              | `src/middleware.ts`                                |
| JWT sign/verify         | `src/pkg/jwt/jwt.ts`                               |
| Rate limiter            | `src/pkg/rate-limit/rate-limit.ts`                 |
| Supabase browser client | `src/pkg/supabase/client.ts`                       |
| Supabase server client  | `src/pkg/supabase/server.ts`                       |
| Supabase admin client   | `src/pkg/supabase/admin.ts`                        |
| Font config             | `src/config/fonts/font.ts`                         |
| Zod schemas             | `src/app/features/<name>/<name>.schema.ts`         |

## Widget vs Feature vs Module Element

| Placement          | When to use                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| **Widget**         | Reused across **2+ modules**; may import from features                      |
| **Feature**        | Single-concern, reusable across modules (a form, a toggle, a server action) |
| **Module element** | Sub-component used **only within one module** — lives in `module/elements/` |

## Off-Limits

- `src/pkg/theme/ui/` — only modify when intentionally customising a shadcn component
- `.next/` — generated output, never touch
- `node_modules/` — never touch
