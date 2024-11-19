'use client'
import { Box, Settings, ShoppingCart } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarTrigger, useSidebar } from "../Sidebar"
import Image from "next/image"
import Logo from "../Logo"
import imageLoader from "@/lib/imageLoader"
export default function Nav() {

	const { open } = useSidebar()
	const menuItems = [
		{
			title: "Vendas",
			icon: ShoppingCart,
			subItems: [
				{ title: "Pedidos", url: "/pedidos" },
				{ title: "Clientes", url: "/clientes" },
			]
		},
		{
			title: "Produtos",
			icon: Box,
			subItems: [
				{ title: "Catálogo", url: "/catalogo" },
				{ title: "Estoque", url: "/estoque" },
			]
		},
		{
			title: "Configurações",
			icon: Settings,
			url: "/configuracoes"
		},
	]

	return (
		<aside className="sidebar">
			<div>
				<nav>
					<Sidebar variant="floating" collapsible="icon">
						<SidebarTrigger />
						<SidebarHeader>{open ? <Logo /> : <Image loader={imageLoader} src="/media/favicon.svg" alt="Artfile Logo" width={18} height={18} />}</SidebarHeader>
						<SidebarContent>

							<SidebarMenu>
								{menuItems.map((item, index) => (
									<SidebarMenuItem key={index}>

										<SidebarMenuButton asChild variant={'outline'}>
											<a href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>

										{item.subItems && (
											<SidebarMenuSub>
												{item.subItems.map((subItem, subIndex) => (
													<SidebarMenuSubItem key={subIndex}>
														<SidebarMenuButton asChild size="sm">
															<a href={subItem.url}>
																<span>{subItem.title}</span>
															</a>
														</SidebarMenuButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										)}
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarContent>
						<SidebarFooter />
					</Sidebar>
				</nav>
			</div>
		</aside>
	)
}