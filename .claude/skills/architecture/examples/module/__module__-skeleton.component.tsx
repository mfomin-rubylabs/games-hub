// @ts-nocheck — template file; path aliases and types are illustrative only
// example skeleton — mirrors the module's layout; no 'use client'
import { type FC } from 'react'

import { Card, CardContent, CardHeader } from '@/pkg/theme/ui/card'
import { Skeleton } from '@/pkg/theme/ui/skeleton'

interface IProps {}

const ExampleSkeletonComponent: FC<Readonly<IProps>> = () => {
  return (
    <div className='bg-background flex min-h-screen items-center justify-center px-4 py-12'>
      <Card className='w-full max-w-md rounded-sm shadow-md'>
        <CardHeader className='space-y-2'>
          <Skeleton className='h-7 w-1/2' />
          <Skeleton className='h-4 w-3/4' />
        </CardHeader>

        <CardContent className='space-y-4'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </CardContent>
      </Card>
    </div>
  )
}

export default ExampleSkeletonComponent
