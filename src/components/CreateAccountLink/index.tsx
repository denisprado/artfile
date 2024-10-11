'use client'
import { useState } from "react";
import { Button } from "../Button";

const CreateAccountLink = () => {
	const [accountCreatePending, setAccountCreatePending] = useState(false);
	const [accountLinkCreatePending, setAccountLinkCreatePending] = useState(false);
	const [error, setError] = useState(false);
	const [wichError, setWichError] = useState()
	const [connectedAccountId, setConnectedAccountId] = useState();


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
			return err
		}
	}

	return (
		<>
			{!accountCreatePending && !connectedAccountId && (
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
									setConnectedAccountId(account);
									console.log("connectedAccountId", connectedAccountId)
									await fetch('/api/users/' + user.id, {
										method: 'PATCH',
										credentials: 'include',
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											"stripe": connectedAccountId

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
			{connectedAccountId && !accountLinkCreatePending && (
				<Button
					label="Informar meus dados de vendedor"
					appearance="secondary"
					onClick={async () => {
						setAccountLinkCreatePending(true);
						setError(false);
						try {
							const response = await fetch("/api/account-link", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									account: connectedAccountId,
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
						} catch (err) {
							setAccountLinkCreatePending(false);
							setError(true); // Define erro se a requisição falhar
						}
					}}
				>
				</Button>
			)}
			{error && <p className="error">Something went wrong!{wichError}</p>}
			{(connectedAccountId || accountCreatePending || accountLinkCreatePending) && (
				<div className="dev-callout">
					{connectedAccountId && <p>Your connected account ID is: <code className="bold">{connectedAccountId}</code></p>}
					{accountCreatePending && <p>Creating a connected account...</p>}
					{accountLinkCreatePending && <p>Creating a new Account Link...</p>}
				</div>
			)}</>
	)
}

export default CreateAccountLink