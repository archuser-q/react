import type { User } from '#/types/auth'

export type VerificationStatus = 'pending' | 'approved' | 'rejected'
export type Availability = 'online' | 'busy' | 'offline'
export type DocType = 'id_card_front' | 'id_card_back' | 'certificate' | 'portrait'
export type DocStatus = 'pending' | 'approved' | 'rejected'

// Các trường Decimal (service_radius_km, trust_score) được FastAPI trả về dạng chuỗi
export interface WorkerProfile {
  user_id: number
  bio: string | null
  experience_years: number
  verification_status: VerificationStatus
  availability: Availability
  service_radius_km: string
  current_latitude: number | null
  current_longitude: number | null
  location_updated_at: string | null
  trust_score: string
  review_count: number
  completed_orders: number
  created_at: string
}

export interface WorkerDocument {
  id: number
  worker_id: number
  doc_type: DocType
  file_url: string
  status: DocStatus
  reject_reason: string | null
  uploaded_at: string
  reviewed_at: string | null
}

export interface AdminWorkerItem {
  user: User
  profile: WorkerProfile
}

export interface AdminWorkerDetail extends AdminWorkerItem {
  documents: WorkerDocument[]
}

export type WorkerListParams = {
  verification_status?: VerificationStatus
  page: number
  page_size: number
}

export type ReviewDocumentPayload = {
  status: 'approved' | 'rejected'
  reject_reason?: string
}

export type WorkerVerificationPayload = {
  status: 'approved' | 'rejected'
}
