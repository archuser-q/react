import { http } from '#/lib/http'
import type { Paginated } from '#/types/api'
import type {
  ModerationPayload,
  ReviewDetail,
  ReviewFilterParams,
  ReviewListItem,
  ReviewListParams,
  ReviewStats,
} from '#/types/review'

export const reviewService = {
  list: (params: ReviewListParams) => http.get<Paginated<ReviewListItem>>('/admin/reviews', params),
  stats: (params: ReviewFilterParams) => http.get<ReviewStats>('/admin/reviews/stats', params),
  get: (id: number) => http.get<ReviewDetail>(`/admin/reviews/${id}`),
  moderate: (id: number, payload: ModerationPayload) =>
    http.patch<ReviewDetail>(`/admin/reviews/${id}/moderation`, payload),
}
