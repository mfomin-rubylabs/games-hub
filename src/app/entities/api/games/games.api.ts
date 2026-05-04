import ky from 'ky'

import { FilterTypes, GamesListFilters } from '@/app/entities/models'
import { Game, GamesResponse } from '@/app/entities/models/game.model'
import { createClient } from '@/pkg/supabase/client'

export const fetchGames = async (filters: GamesListFilters): Promise<GamesResponse> => {
  const PAGE_SIZE = 10
  const from = (filters.page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1
  const supabase = createClient()

  let query = supabase.from('games').select('*', { count: 'exact' }).range(from, to)

  if (filters.search?.trim()) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  if (filters.genre) {
    query = query.contains('genres', [filters.genre])
  }

  if (filters.platform) {
    query = query.contains('platforms', [filters.platform])
  }

  if (filters.filter !== '') {
    switch (filters.filter) {
      case FilterTypes.RATINGASC:
        query = query.order('rating', { ascending: true })
        break
      case FilterTypes.RATINGDESC:
        query = query.order('rating', { ascending: false })
        break
      case FilterTypes.YEARASC:
        query = query.order('released', { ascending: true })
        break
      case FilterTypes.YEARDESC:
        query = query.order('released', { ascending: false })
        break
    }
  }

  const { data, error, count } = await query

  if (error) {
    throw new Error(`Failed to fetch games: ${error.message}`)
  }

  return {
    results: data || [],
    count: count ?? 0,
    next: count !== null ? to + 1 < count : false,
    previous: filters.page > 1,
  }
}

export const fetchGame = async (id: string): Promise<Game> => {
  const supabase = createClient()

  const query = supabase.from('games').select('*').eq('id', id)

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch games: ${error}`)
  }

  return data[0]
}

type RawgListResponse<T> = { results: T[] }

export const fetchGenres = async () => {
  return ky
    .get(`https://api.rawg.io/api/genres?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
    .json<RawgListResponse<{ id: string; name: string; slug: string }>>()
}

export const fetchPlatforms = async () => {
  return ky
    .get(`https://api.rawg.io/api/platforms?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
    .json<RawgListResponse<{ id: string; name: string; slug: string }>>()
}
