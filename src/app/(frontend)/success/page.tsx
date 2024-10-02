'use client'

import React, { useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { Button } from '@/components/Button'

const SuccessPage: React.FC = () => {
	const { clearCart } = useCart()

	useEffect(() => {
		clearCart()
	}, [])

	return (
		<div className="container mx-auto px-4 py-8 text-center">
			<h1 className="text-3xl font-bold mb-4">Compra realizada com sucesso!</h1>
			<p className="mb-4">Obrigado por sua compra.</p>
			<Button href="/orders" label='Acesse Minhas Compras para acessar os arquivos' />

		</div>
	)
}

export default SuccessPage
