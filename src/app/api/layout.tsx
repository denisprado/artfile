export const metadata = {
	title: 'ArtFile',
	description: 'Compra e Venda de arquivos digitais',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
