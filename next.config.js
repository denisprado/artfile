import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: 'custom',
		loaderFile: './src/lib/imageLoader.ts',
		remotePatterns: [
			...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
				const url = new URL(item)

				return {
					hostname: url.hostname,
					protocol: url.protocol.replace(':', ''),
				}
			}),
		],
	},
	reactStrictMode: true,
	// redirects: async () => [
	// 	{
	// 		source: '/admin/logout',
	// 		destination: '/',
	// 		permanent: true, // ou true, se você quiser que seja um redirecionamento permanente
	// 	},
	// ],
	// redirects,
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
			};
		}
		return config;
	},
};

export default withPayload(nextConfig)
