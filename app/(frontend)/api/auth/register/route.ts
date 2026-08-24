import { NextRequest, NextResponse } from 'next/server'
import client from '@/lib/client/PiShopClient'
import { setAuthCookies } from '../cookies'

export async function POST(req: NextRequest): Promise<Response> {
  const { email, password, firstName, lastName, acceptedTerms } = await req.json()

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json(
      { success: false, errors: [{ code: 'VALIDATION_ERROR', message: 'All fields are required' }] },
      { status: 400 },
    )
  }

  if (acceptedTerms !== true) {
    return NextResponse.json(
      {
        success: false,
        errors: [
          {
            code: 'TERMS_NOT_ACCEPTED',
            message: 'You must accept the terms of service to register',
            field: 'acceptedTerms',
          },
        ],
      },
      { status: 400 },
    )
  }

  const payload = await client.register({ email, password, firstName, lastName, acceptedTerms })

  if (!payload.success || !payload.token || !payload.refreshToken || !payload.user) {
    return NextResponse.json(
      { success: false, errors: payload.errors || [{ code: 'REGISTRATION_FAILED', message: 'Registration failed' }] },
      { status: 400 },
    )
  }

  const response = NextResponse.json({ success: true, user: payload.user })
  setAuthCookies(response, payload.token, payload.refreshToken, payload.user)
  return response
}
