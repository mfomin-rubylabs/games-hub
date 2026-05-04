import ky from 'ky'

import { SessionUser } from '@/app/shared/interfaces/session.interface'

type RefreshResult = { success: true; accessToken: string; user: SessionUser } | { success: false }

export const refreshSession = async (): Promise<RefreshResult> => {
  try {
    return await ky.post('/api/auth/refresh').json<RefreshResult>()
  } catch {
    return { success: false }
  }
}
