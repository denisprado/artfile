import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, userId, orderId, userStripe } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ['card'],
        payment_intent_data: { metadata: { orderId } },
        line_items: items.map((item: { name: string; price: number; quantity: any }) => ({
          price_data: {
            currency: 'brl',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100), // Stripe usa centavos
          },
          quantity: item.quantity,
        })),

        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cancel`,
        metadata: {
          user_id: userId,
          order_id: orderId,
        },
      },
      { stripeAccount: userStripe },
    )

    return NextResponse.json({ session: session })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
