import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { getMeUserServer } from './getMeUserServer'
import { Order } from '@/payload-types'

export async function updateOrderStatus(session: {
  metadata: { order_id: any; user_id: any }
  payment_status: 'unpaid' | 'paid'
}) {
  const orderId = session.metadata?.order_id
  const userId = session.metadata?.user_id
  const payload = await getPayload({ config: payloadConfig })
  await payload.update({
    collection: 'orders',
    where: { id: orderId },
    data: {
      status: session.payment_status,
    },
  })

  const newOrder = await payload.findByID({
    collection: 'orders',
    id: orderId,
  })

  const user = await payload.findByID({
    collection: 'users',
    id: userId,
  })

  const newUserPurchases = (user?.purchases as Order[])?.concat(newOrder)

  try {
    await payload.update({
      collection: 'users',
      where: {
        id: userId,
      },
      data: {
        purchases: newUserPurchases,
      },
    })
  } catch (err) {
    console.log('erro', err)
  }

  // const purchase = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user?.id}`, {
  //   method: 'PATCH',
  //   credentials: 'include',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },

  //   body: JSON.stringify({
  //     purchases: newUserPurchases,
  //   }),
  // })
}
