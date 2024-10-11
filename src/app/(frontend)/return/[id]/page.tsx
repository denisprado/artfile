import CreateAccountLink from "@/components/CreateAccountLink";
import React from "react";

export default function Return() {
	return (
		<div className="container">
			<div className="banner">
				<h2>Artfile</h2>
			</div>
			<div className="content">
				<h2>Sua conta foi criada</h2>
				<p>Agora você pode se <CreateAccountLink /></p>
			</div>
			<div className="info-callout">
				<p>
					<a href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted" target="_blank" rel="noopener noreferrer">Veja seus dados</a>
				</p>
			</div>
		</div>
	);
}