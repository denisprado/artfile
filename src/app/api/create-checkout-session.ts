import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { items, userId } = req.body

      if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items provided' })
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: { name: any; price: number; quantity: any }) => ({
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
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
        metadata: {
          userId,
        },
      })

      res.status(200).json({ sessionId: session.id })
    } catch (err) {
      console.error('Error creating checkout session:', err)
      res.status(500).json({ error: 'Error creating checkout session' })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
