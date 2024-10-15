'use client'

import { useCart } from '@/contexts/CartContext'
import type { Product } from '@/payload-types'
import React from 'react'

import { Button } from '@/components/Button'
// import { usePathname, useRouter } from 'next/navigation' // Adicione esta importação

type Props = {
	product: Product
}

const AddToCartButton: React.FC<Props> = ({ product }) => {
	const { addToCart } = useCart()

	const handleAddToCart = () => {
		addToCart(product)
	}

	return (
		<Button
			className='no-click'
			onClick={handleAddToCart}
			type='button' label='Adicionar ao carrinho' appearance='secondary'
		>
		</Button>
	)
}

export default AddToCartButton