// Khớp với app/schemas/catalog_admin.py

export interface CategoryItem {
  id: number
  parent_id: number | null
  name: string
  description: string | null
  icon_url: string | null
  is_active: boolean
  services_total: number
  services_active: number
}

export type CategoryPayload = {
  name?: string
  description?: string | null
  icon_url?: string | null
  is_active?: boolean
}

export interface ServiceItem {
  id: number
  category_id: number
  category_name: string
  name: string
  description: string | null
  base_price: number
  unit: string | null
  is_active: boolean
  workers: number
  orders_30d: number
  avg_final_price_30d: number | null
}

export type ServiceListParams = {
  category_id?: number
  keyword?: string
  active?: boolean
  page: number
  page_size: number
}

export type ServicePayload = {
  category_id?: number
  name?: string
  description?: string | null
  base_price?: number
  unit?: string | null
  is_active?: boolean
}

export type PriceMode = 'percent' | 'amount'
export type PriceRounding = 1 | 1000 | 5000 | 10000

export type BulkPricePayload = {
  service_ids: number[]
  mode: PriceMode
  value: number
  round_to: PriceRounding
}

export interface BulkPriceResult {
  updated: number
  changes: { id: number; name: string; old_price: number; new_price: number }[]
  applied_at: string
}
