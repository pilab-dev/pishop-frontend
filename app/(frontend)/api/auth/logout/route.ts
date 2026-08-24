import { NextRequest, NextResponse } from 'next/server'
import client from '@/lib/client/PiShopClient'
import { clearAuthCookies, REFRESH_TOKEN_COOKIE } from '../cookies'

export async function POST(req: NextRequest): Promise<Response> {
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value

  if (refreshToken) {
    await client.logout(refreshToken)
  }

  const response = NextResponse.json({ success: true })
  clearAuthCookies(response)
  return response
}
