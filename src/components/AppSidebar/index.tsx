'use client'

import '../../app/(payload)/sidebar.css'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/Sidebar"
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import LogoAdmin from '../LogoAdmin'
export default function AppSidebar() {

	const items = [
		{
			title: "Home",
			url: "#",
			icon: Home,
		},
		{
			title: "Inbox",
			url: "#",
			icon: Inbox,
		},
		{
			title: "Calendar",
			url: "#",
			icon: Calendar,
		},
		{
			title: "Search",
			url: "#",
			icon: Search,
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings,
		},
	]

	return (
		<div className="w-full flex flex-row gap-4 sidebarAdmin">
			<div className='flex flex-row z-50 justify-start items-center h-20'>
				<SidebarTrigger />
			</div>
			<Sidebar className='mt-20'>
				<SidebarHeader><LogoAdmin /></SidebarHeader>
				<SidebarContent>
					<Collapsible defaultOpen className="group/collapsible">

						<SidebarGroup>

							<SidebarGroupLabel>Vendas</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{items.map((item) => (
										<SidebarMenuItem key={item.title}>
											<CollapsibleTrigger asChild>

												<SidebarMenuButton asChild variant={'outline'}>
													<a href={item.url}>
														<item.icon />
														<span>{item.title}</span>
													</a>
												</SidebarMenuButton>
											</CollapsibleTrigger>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</Collapsible>
				</SidebarContent>
				<SidebarFooter />
			</Sidebar>
		</div>
	)
}