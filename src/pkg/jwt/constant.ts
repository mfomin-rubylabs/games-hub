export const JWT_CONFIG = {
  accessTokenExpiry: '15m',
  refreshTokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
} as const

export const SESSION_HINT_COOKIE = 'has_session'
