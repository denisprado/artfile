import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { priceId, userId } = body

    if (!priceId || !userId) {
      return NextResponse.json({ error: 'Price ID and User ID are required' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cancel`,
      metadata: {
        userId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error('Error creating subscription session:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
