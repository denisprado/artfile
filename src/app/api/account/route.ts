import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const getUser = async () => {
    try {
      const req = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/users/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await req.json()
      console.log('req', data)

      return data
    } catch (err) {
      console.log(err)
    }
  }

  if (req.method === 'POST') {
    const data = await getUser()
    if (data) {
      try {
        const account = await stripe.accounts.create({
          type: 'express',
          email: 'denisforigo@gmail.com',
          business_type: 'individual',
          individual: {
            first_name: 'Denis',
            last_name: 'Forigo',
          },
          country: 'BR',
          metadata: {
            userId: '672ccce99e76f8f771df915e',
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
