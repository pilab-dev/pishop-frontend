import { NextResponse } from 'next/server'
import type { AuthUser } from '@/lib/client/types'

export const ACCESS_TOKEN_COOKIE = 'ps_at'
export const REFRESH_TOKEN_COOKIE = 'ps_rt'
export const USER_COOKIE = 'ps_user'

const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 // 24 hours, matches auth-service's access token TTL
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30 // 30 days, matches auth-service's refresh token TTL

const isProduction = process.env.NODE_ENV === 'production'

export function setAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
  user: AuthUser,
): void {
  response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_TOKEN_MAX_AGE,
  })

  response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: REFRESH_TOKEN_MAX_AGE,
  })

  response.cookies.set(USER_COOKIE, JSON.stringify(user), {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: REFRESH_TOKEN_MAX_AGE,
  })
}

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.delete(ACCESS_TOKEN_COOKIE)
  response.cookies.delete(REFRESH_TOKEN_COOKIE)
  response.cookies.delete(USER_COOKIE)
}
