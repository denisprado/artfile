import { User } from '@/payload-types'

const getUser = async () => {
  try {
    const req = await fetch('/api/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await req.json()
    return data.user as User
  } catch (err) {
    console.log(err)
    return null
  }
}

export default getUser
