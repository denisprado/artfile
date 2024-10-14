import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    try {
      const requ = await req.json()
      const account = requ.account

      const accountReturned = await stripe.accounts.retrieve(account)

      return NextResponse.json({ accountReturned: accountReturned })
    } catch (error) {
      console.error('An error occurred when calling the Stripe API to create an account:', error)
      // res.status(500);
      return NextResponse.json({ error: error.message })
    }
  }
}
