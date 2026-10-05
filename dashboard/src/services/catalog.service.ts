import { http, request } from '#/lib/http'
import type { Paginated } from '#/types/api'
import type {
  BulkPricePayload,
  BulkPriceResult,
  CategoryItem,
  CategoryPayload,
  ServiceItem,
  ServiceListParams,
  ServicePayload,
} from '#/types/catalog'

export const catalogService = {
  categories: () => http.get<CategoryItem[]>('/admin/service-categories'),
  createCategory: (payload: CategoryPayload) =>
    http.post<CategoryItem>('/admin/service-categories', payload),
  updateCategory: (id: number, payload: CategoryPayload) =>
    http.patch<CategoryItem>(`/admin/service-categories/${id}`, payload),
  deleteCategory: (id: number) =>
    request<null>(`/admin/service-categories/${id}`, { method: 'DELETE' }),

  services: (params: ServiceListParams) =>
    http.get<Paginated<ServiceItem>>('/admin/services', params),
  createService: (payload: ServicePayload) => http.post<ServiceItem>('/admin/services', payload),
  updateService: (id: number, payload: ServicePayload) =>
    http.patch<ServiceItem>(`/admin/services/${id}`, payload),
  deleteService: (id: number) => request<null>(`/admin/services/${id}`, { method: 'DELETE' }),
  bulkPrice: (payload: BulkPricePayload) =>
    http.patch<BulkPriceResult>('/admin/services/bulk-price', payload),
}
