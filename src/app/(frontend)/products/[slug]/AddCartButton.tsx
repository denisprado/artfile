'use client'

import React from 'react'
import { useCart } from '@/contexts/CartContext'
import type { Product, User } from '@/payload-types'
import Link from 'next/link'
// import { usePathname, useRouter } from 'next/navigation' // Adicione esta importação

type Props = {
	product: Product
	user: User | null
}

const AddToCartButton: React.FC<Props> = ({ product, user }) => {
	const { addToCart } = useCart()
	// const router = useRouter()
	// const pathname = usePathname() // Inicialize o router

	const handleAddToCart = () => {
		addToCart(product)
	}
	// const handleLoginRedirect = () => {
	// 	router.push('/admin?redirect=' + encodeURIComponent(pathname)) // Redireciona para a página de login
	// }

	if (!user) {
		return (
			<button className='text-primary'>
				Faça login ou cadastre-se para comprar
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