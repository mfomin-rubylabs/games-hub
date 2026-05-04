import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { SessionActions, SessionState } from '@/app/shared/interfaces/session.interface'

export const useSessionStore = create<SessionState & SessionActions>()(
  devtools(
    (set) => ({
      accessToken: null,
      user: null,
      isInitialised: false,

      setSession: (token, user) => set({ accessToken: token, user }),

      clearSession: () => set({ accessToken: null, user: null }),

      setInitialised: () => set({ isInitialised: true }),
    }),
    { enabled: process.env.NODE_ENV !== 'production' && typeof window !== 'undefined', name: 'SessionStore' },
  ),
)
