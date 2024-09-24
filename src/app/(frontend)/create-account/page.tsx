import React from 'react'
import { Metadata } from 'next'

import { getMeUserServer } from '@/utilities/getMeUserServer'

import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'
import { Gutter } from '@/components/Gutter'

export default async function CreateAccount() {
	await getMeUserServer({
		validUserRedirect: `/account?warning=${encodeURIComponent(
			'Não é possível criar uma nova conta enquanto estiver logado, por favor, faça logout e tente novamente.',
		)}`,
	})

	return (
		<Gutter className={classes.createAccount}>
			<h1>Criar conta</h1>
			<CreateAccountForm />
		</Gutter>
	)
}

export const metadata: Metadata = {
	title: 'Conta',
	description: 'Crie uma conta ou acesse sua conta.',

}
