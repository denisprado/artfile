
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo'
import { HeaderNav } from './Nav'


interface HeaderClientProps {
	header: Header

}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
	// /* Storing the value in a useState to avoid hydration errors */
	// const [theme, setTheme] = useState<string | null>(null)
	// const { headerTheme, setHeaderTheme } = useHeaderTheme()
	// const pathname = usePathname()


	// useEffect(() => {
	// 	setHeaderTheme(null)
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [pathname])

	// useEffect(() => {
	// 	if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [headerTheme])


	return (
		<header
			className="header relative z-20 p-8 flex justify-between"
		// {...(theme ? { 'data-theme': theme } : {})}
		>
			<Link href="/" className='flex items-center'>
				<Logo />
			</Link>

			<HeaderNav header={header} />
		</header>
	)
}
