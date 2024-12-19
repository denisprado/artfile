import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const data = await req.json()

    if (data) {
      try {
        const account = await stripe.accounts.create({
          type: 'express',
          email: data.email,
          business_type: 'individual',
          individual: {
            first_name: data.name.split(' ')[0],
            last_name: data.name.split(' ')[1],
          },
          country: 'BR',
          metadata: {
            userId: data.userId,
          },
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
        })

        return NextResponse.json({ account: account.id })
      } catch (error) {
        console.error('An error occurred when calling the Stripe API to create an account:', error)
        return NextResponse.json({ error: error.message })
      }
    }
  }
}
