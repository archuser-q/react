import { createFileRoute, redirect } from '@tanstack/react-router'
import { meQueryOptions } from '#/hooks/useAuth'
import { LoginPage } from '#/pages/auth/LoginPage'

export const Route = createFileRoute('/login')({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): { expired?: boolean } => ({
    expired: search.expired === true || search.expired === 'true' ? true : undefined,
  }),
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery(meQueryOptions).catch(() => null)
    if (user?.role === 'admin') throw redirect({ to: '/' })
  },
  component: LoginRoute,
})

function LoginRoute() {
  const { expired } = Route.useSearch()
  return <LoginPage expired={expired} />
}
