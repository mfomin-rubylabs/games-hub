export interface SessionUser {
  userId: string
  email: string
  username: string
}

export interface SessionState {
  accessToken: string | null
  user: SessionUser | null
  isInitialised: boolean
}

export interface SessionActions {
  setSession: (token: string, user: SessionUser) => void
  clearSession: () => void
  setInitialised: () => void
}
