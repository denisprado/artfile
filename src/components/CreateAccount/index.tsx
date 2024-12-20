'use client'
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

const CreateAccount = () => {
	const searchParams = useSearchParams()
	const redirect = searchParams.get('redirect') ? "?redirect=" + searchParams.get('redirect') : ''

	return (
		<Link href={'/dashboard' + redirect} className={buttonVariants({ variant: 'secondary' })}>
			Criar conta
		</Link>
	)
}

export default CreateAccount