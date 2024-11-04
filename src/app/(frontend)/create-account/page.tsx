import React from 'react'
import { Metadata } from 'next'

import { getMeUserServer } from '@/utilities/getMeUserServer'

import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'
import { Gutter } from '@/components/Gutter'
import PageContainer from '@/components/PageContainer'

export default async function CreateAccount({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	await getMeUserServer({
		validUserRedirect: `/account?warning=${encodeURIComponent(
			'Não é possível criar uma nova conta enquanto estiver logado, por favor, faça logout e tente novamente.',
		)}`,
	})



	return (
		<Gutter className={classes.createAccount}>
			<PageContainer>
				<div className="container flex items-center mb-16">
					<div className='w-1/2 flex items-center justify-center p-24'>
						<h1 className='text-7xl'>Crie e venda seu produto digital em <span className='font-bold'> poucos passos</span></h1>
					</div>
					<div className='w-1/2'>
						<CreateAccountForm />
					</div>
				</div>
			</PageContainer>
		</Gutter>
	)
}

export const metadata: Metadata = {
	title: 'Conta',
	description: 'Crie uma conta ou acesse sua conta.',

}
