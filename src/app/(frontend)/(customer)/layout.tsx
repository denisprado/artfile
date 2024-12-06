import type { Metadata } from 'next'


import React, { Suspense } from 'react'

import { CustomerHeader } from '@/globals/CustomerHeader/Component'
import { Footer } from '@/globals/Footer/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './../globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<div className='grid min-h-[100dvh] grid-rows-[auto_1fr_auto] '>
			<Suspense>
				<CustomerHeader />
			</Suspense>
			<main>
				{children}
			</main>
			<Footer />
		</div>
	)
}

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
	openGraph: mergeOpenGraph(),
	twitter: {
		card: 'summary_large_image',
		creator: '@payloadcms',
	},
}
