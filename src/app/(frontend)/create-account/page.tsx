import React from 'react'
import { Metadata } from 'next'

import { getMeUserServer } from '@/utilities/getMeUserServer'

import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'
import { Gutter } from '@/components/Gutter'

export default async function CreateAccount() {
	await getMeUserServer({
		validUserRedirect: `/account?warning=${encodeURIComponent(
			'Cannot create a new account while logged in, please log out and try again.',
		)}`,
	})

	return (
		<Gutter className={classes.createAccount}>
			<h1>Create Account</h1>
			<CreateAccountForm />
		</Gutter>
	)
}

export const metadata: Metadata = {
	title: 'Account',
	description: 'Create an account or log in to your existing account.',

}
