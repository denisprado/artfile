import { buttonVariants } from '@/components/ui/button'
import { NON_BREAKING_SPACE } from '@payloadcms/richtext-lexical'
import Link from 'next/link'


/**
 * @param {{ header: import('@/payload-types').Header }} props
 */
export const HeaderNav = ({ user }) => {

	return (
		<nav className="flex flex-1 gap-4 items-center justify-end">
			<div className="flex gap-4 w-auto">
				<Link href={'/marketplace'} className={buttonVariants({ variant: "secondary" })}>{`Comprar${NON_BREAKING_SPACE}produtos`}</Link>
				{!user && <Link href={'/admin/login'} className={buttonVariants({ variant: "default" })}>Entrar</Link>}
			</div>
		</nav>
	)
}

