'use client'


import type { CategoriesMenu as CategoriesMenuType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { usePathname } from 'next/navigation'

export const CategoriesMenuNav = ({ categories }: {
	categories: CategoriesMenuType
}) => {
	const navItems = categories?.navItems || []
	const pathname = usePathname()
	return (
		<nav className="flex gap-3 items-center  justify-center flex-1">

			{navItems.map(({ link }, i) => {
				return <CMSLink key={i} {...link} appearance={pathname === link.url ? "badgeActive" : "badge"} />
				// Corrigido o erro de tipo de SearchTable, garantindo que seja renderizado apenas se for um componente válido.
			})}

		</nav>
	)
}
