'use client'

import { ArrowRight, Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

interface IProps {}

const HomeModule: FC<Readonly<IProps>> = () => {
  const t = useTranslations('home')
  const router = useRouter()

  return (
    <main className='relative isolate flex w-full flex-1 items-center overflow-hidden'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-70'
        style={{
          background:
            'radial-gradient(60% 50% at 20% 20%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%), radial-gradient(50% 45% at 85% 80%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%)',
        }}
      />

      <div className='mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-20 text-center md:py-28'>
        {/* Kicker */}
        <div className='flex items-center gap-3'>
          <span className='bg-foreground h-px w-8' />
          <span className='text-muted-foreground text-[11px] font-medium tracking-[0.25em] uppercase'>
            {t('kicker')}
          </span>
          <span className='bg-foreground h-px w-8' />
        </div>

        {/* Title */}
        <h1 className='font-heading mt-8 text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl'>
          {t('title')}
          <span className='text-primary'>.</span>
        </h1>

        {/* Subtitle */}
        <p className='text-muted-foreground mt-8 max-w-xl text-base leading-relaxed text-pretty sm:text-lg'>
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div className='mt-10 flex flex-wrap items-center justify-center gap-3'>
          <Button
            size='lg'
            className='group gap-2 rounded-sm px-6 hover:cursor-pointer'
            onClick={() => router.push('/games')}
          >
            {t('exploreButton')}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
          </Button>

          <Button
            variant='outline'
            size='lg'
            className='gap-2 rounded-sm px-6 hover:cursor-pointer'
            onClick={() => router.push('/games/favorites')}
          >
            <Heart className='h-4 w-4' />
            {t('favoritesButton')}
          </Button>
        </div>
      </div>
    </main>
  )
}

export default HomeModule
