import { Metadata } from 'next'

import { getMeUserServer } from '@/utilities/getMeUserServer'

import CreateAccountForm from './CreateAccountForm'

import PageContainer from '@/components/PageContainer'
import { Button } from '@/components/ui/button'
import BeforeDashboard from '@/components/BeforeDashboard'
import { Suspense } from 'react'

export default async function CreateAccount({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

	const { user } = await getMeUserServer()

	if (user) {
		console.log(user)
		return (
			<PageContainer>
				<BeforeDashboard />
			</PageContainer>
		)
	}


	return (

		<PageContainer>
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 items-center mb-16">
				<div className='flex-col gap-8 items-center justify-center'>
					<h1 className='inline text-2xl sm:text-4xl md:text-6xl lg:text-7xl'>Encontre o seu produto digital e comece a utilizá-lo imediatamente</h1>
					<ul className='py-6 list-disc list-inside'>
						<li className='my-2 text-lg'>Cursos e tutoriais</li>
						<li className='my-2 text-lg'>E-books</li>
						<li className='my-2 text-lg'>Arquivos digitais</li>
					</ul>

				</div>
				<div className='flex justify-center'>
					<Suspense><CreateAccountForm /></Suspense>
				</div>
			</div>
		</PageContainer>

	)
}

export const metadata: Metadata = {
	title: 'Conta',
	description: 'Crie uma conta ou acesse sua conta.',

}
