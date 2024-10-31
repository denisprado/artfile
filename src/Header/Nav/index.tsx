'use client'

import { CMSLink } from '@/components/Link'
import UserMenu from '@/components/UserMenu'
import { useCart } from '@/contexts/CartContext'
import type { Header as HeaderType, User } from '@/payload-types'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const HeaderNav = ({ header }: {
	header: HeaderType
}) => {
	const { getCartCountItems } = useCart()
	const navItems = header?.navItems || []
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

		fetchUser();
	}, []);

	const CartCount = () => {
		return (
			<span className="relative inline-flex items-center p-2 text-sm font-medium text-center">
				<span className="sr-only">Notifications</span>
				<ShoppingCartIcon />
				<CartCountBadge />
			</span>
		)
	};

	const CartCountBadge = () => {
		return cartCount && cartCount > 0 ? (
			<span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
				{cartCount}
			</span>
		) : <></>
	}

	return (
		<nav className="flex gap-4 items-center justify-end ml-10">
			{navItems.map(({ link }, i) => (
				<CMSLink key={i} {...link} appearance="link" />
			))}
			{/* {user !== null ? (
				<CMSLink label={'Minhas Compras'} appearance={"link"} url={'/orders/products'} />
			) : (
				<CMSLink label={'Entrar'} appearance={"link"} url={'/admin'} />
			)} */}
			<CMSLink url={'/cart'} appearance={"link"}>{<CartCount />}</CMSLink>
			{user === null || user === undefined ?
				<div className="flex gap-2">
					<Link href={'/admin/login?redirect=/'} className='gap-2 flex justify-center items-center'>Entrar ou Cadastrar</Link>
				</div> :
				<div className="flex gap-2">
					{/* <CMSLink label={user?.name} appearance={"link"} url={'/admin'} /><GravatarAccountIcon user={user!} /> */}
					<UserMenu user={user!} />
				</div>
			}


		</nav>
	);
}
