import { Button } from "@/components/Button";
import CreateAccountLink from "@/components/CreateAccountLink";
import React from "react";

export default function Return() {
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