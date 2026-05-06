---
name: Architecture Map
description: FSD client architecture — layer map, task entry points, and links to naming/commenting rules and code examples
type: reference
---

# Client Architecture — FSD

This is a Next.js App Router client using Feature-Sliced Design. Imports flow strictly downward: pages delegate to modules, modules compose widgets and features, entities hold all data-fetching logic. No layer may import from a layer above it.

## Layer Map

| Layer    | Path                | Purpose                                                              |
| -------- | ------------------- | -------------------------------------------------------------------- |
| Pages    | `src/app/(web)/`    | Next.js routes — thin; render one module per page                    |
| Modules  | `src/app/modules/`  | Page-level orchestration (`*.module.tsx`, `*-skeleton.component.tsx`) |
| Widgets  | `src/app/widgets/`  | Reusable UI sections used across 2+ modules                          |
| Features | `src/app/features/` | Scoped implementations: auth forms, toggle-favorite, sync            |
| Entities | `src/app/entities/` | API clients (`*.api.ts`), React Query hooks (`*.query.ts`)           |
| Shared   | `src/app/shared/`   | Zustand stores, hooks, minimal shared UI, interfaces                 |
| Config   | `src/config/`       | Env vars, fonts, global CSS                                          |
| Pkg      | `src/pkg/`          | Third-party integrations (theme, locale, supabase, jwt, rate-limit)  |

## Route Groups under `src/app/(web)/[locale]/`

| Group            | Path                                    | Purpose                                          |
| ---------------- | --------------------------------------- | ------------------------------------------------ |
| `(auth)`         | sign-in, sign-up                        | Auth pages — middleware redirects logged-in away |
| `(public)`       | home, games, favorites, game detail     | Publicly accessible without authentication       |
| `(protected)`    | *(empty)*                               | Future auth-required pages                       |
| `[...not_found]` | catch-all                               | 404 fallback                                     |

---

## Mode A — New public page

1. Create `src/app/(web)/[locale]/(public)/<route>/page.tsx` — renders one module
2. Create `src/app/(web)/[locale]/(public)/<route>/loading.tsx` — renders one module skeleton
3. Create `src/app/modules/<route>/<route>.module.tsx` + `<route>-skeleton.component.tsx` + `index.ts`
4. Add translation keys to both `translations/en.json` and `translations/de.json`
5. See → [examples/module/](examples/module/)

## Mode B — New protected page

1. Same as Mode A but under `(protected)/`
2. Add the route path to `PROTECTED_ROUTES` in `src/middleware.ts`

## Mode C — New widget

1. Create `src/app/widgets/<name>/<name>.component.tsx` + `index.ts`
2. Use a widget only when it is reused across 2+ modules; otherwise use a module `elements/` sub-component
3. See → [examples/widget/](examples/widget/)

## Mode D — New feature

1. Create `src/app/features/<name>/<name>.component.tsx` (or `.service.ts`) + `index.ts`
2. See → [examples/feature/](examples/feature/)

## Mode E — New API entity

1. Create `src/app/entities/api/<name>/<name>.api.ts` — fetch functions
2. Create `src/app/entities/api/<name>/<name>.query.ts` — React Query hooks
3. Create `src/app/entities/api/<name>/index.ts` — barrel
4. See → [examples/entity/](examples/entity/)

## Mode F — New server API route

1. Create `src/app/(api)/api/<resource>/route.ts`
2. Authenticate via Bearer token using `@/pkg/jwt`
3. Use admin Supabase client (`@/pkg/supabase/admin`)
4. Return `NextResponse.json()`

## Mode G — Add a shadcn component

1. `yarn dlx shadcn add <name>`
2. Move the generated file to `src/pkg/theme/ui/<name>.tsx` (flatten — no subfolders)
3. Update `cn` import to `@/pkg/theme/lib/utils`

---

## References

- [Layer rules, key locations, import direction](references/layer-rules.md)
- [Naming conventions — files, components, interfaces, props pattern](references/naming.md)
- [Comments style](references/comments.md)
- [Common pitfalls](references/pitfalls.md)

## Examples

- [module/](examples/module/) — server component module + skeleton + client element
- [widget/](examples/widget/) — client-side reusable UI section
- [feature/](examples/feature/) — scoped client component with business logic
- [entity/](examples/entity/) — API fetch function + React Query hook
- [shared/](examples/shared/) — interface file + Zustand store with persist
