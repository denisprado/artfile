'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Message } from '@/components/Message'
import { useAuth } from '@/providers/Auth'

import classes from './index.module.scss'

type FormData = {
	name: string
	email: string
	password: string
	passwordConfirm: string
}

const CreateAccountForm: React.FC = () => {
	const searchParams = useSearchParams()
	const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
	const { login } = useAuth()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>()

	const password = useRef({})
	password.current = watch('password', '')

	const onSubmit = useCallback(
		async (data: FormData) => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				const message = response.statusText || 'Houve um problema para criar sua conta.'
				setError(message)
				return
			}

			const redirect = searchParams.get('redirect')

			const timer = setTimeout(() => {
				setLoading(true)
			}, 1000)

			try {
				await login(data)
				clearTimeout(timer)
				if (redirect) router.push(redirect as string)
				else router.push(`/account?success=${encodeURIComponent('Conta crida com sucesso')}`)
			} catch (_) {
				clearTimeout(timer)
				setError('Houve um erro com as credenciais fornecidas.')
			}
		},
		[login, router, searchParams],
	)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
			<p>
				{`This is where new customers can signup and create a new account. To manage all users, `}
				<Link href="/admin/collections/users">login to the admin dashboard</Link>
				{'.'}
			</p>
			<Message error={error} className={classes.message} />
			<Input
				name="name"
				label="Nome"
				required
				register={register}
				error={errors.name}
				type="email"
			/>
			<Input
				name="email"
				label="Email"
				required
				register={register}
				error={errors.email}
				type="email"
			/>
			<Input
				name="password"
				type="password"
				label="Password"
				required
				register={register}
				error={errors.password}
			/>
			<Input
				name="passwordConfirm"
				type="password"
				label="Confirm Password"
				required
				register={register}
				validate={value => value === password.current || 'The passwords do not match'}
				error={errors.passwordConfirm}
			/>
			<Button
				type="submit"
				label={loading ? 'Processing' : 'Create Account'}
				disabled={loading}
				appearance="primary"
				className={classes.submit}
			/>
			<div>
				{'Já tem uma conta? '}
				<Link href={`/admin/login${allParams}`}>Login</Link>
			</div>
		</form>
	)
}

export default CreateAccountForm
