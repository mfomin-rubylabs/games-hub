'use client'

import { HeartOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { useFavoritesStore } from '@/app/shared/hooks/use-favorites-store.hook'
import { GameCardComponent } from '@/app/widgets/game-card'

interface IProps {}

const FavoritesListModule: FC<Readonly<IProps>> = () => {
  const t = useTranslations('favorites')
  const favorites = useFavoritesStore((state) => state.favorites)
  const games = Object.values(favorites)

  return (
    <div className='bg-background min-h-screen'>
      <main className='mx-auto max-w-7xl px-6 py-12 md:py-16'>
        {/* Page header */}
        <header className='mb-10 space-y-3'>
          <div className='flex items-center gap-3'>
            <span className='bg-foreground h-px w-8' />
            <span className='text-muted-foreground text-[11px] font-medium tracking-[0.25em] uppercase'>
              {t('pageKicker')}
            </span>
          </div>

          <h1 className='font-heading text-4xl font-semibold tracking-tight sm:text-5xl'>{t('pageTitle')}</h1>

          <p className='text-muted-foreground max-w-xl text-sm sm:text-base'>{t('pageSubtitle')}</p>
        </header>

        {/* Body */}
        {games.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-4 rounded-sm border border-dashed py-24'>
            <HeartOff className='text-muted-foreground h-8 w-8' strokeWidth={1.25} />

            <p className='text-muted-foreground max-w-sm text-center text-sm'>{t('empty')}</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {games.map((game) => (
              <GameCardComponent key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default FavoritesListModule
