import payloadConfig from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function GET(req: Request) {
  const payload = await getPayload({
    config: payloadConfig,
  })
  const res = payload.auth.name
  try {
    if (res) {
      return Response.json({ user: res })
    } else {
      return Response.json({ user: null })
    }
  } catch (error) {
    console.error('Error verifying user:', error)
    return NextResponse.json({ user: null })
  }
}
