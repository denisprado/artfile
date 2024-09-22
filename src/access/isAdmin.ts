export const isAdmin = ({ req: { user } }) => {
  // Scenario #1 - Check if user has the 'admin' role
  if (user && user.role === 'admin') {
    return true
  } else {
    return false
  }
}
