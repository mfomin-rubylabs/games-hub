import ky from 'ky'

import { FavoriteGame } from '@/app/entities/models/favorite.model'
import { useSessionStore } from '@/app/shared/store/session.store'

const authHeader = (): Record<string, string> => {
  const token = useSessionStore.getState().accessToken
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const fetchFavoritesDB = async (): Promise<{ game_id: number }[]> => {
  return ky.get('/api/favorites', { headers: authHeader() }).json()
}

export const addFavoriteDB = async (gameId: number): Promise<void> => {
  await ky.post('/api/favorites', { headers: authHeader(), json: { gameId } })
}

export const removeFavoriteDB = async (gameId: number): Promise<void> => {
  await ky.delete('/api/favorites', { headers: authHeader(), json: { gameId } })
}

export const syncFavoritesOnLogin = async (localFavorites: FavoriteGame[]): Promise<number[]> => {
  const localIds = localFavorites.map((f) => f.id)
  const { mergedIds } = await ky
    .post('/api/favorites/sync', { headers: authHeader(), json: { localIds } })
    .json<{ mergedIds: number[] }>()
  return mergedIds
}
