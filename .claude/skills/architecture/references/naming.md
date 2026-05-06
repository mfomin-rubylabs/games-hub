# Naming Conventions

## File Naming

All file names use **kebab-case**. The suffix is mandatory and describes the file's role.

| Suffix                        | Example                              | Contains                         |
| ----------------------------- | ------------------------------------ | -------------------------------- |
| `.component.tsx`              | `game-card.component.tsx`            | React component                  |
| `-skeleton.component.tsx`     | `game-card-skeleton.component.tsx`   | Skeleton loader (co-located)     |
| `.module.tsx`                 | `games-list.module.tsx`              | Page-level orchestration         |
| `.service.ts`                 | `auth.service.ts`                    | Business logic, plain object     |
| `.schema.ts`                  | `auth.schema.ts`                     | Zod validation schemas           |
| `.store.ts`                   | `favorites.store.ts`                 | Zustand store interface file     |
| `.api.ts`                     | `games.api.ts`                       | Raw fetch functions              |
| `.query.ts`                   | `games.query.ts`                     | TanStack Query hooks             |
| `.mutation.ts`                | `favorites.mutation.ts`              | TanStack Query mutation hooks    |
| `.model.ts`                   | `game.model.ts`                      | Data model interfaces            |
| `.interface.ts`               | `session.interface.ts`               | Shared TypeScript interfaces     |
| `index.ts`                    | `index.ts`                           | Barrel — required in every folder with public exports |

## Component Naming

PascalCase. The suffix mirrors the file's role suffix.

```tsx
// game-card.component.tsx
const GameCardComponent: FC<Readonly<IProps>> = (props) => { ... }
export default GameCardComponent

// games-list.module.tsx
const GamesListModule: FC<Readonly<IProps>> = (props) => { ... }
export default GamesListModule

// game-card-skeleton.component.tsx
const GameCardSkeletonComponent: FC<Readonly<IProps>> = () => { ... }
export default GameCardSkeletonComponent
```

Never `export default function Foo()` — always a named `const`.

## Props Pattern

Every component follows this exact structure — no exceptions.

```tsx
interface IProps {
  id: string
  variant: 'sign-in' | 'sign-up'
  optional?: boolean
}

const SignModule: FC<Readonly<IProps>> = (props) => {
  const { id, variant, optional = false } = props

  return (...)
}

export default SignModule
```

Rules:
- Always `interface IProps` — never an inline type, never named after the component
- Always `Readonly<IProps>` on the FC generic
- Always destructure from `props` at the top of the function body
- Never spread `{...props}` into JSX
- Components with no props still declare the interface: `interface IProps {}`

## Barrel Files

Every folder with public exports must have an `index.ts` barrel. Use named re-exports.

```ts
// re-exporting default exports
export { default as GameCardComponent } from './game-card.component'
export { default as GameCardSkeletonComponent } from './game-card-skeleton.component'

// re-exporting named exports
export * from './session.interface'
export { useSessionStore } from './session.store'
```

## Interface vs Type (company policy)

**Use `interface` for all object shapes.** Never use `type` where `interface` would work.

```ts
// ✓ correct
interface IGame {
  id: number
  name: string
  released: string
}

// ✗ wrong
type IGame = {
  id: number
  name: string
  released: string
}
```

`type` is acceptable only for:

```ts
// union literals
type AuthErrorCode = 'emailTaken' | 'invalidCredentials' | 'rateLimited'

// discriminated unions
type AuthResult = { success: true; data: AuthData } | { success: false; code: AuthErrorCode }

// derived types
type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>
type Handler = ReturnType<typeof useHandler>
type Params = Parameters<typeof fn>[0]
```

## Store Naming

| Thing              | Convention                     | Example              |
| ------------------ | ------------------------------ | -------------------- |
| Hook export        | `useXxxStore`                  | `useSessionStore`    |
| Devtools name      | `'XxxStore'`                   | `'SessionStore'`     |
| Persist storage key | `'xxx-storage'`               | `'session-storage'`  |
| Persist version    | always `version: 1`            | bump on schema change |

Always use `partialize` to exclude runtime-only flags (like `isInitialised`) from the persisted state.

## Translation Keys

camelCase keys, grouped by feature namespace in the JSON files.

```json
{
  "games": {
    "title": "Games",
    "tba": "TBA",
    "loadMore": "Load more"
  },
  "auth": {
    "emailRequired": "Email is required",
    "passwordMin": "Password must be at least 8 characters"
  }
}
```

Always add new keys to **all** locale files (`translations/en.json` and `translations/de.json`) in the same commit. Never leave a key missing from one locale.
