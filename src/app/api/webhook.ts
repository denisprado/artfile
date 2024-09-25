import { buffer } from 'micro'
import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import Stripe from 'stripe'

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

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig as string, webhookSecret as string)
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }
    const session = event.data.object
    switch (event.type) {
      case 'payment_intent.canceled':
        const paymentIntentCanceled = event.data.object
        // Then define and call a function to handle the event payment_intent.canceled
        break
      case 'payment_intent.created':
        const paymentIntentCreated = event.data.object
        // Then define and call a function to handle the event payment_intent.created
        break
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object
        // Then define and call a function to handle the event payment_intent.succeeded
        await updateOrderStatus(session)

        // Enviar e-mail de confirmação
        await sendConfirmationEmail(session)
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export async function updateOrderStatus(session) {
  const orderId = session.metadata.orderId
  const payload = await getPayload({ config: payloadConfig })

  await payload.update({
    collection: 'orders',
    id: orderId,
    data: {
      status: 'paid',
      // Removendo o campo stripeSessionId, pois não existe no tipo esperado
    },
  })
}

async function sendConfirmationEmail(session) {
  const userEmail = session.customer_details.email
  const orderId = session.metadata.orderId

  // Aqui você pode usar uma biblioteca de e-mail como nodemailer
  // ou um serviço de e-mail como SendGrid para enviar o e-mail
  // Este é apenas um exemplo simplificado
  console.log(`Enviando e-mail de confirmação para ${userEmail} para o pedido ${orderId}`)
}

// async function handleSuccessfulSubscription(invoice) {
//   const subscriptionId = invoice.subscription
//   const customerId = invoice.customer
//   const payload = await getPayload({ config: payloadConfig })

//   await payload.update({
//     collection: 'users',
//     where: {
//       stripeCustomerId: customerId,
//     },
//     // data: {
//     //   stripeSubscriptionStatus: 'active',
//     //   stripeSubscriptionId: subscriptionId,
//     // },
//   })
// }

// async function handleFailedSubscription(invoice) {
//   const customerId = invoice.customer
//   const payload = await getPayload({ config: payloadConfig })

//   await payload.update({
//     collection: 'users',
//     where: {
//       stripeCustomerId: customerId,
//     },
//     data: {
//       subscriptionStatus: 'failed',
//     },
//   })
// }

export default cors(webhookHandler)
