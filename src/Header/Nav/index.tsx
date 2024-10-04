'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { useCart } from '@/contexts/CartContext'
import { randomUUID } from 'crypto'
import { ShoppingCartIcon } from 'lucide-react'
import Search from '@/components/ui/search'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
	const { getCartCountItems } = useCart()
	const navItems = header?.navItems || []

	const cartCount = <div className="relative inline-flex items-center p-2 text-sm font-medium text-center  ">
		<span className="sr-only">Notifications</span><ShoppingCartIcon></ShoppingCartIcon><div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{getCartCountItems()}</div></div>


	const cart = {
		id: '1234',
		newTab: false,
		url: '/cart',
	}


	return (
		<nav className="flex gap-3 items-center">
			<Search placeholder={'Buscar produto ou loja...'} />
			{navItems.map(({ link }, i) => {
				return <CMSLink key={i} {...link} appearance="link" />
			})}
			<CMSLink key={cart.id} {...cart} appearance={"link"} >{cartCount}</CMSLink>
		</nav>
	)
}
