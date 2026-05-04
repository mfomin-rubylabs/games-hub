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

export async function GET(req: NextRequest) {
  const userId = await getUserId(req)
  if (!userId) return NextResponse.json(null, { status: 401 })

  const supabase = createAdminClient()
  const { data, error } = await supabase.from('favorites').select('game_id').eq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req)
  if (!userId) return NextResponse.json(null, { status: 401 })

  const { gameId }: { gameId: number } = await req.json()

  const supabase = createAdminClient()
  const { error } = await supabase.from('favorites').insert({ user_id: userId, game_id: gameId })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserId(req)
  if (!userId) return NextResponse.json(null, { status: 401 })

  const { gameId }: { gameId: number } = await req.json()

  const supabase = createAdminClient()
  const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('game_id', gameId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
