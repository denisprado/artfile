'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, User } from '@/payload-types'

import { Logo } from '@/components/Logo'
import Search from '@/components/ui/search'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
	header: Header
	user: any
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, user }) => {
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
		<header
			className="container relative z-20 py-8 flex justify-between"
			{...(theme ? { 'data-theme': theme } : {})}
		>
			<Link href="/">
				<Logo />
			</Link>
			<div className='pl-20 pr-2 w-full relative'>
				<Search placeholder={'Buscar no site todo...'} />
			</div>
			<HeaderNav header={header} user={user} />
		</header>
	)
}
