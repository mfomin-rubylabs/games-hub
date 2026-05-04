'use client'

import { ArrowRight, Heart } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { FavoriteGame, Game } from '@/app/entities/models'
import { useToggleFavorites } from '@/app/features/toggle-favorite'
import { useFavoritesStore } from '@/app/shared/hooks'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/pkg/theme/ui/card'

interface IProps {
  game: Game | FavoriteGame
}

const GameCardComponent: FC<Readonly<IProps>> = (props) => {
  const { game } = props
  const t = useTranslations('games')
  const router = useRouter()
  const favorite = useFavoritesStore((s) => !!s.favorites[game.id])
  const toggleFavorite = useToggleFavorites().toggleFavorite

  return (
    <Card
      data-testid='game-card'
      onClick={() => router.push(`/games/${game.id}`)}
      className='group bg-card cursor-pointer overflow-hidden rounded-sm p-0 shadow-md transition-shadow hover:shadow-lg'
    >
      {/* Cover */}
      <div className='relative flex aspect-video w-full overflow-hidden'>
        <div className='bg-muted absolute inset-0 animate-pulse' />
        <Image
          src={game.background_image}
          alt={game.name}
          sizes='auto'
          fill
          loading='eager'
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />
      </div>

      {/* Title */}
      <CardHeader className='p-3'>
        <CardTitle data-testid='game-card-title' className='line-clamp-2 text-left text-sm'>
          {game.name}
        </CardTitle>

        <CardDescription className='text-muted-foreground text-left text-xs'>
          {game.released ? game.released.split('-')[0] : t('tba')}
        </CardDescription>
      </CardHeader>

      {/* Actions */}
      <CardContent className='flex justify-between px-3 pb-3'>
        <Button
          variant={'ghost'}
          data-testid='favorite-button'
          data-favorited={favorite}
          className='cursor-pointer opacity-100 transition-opacity duration-300 group-hover:opacity-100 hover:!bg-transparent md:opacity-0'
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite({
              id: game.id,
              name: game.name,
              background_image: game.background_image,
              released: game.released,
            })
          }}
        >
          {favorite ? <Heart fill={'red'} className='h-5 w-5' /> : <Heart className='h-5 w-5 bg-transparent' />}
        </Button>

        <Button
          variant={'ghost'}
          className='cursor-pointer opacity-100 transition-opacity duration-300 group-hover:opacity-100 hover:!bg-transparent md:opacity-0'
          size='icon'
        >
          <ArrowRight className='h-4 w-4' />
        </Button>
      </CardContent>
    </Card>
  )
}

export default GameCardComponent
