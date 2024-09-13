'use client'

import React from 'react'
import { useCart } from '@/contexts/CartContext'
import { stripePromise } from '@/lib/stripe'
import { useUser } from '@/hooks/useUser'
import { getMeUser } from '@/utilities/getMeUser'

const Cart: React.FC = () => {
	const { cart, removeFromCart, getCartTotal } = useCart()
	const user = getMeUser()

	const handleCheckout = async () => {

		if (!user) {
			console.error('Usuário não está autenticado')
			// Aqui você pode redirecionar para a página de login ou mostrar um modal de login
			return
		}

		try {
			const response = await fetch('/api/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					items: cart.map(item => ({
						name: item.product.name,
						price: item.product.price,
						quantity: item.quantity
					})),
					userId: (await user).user.id
				}),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const { sessionId } = await response.json();

			if (!sessionId) {
				throw new Error('No session ID returned from the server');
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
		<div className="bg-white shadow-md rounded p-4">
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
					<button
						onClick={handleCheckout}
						className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
						disabled={!user}
					>
						{!user ? 'Carregando...' : 'Finalizar Compra'}
					</button>
				</>
			)}
		</div>
	)
}

export default Cart
