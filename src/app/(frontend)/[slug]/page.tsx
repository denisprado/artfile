
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cache } from 'react'
import type { Page as PageType } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { draftMode } from 'next/headers'

// export async function generateStaticParams() {
// 	const payload = await getPayloadHMR({ config: configPromise })
// 	const pages = await payload.find({
// 		collection: 'pages',
// 		draft: false,
// 		limit: 1000,
// 		overrideAccess: false,
// 	})

// 	return pages.docs
// 		?.filter((doc) => {
// 			return doc.slug !== 'home'
// 		})
// 		.map(({ slug }) => slug)
// }

export default async function Page({ params: { slug = 'home' } }) {
	const url = '/' + slug

	let page: PageType | null

	page = await queryPageBySlug({
		slug,
	})


	const layout = page?.layout
	const hero = page?.hero

	return (
		<article className="pt-16 pb-24">

			<RenderHero {...hero} />
			<RenderBlocks blocks={layout} />
		</article>
	)
}

// export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
//   const page = await queryPageBySlug({
//     slug,
//   })

//   return generateMeta({ doc: page })
// }


const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
	const draft = await draftMode()

	const payload = await getPayloadHMR({ config: configPromise })

	const result = await payload.find({
		collection: 'pages',

		limit: 1,
		overrideAccess: true,
		where: {
			slug: {
				equals: slug,
			},
		},
	})

	return result.docs?.[0] || null
})
