import type { Metadata } from 'next'

import { cn } from '@/utilities/cn'

import React from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { CartProvider } from '@/contexts/CartContext'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { SidebarProvider } from '@/components/Sidebar'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<html className={cn(GeistSans.variable, GeistMono.variable, 'useTw')} lang="en" suppressHydrationWarning>
			<head>
				<InitTheme />
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>
			<body>
				<SidebarProvider>
					<Providers>
						<CartProvider>
							<LivePreviewListener />
							<>
								{children}
							</>
						</CartProvider>
					</Providers>
				</SidebarProvider>
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
