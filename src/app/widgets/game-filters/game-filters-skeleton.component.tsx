import { type FC } from 'react'

import { Skeleton } from '@/pkg/theme/ui/skeleton'

interface IProps {}

const GameFiltersSkeletonComponent: FC<Readonly<IProps>> = () => {
  return (
    <aside className='lg:sticky lg:top-20 lg:self-start'>
      <div className='bg-card rounded-sm border p-5 shadow-sm lg:p-6'>
        <div className='flex flex-col gap-5'>
          <div className='flex items-baseline justify-between'>
            <div className='space-y-2'>
              <Skeleton className='h-7 w-28' />
              <Skeleton className='h-4 w-40' />
            </div>

            <span className='bg-border ms-4 h-px flex-1' />
          </div>

          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className='space-y-1.5'>
              <Skeleton className='h-3.5 w-20' />
              <Skeleton className='h-9 w-full' />
            </div>
          ))}

          <Skeleton className='h-8 w-full' />
        </div>
      </div>
    </aside>
  )
}

export default GameFiltersSkeletonComponent
