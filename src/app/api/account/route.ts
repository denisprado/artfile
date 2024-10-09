import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	if (req.method === 'POST') {

		try {
			const account = await stripe.accounts.create({
				controller: {
					stripe_dashboard: {
						type: "none",
					},
					fees: {
						payer: "application"
					},
				},
				capabilities: {
					card_payments: { requested: true },
					transfers: { requested: true }
				},
				country: "BR",
			});

			return NextResponse.json({ account: account.id });
		} catch (error) {
			console.error('An error occurred when calling the Stripe API to create an account:', error);
			// res.status(500);
			return NextResponse.json({ error: error.message });
		}
	}
}