'use client'

import md5 from 'md5'
import React from 'react'

import { User } from '@/payload-types'
import Image from 'next/image'

export const GravatarAccountIcon = ({ user }: { user: User }) => {


	const hash = user?.email ? md5(user?.email?.trim().toLowerCase()) : ''

	const params = new URLSearchParams({
		default: 'mp',
		r: 'g',
		s: '50',
	}).toString()

	const query = `?${params}`

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			alt={user?.name!}
			className="gravatar-account hover:outline-2 hover:outline hover:outline-black"
			height={25}

			src={`https://www.gravatar.com/avatar/${hash}?${query}`}
			style={{ borderRadius: '50%' }}
			width={25}
		/>
	)
}