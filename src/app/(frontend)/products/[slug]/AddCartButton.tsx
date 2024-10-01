'use client'

import React from 'react'
import { useCart } from '@/contexts/CartContext'
import type { Product, User } from '@/payload-types'
import Link from 'next/link'

import { ShoppingCartIcon } from 'lucide-react'
import { Button } from '@/components/Button'
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



	return (
		<button
			className='no-click'

			onClick={handleAddToCart}
			type='button'

		>Adicionar ao carrinho
		</button>
	)
}

export default AddToCartButton