// @ts-nocheck — template file; path aliases and types are illustrative only
// example API client — raw fetch functions; no React, no hooks
// use ky for external APIs (RAWG), supabase client for DB queries
import ky from 'ky'

import { createClient } from '@/pkg/supabase/client'

// interface for all object shapes — never type alias
export interface ExampleItem {
  id: number
  name: string
  createdAt: string
}

export interface ExampleListResponse {
  results: ExampleItem[]
  count: number
}

export const fetchExampleItems = async (): Promise<ExampleListResponse> => {
  const supabase = createClient()
  const { data, error, count } = await supabase
    .from('example_items')
    .select('*', { count: 'exact' })

  if (error) {
    throw new Error(`Failed to fetch items: ${error.message}`)
  }

  return { results: data ?? [], count: count ?? 0 }
}

export const fetchExampleItem = async (id: number): Promise<ExampleItem> => {
  const supabase = createClient()
  const { data, error } = await supabase.from('example_items').select('*').eq('id', id).single()

  if (error) {
    throw new Error(`Failed to fetch item: ${error.message}`)
  }

  return data
}

// ky example for an external REST API
interface RawgGenre {
  id: number
  name: string
  slug: string
}

export const fetchExternalData = async () => {
  return ky
    .get(`https://api.example.com/items?key=${process.env.NEXT_PUBLIC_API_KEY}`)
    .json<{ results: RawgGenre[] }>()
}
