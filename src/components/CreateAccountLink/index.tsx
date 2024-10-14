'use client'
import { User } from "@/payload-types";
import { Banner } from "@payloadcms/ui";
import { useState } from "react";
import Stripe from "stripe";
import { Button } from "../Button";

const CreateAccountLink = ({ user: userComp }) => {
	const [accountCreatePending, setAccountCreatePending] = useState(false);
	const [accountLinkCreatePending, setAccountLinkCreatePending] = useState(false);
	const [error, setError] = useState(false);
	const [wichError, setWichError] = useState()

	const [user, setUser] = useState<User | null>(userComp)
	const [connectedAccountId, setConnectedAccountId] = useState<string | null>(null);
	const [detailsSubmitted, setDetailsSubmited] = useState<boolean>(false)


	const getUser = async () => {
		try {
			const req = await fetch('/api/users/me', {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})
			const data = await req.json()
			setUser(data.user)
			return data.user
		} catch (err) {
			console.log(err)
			return err
		}
	}

	const getVerify = async (account: string) => {
		try {
			const accountVerify = await fetch('/api/account-verify', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					account: account,
				}),
			})
			const data = await accountVerify.json()
			await fetch('/api/users/' + user!.id, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					detailsSubmited: data.details_submitted,

				}),
			})
			setDetailsSubmited(data.details_submitted)
			return data.details_submitted
		} catch (err) {
			console.log(err)
			return err
		}
	}
	console.log(!!connectedAccountId, !accountLinkCreatePending, !user?.detailsSubmited, !!user?.stripe)

	return (
		<>
			{!user?.stripe && !accountCreatePending && !connectedAccountId && (

				<Button href="#"
					label="Quero vender arquivos."
					appearance="primary"
					onClick={async () => {
						setAccountCreatePending(true);
						setError(false);
						fetch("/api/account", {
							method: "POST",
						})
							.then((response) => response.json())
							.then(async (json) => {
								setAccountCreatePending(false);

								const { account, error } = json;

								if (account) {
									const user = await getUser()
									setUser(user)
									setConnectedAccountId(account);
									getVerify(account)
									await fetch('/api/users/' + user.id, {
										method: 'PATCH',
										credentials: 'include',
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											roles: 'vendor',
											stripe: account,
										}),
									})
								}

								if (error) {
									setError(true);
								}
							});
					}}
				>

				</Button>
			)}
			{(!!connectedAccountId && !accountLinkCreatePending) || (!user?.detailsSubmited && !!user?.stripe) ? (
				<Button
					label="Informar meus dados de vendedor"
					appearance="secondary"
					onClick={async () => {
						setAccountLinkCreatePending(true);
						setError(false);
						try {
							console.log(connectedAccountId)
							const response = await fetch("/api/account-link", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									account: connectedAccountId ? connectedAccountId : user?.stripe,
								}),
							});
							const json = await response.json();

							setAccountLinkCreatePending(false);

							const { url, error } = json;
							setWichError(url)

							if (url) {
								window.location.href = url;
							} else if (error) {
								setError(true);
							}
							connectedAccountId && getVerify(connectedAccountId)
						} catch (err) {
							setAccountLinkCreatePending(false);
							setError(true); // Define erro se a requisição falhar
						}
					}}
				>
				</Button>
			) : <></>}
			{error && <p className="error">Algo deu errado!</p>}
			{(connectedAccountId || accountCreatePending || accountLinkCreatePending) && (
				<div className="dev-callout">
					{connectedAccountId && <Banner type="info">O id da sua conta conectada é: <code className="bold">{connectedAccountId}</code></Banner>}
					{accountCreatePending && <p>Criando uma conta na plataforma de pagamentos Stripe.</p>}
					{accountLinkCreatePending && <p>Criando uma nova conta conectada ...</p>}
				</div>
			)}</>
	)
}

export default CreateAccountLink