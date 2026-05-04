import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { SessionActions, SessionState } from '@/app/shared/interfaces/session.interface'

export const useSessionStore = create<SessionState & SessionActions>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        user: null,
        isInitialised: false,

        setSession: (token, user) => set({ accessToken: token, user }),

        clearSession: () => set({ accessToken: null, user: null }),

        setInitialised: () => set({ isInitialised: true }),
      }),
      {
        name: 'session-storage',
        version: 1,
        partialize: (state) => ({ accessToken: state.accessToken, user: state.user }),
      },
    ),
    { enabled: process.env.NODE_ENV !== 'production' && typeof window !== 'undefined', name: 'SessionStore' },
  ),
)
