'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useGenres } from '@/app/entities/api/genres'
import { usePlatforms } from '@/app/entities/api/platforms'
import { FilterTypes, GamesListFilters, GenreFilter, PlatformFilter } from '@/app/entities/models'
import { Spinner } from '@/app/shared/ui/spinner'
import { cn } from '@/pkg/theme/lib/utils'
import { Button } from '@/pkg/theme/ui/button'
import { Input } from '@/pkg/theme/ui/input'
import { Label } from '@/pkg/theme/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/pkg/theme/ui/select'

interface IProps {
  onApply: (filters: GamesListFilters) => void
  isLoading?: boolean
}

const GameFiltersComponent: FC<Readonly<IProps>> = (props) => {
  const { onApply, isLoading = false } = props
  const t = useTranslations('games')
  const tState = useTranslations('state')

  const { register, handleSubmit, control } = useForm<GamesListFilters>({
    defaultValues: {
      search: '',
      genre: '',
      platform: '',
      filter: '',
      page: 1,
    },
  })

  const { isLoading: isGenresLoading, isError: isGenresError, data: genresData } = useGenres()
  const { isLoading: isPlatformsLoading, isError: isPlatformsError, data: platformsData } = usePlatforms()

  return (
    <aside className='lg:sticky lg:top-20 lg:self-start'>
      <div className='bg-card rounded-sm border p-5 shadow-sm lg:p-6'>
        <form onSubmit={handleSubmit(onApply)} className='flex flex-col gap-5'>
          {/* Filters header */}
          <div className='flex items-baseline justify-between'>
            <div>
              <h2 className='font-heading text-lg font-semibold tracking-tight'>{t('filtersTitle')}</h2>
              <p className='text-muted-foreground mt-0.5 text-xs'>{t('filtersSubtitle')}</p>
            </div>

            <span className='bg-border ms-4 h-px flex-1' />
          </div>

          {/* Search */}
          <div className='space-y-1.5'>
            <Label className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
              {t('searchLabel')}
            </Label>

            <Input
              type='text'
              placeholder={t('searchPlaceholder')}
              {...register('search')}
              className='w-full rounded-sm'
            />
          </div>

          {/* Genre */}
          <div className='space-y-1.5'>
            <Label className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
              {t('genreLabel')}
            </Label>

            <Controller
              control={control}
              name='genre'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <SelectTrigger className='w-full rounded-sm'>
                    <SelectValue placeholder={t('genrePlaceholder')} />
                  </SelectTrigger>

                  <SelectContent>
                    {isGenresLoading ? (
                      <SelectItem value='loading' disabled>
                        {tState('loading')}
                      </SelectItem>
                    ) : isGenresError ? (
                      <SelectItem value='error' disabled>
                        {tState('errorLoading')}
                      </SelectItem>
                    ) : (
                      genresData?.map((genre: GenreFilter) => (
                        <SelectItem key={genre.value} value={genre.label}>
                          {genre.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Platform */}
          <div className='space-y-1.5'>
            <Label className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
              {t('platformLabel')}
            </Label>

            <Controller
              control={control}
              name='platform'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <SelectTrigger className='w-full rounded-sm'>
                    <SelectValue placeholder={t('platformPlaceholder')} />
                  </SelectTrigger>

                  <SelectContent>
                    {isPlatformsLoading ? (
                      <SelectItem value='loading' disabled>
                        {tState('loading')}
                      </SelectItem>
                    ) : isPlatformsError ? (
                      <SelectItem value='error' disabled>
                        {tState('errorLoading')}
                      </SelectItem>
                    ) : (
                      platformsData?.map((platform: PlatformFilter) => (
                        <SelectItem key={platform.value} value={platform.label}>
                          {platform.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Order */}
          <div className='space-y-1.5'>
            <Label className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
              {t('orderLabel')}
            </Label>

            <Controller
              control={control}
              name='filter'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <SelectTrigger className='w-full rounded-sm'>
                    <SelectValue placeholder={t('orderPlaceholder')} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem key={FilterTypes.RATINGASC} value={FilterTypes.RATINGASC}>
                        {t('filters.ratingAsc')}
                      </SelectItem>
                      <SelectItem key={FilterTypes.RATINGDESC} value={FilterTypes.RATINGDESC}>
                        {t('filters.ratingDesc')}
                      </SelectItem>
                      <SelectItem key={FilterTypes.YEARASC} value={FilterTypes.YEARASC}>
                        {t('filters.yearAsc')}
                      </SelectItem>
                      <SelectItem key={FilterTypes.YEARDESC} value={FilterTypes.YEARDESC}>
                        {t('filters.yearDesc')}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Submit */}
          <Button
            type='submit'
            className={cn('rounded-sm', isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')}
            disabled={isLoading}
          >
            {isLoading && <Spinner />}
            {isLoading ? t('searching') : t('searchButton')}
          </Button>
        </form>
      </div>
    </aside>
  )
}

export default GameFiltersComponent
