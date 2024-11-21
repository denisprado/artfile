import { Button } from '@/components/Button'
import { NON_BREAKING_SPACE } from '@payloadcms/richtext-lexical'

/**
 * @param {{ header: import('@/payload-types').Header }} props
 */
export const HeaderNav = () => {

	return (
		<nav className="flex flex-1 gap-4 items-center justify-end">
			<div className="flex gap-4 w-auto">
				<Button href={'/marketplace'} label={`Comprar${NON_BREAKING_SPACE}produtos`} appearance='none'></Button>
				<Button label={'Entrar'} appearance={"primary"} href={'/admin'} />
			</div>
		</nav>
	)
}

