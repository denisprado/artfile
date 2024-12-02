import { withPayload } from '@payloadcms/next/withPayload'
import redirects from 'redirects'

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
    // remotePatterns: [
    //   ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
    //     const url = new URL(item)

    //     return {
    //       hostname: url.hostname,
    //       protocol: url.protocol.replace(':', ''),
    //     }
    //   }),
    // ],
  },
  typescript: {
    ignoreBuildErrors: true, // provisório enquanto o payload não arruma o erro da página notFound
  },

  reactStrictMode: true,
  // redirects: async () => [
  // 	{
  // 		source: '/admin/logout',
  // 		destination: '/',
  // 		permanent: true, // ou true, se você quiser que seja um redirecionamento permanente

  // 	},
  // ],
  redirects,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

export default withPayload(nextConfig)
