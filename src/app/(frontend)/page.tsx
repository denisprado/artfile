'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
	const router = useRouter();

	useEffect(() => {
		// Redireciona para o dashboard do vendor
		router.push('/dashboard');
	}, []);

	return <></>; // Não renderiza nada, apenas redireciona
}
