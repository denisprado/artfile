import { Button } from "@/components/Button";
import { stripe } from "@/lib/stripe";
import { getMeUserServer } from "@/utilities/getMeUserServer";
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export default async function Return(props) {
    const params = await props.params;

    const { user } = await getMeUserServer()

    const payload = await getPayloadHMR({ config: configPromise })
    const accountReturned = await stripe.accounts.retrieve(params.account)

    await payload.update({
		collection: 'users',
		where: {
			id: { equals: user?.id! }
		},
		data: {
			detailsSubmited: accountReturned.details_submitted
		}
	})


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