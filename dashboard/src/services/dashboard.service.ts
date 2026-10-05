import { http } from '#/lib/http'
import type {
  DashboardKpis,
  DashboardOverview,
  OrdersByHour,
  PendingTasks,
  Period,
  QuickView,
  SystemSummary,
} from '#/types/dashboard'

const BASE = '/admin/dashboard'

export const dashboardService = {
  overview: () => http.get<DashboardOverview>(`${BASE}/overview`),
  quickView: (period: Period) => http.get<QuickView>(`${BASE}/quick-view`, { period }),
  summary: () => http.get<SystemSummary>(`${BASE}/summary`),
  pendingTasks: () => http.get<PendingTasks>(`${BASE}/pending-tasks`),
  kpis: (period: Period) => http.get<DashboardKpis>(`${BASE}/kpis`, { period }),
  ordersByHour: (date?: string) => http.get<OrdersByHour>(`${BASE}/orders-by-hour`, { date }),
}
