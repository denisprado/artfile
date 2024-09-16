'use client'

import { useState, useEffect } from 'react'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

interface User {
  id: string
  email: string
  isVendor: boolean
  // Adicione outros campos do usuário conforme necessário
}

export const useUser = async () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const payload = await getPayload({ config: payloadConfig })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me')
        const data = await response.json()
        if (data.user) {
          setUser(data.user as User)
        } else {
          setUser(null)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return {
    user,
    isLoading,
    error,
  }
}
