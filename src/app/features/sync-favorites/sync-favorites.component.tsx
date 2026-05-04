'use client'

import { type FC, type ReactNode } from 'react'

import { useSyncFavorites } from '@/app/entities/api/favorites'

interface IProps {
  children: ReactNode
}

const SyncFavoritesComponent: FC<Readonly<IProps>> = (props) => {
  const { children } = props
  useSyncFavorites()

  return <>{children}</>
}

export default SyncFavoritesComponent
