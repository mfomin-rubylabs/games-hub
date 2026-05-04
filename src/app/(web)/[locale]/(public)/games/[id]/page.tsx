import { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { fetchGame } from '@/app/entities/api/games'
import { GameDetailsModule } from '@/app/modules/game-details'

export const revalidate = 3600

export const generateStaticParams = async () => []

interface IProps {
  params: Promise<{
    id: string
    locale: string
  }>
}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { params } = props
  const { id, locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const game = await fetchGame(id)

  if (!game) {
    return { title: t('gameNotFound') }
  }

  return {
    title: game.name,
    description: t('gameDescription', { name: game.name }),
    openGraph: {
      title: game.name,
      images: game.background_image ? [game.background_image] : [],
    },
  }
}

const Page: NextPage<Readonly<IProps>> = async (props) => {
  const { params } = props
  const { id, locale } = await params
  setRequestLocale(locale)

  const game = await fetchGame(id)
  if (!game) {
    notFound()
  }

  return <GameDetailsModule id={id} />
}

export default Page
