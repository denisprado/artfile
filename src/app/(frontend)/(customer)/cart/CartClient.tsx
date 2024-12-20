'use client'

import { Button } from '@/components/ui/button'
import { CartItem, useCart } from '@/contexts/CartContext'
import { Store, User } from '@/payload-types'
import { Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const getStoreNameByuserId = (userId: string, stores: Store[]) => {
	const store = stores.find(store => (store?.createdBy as User)?.id === userId);
	return store ? store.name : 'Loja sem nome definido';
}

const formatCurrency = (value: number) => {
	return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const CartClient: React.FC<{ user: User | null }> = ({ user }) => {
	const { cart, removeFromCart, getCartTotal, updateCartQuantity } = useCart()
	const router = useRouter()
	const [stores, setStores] = useState<Store[]>([])

	useEffect(() => {
		const fetchStores = async () => {
			try {
				const response = await fetch('/api/stores');
				const data = await response.json();
				setStores(data.docs);

			} catch (error) {
				console.error('Erro ao buscar lojas:', error);
			}
		};

		fetchStores();
	}, []);

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

	const groupedItems = cart.reduce((acc: { [x: string]: unknown[] }, item) => {
		const userId = (item.product.createdBy as User).id;

		if (userId && !acc[userId]) {
			acc[userId] = [];
		}
		if (userId) {
			acc[userId].push(item);
		}
		return acc;
	}, {} as Record<string, typeof cart>);

	return (
		<>
			{cart.length === 0 ? (
				<p>Seu carrinho está vazio.</p>
			) : (
				<>
					{Object.entries(groupedItems).map(([userId, items]) => (
						<div key={userId} className='mb-8'>
							<h5>{getStoreNameByuserId(userId, stores)}</h5>
							<table className="min-w-full border-y p-4">
								<thead>
									<tr className='border-y'>
										<th className="text-left">Produto</th>
										<th className="text-right">Quantidade</th>
										<th className="text-right">Preço</th>
										<th className="text-right">Ações</th>
									</tr>
								</thead>
								<tbody>
									{(items).map((item: CartItem) => (
										<tr key={item.product.id} >
											<td className="text-left p-2">{item.product.name}</td>
											<td className="text-right">
												<input
													type="number"
													value={item.quantity}
													min="1"
													onChange={(e) => {
														const newQuantity = Math.max(1, Number(e.target.value)); // Garante que a quantidade não seja menor que 1
														// Atualiza a quantidade no carrinho
														// Você precisará implementar a lógica para atualizar a quantidade no contexto do carrinho
														updateCartQuantity(item.product.id, newQuantity);
													}}
													className="w-16 text-right border"
												/>
											</td>
											<td className="text-right">{formatCurrency(item.product.price * item.quantity)}</td>
											<td className="text-right">
												<button
													onClick={() => removeFromCart(item.product.id)}
												>
													<Trash2Icon color='red' />
												</button>

											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="mt-4 text-right">
								<strong>Total: {formatCurrency((items as CartItem[]).reduce((total, item) => total + (item.product.price * item.quantity), 0))}</strong>
							</div>
							<div className='w-full flex justify-end'>
								<div className='w-56'>
									{user ? <Button
										onClick={() => handleCheckout(items as CartItem[])}
										className="mt-2 mb-8 "
										variant={'default'}
									>Finalizar Compra
									</Button> : <Link href='/admin/login?redirect=/cart'><Button variant={'secondary'} asChild>Faça login ou cadastre-se para continuar</Button></Link>}
								</div>
							</div>
						</div>
					))}
				</>
			)}
		</>
	)
}

export default CartClient
