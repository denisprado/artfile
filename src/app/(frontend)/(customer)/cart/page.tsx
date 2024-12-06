

import { Button } from '@/components/ui/button'
import PageContainer from '@/components/PageContainer'
import { getMeUserServer } from '@/utilities/getMeUserServer'
import CartClient from './CartClient' // Importando o componente de cliente
import React from 'react'
import { stripePromise } from '@/lib/stripe'

const Cart: React.FC = async () => {
	const { user } = await getMeUserServer() // Carregando o usuário no servidor
	const stripe = stripePromise;
	return (
		<PageContainer>
			<div className="container mb-16">
				<h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
				<CartClient user={user} /> {/* Passando o usuário para o componente de cliente */}
			</div>
		</PageContainer>
	)
}

export default Cart
