'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/Input'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'


type FormData = {
	name: string
	email: string
	password: string
	passwordConfirm: string
}

const CreateAccountForm: React.FC = () => {
	const searchParams = useSearchParams()
	const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''

	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [userCreated, setUserCreated] = useState<boolean>(false)

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

			const dataUser = await response.json()

			try {
				clearTimeout(timer)
				if (redirect) router.push(redirect as string)
				else router.push(`/admin/login?redirect=${redirect}`)
			} catch (_) {
				clearTimeout(timer)
				setError('Houve um erro com as credenciais fornecidas.')
			}
		},
		[router, searchParams],
	)

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mb-4 flex flex-col gap-4 items-start w-2/3 border-2 rounded-xl p-4"
		>
			<Message
				error={error}
				className="mb-4"
			/>
			<Input
				name="name"
				label="Nome"
				required
				register={register}
				error={errors.name}
				type="text"
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
				label="Senha"
				required
				register={register}
				error={errors.password}
			/>
			<Input
				name="passwordConfirm"
				type="password"
				label="Confirmar Senha"
				required
				register={register}
				validate={value => value === password.current || 'A senha não é igual à digitada'}
				error={errors.passwordConfirm}
			/>
			<Button
				type="submit"
				disabled={loading}
				variant={'default'}
				className="mt-2"
			>{loading ? 'Processing' : 'Criar Conta'}</Button>
			<div className='w-full'>
				<p className='text-center'>Já tem uma conta?
					<Link href={`/admin/login${allParams}`}> Faça Login</Link></p>
			</div>
		</form>
	)
}

export default CreateAccountForm
