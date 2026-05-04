import ky from 'ky'

import { createClient } from '@supabase/supabase-js'

import 'dotenv/config'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const PAGE_SIZE = 10
const MAX_PAGES = 20
const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY!

type RawgGenre = { name: string }
type RawgPlatformEntry = { platform: { name: string } }
type RawgGame = {
  id: number
  name: string
  background_image: string
  released: string | null
  rating: number
  metacritic: number | null
  genres: RawgGenre[]
  platforms: RawgPlatformEntry[]
}
type RawgScreenshot = { id: number; image: string }

const fetchGamesPage = (page: number) =>
  ky
    .get(`https://api.rawg.io/api/games?key=${RAWG_KEY}&page=${page}&page_size=${PAGE_SIZE}`)
    .json<{ results: RawgGame[] }>()

const fetchScreenshots = async (gameId: number): Promise<string[]> => {
  try {
    const data = await ky
      .get(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${RAWG_KEY}`)
      .json<{ results: RawgScreenshot[] }>()
    return data.results.map((s) => s.image)
  } catch {
    return []
  }
}

const seed = async () => {
  for (let page = 1; page <= MAX_PAGES; page++) {
    console.log(`Fetching page ${page}/${MAX_PAGES}...`)

    const { results } = await fetchGamesPage(page)

    const screenshots = await Promise.all(results.map((g) => fetchScreenshots(g.id)))

    const games = results.map((game, i) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      released: game.released || null,
      rating: game.rating,
      metacritic: game.metacritic || null,
      genres: game.genres?.map((g) => g.name) ?? [],
      platforms: game.platforms?.map((p) => p.platform.name) ?? [],
      screenshots: screenshots[i],
    }))

    const { error } = await supabase.from('games').upsert(games, { onConflict: 'id' })

    if (error) {
      console.error(`Error on page ${page}:`, error)
      return
    }

    console.log(`Inserted page ${page} (${games.length} games)`)
  }

  console.log('Seeding complete.')
}

seed()
