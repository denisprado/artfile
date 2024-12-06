// app/dashboard/layout.tsx
import AppSidebar from '@/components/AppSidebar'

export default function DashboardLayout({
	children,
	beforeDashboard
}: {
	children: React.ReactNode
	beforeDashboard: React.ReactNode
}) {
	return (
		<div className="flex">
			<AppSidebar />
			<main className="flex-1">
				{beforeDashboard}
				{children}
			</main>
		</div>
	)
}