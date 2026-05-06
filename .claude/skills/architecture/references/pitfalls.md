# Common Pitfalls

## Layer Violations

**Importing upward** — an entity importing from a widget, a feature importing from a module, etc.

```ts
// ✗ wrong — entity must not import from widget or module
import { GameCardComponent } from '@/app/widgets/game-card'

// ✓ correct — entity imports only from shared, config, or pkg
import { SessionUser } from '@/app/shared/interfaces'
```

**Missing barrel** — a folder that has exports but no `index.ts`. Every folder with public exports requires a barrel file.

## Banned Imports

```ts
// ✗ next/link is banned
import Link from 'next/link'
// ✓ use locale-aware Link
import { Link } from '@/pkg/locale'

// ✗ next/navigation hooks are banned
import { useRouter, usePathname, redirect } from 'next/navigation'
// ✓ use locale-aware equivalents
import { useRouter, usePathname, redirect } from '@/pkg/locale'

// ✗ sonner directly is banned
import { toast } from 'sonner'
toast.error('Something went wrong')
// ✓ use toastService
import { toastService } from '@/pkg/theme/services/toast.service'
toastService.error('Something went wrong')

// ✗ wrong shadcn import path
import { Button } from '@/components/ui/button'
// ✓ correct path
import { Button } from '@/pkg/theme/ui/button'

// ✗ cache from react — only deduplicates native fetch, not supabase/ky
import { cache } from 'react'
const getGame = cache(fetchGame)
// ✓ call directly and accept two DB queries per request
const game = await fetchGame(id)
```

## Thin Pages

`page.tsx` and `loading.tsx` must each render exactly one component. Composition belongs in the module.

```tsx
// ✗ wrong — composition logic in loading.tsx
const Loading = () => (
  <div className='bg-background min-h-screen'>
    <Skeleton className='h-12 w-1/2' />
    {Array.from({ length: 9 }).map((_, i) => (
      <GameCardSkeletonComponent key={i} />
    ))}
  </div>
)

// ✓ correct — loading.tsx delegates to a module skeleton
import { GamesListSkeletonComponent } from '@/app/modules/games-list'

const Loading = () => <GamesListSkeletonComponent />
```

## Zustand

```ts
// ✗ persist without version — breaks silently on store schema changes
persist(fn, { name: 'session-storage' })

// ✓ always include version; add migrate() when bumping
persist(fn, { name: 'session-storage', version: 1 })

// ✗ devtools without env guard — runs devtools in production
devtools(fn, { name: 'SessionStore' })

// ✓ env guard required
devtools(fn, {
  enabled: process.env.NODE_ENV !== 'production' && typeof window !== 'undefined',
  name: 'SessionStore',
})
```

## Types

```ts
// ✗ type for an object shape
type IUser = { id: string; email: string }

// ✓ interface for all object shapes
interface IUser {
  id: string
  email: string
}
```

## Props

```ts
// ✗ inline type, no Readonly, spreading props into JSX
const Foo = ({ value, ...rest }: { value: string }) => <div {...rest}>{value}</div>

// ✓ interface IProps, Readonly, destructure from props
interface IProps { value: string }
const FooComponent: FC<Readonly<IProps>> = (props) => {
  const { value } = props
  return <div>{value}</div>
}
```

## Comments

```ts
// ✗ comments explaining WHAT — redundant with the code
// fetch the game
const game = await fetchGame(id)

// ✗ multi-line block comments
/**
 * Fetches the game and returns it.
 */

// ✓ comments only when the WHY is non-obvious
// expired or tampered
} catch {
  return null
}
```

## Translations

```ts
// ✗ adding a key to only one locale file
// translations/en.json updated, translations/de.json untouched

// ✓ always update all locale files in the same change
// translations/en.json AND translations/de.json both updated
```
