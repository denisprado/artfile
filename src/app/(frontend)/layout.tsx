import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'

import React, { Suspense } from 'react'

import { CategoriesMenu } from '@/CategoriesMenu/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { CartProvider } from '@/contexts/CartContext'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { draftMode } from 'next/headers'
import './_css/app.scss'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isEnabled } = await draftMode()

	return (
		<html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
			<head>
				<InitTheme />
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>
			<body className='overflow-x-hidden overflow-y-scroll'>
				<Providers>
					<CartProvider>
						<LivePreviewListener />
						<div className='grid min-h-[100dvh] grid-rows-[auto_auto_1fr_auto] '>
							<Suspense>
								<Header />
							</Suspense>
							<Suspense>
								<CategoriesMenu />
							</Suspense>
							<main>
								{children}
							</main>
							<Footer />
						</div>
					</CartProvider>
				</Providers>
			</body>
		</html>
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
