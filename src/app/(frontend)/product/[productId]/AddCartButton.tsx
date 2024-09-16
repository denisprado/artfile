import React from 'react'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/payload-types'
import { stripePromise } from '@/lib/stripe'
import { getMeUser } from '@/utilities/getMeUser'

type Props = {
	product: Product
}

const AddToCartButton: React.FC<Props> = async ({ product }) => {
	const { addToCart } = useCart()
	const user = await getMeUser()

	const handleAddToCart = () => {
		addToCart(product)
	}

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
					items: [{ name: product.name, price: product.price, quantity: 1 }],
					userId: user.user.id
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
		<div>
			<button
				onClick={handleAddToCart}
				className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
			>
				Adicionar ao Carrinho
			</button>
			<button
				onClick={handleCheckout}
				className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
				disabled={!user}
			>
				{!user ? 'Carregando...' : 'Comprar Agora'}
			</button>
		</div>
	)
}

export default AddToCartButton