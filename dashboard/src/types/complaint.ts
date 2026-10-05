// Khớp với app/schemas/complaint_admin.py
import type { UserRole } from '#/types/auth'
import type { ComplaintStatus, OrderStatus } from '#/types/dashboard'

export interface ComplaintPerson {
  id: number
  full_name: string
  phone: string
  role: UserRole
  avatar_url: string | null
}

export interface ComplaintListItem {
  id: number
  order_id: number
  reason: string
  status: ComplaintStatus
  complainant: ComplaintPerson
  worker_name: string | null
  service_name: string
  handled_by_name: string | null
  created_at: string
  resolved_at: string | null
}

export type ComplaintListParams = {
  status?: ComplaintStatus
  keyword?: string
  date_from?: string
  date_to?: string
  page: number
  page_size: number
}

export type ComplaintCountParams = Omit<ComplaintListParams, 'status' | 'page' | 'page_size'>

export interface ComplaintStatusCounts {
  total: number
  items: { status: ComplaintStatus; count: number }[]
}

export interface ComplaintDetail {
  id: number
  reason: string
  description: string | null
  status: ComplaintStatus
  resolution: string | null
  created_at: string
  resolved_at: string | null
  complainant: ComplaintPerson
  handled_by: ComplaintPerson | null
  order: {
    id: number
    status: OrderStatus
    service_name: string
    category_name: string
    amount: number | null
    address_line: string
    customer: ComplaintPerson
    worker: ComplaintPerson | null
    created_at: string
    completed_at: string | null
  }
  review: { rating: number; comment: string | null } | null
  history: {
    worker_total: number
    worker_resolved: number
    complainant_total: number
  }
}

export type ComplaintAction = 'processing' | 'resolved' | 'rejected'

export type ComplaintStatusPayload = {
  status: ComplaintAction
  resolution?: string
}
