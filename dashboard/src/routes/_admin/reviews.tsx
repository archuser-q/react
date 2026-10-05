import { createFileRoute } from '@tanstack/react-router'
import { ReviewsPage } from '#/pages/reviews/ReviewsPage'
import type { ReviewSearch } from '#/pages/reviews/ReviewsPage'
import { parseEnum, parsePage, parseText } from '#/utils/search'

const parseDate = (value: unknown) => {
  const text = parseText(value)
  return text && /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : undefined
}

const parsePositive = (value: unknown, max?: number) => {
  const n = Number(value)
  return Number.isInteger(n) && n > 0 && (!max || n <= max) ? n : undefined
}

export const Route = createFileRoute('/_admin/reviews')({
  validateSearch: (search: Record<string, unknown>): ReviewSearch => ({
    // ?flagged=true là link cũ từ ô "Đánh giá bị gắn cờ" trên trang Tổng quan
    view:
      parseEnum(search.view, ['flagged', 'low', 'hidden'] as const) ??
      (search.flagged === true || search.flagged === 'true' ? 'flagged' : undefined),
    rating: parsePositive(search.rating, 5),
    sort: parseEnum(search.sort, ['lowest'] as const),
    keyword: parseText(search.keyword),
    date_from: parseDate(search.date_from),
    date_to: parseDate(search.date_to),
    page: parsePage(search.page),
    id: parsePositive(search.id),
    flagged: undefined,
  }),
  component: ReviewsRoute,
})

function ReviewsRoute() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  return <ReviewsPage search={search} onSearchChange={(next) => navigate({ search: next })} />
}
