'use client'
import { Box, LogOut, Settings, ShoppingCart } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarTrigger, useSidebar } from "../Sidebar"
import Image from "next/image"
import Logo from "../Logo"
import imageLoader from "@/lib/imageLoader"
import Link from "next/link"
import { useAuth } from '@payloadcms/ui'
export default function Nav() {

	const { logOut } = useAuth()

	const { open } = useSidebar()
	const menuItems = [
		{
			title: "Vendas",
			icon: ShoppingCart,
			subItems: [
				{ title: "Pedidos", url: "/orders" },
			]
		},
		{
			title: "Produtos",
			icon: Box,
			subItems: [
				{ title: "Meus produtos", url: "/collections/products" },
			]
		},
		{
			title: "Configurações",
			icon: Settings,
			url: "/configuracoes"
		},
	]

	return (
		<aside className="sidebar useTw border">
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
						<SidebarFooter >
							<SidebarMenuButton asChild variant={'outline'}>
								<Link href={'/admin/logout'} onClick={() => logOut()}>
									<LogOut />
									<span>sair</span>
								</Link>
							</SidebarMenuButton></SidebarFooter>
					</Sidebar>
				</nav>
			</div>
		</aside>
	)
}