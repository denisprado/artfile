'use client'

import React, { useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { Button } from '@/components/Button'
import PageContainer from '@/components/PageContainer'

const SuccessPage: React.FC = () => {
	const { clearCart } = useCart()

	useEffect(() => {
		clearCart()
	}, [])

	return (
		<PageContainer>
			<h1 className="text-3xl font-bold mb-4">Compra realizada com sucesso!</h1>
			<p className="mb-4">Obrigado por sua compra.</p>
			<Button appearance='primary' href="/orders" label='Minhas Compras' />

		</PageContainer>
	)
}

export default SuccessPage
