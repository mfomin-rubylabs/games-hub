import { useQuery } from '@tanstack/react-query'

import { fetchGenres } from '@/app/entities/api/games/games.api'

type GenresResponse = {
  id: string
  name: string
  slug: string
}

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,

    select: (data) =>
      data.results.map((genre: GenresResponse) => ({
        id: genre.id,
        label: genre.name,
        value: genre.slug,
      })),
  })
}
