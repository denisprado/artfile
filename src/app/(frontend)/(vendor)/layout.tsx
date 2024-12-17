import type { Metadata } from 'next'


import React, { Suspense } from 'react'

import { VendorHeader } from '@/components/VendorHeader/Component'
import { Footer } from '@/globals/Footer/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import '../globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<>
			{children}
		</>
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
