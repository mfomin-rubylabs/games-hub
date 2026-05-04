import { type FC } from 'react'

import { GameCardSkeletonComponent } from '@/app/widgets/game-card'
import { Skeleton } from '@/pkg/theme/ui/skeleton'

interface IProps {}

const FavoritesListSkeletonComponent: FC<Readonly<IProps>> = () => {
  return (
    <div className='bg-background min-h-screen'>
      <main className='mx-auto max-w-7xl px-6 py-12 md:py-16'>
        <header className='mb-10 space-y-3'>
          <Skeleton className='h-3 w-24' />
          <Skeleton className='h-12 w-1/2 max-w-md' />
          <Skeleton className='h-4 w-full max-w-xl' />
        </header>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, idx) => (
            <GameCardSkeletonComponent key={idx} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default FavoritesListSkeletonComponent
