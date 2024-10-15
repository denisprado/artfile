'use client'

import { useCart } from '@/contexts/CartContext'
import type { Product, User } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/Button'


type Props = {
	product: Product
}

const AddToCartButton: React.FC<Props> = ({ product }) => {
	const { addToCart } = useCart()
	const [userStripe, setUserStripe] = useState('')

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
	}

	return (
		<Button
			href='#'
			onClick={handleAddToCart}
			label='Adicionar ao carrinho' appearance='secondary'
		>
		</Button>
	)
}

export default AddToCartButton