
import Link from 'next/link'
import Logo from '@/components/Logo'

export const LogoAdmin = ({ invert = false }: { invert?: boolean }) => {
	return (
		/* eslint-disable @next/next/no-img-element */
		<div style={{ padding: '2rem', paddingLeft: '1rem' }}>


			<Link className='m-8' href={process.env.NEXT_PUBLIC_SERVER_URL!}>
				<Logo />
			</Link>


		</div>
	)
}

export default LogoAdmin