import crypto from 'crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { jwt, SESSION_HINT_COOKIE } from '@/pkg/jwt'
import { createClient } from '@/pkg/supabase/server'

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh_token')?.value

  if (!refreshToken) {
    cookieStore.delete(SESSION_HINT_COOKIE)
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

  const supabaseClient = await createClient()

  const { data: session } = await supabaseClient
    .from('sessions')
    .select('user_id, expires_at, users(id, email, username)')
    .eq('token_hash', tokenHash)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (!session || !session.users) {
    cookieStore.delete('refresh_token')
    cookieStore.delete(SESSION_HINT_COOKIE)
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const user = session.users as unknown as {
    id: string
    email: string
    username: string
  }

  const accessToken = await jwt.signAccessToken({
    userId: user.id,
    email: user.email,
    username: user.username,
  })

  cookieStore.set(SESSION_HINT_COOKIE, '1', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(session.expires_at),
    path: '/',
  })

  return NextResponse.json({
    success: true,
    accessToken,
    user: {
      userId: user.id,
      email: user.email,
      username: user.username,
    },
  })
}
