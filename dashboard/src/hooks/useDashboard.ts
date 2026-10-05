import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import { DASHBOARD_REFRESH_MS } from '#/config/env'
import { dashboardService } from '#/services/dashboard.service'
import type { Period } from '#/types/dashboard'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  overview: () => [...dashboardKeys.all, 'overview'] as const,
  quickView: (period: Period) => [...dashboardKeys.all, 'quick-view', period] as const,
  ordersByHour: (date?: string) =>
    [...dashboardKeys.all, 'orders-by-hour', date ?? 'today'] as const,
}

export function useDashboardOverview() {
  return useQuery({
    queryKey: dashboardKeys.overview(),
    queryFn: dashboardService.overview,
    refetchInterval: DASHBOARD_REFRESH_MS,
  })
}

export function useQuickView(period: Period) {
  return useQuery({
    queryKey: dashboardKeys.quickView(period),
    queryFn: () => dashboardService.quickView(period),
    refetchInterval: DASHBOARD_REFRESH_MS,
    placeholderData: keepPreviousData,
  })
}

export function useOrdersByHour(date?: string) {
  return useQuery({
    queryKey: dashboardKeys.ordersByHour(date),
    queryFn: () => dashboardService.ordersByHour(date),
    refetchInterval: date ? false : DASHBOARD_REFRESH_MS,
    placeholderData: keepPreviousData,
  })
}

export function useRefreshDashboard() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
}
