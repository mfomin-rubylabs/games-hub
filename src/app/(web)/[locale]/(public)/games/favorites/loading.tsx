import { type FC } from 'react'

import { FavoritesListSkeletonComponent } from '@/app/modules/favorites-list'

interface IProps {}

const Loading: FC<Readonly<IProps>> = () => {
  return <FavoritesListSkeletonComponent />
}

export default Loading
