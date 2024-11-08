import type { Metadata } from 'next'


import React, { Suspense } from 'react'

import { CategoriesMenu } from '@/globals/CategoriesMenu/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import '@/app/(frontend)/globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isEnabled } = await draftMode()

	return (
		<>
			<Suspense>
				<CategoriesMenu />
			</Suspense>
			<>
				{children}
			</>
		</>


	)
}

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://artfile.com'),
	openGraph: mergeOpenGraph(),

}
