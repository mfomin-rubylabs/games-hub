export type Genre = {
  id: string
  name: string
}

export type GenreFilter = {
  id: string
  label: string
  value: string
}

export type Platform = {
  id: string
  name: string
}

export type PlatformFilter = {
  label: string
  value: string
}

export type Game = {
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

export type GamesResponse = {
  results: Game[]
  count: number
  next: boolean | null
  previous: boolean | null
}
