'use client'

import { Button } from '@/components/Button'
import { useCart } from '@/contexts/CartContext'
import type { Header as HeaderType, User } from '@/payload-types'
import { NON_BREAKING_SPACE } from '@payloadcms/richtext-lexical'
import { useEffect, useState } from 'react'

export const HeaderNav = ({ header }: {
	header: HeaderType
}) => {
	const { getCartCountItems } = useCart()

	const [cartCount, setCartCount] = useState(0)

	useEffect(() => {
		const count = getCartCountItems();
		setCartCount(count);
	}, [getCartCountItems]);

	const [user, setUser] = useState<User>();

	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/users/me', {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})

			const resp = await response.json()
			setUser(resp?.user);
		};

		fetchUser()
	}, [])

	return (
		<nav className="flex flex-1 gap-4 items-center justify-end">
			<div className="flex gap-4 w-auto">
				<Button href={'/marketplace'} label={`Comprar${NON_BREAKING_SPACE}produtos`} appearance='none'></Button>
				<Button label={'Entrar'} appearance={"primary"} href={'/admin'} />
			</div>
		</nav>
	)
}
