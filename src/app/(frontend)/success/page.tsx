'use client'

import React, { useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

const SuccessPage: React.FC = () => {
	const { clearCart } = useCart()

	useEffect(() => {
		clearCart()
	}, [])

	return (
		<div className="container mx-auto px-4 py-8 text-center">
			<h1 className="text-3xl font-bold mb-4">Compra realizada com sucesso!</h1>
			<p className="mb-4">Obrigado por sua compra. Você receberá um e-mail com os detalhes do pedido.</p>
			<Link href="/" className="text-blue-500 hover:text-blue-700">
				Voltar para a página inicial
			</Link>
		</div>
	)
}

export default SuccessPage
