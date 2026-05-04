import { type FC } from 'react'

import { GamesListSkeletonComponent } from '@/app/modules/games-list'

interface IProps {}

const Loading: FC<Readonly<IProps>> = () => {
  return <GamesListSkeletonComponent />
}

export default Loading
