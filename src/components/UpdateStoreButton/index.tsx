'use client'
import { User } from "@/payload-types";
import getUser from "@/utilities/getMeUser";
import { Banner } from "@payloadcms/ui";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const UpdateStoreLink = () => {
	const [storeCreatePending, setStoreCreatePending] = useState(false);
	const [storeId, setStoreId] = useState<string | null>(null);
	const [error, setError] = useState(false);
	const [wichError, setWichError] = useState()
	const [user, setUser] = useState<User | null>(null);
	const [connectedStoreId, setConnectedStoreId] = useState<string | null>(null);
	const [detailsSubmitted, setDetailsSubmited] = useState<boolean>(false)
	const router = useRouter()

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUser();
			setUser(user);
		};
		fetchUser();
	}, []);

	const getStore = async () => {
		try {
			const existingStore = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stores`)
			const store = await existingStore.json()
			console.log("store", store)
			return store
		} catch (err) {
			console.log(err)
		}
	}

	const createStore = async () => {
		setStoreCreatePending(true);
		const existingStore = await getStore()
		const { docs, totalDocs } = existingStore
		console.log("docs", docs, totalDocs)
		if (totalDocs === 0) {
			try {
				const storeResponse = await fetch('/api/stores', {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: "Loja de " + user?.name,
						description: "Loja de " + user?.name
					}),
				})
				const store = await storeResponse.json()
				return store.doc
			} catch (err) {
				console.log(err)
			} finally {
				setStoreCreatePending(false)
			}
		}
		router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/stores/${docs && docs[0].id!}`)
	}

	const handleCreateAndUpdateStore = async () => {
		try {
			createStore();
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<Link href="#"

				className={buttonVariants({ variant: "default" })}
				onClick={handleCreateAndUpdateStore}

			>Personalizar sua loja
			</Link>
			{error && <p className="error">Algo deu errado! - {error}</p>}
			{(connectedStoreId || storeCreatePending) && (
				<div className="dev-callout">
					{connectedStoreId && <Banner type="info">O id da sua conta conectada é: <code className="bold">{connectedStoreId}. Aguarde!</code></Banner>}
				</div>
			)}</>
	)
}

export default UpdateStoreLink