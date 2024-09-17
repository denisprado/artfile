'use client'

import React from 'react'
import { useCart } from '@/contexts/CartContext'
import type { Product, User } from '@/payload-types'

type Props = {
	product: Product
	user: User | null
}

const AddToCartButton: React.FC<Props> = ({ product, user }) => {
	const { addToCart } = useCart()

	const handleAddToCart = () => {
		addToCart(product)
	}

	if (!user) {
		return (
			<button
				className="bg-gray-300 text-gray-600 px-6 py-2 rounded cursor-not-allowed"
				disabled
			>
				Faça login para comprar
			</button>
		)
	}

	return (
		<button
			onClick={handleAddToCart}
			className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
		>
			Adicionar ao Carrinho
		</button>
	)
}

export default AddToCartButton