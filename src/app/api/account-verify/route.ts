import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const requ = await req.json()
      const user = requ?.user

      const accounts = await stripe.accounts.list()

      const stripeAccountOfUser = accounts.data.find(
        (account) => account?.metadata?.userId === user?.id,
      )

      return NextResponse.json({ stripeAccountOfUser: stripeAccountOfUser })
    } catch (error) {
      console.error('An error occurred when calling the Stripe API to create an account:', error)
      // res.status(500);
      return NextResponse.json({ error: error.message })
    }
  }
}
