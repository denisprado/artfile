import { useStripe } from '@stripe/react-stripe-js';

interface CheckoutButtonProps {
	items: Array<{ id: string; name: string; price: number }>;
	userId: string;
}

export default function CheckoutButton({ items, userId }: CheckoutButtonProps) {
	const stripe = useStripe();

	const handleCheckout = async () => {
		const response = await fetch('/api/create-checkout-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ items, userId }),
		});

		const { sessionId } = await response.json();

		if (stripe) {
			const result = await stripe.redirectToCheckout({
				sessionId,
			});

			if (result.error) {
				console.error(result.error.message);
			}
		};

		return (
			<button onClick={handleCheckout}>
				Comprar agora
			</button>
		);
	}
}
