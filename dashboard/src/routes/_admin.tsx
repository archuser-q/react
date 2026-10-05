import { createFileRoute, redirect } from '@tanstack/react-router'
import { AdminLayout } from '#/components/layout/AdminLayout'
import { meQueryOptions } from '#/hooks/useAuth'

export const Route = createFileRoute('/_admin')({
  ssr: false,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(meQueryOptions).catch(() => null)
    if (user?.role !== 'admin') throw redirect({ to: '/login' })
  },
  component: AdminLayout,
})
