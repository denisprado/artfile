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

	const logoutRedirect = {
		destination: '/',
		permanent: true,
		source: process.env.NEXT_PUBLIC_SERVER_URL + '/admin/logout'
	}

	const redirects = [internetExplorerRedirect, logoutRedirect]

	return redirects
}

export default redirects
