import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { routing } from '@/pkg/locale'

const intlMiddleware = createIntlMiddleware(routing)

const PROTECTED_ROUTES: string[] = []
const AUTH_ROUTES = ['/login', '/register']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('refresh_token')?.value
  const { pathname } = req.nextUrl

  const [, maybeLocale, ...rest] = pathname.split('/')
  const hasLocalePrefix = (routing.locales as readonly string[]).includes(maybeLocale)
  const locale = hasLocalePrefix ? maybeLocale : routing.defaultLocale
  const pathWithoutLocale = '/' + (hasLocalePrefix ? rest.join('/') : pathname.slice(1))

  const isProtected = PROTECTED_ROUTES.some((r) => pathWithoutLocale.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some((r) => pathWithoutLocale.startsWith(r))

  if (isProtected && !token) {
    const loginUrl = new URL(`/${locale}/login`, req.url)
    loginUrl.searchParams.set('from', pathWithoutLocale)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL(`/${locale}/games`, req.url))
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|favicon|.*\\..*).*)'],
}
