'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { stripePromise } from '@/lib/stripe'
import { getMeUserClient } from '@/utilities/getMeUserClient'
import type { User } from '@/payload-types'
import qs from 'qs'
import { Button } from '@/components/Button'

const Cart: React.FC = () => {
	const { cart, removeFromCart, getCartTotal } = useCart()
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			const { user } = await getMeUserClient()
			setUser(user)
			setIsLoading(false)
		}
		fetchUser()
	}, [])

	const handleCheckout = async () => {
		try {

			const order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/create`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					products: cart.map(item => (
						item.product.id
					)),
					totalAmount: getCartTotal(),
					paymentId: null,
					createdBy: user?.id,
					status: 'unpaid'
				})
			})



			const orderResponse = await order.json()
			const orderId = orderResponse?.doc?.id

			const response = await fetch('/api/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					items: cart.map(item => ({
						name: item.product.name,
						price: item.product.price,
						quantity: item.quantity,
					})),
					userId: user?.id,
					orderId: orderId
				}),
			});

			const { session } = await response.json();
			const sessionId = session?.id


			if (!response.ok) {
				throw new Error('Network response was not ok');
			}




			// Redirecionar para o checkout do Stripe
			const stripe = await stripePromise;
			if (stripe) {
				const { error } = await stripe.redirectToCheckout({ sessionId });
				if (error) {
					console.error('Stripe redirect error:', error);
				}
			} else {
				console.error('Stripe não foi inicializado corretamente');
			}
		} catch (error) {
			console.error('Error initiating checkout:', error);
		}
	}

	return (
		<Suspense>
			<div className="pt-24 pb-24">
				<div className="container mb-16">
					<h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
					{cart.length === 0 ? (
						<p>Seu carrinho está vazio.</p>
					) : (
						<>
							{cart.map((item) => (
								<div key={item.product.id} className="flex justify-between items-center mb-2">
									<span>{item.product.name} (x{item.quantity})</span>
									<span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
									<button
										onClick={() => removeFromCart(item.product.id)}
										className="text-red-500 hover:text-red-700"
									>
										Remover
									</button>
								</div>
							))}
							<div className="mt-4 text-right">
								<strong>Total: R$ {getCartTotal().toFixed(2)}</strong>
							</div>
							{user ? <Button
								onClick={handleCheckout}
								className="mt-4  w-full"
								appearance='primary'
								disabled={isLoading || !user} label={isLoading ? 'Carregando...' : 'Finalizar Compra'}
							>
							</Button> : <Button label='Faça login ou cadastre-se para continuar' appearance='secondary' href='/admin'></Button>}
						</>
					)}
				</div>
			</div>
		</Suspense>
	)
}

export default Cart
