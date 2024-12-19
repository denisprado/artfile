import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const requ = await req.json()
      const account = requ.account

      const accountLink = await stripe.accountLinks.create({
        account: account,
        refresh_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/?stripe=${account}&refresh=true`,
        return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard?stripe=${account}&return=true`,
        type: 'account_onboarding',
      })

      return NextResponse.json({
        url: accountLink.url,
      })
    } catch (error) {
      console.error(
        'An error occurred when calling the Stripe API to create an account link:',
        error,
      )
      return NextResponse.json({ error: error.message }, { status: 500 }) // Retornando o erro com status 500
    }
  }
}
