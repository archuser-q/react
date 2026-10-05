import { createFileRoute } from '@tanstack/react-router'
import { CustomersPage } from '#/pages/customers/CustomersPage'
import type { CustomerSearch } from '#/pages/customers/CustomersPage'
import { parseEnum, parsePage, parseText } from '#/utils/search'

export const Route = createFileRoute('/_admin/customers')({
  validateSearch: (search: Record<string, unknown>): CustomerSearch => ({
    page: parsePage(search.page),
    keyword: parseText(search.keyword),
    status: parseEnum(search.status, ['active', 'blocked'] as const),
  }),
  component: CustomersRoute,
})

function CustomersRoute() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  return <CustomersPage search={search} onSearchChange={(next) => navigate({ search: next })} />
}
