import { type FC } from 'react'

import { Skeleton } from '@/pkg/theme/ui/skeleton'

interface IProps {}

const GameDetailsSkeletonComponent: FC<Readonly<IProps>> = () => {
  return (
    <div className='bg-background mt-12 flex flex-1 flex-col items-center justify-center px-4'>
      <div className='w-full max-w-4xl space-y-4'>
        <div className='bg-card overflow-hidden rounded-sm shadow-md'>
          <Skeleton className='h-96 w-full rounded-none' />

          <div className='relative -mt-8 space-y-3 px-6 pb-6'>
            <Skeleton className='h-8 w-1/2' />
            <Skeleton className='h-5 w-16' />

            <div className='flex flex-wrap gap-2 pt-2'>
              <Skeleton className='h-5 w-16' />
              <Skeleton className='h-5 w-20' />
              <Skeleton className='h-5 w-12' />
              <Skeleton className='h-5 w-24' />
            </div>
          </div>
        </div>

        {/* Screenshots skeleton */}
        <div className='space-y-4 pt-2'>
          <div className='flex items-center gap-3'>
            <Skeleton className='h-px w-8' />
            <Skeleton className='h-3 w-24' />
          </div>
          <Skeleton className='aspect-video w-full rounded-sm' />
        </div>
      </div>
    </div>
  )
}

export default GameDetailsSkeletonComponent
