import { checkRole } from '@/collections/Users/checkRole'
import type { Access } from 'payload'

export const adminsOrOrderedBy: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  return {
    createdBy: {
      equals: user?.id,
    },
  }
}
