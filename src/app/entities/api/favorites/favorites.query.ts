import { useEffect } from 'react'

import { syncFavoritesOnLogin } from '@/app/entities/api/favorites/favorites.api'
import { useFavoritesStore } from '@/app/shared/hooks/use-favorites-store.hook'
import { useSessionStore } from '@/app/shared/store/session.store'
import { createClient } from '@/pkg/supabase/client'

export const useSyncFavorites = () => {
  const user = useSessionStore((s) => s.user)
  const setFavorites = useFavoritesStore((s) => s.setFavorites)
  const favoritesMap = useFavoritesStore((s) => s.favorites)
  const supabase = createClient()

  useEffect(() => {
    if (!user) return

    const sync = async () => {
      const localFavorites = Object.values(favoritesMap)
      const mergedIds = await syncFavoritesOnLogin(localFavorites)

      if (mergedIds.length === 0) {
        setFavorites([])
        return
      }

      const { data: games, error } = await supabase.from('games').select('*').in('id', mergedIds)

      if (error) throw error

      setFavorites(games || [])
    }

    sync()
  }, [user])
}
