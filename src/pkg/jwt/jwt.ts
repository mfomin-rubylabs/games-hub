import { jwtVerify, SignJWT } from 'jose'

import { JWT_CONFIG } from './constant'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export type JwtPayload = {
  userId: string
  email: string
  username: string
}

export const jwt = {
  signAccessToken: async (payload: JwtPayload): Promise<string> => {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(JWT_CONFIG.accessTokenExpiry)
      .sign(secret)
  },
  verifyAccessToken: async (token: string): Promise<JwtPayload | null> => {
    try {
      const { payload } = await jwtVerify(token, secret)
      return payload as unknown as JwtPayload
    } catch {
      return null // expired or tampered
    }
  },
}
