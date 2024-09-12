import { buffer } from 'micro'
import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig as string, webhookSecret as string)
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        // Aqui você pode atualizar o pedido no seu banco de dados
        // e conceder acesso ao arquivo comprado
        break
      case 'invoice.paid':
        // Lógica para lidar com pagamentos de assinatura bem-sucedidos
        break
      case 'invoice.payment_failed':
        // Lógica para lidar com falhas de pagamento de assinatura
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default cors(webhookHandler)
