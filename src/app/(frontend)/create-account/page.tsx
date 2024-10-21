import React from 'react'
import { Metadata } from 'next'

import { getMeUserServer } from '@/utilities/getMeUserServer'

import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'
import { Gutter } from '@/components/Gutter'
import PageContainer from '@/components/PageContainer'

export default async function CreateAccount() {
	await getMeUserServer({
		validUserRedirect: `/account?warning=${encodeURIComponent(
			'Não é possível criar uma nova conta enquanto estiver logado, por favor, faça logout e tente novamente.',
		)}`,
	})

	return (
		<Gutter className={classes.createAccount}>
			<PageContainer>
				<div className="container mb-16">

					<h2>Criar conta</h2>
					<CreateAccountForm />
				</div>
			</PageContainer>
		</Gutter>
	)
}

export const metadata: Metadata = {
	title: 'Conta',
	description: 'Crie uma conta ou acesse sua conta.',

}
