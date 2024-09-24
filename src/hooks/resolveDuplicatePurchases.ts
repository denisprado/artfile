import { User } from '@/payload-types'
import { FieldHook } from 'payload'

export const resolveDuplicatePurchases: FieldHook<User> = async ({ value, operation }) => {
  if ((operation === 'create' || operation === 'update') && value) {
    return Array.from(
      new Set(
        value?.map((purchase) => (typeof purchase === 'object' ? purchase.id : purchase)) || [],
      ),
    )
  }

  return
}
