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


	const AdminRedirect = {
		permanent: false,
		source: '/admin',
		destination: '/dashboard',
	}

	const redirects = [internetExplorerRedirect, homeSlashRedirect, AdminRedirect]

	return redirects
}

export default redirects
