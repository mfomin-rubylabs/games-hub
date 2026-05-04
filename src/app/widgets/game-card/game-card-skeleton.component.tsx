import { type FC } from 'react'

import { Card, CardContent, CardHeader } from '@/pkg/theme/ui/card'
import { Skeleton } from '@/pkg/theme/ui/skeleton'

interface IProps {}

const GameCardSkeletonComponent: FC<Readonly<IProps>> = () => {
  return (
    <Card className='bg-card overflow-hidden rounded-sm p-0 shadow-md'>
      <Skeleton className='aspect-video w-full rounded-none' />

      <CardHeader className='p-3'>
        <Skeleton className='h-5 w-3/4' />
        <Skeleton className='h-4 w-1/4' />
      </CardHeader>

      <CardContent className='flex justify-between px-3 pb-3'>
        <Skeleton className='h-8 w-8' />
        <Skeleton className='h-8 w-8' />
      </CardContent>
    </Card>
  )
}

export default GameCardSkeletonComponent
