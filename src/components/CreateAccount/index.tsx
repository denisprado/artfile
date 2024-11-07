'use client'
import { Button } from "@/components/Button";
import { useSearchParams } from 'next/navigation';

const CreateAccount = () => {
	const searchParams = useSearchParams()
	const redirect = searchParams.get('redirect')

	return (

		<Button appearance="secondary" label="Criar conta" href={'/create-account-vendor?redirect=' + redirect}></Button>
	)
}

export default CreateAccount