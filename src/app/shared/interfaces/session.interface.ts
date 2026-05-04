export type SessionUser = {
  userId: string
  email: string
  username: string
}

export type SessionState = {
  accessToken: string | null
  user: SessionUser | null
  isInitialised: boolean
}

export type SessionActions = {
  setSession: (token: string, user: SessionUser) => void
  clearSession: () => void
  setInitialised: () => void
}
