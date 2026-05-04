import { type FC } from 'react'

import { GameDetailsSkeletonComponent } from '@/app/modules/game-details'

interface IProps {}

const Loading: FC<Readonly<IProps>> = () => {
  return <GameDetailsSkeletonComponent />
}

export default Loading
