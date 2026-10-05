import { createFileRoute } from '@tanstack/react-router'
import { ComplaintsPage } from '#/pages/complaints/ComplaintsPage'
import type { ComplaintSearch } from '#/pages/complaints/ComplaintsPage'
import { parseEnum, parsePage, parseText } from '#/utils/search'

const parseDate = (value: unknown) => {
  const text = parseText(value)
  return text && /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : undefined
}

export const Route = createFileRoute('/_admin/complaints')({
  validateSearch: (search: Record<string, unknown>): ComplaintSearch => {
    const id = Number(search.id)
    return {
      status: parseEnum(search.status, ['open', 'processing', 'resolved', 'rejected'] as const),
      keyword: parseText(search.keyword),
      date_from: parseDate(search.date_from),
      date_to: parseDate(search.date_to),
      page: parsePage(search.page),
      id: Number.isInteger(id) && id > 0 ? id : undefined,
    }
  },
  component: ComplaintsRoute,
})

function ComplaintsRoute() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  return <ComplaintsPage search={search} onSearchChange={(next) => navigate({ search: next })} />
}
