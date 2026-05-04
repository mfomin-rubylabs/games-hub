export enum FilterTypes {
  RATINGASC = 'RATINGASC',
  RATINGDESC = 'RATINGDESC',
  YEARASC = 'YEARASC',
  YEARDESC = 'YEARDESC',
}

export type GamesListFilters = {
  search: string
  genre: string
  platform: string
  filter: FilterTypes | ''
  page: number
}
