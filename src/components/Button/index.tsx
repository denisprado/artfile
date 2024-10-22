'use client'

import React, { ElementType, ReactNode } from 'react'
import Link from 'next/link'

import classes from './index.module.scss'
import { ShoppingBagIcon } from 'lucide-react'

export type Props = {
	label?: string | ReactNode
	appearance?: 'default' | 'primary' | 'secondary' | 'none'
	el?: 'button' | 'link' | 'a'
	onClick?: () => void
	href?: string
	newTab?: boolean
	className?: string
	type?: 'submit' | 'button'
	disabled?: boolean
	invert?: boolean
}

export const Button: React.FC<Props> = ({
	el: elFromProps = 'link',
	label,
	newTab,
	href,
	appearance,
	className: classNameFromProps,
	onClick,
	type = 'button',
	disabled,
	invert,
}) => {
	let el = elFromProps

	const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

	const className = [
		classes.button,
		classNameFromProps,
		classes[`appearance--${appearance}`],
		invert && classes[`${appearance}--invert`],
	]
		.filter(Boolean)
		.join(' ')

	const content = (
		<div className={'flex justify-around items-stretch'}>
			<span className={'text-center flex items-center'}>{label}</span>
		</div>
	)

	if (onClick || type === 'submit') el = 'button'

	if (el === 'link') {
		return (
			<Link href={href || ''} className={className} {...newTabProps} onClick={onClick}>
				{content}
			</Link>
		)
	}

	const Element: ElementType = el

	return (
		<Element
			href={href}
			className={className}
			type={type}
			{...newTabProps}
			onClick={onClick}
			disabled={disabled}
		>
			{content}
		</Element>
	)
}
