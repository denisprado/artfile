'use client'
import { Hamburger, Logout, useNav } from '@payloadcms/ui'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import './index.scss'
import Link from 'next/link'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../Sidebar'
import { Home, Inbox, Calendar, Search, Settings } from 'lucide-react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
const baseClass = 'nav'
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
export default function Nav() {
	const { navOpen, navRef, setNavOpen } = useNav()

	return (
		<aside className={[baseClass, navOpen && `${baseClass}--nav-open`].filter(Boolean).join(' ')}>
			<div className={`${baseClass}__scroll`} ref={navRef}>
				<nav className={`${baseClass}__wrap`}>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger>Is it accessible?</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<div className={`${baseClass}__controls`}>
						<Logout tabIndex={!navOpen ? -1 : undefined} />
					</div>
				</nav>
			</div>
			<div className={`${baseClass}__header`}>
				<div className={`${baseClass}__header-content`}>
					<button
						className={`${baseClass}__mobile-close`}
						onClick={() => {
							setNavOpen(false)
						}}
						tabIndex={!navOpen ? -1 : undefined}
						type="button"
					>
						<Hamburger isActive />
					</button>
				</div>
			</div>
		</aside>
	)
}