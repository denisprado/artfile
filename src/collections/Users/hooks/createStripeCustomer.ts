import { stripe } from '@/lib/stripe'
import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'

export const createStripeCustomer: BeforeChangeHook = async ({ req, data, operation }) => {
  if (operation === 'create' && !data.stripeCustomerID) {
    try {
      // lookup an existing customer by email and if found, assign the ID to the user
      // if not found, create a new customer and assign the new ID to the user
      const existingCustomer = await stripe.customers.list({
        limit: 1,
        email: data.email,
      })

      if (existingCustomer.data.length) {
        // existing customer found, assign the ID to the user
        return {
          ...data,
          stripeCustomerID: existingCustomer.data[0].id,
        }
      }

      // create a new customer and assign the ID to the user
      const customer = await stripe.customers.create({
        email: data.email,
      })

      return {
        ...data,
        stripeCustomerID: customer.id,
      }
    } catch (error: unknown) {
      req.payload.logger.error(`Error creating Stripe customer: ${error}`)
    }
  }

  return data
}
