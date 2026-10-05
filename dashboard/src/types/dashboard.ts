// Khớp với app/schemas/admin.py (overview) và app/schemas/dashboard.py (quick view)

export type OrderStatus =
  | 'pending'
  | 'matched'
  | 'accepted'
  | 'on_the_way'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type ComplaintStatus = 'open' | 'processing' | 'resolved' | 'rejected'
export type Period = 'today' | '7d' | '30d' | 'month'
export type Severity = 'high' | 'medium' | 'low' | 'none'
export type PaymentMethod = 'cash' | 'momo' | 'vnpay'

// ---------- /admin/dashboard/overview ----------

export interface GrowthStat {
  value: number
  previous: number
  change_percent: number | null
}

export interface OnlineWorkersStat {
  online: number
  busy: number
  total_approved: number
}

export interface SatisfactionStat {
  score: number | null
  previous: number | null
  change: number | null
  review_count: number
}

export interface DashboardStats {
  revenue_month: GrowthStat
  orders_today: GrowthStat
  online_workers: OnlineWorkersStat
  satisfaction: SatisfactionStat
}

export interface MonthlyPoint {
  month: string
  label: string
  revenue: number
  orders: number
}

export interface ServiceShare {
  category_id: number
  name: string
  orders: number
  percent: number
}

export interface WorkerActivity {
  worker_id: number
  worker_name: string
  avatar_url: string | null
  order_id: number
  status: OrderStatus
  action: string
  created_at: string
}

export interface TopWorker {
  user_id: number
  full_name: string
  avatar_url: string | null
  trust_score: number
  avg_rating: number | null
  review_count: number
  completed_orders: number
}

export interface RecentComplaint {
  id: number
  order_id: number
  complainant_name: string
  reason: string
  status: ComplaintStatus
  created_at: string
}

export interface RecentComplaints {
  total_open: number
  items: RecentComplaint[]
}

export interface RecentOrder {
  id: number
  customer_name: string
  worker_name: string | null
  service_name: string
  status: OrderStatus
  amount: number | null
  created_at: string
}

export interface DashboardOverview {
  stats: DashboardStats
  revenue_chart: MonthlyPoint[]
  service_breakdown: ServiceShare[]
  worker_activities: WorkerActivity[]
  top_workers: TopWorker[]
  recent_complaints: RecentComplaints
  recent_orders: RecentOrder[]
}

// ---------- /admin/dashboard/summary ----------

export interface UsersSummary {
  customers: number
  workers: number
  admins: number
  blocked: number
  new_customers_month: number
  new_workers_month: number
}

export interface WorkersSummary {
  pending: number
  approved: number
  rejected: number
  online: number
  busy: number
  offline: number
  pending_documents: number
}

export interface StatusCount {
  status: OrderStatus
  label: string
  count: number
}

export interface OrdersSummary {
  total: number
  waiting: number
  active: number
  completed_today: number
  cancelled_today: number
  by_status: StatusCount[]
}

export interface ComplaintsSummary {
  open: number
  processing: number
  resolved: number
  rejected: number
  avg_resolution_hours: number | null
}

export interface RatingBucket {
  star: number
  count: number
  percent: number
}

export interface ReviewsSummary {
  total: number
  average: number | null
  flagged: number
  distribution: RatingBucket[]
}

export interface MethodShare {
  method: PaymentMethod
  count: number
  amount: number
}

export interface PaymentsSummary {
  success_today_amount: number
  success_month_amount: number
  commission_month_amount: number
  pending: number
  failed_month: number
  by_method_month: MethodShare[]
}

export interface CatalogSummary {
  categories_active: number
  services_active: number
  services_inactive: number
}

export interface MatchingConfigBrief {
  id: number
  name: string
  mode: 'instant' | 'batch'
  weight_distance: number
  weight_trust: number
  weight_price: number
  weight_workload: number
  batch_window_seconds: number | null
  updated_at: string
}

export interface SystemSummary {
  generated_at: string
  users: UsersSummary
  workers: WorkersSummary
  orders: OrdersSummary
  complaints: ComplaintsSummary
  reviews: ReviewsSummary
  payments: PaymentsSummary
  catalog: CatalogSummary
  matching: MatchingConfigBrief | null
}

// ---------- /admin/dashboard/pending-tasks ----------

export type PendingTaskKey =
  | 'worker_verification'
  | 'worker_documents'
  | 'complaints_open'
  | 'complaints_processing'
  | 'unmatched_orders'
  | 'flagged_reviews'
  | 'pending_payments'

export interface PendingTask {
  key: PendingTaskKey
  title: string
  count: number
  overdue: number
  sla_minutes: number | null
  oldest_at: string | null
  severity: Severity
  link: string
}

export interface PendingTasks {
  total: number
  total_overdue: number
  items: PendingTask[]
}

// ---------- /admin/dashboard/kpis ----------

export interface KpiValue {
  value: number | null
  previous: number | null
  change: number | null
  change_percent: number | null
}

export interface DashboardKpis {
  period: Period
  start: string
  end: string
  orders_created: KpiValue
  orders_completed: KpiValue
  completion_rate: KpiValue
  cancellation_rate: KpiValue
  avg_match_minutes: KpiValue
  avg_service_minutes: KpiValue
  offer_acceptance_rate: KpiValue
  revenue: KpiValue
  commission: KpiValue
  avg_order_value: KpiValue
  new_customers: KpiValue
  new_workers: KpiValue
  avg_rating: KpiValue
}

export type KpiKey = Exclude<keyof DashboardKpis, 'period' | 'start' | 'end'>

// ---------- /admin/dashboard/orders-by-hour ----------

export interface HourlyPoint {
  hour: number
  label: string
  orders: number
  previous_orders: number
}

export interface OrdersByHour {
  date: string
  compare_date: string
  total: number
  previous_total: number
  peak_hour: number | null
  points: HourlyPoint[]
}

// ---------- /admin/dashboard/quick-view ----------

export interface QuickView {
  summary: SystemSummary
  pending_tasks: PendingTasks
  kpis: DashboardKpis
}
