'use client'

import { Button } from '@/components/Button'
import { useCart } from '@/contexts/CartContext'
import { User } from '@/payload-types'
import { useRouter } from 'next/navigation'
import React from 'react'

const CartClient: React.FC<{ user: User | null }> = ({ user }) => {
	const { cart, removeFromCart, getCartTotal } = useCart()
	const router = useRouter()
	const handleCheckout = async (items: typeof cart) => {
		try {
			const order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/create`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					products: items.map(item => (
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
					items: items.map(item => ({
						name: item.product.name,
						price: item.product.price,
						quantity: item.quantity,
						userStripe: (cart[0]?.product?.createdBy as User)?.stripe
					})),
					userId: user?.id,
					orderId: orderId,
					userStripe: (cart[0]?.product?.createdBy as User)?.stripe
				}),
			});

			const { session } = await response.json();

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

	const groupedItems = cart.reduce((acc, item) => {
		const stripeId = (item.product.createdBy as User).stripe;

		if (stripeId && !acc[stripeId]) {
			acc[stripeId] = [];
		}
		if (stripeId) {
			acc[stripeId].push(item);
		}
		return acc;
	}, {} as Record<string, typeof cart>);

	return (
		<>
			{cart.length === 0 ? (
				<p>Seu carrinho está vazio.</p>
			) : (
				<>
					{Object.entries(groupedItems).map(([stripeId, items]) => (
						<div key={stripeId}>
							<h3>Loja: {stripeId}</h3>
							<table className="min-w-full border">
								<thead>
									<tr className='border'>
										<th className="text-left">Produto</th>
										<th className="text-right">Quantidade</th>
										<th className="text-right">Preço</th>
										<th className="text-right">Ações</th>
									</tr>
								</thead>
								<tbody>
									{items.map((item) => (
										<tr key={item.product.id} >
											<td className="text-left">{item.product.name}</td>
											<td className="text-right">{item.quantity}</td>
											<td className="text-right">R$ {(item.product.price * item.quantity).toFixed(2)}</td>
											<td className="text-right">
												<Button
													onClick={() => removeFromCart(item.product.id)}
													className="ml-4"
													appearance='none'
													label='Remover'
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="mt-4 text-right">
								<strong>Total: R$ {items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</strong>
							</div>
							{user ? <Button
								onClick={() => handleCheckout(items)}
								className="mt-4 w-full"
								appearance='primary'
								label='Finalizar Compra'
							>
							</Button> : <Button label='Faça login ou cadastre-se para continuar' appearance='secondary' href='/admin'></Button>}
						</div>
					))}
				</>
			)}
		</>
	)
}

export default CartClient
