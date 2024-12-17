import { Access } from 'payload'
import { checkRole } from '../checkRole'

const adminsOrNotUnauthenticated: Access = ({ req }) => {
  if (req && req?.user!) {
    if (checkRole(['admin'], req?.user!)) {
      return true
    }
  } else {
    return true
  }

  return false
}

export default adminsOrNotUnauthenticated
