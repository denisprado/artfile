import type { Metadata } from 'next'


import React, { Suspense } from 'react'

import { Footer } from '@/globals/Footer/Component'
import { VendorHeader } from '@/components/VendorHeader/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import './../_css/app.scss'
import './../globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isEnabled } = await draftMode()

	return (
		<div className='grid min-h-[100dvh] grid-rows-[auto_1fr_auto] '>
			<Suspense>
				<VendorHeader />
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
