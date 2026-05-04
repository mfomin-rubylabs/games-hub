'use client'

import { useTranslations } from 'next-intl'
import { type FC, useState } from 'react'

import { useGames } from '@/app/entities/api/games'
import { GamesListFilters } from '@/app/entities/models'
import { ErrorState } from '@/app/shared/ui/error-state'
import { GameCardComponent, GameCardSkeletonComponent } from '@/app/widgets/game-card'
import { GameFiltersComponent } from '@/app/widgets/game-filters'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/pkg/theme/ui/pagination'

interface IProps {}

const defaultFilters: GamesListFilters = {
  search: '',
  genre: '',
  platform: '',
  filter: '',
  page: 1,
}

const GamesListModule: FC<Readonly<IProps>> = () => {
  const t = useTranslations('games')

  const [fetchSource, setFetchSource] = useState<'filter' | 'pagination'>('pagination')
  const [filters, setFilters] = useState<GamesListFilters>(defaultFilters)

  const {
    isLoading: isGamesLoading,
    isFetching: isGamesFetching,
    isError: isGamesError,
    data: gamesData,
    error: gamesError,
    refetch: refetchGames,
  } = useGames(filters)

  const isFilterSubmitting = fetchSource === 'filter' && isGamesFetching

  if (isGamesError) {
    return <ErrorState message={gamesError?.message} onRetry={refetchGames} />
  }

  const handleApplyFilters = (next: GamesListFilters) => {
    setFetchSource('filter')
    setFilters({ ...next, page: 1 })
  }

  const handlePageChange = (delta: number) => {
    setFetchSource('pagination')
    setFilters((prev) => ({ ...prev, page: prev.page + delta }))
  }

  const showSkeletons = isGamesLoading || isGamesFetching

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
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:gap-10'>
          <GameFiltersComponent onApply={handleApplyFilters} isLoading={isFilterSubmitting} />

          {/* Results */}
          <section>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
              {showSkeletons
                ? Array.from({ length: 9 }).map((_, idx) => <GameCardSkeletonComponent key={idx} />)
                : gamesData?.results.map((game) => <GameCardComponent key={game.id} game={game} />)}

              {!showSkeletons && gamesData?.results.length === 0 && (
                <div className='text-muted-foreground col-span-full pt-12 pb-8 text-center text-lg'>{t('empty')}</div>
              )}
            </div>

            <Pagination className='mt-16 flex justify-center'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => gamesData?.previous && handlePageChange(-1)}
                    className={
                      !gamesData?.previous ? 'pointer-events-none rounded-sm opacity-50' : 'cursor-pointer rounded-sm'
                    }
                  />
                </PaginationItem>

                <PaginationItem>
                  <span className='text-muted-foreground px-4 text-sm'>{filters.page}</span>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => gamesData?.next && handlePageChange(1)}
                    className={
                      !gamesData?.next ? 'pointer-events-none rounded-sm opacity-50' : 'cursor-pointer rounded-sm'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        </div>
      </main>
    </div>
  )
}

export default GamesListModule
