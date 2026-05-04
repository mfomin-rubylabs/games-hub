export interface Genre {
  id: string
  name: string
}

export interface GenreFilter {
  id: string
  label: string
  value: string
}

export interface Platform {
  id: string
  name: string
}

export interface PlatformFilter {
  label: string
  value: string
}

export interface Game {
  id: number
  name: string
  released: string
  background_image: string
  rating: number
  metacritic: string
  genres: string[]
  platforms: string[]
  screenshots?: string[]

  parent_platforms: { platform: Platform }[]
}

export interface GamesResponse {
  results: Game[]
  count: number
  next: boolean | null
  previous: boolean | null
}
