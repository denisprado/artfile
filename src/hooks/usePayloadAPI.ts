import { useState, useCallback } from 'react'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { Media, Product } from '@/payload-types'

export const usePayloadAPI = async () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const payload = await getPayload({ config: payloadConfig })
  const createStore = useCallback(
    async (formData: FormData) => {
      setLoading(true)
      setError(null)
      try {
        const response = await payload.create({
          collection: 'stores',
          data: {
            name: formData.get('name') as string,
            owner: formData.get('owner') as string,
          },
        })
        setLoading(false)
        return response
      } catch (err) {
        setError(err.message)
        setLoading(false)
        throw err
      }
    },
    [payload],
  )

  const updateStore = useCallback(
    async (id: string, formData: FormData) => {
      setLoading(true)
      setError(null)
      try {
        const response = await payload.update({
          collection: 'stores',
          id,
          data: Object.fromEntries(formData),
        })
        setLoading(false)
        return response
      } catch (err) {
        setError(err.message)
        setLoading(false)
        throw err
      }
    },
    [payload],
  )

  const uploadProduct = useCallback(
    async (formData: FormData) => {
      setLoading(true)
      setError(null)
      try {
        const response = await payload.create({
          collection: 'products',
          data: {
            name: formData.get('name') as string,
            price: Number(formData.get('price')) as number,
            fileArt: formData.get('fileArt') as Product['fileArt'],
            seller: formData.get('seller') as string,
          },
        })
        setLoading(false)
        return response
      } catch (err) {
        setError(err.message)
        setLoading(false)
        throw err
      }
    },
    [payload],
  )

  const getSales = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await payload.find({
        collection: 'orders',
        // Adicione aqui os parâmetros necessários para filtrar as vendas do vendedor atual
      })
      setLoading(false)
      return response.docs
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }, [payload])

  return {
    createStore,
    updateStore,
    uploadProduct,
    getSales,
    loading,
    error,
  }
}
