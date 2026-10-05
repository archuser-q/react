// Khớp với app/schemas/review_admin.py
import type { ComplaintStatus, OrderStatus } from '#/types/dashboard'

export type ReviewView = 'flagged' | 'low' | 'hidden'
export type ReviewSort = 'newest' | 'lowest'
export type ModerationAction = 'flag' | 'approve' | 'hide' | 'restore'

export interface ReviewPerson {
  id: number
  full_name: string
  phone: string
  avatar_url: string | null
}

export interface ReviewListItem {
  id: number
  order_id: number
  rating: number
  comment: string | null
  is_flagged: boolean
  flag_reason: string | null
  is_hidden: boolean
  customer: ReviewPerson
  worker: ReviewPerson
  service_name: string
  created_at: string
  moderated_at: string | null
}

export type ReviewFilterParams = {
  keyword?: string
  worker_id?: number
  date_from?: string
  date_to?: string
}

export type ReviewListParams = ReviewFilterParams & {
  view?: ReviewView
  rating?: number
  sort?: ReviewSort
  page: number
  page_size: number
}

export interface ReviewStats {
  total: number
  visible: number
  flagged: number
  hidden: number
  low: number
  average: number | null
  distribution: { star: number; count: number; percent: number }[]
}

export interface ReviewDetail extends ReviewListItem {
  moderation_note: string | null
  moderated_by_name: string | null
  order: {
    id: number
    status: OrderStatus
    service_name: string
    category_name: string
    amount: number | null
    completed_at: string | null
  }
  worker_stats: {
    average: number | null
    visible_reviews: number
    low_reviews: number
    flagged_reviews: number
    hidden_reviews: number
  }
  complaints: { id: number; reason: string; status: ComplaintStatus; created_at: string }[]
}

export type ModerationPayload = {
  action: ModerationAction
  note?: string
}
