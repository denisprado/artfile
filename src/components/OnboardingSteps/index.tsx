import { Wallet, Store, Package, Megaphone } from 'lucide-react'
import { cn } from "@/lib/utils"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/Button'
import CreateAccountLink from '@/components/CreateAccountLink'
import UpdateStoreLink from '@/components/UpdateStoreButton'

const steps = [
	{
		title: "Ative seus recebimentos",
		description: "Configure sua conta bancária para receber pagamentos de vendas.",
		icon: <Wallet className="h-6 w-6" />,
		cta: "Configurar Pagamentos",
		href: <CreateAccountLink />
	},
	{
		title: "Personalize sua vitrine",
		description: "Crie uma loja única com sua identidade e informações essenciais.",
		icon: <Store className="h-6 w-6" />,
		cta: "Personalizar Loja",
		href: <UpdateStoreLink />
	},
	{
		title: "Cadastre seu catálogo",
		description: "Adicione seus produtos com fotos atraentes e descrições detalhadas.",
		icon: <Package className="h-6 w-6" />,
		cta: "Adicionar Produtos",
		href: "/add-products"
	},
	{
		title: "Impulsione suas vendas",
		description: "Aprenda estratégias eficazes para promover sua loja e atrair clientes.",
		icon: <Megaphone className="h-6 w-6" />,
		cta: "Iniciar Marketing",
		href: "/promote-store"
	},
]

export default function OnboardingSteps() {
	return (
		<Card className="w-full max-w-3xl mx-auto">
			<CardHeader>
				<CardTitle>Bem-vinda, bem-vindo ao Artfile!</CardTitle>
				<CardDescription>
					Complete estes 4 passos para começar a vender seus produtos.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				{steps.map((step, index) => (
					<div key={index} className="flex flex-col space-y-2">
						<div className="flex items-center space-x-4">
							<div className={cn(
								"flex h-10 w-10 items-center justify-center rounded-full",
								"bg-primary text-primary-foreground"
							)}>
								{step.icon}
							</div>
							<div className="flex-1 space-y-1">
								<p className="text-sm font-medium leading-none">{step.title}</p>
								<p className="text-sm text-muted-foreground">
									{step.description}
								</p>
							</div>
						</div>
						<div className="pl-14">
							{typeof step.href === 'string' ? <Button appearance='secondary' className="w-full sm:w-auto" href={step.href} label={step.cta}>
							</Button> : step.href}
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}

