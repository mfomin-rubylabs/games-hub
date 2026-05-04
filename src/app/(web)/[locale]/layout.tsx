import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'
import { Toaster } from 'sonner'

import { SessionProviderComponent } from '@/app/features/session-provider'
import { SyncFavoritesComponent } from '@/app/features/sync-favorites'
import { QueryProvider } from '@/app/shared/ui/query-provider'
import { figtreeHeading, nunitoSans } from '@/config/fonts'
import { routing } from '@/pkg/locale'
import { cn } from '@/pkg/theme/lib/utils'

import '@/config/styles/global.css'

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

// static params
export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }))
}

// metadata
export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { params } = props
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const title = t('appName')
  const description = t('appDescription')

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
    openGraph: {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description: description,
      siteName: title,
      type: 'website',
    },
  }
}

// component
const LocaleLayout: FC<Readonly<IProps>> = async (props: IProps) => {
  const { children, params } = props

  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const messages = await getMessages()

  // return
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn('h-full', 'antialiased', 'font-sans', nunitoSans.variable, figtreeHeading.variable, 'dark')}
    >
      <body className='flex min-h-full flex-col' suppressHydrationWarning>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <SessionProviderComponent>
              <SyncFavoritesComponent>{children}</SyncFavoritesComponent>
            </SessionProviderComponent>
          </NextIntlClientProvider>
          <Toaster position='top-center' duration={3000} />
        </QueryProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
