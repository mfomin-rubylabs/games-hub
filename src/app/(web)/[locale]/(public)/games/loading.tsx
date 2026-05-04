import { type FC } from 'react'

import { GameCardSkeletonComponent } from '@/app/widgets/game-card'
import { GameFiltersSkeletonComponent } from '@/app/widgets/game-filters'
import { Skeleton } from '@/pkg/theme/ui/skeleton'

interface IProps {}

const Loading: FC<Readonly<IProps>> = () => {
  return (
    <div className='bg-background min-h-screen'>
      <main className='mx-auto max-w-7xl px-6 py-12 md:py-16'>
        <header className='mb-10 space-y-3'>
          <Skeleton className='h-3 w-24' />
          <Skeleton className='h-12 w-1/2 max-w-md' />
          <Skeleton className='h-4 w-full max-w-xl' />
        </header>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:gap-10'>
          <GameFiltersSkeletonComponent />

          <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
            {Array.from({ length: 9 }).map((_, idx) => (
              <GameCardSkeletonComponent key={idx} />
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}

export default Loading
