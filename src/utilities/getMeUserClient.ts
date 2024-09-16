import type { User } from '../payload-types'

export const getMeUserClient = async (): Promise<{
  user: User | null
}> => {
  try {
    const meUserReq = await fetch('/api/users/me', {
      credentials: 'include',
    })

    const { user } = await meUserReq.json()

    return { user: user || null }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { user: null }
  }
}
