import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import { User } from '@/payload-types'
import { GravatarAccountIcon } from '@/components/Gravatar'
import { checkRole } from '@/collections/Users/checkRole'
import { useAuth } from '@/providers/Auth'



export const UserMenu = ({ user }: { user: User }) => {

	const handleLogout = async () => {
		try {
			const req = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/users/logout', {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})

		} catch (err) {
			console.log(err)
		}
		window.location.reload()
	}

	return (<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="link" className="flex items-center">
				<div className='flex space-x-4'><span>{user?.name}</span><GravatarAccountIcon user={user!} /></div>
				<ChevronDown className="ml-2 h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" className="w-48">
			<DropdownMenuItem>
				<Link href="/admin/account" className="w-full">Minha conta</Link>
			</DropdownMenuItem>
			{/* <DropdownMenuItem>
				<Link href="/admin/collections/orders" className="w-full">Meus pedidos</Link>
			</DropdownMenuItem> */}
			<DropdownMenuItem>
				<Link href="/orders/purchase" className="w-full">Minhas compras</Link>
			</DropdownMenuItem>
			{checkRole(["admin", "vendor"], user) && (
				<>
					<DropdownMenuSeparator />
					<DropdownMenuLabel>Área do Vendedor</DropdownMenuLabel>
					<DropdownMenuItem>
						<Link href="/admin/collections/stores" className="w-full">Minha loja</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href="/admin/collections/products" className="w-full">Meus Produtos</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href="/admin/collections/orders/sale" className="w-full">Minhas Vendas</Link>
					</DropdownMenuItem>
				</>
			)}
			<DropdownMenuItem>
				<span className="w-full" onClick={() => handleLogout()}>Sair</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>)
}

export default UserMenu