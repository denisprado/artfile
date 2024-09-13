import { buffer } from 'micro'
import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

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

        // Atualizar o status do pedido no banco de dados
        await updateOrderStatus(session)

        // Enviar e-mail de confirmação
        await sendConfirmationEmail(session)

        break
      case 'invoice.paid':
        // Lógica para lidar com pagamentos de assinatura bem-sucedidos
        await handleSuccessfulSubscription(event.data.object)
        break
      case 'invoice.payment_failed':
        // Lógica para lidar com falhas de pagamento de assinatura
        await handleFailedSubscription(event.data.object)
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

async function updateOrderStatus(session) {
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

async function handleSuccessfulSubscription(invoice) {
  const subscriptionId = invoice.subscription
  const customerId = invoice.customer
  const payload = await getPayload({ config: payloadConfig })

  await payload.update({
    collection: 'users',
    where: {
      stripeCustomerId: customerId,
    },
    // data: {
    //   stripeSubscriptionStatus: 'active',
    //   stripeSubscriptionId: subscriptionId,
    // },
  })
}

async function handleFailedSubscription(invoice) {
  const customerId = invoice.customer
  const payload = await getPayload({ config: payloadConfig })

  await payload.update({
    collection: 'users',
    where: {
      stripeCustomerId: customerId,
    },
    data: {
      subscriptionStatus: 'failed',
    },
  })
}

export default cors(webhookHandler)
