import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { workerKeys } from '#/hooks/query-keys'
import { dashboardKeys } from '#/hooks/useDashboard'
import { orderService } from '#/services/order.service'
import type { OrderCountParams, OrderListParams } from '#/types/order'

export const orderKeys = {
  all: ['orders'] as const,
  list: (params: OrderListParams) => [...orderKeys.all, 'list', params] as const,
  counts: (params: OrderCountParams) => [...orderKeys.all, 'counts', params] as const,
  filterOptions: () => [...orderKeys.all, 'filter-options'] as const,
  detail: (id: number) => [...orderKeys.all, 'detail', id] as const,
}

export function useOrderList(params: OrderListParams) {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => orderService.list(params),
    placeholderData: keepPreviousData,
  })
}

export function useOrderStatusCounts(params: OrderCountParams) {
  return useQuery({
    queryKey: orderKeys.counts(params),
    queryFn: () => orderService.statusCounts(params),
    placeholderData: keepPreviousData,
  })
}

export function useOrderFilterOptions() {
  return useQuery({
    queryKey: orderKeys.filterOptions(),
    queryFn: orderService.filterOptions,
    staleTime: 5 * 60_000,
  })
}

export function useOrderDetail(id: number) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => orderService.get(id),
  })
}

export function useCancelOrder(id: number) {
  const queryClient = useQueryClient()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: (reason: string) => orderService.cancel(id, reason),
    onSuccess: (order) => {
      message.success(`Đã hủy đơn #${order.id}`)
      queryClient.setQueryData(orderKeys.detail(id), order)
      queryClient.invalidateQueries({ queryKey: orderKeys.all })
      queryClient.invalidateQueries({ queryKey: workerKeys.all })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
    },
    onError: (error) => message.error(error.message),
  })
}
