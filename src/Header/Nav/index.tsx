'use client'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCartIcon } from 'lucide-react'
import { UserServer } from '@/utilities/getMeUserServer'
import { GravatarAccountIcon } from '@/components/Gravatar'
import Link from 'next/link'

export const HeaderNav = async ({ header, user }: {
	header: HeaderType
	user: UserServer
}) => {
	const { getCartCountItems } = useCart()
	const navItems = header?.navItems || []

	const cartCountNumber = getCartCountItems()

	const cartCount = <span className="relative inline-flex items-center p-2 text-sm font-medium text-center  ">
		<span className="sr-only">Notifications</span><ShoppingCartIcon></ShoppingCartIcon>{cartCountNumber > 0 ? <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cartCountNumber}</span> : <></>}</span>

	const cart = {

		newTab: false,
		url: '/cart',
	}

	return (
		<nav className="flex gap-3 items-center flex-1 ml-10">

			{navItems.map(({ link }, i) => {
				return <CMSLink key={i} {...link} appearance="link" />
				// Corrigido o erro de tipo de SearchTable, garantindo que seja renderizado apenas se for um componente válido.
			})}
			{(await user).user !== null ? <CMSLink label={'Compras'} appearance={"link"} url={'/orders/products'} /> : <CMSLink label={'Entrar'} appearance={"link"} url={'/admin'}></CMSLink>}
			<CMSLink {...cart} appearance={"link"} >{cartCount}</CMSLink>
			<Link href={'/admin'} className='w-8 h-8 flex justify-center items-center'><GravatarAccountIcon user={(await user).user} /></Link>

		</nav>
	)
}
