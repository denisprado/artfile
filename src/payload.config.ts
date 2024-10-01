// storage-adapter-import-placeholder
import payloadConfig from '@payload-config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/plugin-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, getPayload } from 'payload'
import { pt } from 'payload/i18n/pt'
import sharp from 'sharp' // editor-import
import { Page, Post } from 'src/payload-types'
import { fileURLToPath } from 'url'
import Categories from './collections/Categories'
import { Media } from './collections/Media'
import Orders from './collections/Orders'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import Products from './collections/Products'
import Stores from './collections/Stores'
import Users from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Artfile` : 'ArtFile'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL!
}

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      // beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      // beforeDashboard: ['@/components/BeforeDashboard'],
      views: {
        customView: {
          Component: '/components/CreateAccount#CreateAccount',
          path: '/signup',
        },
      },
      graphics: {
        Logo: { path: './components/Logo' },
        Icon: { path: './components/Icon' },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    dateFormat: 'dd/mm/yyyy',
    meta: {
      titleSuffix: '- ArtFile',
    },

    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({
          enabledCollections: ['pages', 'posts'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Users, Products, Stores, Orders, Media, Pages, Posts, Categories],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  globals: [Header, Footer],
  i18n: { supportedLanguages: { pt } },
  plugins: [
    // redirectsPlugin({
    //   collections: ['pages', 'posts'],
    //   overrides: {
    //     // @ts-expect-error
    //     fields: ({ defaultFields }) => {
    //       return defaultFields.map((field) => {
    //         if ('name' in field && field.name === 'from') {
    //           return {
    //             ...field,
    //             admin: {
    //               description: 'You will need to rebuild the website when changing this field.',
    //             },
    //           }
    //         }
    //         return field
    //       })
    //     },
    //     hooks: {
    //       afterChange: [revalidateRedirects],
    //     },
    //   },
    // }),

    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET,
      webhooks: {
        'customer.subscription.updated': ({ event, stripe }) => {
          // do something...
        },
        'checkout.session.completed': async ({ event, req }) => {
          const session = event.data.object

          // console.log('paymentIntent', paymentIntent)
          await updateOrderStatus(session)
        },
      },
    }),

    nestedDocsPlugin({
      collections: ['categories'],
    }),
    // seoPlugin({
    //   generateTitle,
    //   generateURL,
    // }),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
      },
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ]
                  },
                }),
              }
            }
            return field
          })
        },
      },
    }),
    payloadCloudPlugin(), // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

async function updateOrderStatus(session: {
  metadata: { order_id: any }
  payment_status: 'unpaid' | 'paid'
}) {
  const orderId = session.metadata?.order_id
  const payload = await getPayload({ config: payloadConfig })

  await payload.update({
    collection: 'orders',
    id: orderId,
    data: {
      status: session.payment_status,
      // Removendo o campo stripeSessionId, pois não existe no tipo esperado
    },
  })
}
