'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { cn } from '@/utilities/cn'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const collectionLabels = {
	products: {
		plural: 'Produtos',
		singular: 'Produtos',
	},
	store: {
		plural: 'Lojas',
		singular: 'Loja',
	},
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
	adminBarProps?: PayloadAdminBarProps
}> = (props) => {
	const { adminBarProps } = props || {}
	const segments = useSelectedLayoutSegments()
	const [show, setShow] = useState(false)
	const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'products'
	const router = useRouter()

	const onAuthChange = React.useCallback((user) => {
		setShow(user?.id)
	}, [])

	return (
		<div
			className={cn('py-2 bg-black text-white', {
				block: show,
				hidden: !show,
			})}
		>
			<div className="container">
				<PayloadAdminBar
					{...adminBarProps}
					className="py-2 text-white"
					classNames={{
						controls: 'font-medium text-white',
						logo: 'text-white',
						user: 'text-white',
					}}
					cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
					collection={collection}
					collectionLabels={{
						plural: collectionLabels[collection]?.plural || 'Lojas',
						singular: collectionLabels[collection]?.singular || 'Loja',
					}}
					logo={<Title />}
					onAuthChange={onAuthChange}
					onPreviewExit={() => {
						fetch('/next/exit-preview').then(() => {
							router.push('/')
							router.refresh()
						})
					}}
					style={{
						backgroundColor: 'transparent',
						padding: 0,
						position: 'relative',
						zIndex: 'unset',
					}}
				/>
			</div>
		</div>
	)
}
