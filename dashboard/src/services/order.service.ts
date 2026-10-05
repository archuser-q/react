import { http } from '#/lib/http'
import type { Paginated } from '#/types/api'
import type {
  OrderCountParams,
  OrderDetail,
  OrderFilterOptions,
  OrderListItem,
  OrderListParams,
  OrderStatusCounts,
} from '#/types/order'

export const orderService = {
  list: (params: OrderListParams) => http.get<Paginated<OrderListItem>>('/admin/orders', params),
  statusCounts: (params: OrderCountParams) =>
    http.get<OrderStatusCounts>('/admin/orders/status-counts', params),
  filterOptions: () => http.get<OrderFilterOptions>('/admin/orders/filter-options'),
  get: (id: number) => http.get<OrderDetail>(`/admin/orders/${id}`),
  cancel: (id: number, reason: string) =>
    http.patch<OrderDetail>(`/admin/orders/${id}/cancel`, { reason }),
}
