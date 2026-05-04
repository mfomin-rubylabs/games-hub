import 'server-only'

type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

export const checkRateLimit = (
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterMs: number } => {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterMs: 0 }
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfterMs: entry.resetAt - now }
  }

  entry.count++
  return { allowed: true, retryAfterMs: 0 }
}
