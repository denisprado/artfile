'use client'

import { useCart } from '@/contexts/CartContext'
import type { Product, User } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'


export type Props = {
	product: Product
	appearence?: 'primary' | 'secondary'
	label?: "Adicionar ao carrinho" | "Comprar"
	referer?: "cart" | "productPage"
}

const AddToCartButton: React.FC<Props> = ({ product, label = "Adicionar ao carrinho", appearence = 'secondary', referer = "productPage" }) => {
	const { addToCart } = useCart()
	const [userStripe, setUserStripe] = useState('')
	const router = useRouter()
	useEffect(() => {
		async function fetchData() {
			const userStripe = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${(product?.createdBy as User)?.id}`)
			const user = await userStripe.json()
			setUserStripe(user?.stripe)
			return user
		}
		product && fetchData()
	}, [product])


	const handleAddToCart = () => {
		userStripe && addToCart(product, userStripe)
		referer === 'cart' && router.push('/cart')
	}

	return (
		<Button
			onClick={handleAddToCart}
			label={label} appearance={appearence}
		>
		</Button>
	)
}

export default AddToCartButton