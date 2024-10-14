import { Access } from 'payload'
import { checkRole } from '../checkRole'

const adminsOrNotUnauthenticated: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
  } else {
    return true
  }

  return false
}

export default adminsOrNotUnauthenticated
