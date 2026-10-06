// Khớp với app/schemas/matching.py

export type MatchingMode = 'instant' | 'batch'
export type FactorKey = 'distance' | 'trust' | 'price' | 'workload'

export interface Weights {
  weight_distance: number
  weight_trust: number
  weight_price: number
  weight_workload: number
}

export interface MatchingConfigItem extends Weights {
  id: number
  name: string
  mode: MatchingMode
  batch_window_seconds: number | null
  search_radius_km: number
  max_offers: number
  offer_timeout_seconds: number
  is_active: boolean
  updated_by_name: string | null
  updated_at: string
}

export type MatchingConfigPayload = Weights & {
  name: string
  mode: MatchingMode
  batch_window_seconds: number | null
  search_radius_km: number
  max_offers: number
  offer_timeout_seconds: number
}

export type SimulatePayload = {
  order_id?: number
  latitude?: number
  longitude?: number
  service_id?: number
  config_id?: number
  weights?: Weights
  search_radius_km?: number
  include_busy?: boolean
}

export type ScoreParts = Record<FactorKey, number>

export interface RankedWorker {
  rank: number
  worker_id: number
  full_name: string
  phone: string
  availability: 'online' | 'busy' | 'offline'
  distance_km: number
  active_orders: number
  price_ratio: number | null
  scores: ScoreParts
  contributions: ScoreParts
  total_score: number
  will_receive_offer: boolean
}

export interface SimulateResult {
  target: {
    order_id: number | null
    latitude: number
    longitude: number
    service_id: number | null
    service_name: string | null
  }
  config_name: string
  mode: MatchingMode
  weights: Weights
  search_radius_km: number
  max_offers: number
  candidates_found: number
  ranking: RankedWorker[]
}
