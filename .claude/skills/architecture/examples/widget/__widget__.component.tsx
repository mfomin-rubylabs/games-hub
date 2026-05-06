// @ts-nocheck — template file; path aliases and types are illustrative only
'use client'

// example widget — reusable across 2+ modules; may use features and shared
// based on header.component.tsx from the supervisor template (apps/client)
import { useTranslations } from 'next-intl'
import { type FC, useEffect, useState } from 'react'

import { Link } from '@/pkg/locale'
import { cn } from '@/pkg/theme/lib/utils'
import { Button } from '@/pkg/theme/ui/button'

// props declared as interface — even if empty
interface IProps {}

const ExampleWidget: FC<Readonly<IProps>> = () => {
  const t = useTranslations('nav')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-200',
        isScrolled ? 'bg-background/90 border-b shadow-sm backdrop-blur-sm' : 'bg-transparent',
      )}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <Link href='/' className='font-heading text-xl font-bold'>
          Games Hub
        </Link>

        <nav className='hidden items-center gap-3 md:flex'>
          <Button variant='ghost' asChild>
            <Link href='/games'>{t('games')}</Link>
          </Button>
          <Button asChild>
            <Link href='/sign-in'>{t('signIn')}</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default ExampleWidget
