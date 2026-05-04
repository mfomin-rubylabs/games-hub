import { NextRequest, NextResponse } from 'next/server'

import { jwt } from '@/pkg/jwt'
import { createAdminClient } from '@/pkg/supabase/admin'

async function getUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return null
  const payload = await jwt.verifyAccessToken(token)
  return payload?.userId ?? null
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req)
  if (!userId) return NextResponse.json(null, { status: 401 })

  const { localIds }: { localIds: number[] } = await req.json()

  const supabase = createAdminClient()
  const { data: dbFavorites, error } = await supabase.from('favorites').select('game_id').eq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const dbIds = new Set(dbFavorites.map((f) => f.game_id))
  const toInsert = localIds.filter((id) => !dbIds.has(id)).map((id) => ({ user_id: userId, game_id: id }))

  if (toInsert.length > 0) {
    const { error: insertError } = await supabase.from('favorites').insert(toInsert)
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ mergedIds: Array.from(new Set([...dbIds, ...localIds])) })
}
