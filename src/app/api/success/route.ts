import { stripe } from '@/lib/stripe'
import payloadConfig from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import qs from 'qs'
import Stripe from 'stripe'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { session_id } = body
    const session = await stripe.checkout.sessions.retrieve(session_id)

    try {
      await updateOrderStatus(session)
    } catch (err) {
      console.log(err)
    }

    return NextResponse.json({ sessionId: session_id })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function updateOrderStatus(session: Stripe.Response<Stripe.Checkout.Session>) {
  const payload = await getPayload({ config: payloadConfig })
  const stringifiedQuery = qs.stringify(
    {
      where: {
        paymentId: {
          equals: session?.id,
        },
      },
    },
    { addQueryPrefix: true },
  )
  const update = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders${stringifiedQuery}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: session.payment_status,
      }),
    },
  )
}
