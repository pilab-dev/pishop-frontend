import { NextRequest, NextResponse } from 'next/server'
import client from '@/lib/client/PiShopClient'
import { setAuthCookies } from '../cookies'

export async function POST(req: NextRequest): Promise<Response> {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { success: false, errors: [{ code: 'VALIDATION_ERROR', message: 'Email and password are required' }] },
      { status: 400 },
    )
  }

  const payload = await client.login(email, password)

  if (!payload.success || !payload.token || !payload.refreshToken || !payload.user) {
    return NextResponse.json(
      { success: false, errors: payload.errors || [{ code: 'LOGIN_FAILED', message: 'Login failed' }] },
      { status: 401 },
    )
  }

  const response = NextResponse.json({ success: true, user: payload.user })
  setAuthCookies(response, payload.token, payload.refreshToken, payload.user)
  return response
}
