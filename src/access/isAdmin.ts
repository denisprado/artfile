import { checkRole } from '@/collections/Users/checkRole'

export const isAdmin = ({ req: { user } }) => {
  // Scenario #1 - Check if user has the 'admin' role
  if (checkRole(['admin'], user)) {
    return true
  } else {
    return false
  }
}
