import { useQuery } from '@tanstack/react-query'

import { fetchGame, fetchGames } from '@/app/entities/api/games/games.api'
import { GamesListFilters } from '@/app/entities/models'
import { Game, GamesResponse } from '@/app/entities/models/game.model'

export const useGame = (id: string) => {
  const { isLoading, isError, data, error, refetch } = useQuery<Game, Error>({
    queryKey: ['game', id],
    queryFn: () => fetchGame(id),
  })

  return {
    isLoading,
    isError,
    data,
    error,
    refetch,
  }
}

export const useGames = (filters: GamesListFilters) => {
  const { isLoading, isError, data, error, isFetching, refetch } = useQuery<GamesResponse, Error>({
    queryKey: ['games', filters],
    queryFn: () => fetchGames(filters),
    placeholderData: (previousData) => previousData,
  })

  return {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    refetch,
  }
}
