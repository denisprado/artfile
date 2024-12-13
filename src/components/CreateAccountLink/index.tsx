'use client'
import { User } from "@/payload-types";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Banner } from "@payloadcms/ui";
import { stripe } from "@/lib/stripe";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Message } from "../Message";

const CreateAccountLink = () => {
	const [accountCreatePending, setAccountCreatePending] = useState(false);
	const [accountLinkCreatePending, setAccountLinkCreatePending] = useState(false);
	const [error, setError] = useState(false);
	const [wichError, setWichError] = useState()

	const [user, setUser] = useState<User | null>(null);
	const [connectedAccountId, setConnectedAccountId] = useState<string | null>(null);
	const [detailsSubmitted, setDetailsSubmited] = useState<boolean>(false)

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser();
			setUser(userData);
		};
		fetchUser();
	}, [accountCreatePending, accountLinkCreatePending]);

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
			return data.user
		} catch (err) {
			console.log(err)
			return null
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
					roles: 'vendor',
					stripe: account
				}),
			})
			setDetailsSubmited(data.details_submitted)
			return data.details_submitted
		} catch (err) {
			console.log(err)
			return err
		}
	}


	const handleAccountCreationAndLink = async () => {
		setAccountCreatePending(true);
		setError(false);
		try {
			const accountResponse = await fetch("/api/account", {
				method: "POST",
				body: JSON.stringify({
					userId: user!.id,
					name: user!.name,
					email: user!.email,
				}),
			});
			const accountJson = await accountResponse.json();
			setAccountCreatePending(false);

			const { account, error } = accountJson;

			if (account && user) {
				setConnectedAccountId(account);
				await getVerify(account);
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
				});

				const linkResponse = await fetch("/api/account-link", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						account: account,
					}),
				});
				const linkJson = await linkResponse.json();
				const { url, error: linkError } = linkJson;

				if (url) {
					window.location.href = url;
				} else if (linkError) {
					setError(true);
					console.log("linkError", linkError)
				}
			} else if (error) {
				setError(true);
				console.log("error", error)
			}
		} catch (err) {
			setAccountCreatePending(false);
			setError(true); // Define erro se a requisição falhar
			console.log("err", err)
		}
	};



	return (
		<>
			<Link className={buttonVariants({ variant: !!user?.stripe ? "secondary" : "default" })} href={!!user?.stripe ? `https://dashboard.stripe.com/${user.stripe}` : "#"} onClick={!!user?.stripe ? () => { } : handleAccountCreationAndLink} >
				{!!user?.stripe ? "Dados de Pagamento" : "Configurar Pagamentos"}

			</Link >
			{error && <p className="error">Algo deu errado! - {error}</p>
			}
			{
				(connectedAccountId || accountCreatePending || accountLinkCreatePending) && (
					<div className="dev-callout">
						{connectedAccountId && <Message success message={`O id da sua conta conectada é: ${connectedAccountId}. Aguarde!`}></Message>}
						{accountCreatePending && <p>Criando uma conta na plataforma de pagamentos Stripe.</p>}
						{accountLinkCreatePending && <p>Criando uma nova conta conectada ...</p>}
					</div>
				)
			}</>
	)
}

export default CreateAccountLink