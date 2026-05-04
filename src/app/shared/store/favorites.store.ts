import { FavoriteGame } from '@/app/entities/models/favorite.model'

export interface FavoritesStore {
  favorites: Record<number, FavoriteGame>

  setFavorites: (games: FavoriteGame[]) => void

  addFavorite: (game: FavoriteGame) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}
