export type AuthResult<T> = { success: true; data: T } | { success: false; error: string; code: AuthErrorCode }

export type AuthErrorCode = 'EMAIL_TAKEN' | 'INSERT_FAILED' | 'SESSION_FAILED' | 'UNEXPECTED'
