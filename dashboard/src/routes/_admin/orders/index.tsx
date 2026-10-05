import { createFileRoute } from '@tanstack/react-router'
import { OrdersPage } from '#/pages/orders/OrdersPage'
import type { OrderSearch } from '#/pages/orders/OrdersPage'
import { parseEnum, parsePage, parseText } from '#/utils/search'

const STATUS_FILTERS = [
  'active',
  'pending',
  'matched',
  'accepted',
  'on_the_way',
  'arrived',
  'in_progress',
  'completed',
  'cancelled',
] as const

const parseDate = (value: unknown) => {
  const text = parseText(value)
  return text && /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : undefined
}

export const Route = createFileRoute('/_admin/orders/')({
  validateSearch: (search: Record<string, unknown>): OrderSearch => {
    const categoryId = Number(search.category_id)
    return {
      status: parseEnum(search.status, STATUS_FILTERS),
      keyword: parseText(search.keyword),
      category_id: Number.isInteger(categoryId) && categoryId > 0 ? categoryId : undefined,
      date_from: parseDate(search.date_from),
      date_to: parseDate(search.date_to),
      page: parsePage(search.page),
    }
  },
  component: OrdersRoute,
})

function OrdersRoute() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <OrdersPage
      search={search}
      onSearchChange={(next) => navigate({ search: next })}
      onOpenOrder={(orderId) => navigate({ to: '/orders/$orderId', params: { orderId } })}
    />
  )
}
