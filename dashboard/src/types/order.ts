// Khớp với app/schemas/order_admin.py
import type { UserRole } from '#/types/auth'
import type { ComplaintStatus, OrderStatus, PaymentMethod } from '#/types/dashboard'

export type OrderStatusFilter = 'active' | OrderStatus
export type MatchingMode = 'instant' | 'batch'
export type OfferStatus = 'sent' | 'accepted' | 'rejected' | 'expired'
export type QuoteStatus = 'pending' | 'approved' | 'rejected'
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded'

export interface OrderPerson {
  id: number
  full_name: string
  phone: string
  avatar_url: string | null
}

export interface OrderListItem {
  id: number
  status: OrderStatus
  customer: OrderPerson
  worker: OrderPerson | null
  service_name: string
  category_name: string
  address_line: string
  amount: number | null
  matching_mode: MatchingMode | null
  scheduled_at: string | null
  created_at: string
  completed_at: string | null
  has_open_complaint: boolean
}

export type OrderListParams = {
  status?: OrderStatusFilter
  keyword?: string
  category_id?: number
  date_from?: string
  date_to?: string
  page: number
  page_size: number
}

export type OrderCountParams = Omit<OrderListParams, 'status' | 'page' | 'page_size'>

export interface OrderStatusCounts {
  total: number
  items: { status: OrderStatus; count: number }[]
}

export interface OrderFilterOptions {
  categories: { id: number; name: string }[]
}

export interface OrderHistoryItem {
  status: OrderStatus
  changed_by_name: string | null
  changed_by_role: UserRole | null
  created_at: string
}

export interface OrderOfferItem {
  id: number
  worker_id: number
  worker_name: string
  match_score: number | null
  distance_km: number | null
  status: OfferStatus
  sent_at: string
  responded_at: string | null
}

export interface OrderExtraQuoteItem {
  id: number
  description: string
  amount: number
  status: QuoteStatus
  created_at: string
  responded_at: string | null
}

export interface OrderPaymentItem {
  id: number
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  transaction_code: string | null
  created_at: string
  paid_at: string | null
}

export interface OrderDetail {
  id: number
  status: OrderStatus
  matching_mode: MatchingMode | null
  address_line: string
  latitude: number
  longitude: number
  description: string | null
  image_urls: string[]
  scheduled_at: string | null
  created_at: string
  accepted_at: string | null
  completed_at: string | null
  cancel_reason: string | null
  estimated_price: number | null
  final_price: number | null
  service: { id: number; name: string; category_name: string; base_price: number }
  customer: OrderPerson
  worker: (OrderPerson & { trust_score: number }) | null
  history: OrderHistoryItem[]
  offers: OrderOfferItem[]
  extra_quotes: OrderExtraQuoteItem[]
  payments: OrderPaymentItem[]
  earning: { gross_amount: number; commission_amount: number; net_amount: number } | null
  review: {
    rating: number
    comment: string | null
    is_flagged: boolean
    flag_reason: string | null
    created_at: string
  } | null
  complaints: {
    id: number
    reason: string
    status: ComplaintStatus
    created_at: string
    resolved_at: string | null
  }[]
}
