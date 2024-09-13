'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
	const navItems = header?.navItems || []

	return (
		<nav className="flex gap-3 items-center">
			{navItems.map(({ link }, i) => {
				return <CMSLink key={i} {...link} appearance="link" />
			})}
			<Link href="/cart" className="text-blue-500 hover:text-blue-700">
				Carrinho
			</Link>
		</nav>
	)
}
