import { addFavoriteDB, removeFavoriteDB } from '@/app/entities/api/favorites'
import { FavoriteGame } from '@/app/entities/models'
import { useFavoritesStore } from '@/app/shared/hooks'
import { useSessionStore } from '@/app/shared/store'

export const useToggleFavorites = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()
  const isLoggedIn = useSessionStore((s) => !!s.accessToken)

  const toggleFavorite = async (game: FavoriteGame) => {
    const favorite = isFavorite(game.id)

    if (favorite) {
      removeFavorite(game.id)
      if (isLoggedIn) {
        try {
          await removeFavoriteDB(game.id)
        } catch {
          addFavorite(game)
        }
      }
    } else {
      addFavorite(game)
      if (isLoggedIn) {
        try {
          await addFavoriteDB(game.id)
        } catch {
          removeFavorite(game.id)
        }
      }
    }
  }

  return { toggleFavorite, isFavorite }
}
