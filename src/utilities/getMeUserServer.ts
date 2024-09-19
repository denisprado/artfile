import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '../payload-types'

export const getMeUserServer = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  token: string
  user: User | null
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = cookies()
  const token = cookieStore.get('payload-token')?.value

  const meUserReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  const { user } = await meUserReq.json()
  console.log('meUserReq', meUserReq)

  if (validUserRedirect && meUserReq.ok && user) {
    redirect(validUserRedirect)
  }

  if (nullUserRedirect && (!meUserReq.ok || !user)) {
    redirect(nullUserRedirect)
  }

  return { token: token!, user: user || null }
}
