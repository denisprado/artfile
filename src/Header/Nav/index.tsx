'use client'


import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCartIcon } from 'lucide-react'



export const HeaderNav = ({ header }: {
	header: HeaderType
}) => {
	const { getCartCountItems } = useCart()
	const navItems = header?.navItems || []


	const cartCountNumber = getCartCountItems()

	const cartCount = <div className="relative inline-flex items-center p-2 text-sm font-medium text-center  ">
		<span className="sr-only">Notifications</span><ShoppingCartIcon></ShoppingCartIcon>{cartCountNumber > 0 ? <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cartCountNumber}</div> : null}</div>



	const cart = {
		id: '1234',
		newTab: false,
		url: '/cart',
	}


	return (
		<nav className="flex gap-3 items-center flex-1">

			{navItems.map(({ link }, i) => {
				return <CMSLink key={i} {...link} appearance="link" />
				// Corrigido o erro de tipo de SearchTable, garantindo que seja renderizado apenas se for um componente válido.
			})}
			<CMSLink key={cart.id} {...cart} appearance={"link"} >{cartCount}</CMSLink>
		</nav>
	)
}
