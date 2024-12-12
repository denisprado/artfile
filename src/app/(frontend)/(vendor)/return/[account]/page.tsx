import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { getMeUserServer } from "@/utilities/getMeUserServer";
import configPromise from '@payload-config';
import Link from "next/link";
import { getPayload } from 'payload';

export default async function Return(props) {
	const params = await props.params;

	const { user } = await getMeUserServer()

	const payload = await getPayload({ config: configPromise })

	await payload.update({
		collection: 'users',
		where: {
			id: { equals: user?.id! }
		},
		data: {
			stripe: params.account
		}
	})


	return (
		<div className="container">
			<div className="content">
				<h2>Sua conta foi criada com sucesso.</h2>
				<Link href="/admin/collections/products/create" ><Button variant={"secondary"} asChild>Cadastre seu primeiro produto e comece a vender</Button></Link>
			</div>
			<div className="info-callout">
				<p>
					<a href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted" target="_blank" rel="noopener noreferrer">Veja seus dados</a>
				</p>
			</div>
		</div>
	);
}