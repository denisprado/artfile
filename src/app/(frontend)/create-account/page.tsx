import { Metadata } from 'next'

import { getMeUserServer } from '@/utilities/getMeUserServer'

import CreateAccountForm from './CreateAccountForm'

import PageContainer from '@/components/PageContainer'
import { Button } from '@/components/Button'

export default async function CreateAccount({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

	const { user } = await getMeUserServer()

	if (user) {
		return

	}

	return (

		<PageContainer>
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 items-center mb-16">
				<div className='flex-col gap-8 items-center justify-center'>
					<h1 className='inline text-2xl sm:text-4xl md:text-6xl lg:text-7xl'>Crie e venda seu produto digital em <span className='font-bold'> poucos passos</span></h1>
					<ul className='py-6 list-disc list-inside'>
						<li className='my-2 text-lg'>No artfile você vende seu produto e recebe diretamente em sua conta</li>
						<li className='my-2 text-lg'>Personalize sua loja e venda cursos, arquivos e outros produtos digitais</li>
					</ul>
					<Button href='/marketplace' className='mt-10' label={'Comprar produtos'} appearance='secondary'></Button>
				</div>
				<div className='flex justify-center'>
					<CreateAccountForm />
				</div>
			</div>
		</PageContainer>

	)
}

export const metadata: Metadata = {
	title: 'Conta',
	description: 'Crie uma conta ou acesse sua conta.',

}
