'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { CategoriesMenu } from '@/payload-types'

import { CategoriesMenuNav } from './Nav'

interface HeaderClientProps {
	categories: CategoriesMenu
}

export const CategoriesClient: React.FC<HeaderClientProps> = ({ categories }) => {
	/* Storing the value in a useState to avoid hydration errors */
	const [theme, setTheme] = useState<string | null>(null)
	const { headerTheme, setHeaderTheme } = useHeaderTheme()
	const pathname = usePathname()

	useEffect(() => {
		setHeaderTheme(null)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	useEffect(() => {
		if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [headerTheme])


	return (
		<nav
			className="container relative z-20 py-2 flex items-center justify-between"
			{...(theme ? { 'data-theme': theme } : {})}
		>

			<CategoriesMenuNav categories={categories} />
		</nav>
	)
}
