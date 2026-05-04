import { NextPage } from 'next'

import { GamesListModule } from '@/app/modules/games-list'

interface IProps {}

const Page: NextPage<Readonly<IProps>> = () => {
  return <GamesListModule />
}

export default Page
