'use client'

import { Button } from '@/components/Button'
import { useCart } from '@/contexts/CartContext'
import { User } from '@/payload-types'
import { useRouter } from 'next/navigation'
import React from 'react'

const CartClient: React.FC<{ user: User | null }> = ({ user }) => {
	const { cart, removeFromCart, getCartTotal } = useCart()
	const router = useRouter()
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
					orderId: orderId,
					userStripe: (cart[0]?.product?.createdBy as User)?.stripe
				}),
			});

			const { session } = await response.json();
			const sessionId = session?.id
			if (session && session.url) {

				router.push(session.url)
			}

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

		} catch (error) {
			console.error('Error initiating checkout:', error);
		}
	}

	return (
		<>
			{cart.length === 0 ? (
				<p>Seu carrinho está vazio.</p>
			) : (
				<>
					{cart.map((item) => (
						<div key={item.product.id} className="flex justify-between items-center mb-2">
							<span>{item.product.name} (x{item.quantity})</span>
							<span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
							<span>{(item.product.createdBy as User).stripe} (x{item.quantity})</span>
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
						className="mt-4 w-full"
						appearance='primary'
						label='Finalizar Compra'
					>
					</Button> : <Button label='Faça login ou cadastre-se para continuar' appearance='secondary' href='/admin'></Button>}
				</>
			)}
		</>
	)
}

export default CartClient
