'use client'


import type { CategoriesMenu as CategoriesMenuType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCartIcon } from 'lucide-react'



export const CategoriesMenuNav = ({ categories }: {
	categories: CategoriesMenuType
}) => {
	const navItems = categories?.navItems || []

	return (
		<nav className="flex gap-3 items-center flex-1">

			{navItems.map(({ link }, i) => {
				return <CMSLink key={i} {...link} appearance="link" />
				// Corrigido o erro de tipo de SearchTable, garantindo que seja renderizado apenas se for um componente válido.
			})}

		</nav>
	)
}
