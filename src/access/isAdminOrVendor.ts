import { checkRole } from '@/collections/Users/checkRole'

export const isAdminOrVendor = ({ req: { user } }) => {
  // Scenario #1 - Check if user has the 'vendor' role
  if (checkRole(['admin'], user)) {
    return true
  } else if (checkRole(['vendor'], user)) {
    return true
  } else {
    return false
  }
}
