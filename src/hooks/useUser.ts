import { useState, useEffect } from 'react'
import payload from 'payload'

interface User {
  id: string
  email: string
  isVendor: boolean
  // Adicione outros campos do usuário conforme necessário
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await payload.auth.me()
        if (response.user) {
          setUser(response.user as User)
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

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await payload.login({
        collection: 'users',
        data: { email, password },
      })
      setUser(response.user as User)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await payload.logout()
      setUser(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading,
    error,
    login,
    logout,
  }
}
