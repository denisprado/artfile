"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/utilities/cn"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Produtos Eletrônicos",
		href: "/eletronicos",
		description: "Smartphones, laptops, tablets e acessórios.",
	},
	{
		title: "Moda",
		href: "/moda",
		description: "Roupas, calçados e acessórios para todas as estações.",
	},
	{
		title: "Casa e Decoração",
		href: "/casa-e-decoracao",
		description: "Móveis, utensílios e itens de decoração para seu lar.",
	},
	{
		title: "Esportes e Lazer",
		href: "/esportes-e-lazer",
		description: "Equipamentos esportivos e itens para atividades ao ar livre.",
	},
	{
		title: "Beleza e Saúde",
		href: "/beleza-e-saude",
		description: "Cosméticos, cuidados pessoais e suplementos.",
	},
	{
		title: "Livros e Mídia",
		href: "/livros-e-midia",
		description: "Livros, e-books, filmes e música.",
	},
]

export default function MegaMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Ofertas</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<a
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
										href="/ofertas-do-dia"
									>
										<div className="mb-2 mt-4 text-lg font-medium">
											Ofertas do Dia
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											Confira as melhores ofertas com descontos incríveis.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem href="/promocoes" title="Promoções">
								Produtos com preços imperdíveis por tempo limitado.
							</ListItem>
							<ListItem href="/liquidacao" title="Liquidação">
								Últimas unidades com descontos de até 70%.
							</ListItem>
							<ListItem href="/cupons" title="Cupons de Desconto">
								Códigos promocionais para economizar ainda mais.
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/novidades" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Novidades
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = "ListItem"