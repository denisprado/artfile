import type { Metadata } from 'next'


import React, { Suspense } from 'react'

import { VendorHeader } from '@/components/VendorHeader/Component'
import { Footer } from '@/globals/Footer/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import '../globals.css'

import { getMeUserServer } from '@/utilities/getMeUserServer'

export default async function RootLayout({ dashboard, unauthenticated }: { dashboard?: React.ReactNode, unauthenticated?: React.ReactNode }) {
	const { user } = await getMeUserServer();
	return (
		<div className='grid min-h-[100dvh] grid-rows-[auto_1fr_auto] '>
			<Suspense>
				<VendorHeader />
			</Suspense>
			<main>
				{user ? dashboard : unauthenticated}
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
		creator: '@platô',
	},
}
