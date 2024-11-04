import React from 'react'
import { Metadata } from 'next'

import { getMeUserServer } from '@/utilities/getMeUserServer'

import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'
import { Gutter } from '@/components/Gutter'
import PageContainer from '@/components/PageContainer'
import BeforeDashboard from '@/components/BeforeDashboard'

export default async function CreateAccount({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

	const { user } = await getMeUserServer()

	if (user) {
		return <Gutter className={classes.createAccount}>
			<PageContainer>

				<BeforeDashboard />
			</PageContainer>
		</Gutter>
	}

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
