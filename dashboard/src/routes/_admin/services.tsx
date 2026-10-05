import { createFileRoute } from '@tanstack/react-router'
import { ServicesPage } from '#/pages/catalog/ServicesPage'
import type { ServiceSearch } from '#/pages/catalog/ServicesPage'
import { parseEnum, parsePage, parseText } from '#/utils/search'

export const Route = createFileRoute('/_admin/services')({
  validateSearch: (search: Record<string, unknown>): ServiceSearch => {
    const categoryId = Number(search.category_id)
    return {
      category_id: Number.isInteger(categoryId) && categoryId > 0 ? categoryId : undefined,
      keyword: parseText(search.keyword),
      status: parseEnum(search.status, ['active', 'inactive'] as const),
      page: parsePage(search.page),
    }
  },
  component: ServicesRoute,
})

function ServicesRoute() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  return <ServicesPage search={search} onSearchChange={(next) => navigate({ search: next })} />
}
