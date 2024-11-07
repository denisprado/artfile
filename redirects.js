import { sources } from "next/dist/compiled/webpack/webpack"

const redirects = async () => {
	const internetExplorerRedirect = {
		destination: '/ie-incompatible.html',
		has: [
			{
				type: 'header',
				key: 'user-agent',
				value: '(.*Trident.*)', // all ie browsers
			},
		],
		permanent: false,
		source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
	}


	const homeSlashRedirect = {
		destination: '/create-account-vendor',
		permanent: true,
		source: '/'
	}

	const redirects = [internetExplorerRedirect, homeSlashRedirect]

	return redirects
}

export default redirects
