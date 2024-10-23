import { Order } from "@/payload-types"
import formattedDate from "@/utilities/formatDate"
import { formatDateTime } from "@/utilities/formatDateTime"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Order>[] = [
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "createdAt",
		header: "Criada em",
		// cell: async ({ row }) => {
		// 	'use server'
		// 	const data = formattedDate(row.getValue('createdAt'))
		// 	return data
		// },
	},

	{
		accessorKey: "products",
		header: "Produtos",

		// cell: async ({ row }) => {
		// 	'use server'
		// 	const data = formattedDate(row.getValue('createdAt'))
		// 	return data
		// },
	},

	{
		accessorKey: "totalAmount",
		header: "Total",
		// cell: async ({ row }) => {
		// 	'use server'
		// 	const amount = parseFloat(row.getValue("amount"))
		// 	const formatted = new Intl.NumberFormat("pt-BR", {
		// 		style: "currency",
		// 		currency: "BRL",
		// 	}).format(amount)

		// 	return <div className="text-right font-medium">{formatted}</div>
		// },
	},
]