# Comments

## Rule

Default: **write no comments.**

Code communicates intent through naming. A comment is warranted only when the WHY is non-obvious — something a reader could not derive from the code itself.

## When a Comment Earns Its Place

- A hidden constraint from an external system or library bug
- A subtle invariant that would break under a seemingly reasonable change
- A workaround for a specific platform or browser behaviour
- A non-obvious performance or security tradeoff

## Format

```ts
// use // line comments only
// never JSDoc /** */, never block /* */

// place one blank line before the comment
// lowercase, no trailing punctuation on short labels
// 1–5 words is typical; longer only for genuinely complex reasoning
const value = compute()
```

Never place a comment inline (end of a line) or below the line it describes.

## Valid Examples

```ts
// httpOnly cookie — not readable by JS
cookieStore.set('refresh_token', token, { httpOnly: true, ... })

// expired or tampered
} catch {
  return null
}

// translate-y must stay free for animation
className='-mt-5'

// deduplicates only native fetch — not supabase/ky
const game = await fetchGame(id)
```

## Invalid Examples

```ts
// fetch the game by id             ← describes WHAT, which the name already says
const game = await fetchGame(id)

// button component                 ← obvious from the import
import { Button } from '@/pkg/theme/ui/button'

// used by GameCardComponent        ← caller reference; belongs in the PR description
export const formatRating = (r: number) => r.toFixed(1)

// set the user in state            ← describes WHAT
setUser(user)

// handle form submission           ← describes WHAT
const onSubmit = async (data: FormData) => { ... }
```

## What Never Gets a Comment

- Import statements
- Component return statements
- Variable declarations with self-evident names
- Closing braces or blocks
- Anything that reads naturally from the identifier name alone
