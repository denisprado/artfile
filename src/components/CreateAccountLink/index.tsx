'use client'
import { useState } from "react";
import { CMSLink } from "../Link"

const CreateAccountLink = () => {
	const [accountCreatePending, setAccountCreatePending] = useState(false);
	const [accountLinkCreatePending, setAccountLinkCreatePending] = useState(false);
	const [error, setError] = useState(false);
	const [wichError, setWichError] = useState()
	const [connectedAccountId, setConnectedAccountId] = useState();
	return (
		<>
			{!accountCreatePending && !connectedAccountId && (
				<a href="#"
					onClick={async () => {
						setAccountCreatePending(true);
						setError(false);
						fetch("/api/account", {
							method: "POST",
						})
							.then((response) => response.json())
							.then((json) => {
								setAccountCreatePending(false);

								const { account, error } = json;

								if (account) {
									setConnectedAccountId(account);
								}

								if (error) {
									setError(true);
								}
							});
					}}
				>
					Não tenho um conta. Cadastrar.
				</a>
			)}
			{connectedAccountId && !accountLinkCreatePending && (
				<button
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

							console.log("url", json, url);
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
					Add information
				</button>
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