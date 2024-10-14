import { Button } from "@/components/Button";
import CreateAccountLink from "@/components/CreateAccountLink";
import { getMeUserServer } from "@/utilities/getMeUserServer";
import React from "react";

export default async function Return({ params }) {

	const { user } = await getMeUserServer()
	/** Trocar pela REST Api do payloadcms */
	try {
		const getVerify = async () => {
			try {
				const accountVerify = await fetch('/api/account-verify', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						account: params?.account,
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

				return data.details_submitted
			} catch (err) {
				console.log(err)
				return err
			}
		}
	} catch (err) {
		console.log(err)
		return err
	}


	return (
		<div className="container">
			<div className="content">
				<h2>Sua conta foi criada com sucesso.</h2>
				<Button label="Cadastre seu primeiro produto e comece a vender" href="/admin/collections/products/create" appearance="secondary"></Button>
			</div>
			<div className="info-callout">
				<p>
					<a href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted" target="_blank" rel="noopener noreferrer">Veja seus dados</a>
				</p>
			</div>
		</div>
	);
}