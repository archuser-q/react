import type {
  ComplaintStatus,
  KpiKey,
  OrderStatus,
  PaymentMethod,
  Period,
  Severity,
} from '#/types/dashboard'

export const ORDER_STATUS: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: 'Chờ ghép thợ', color: 'gold' },
  matched: { label: 'Đã ghép thợ', color: 'cyan' },
  accepted: { label: 'Thợ đã nhận', color: 'geekblue' },
  on_the_way: { label: 'Đang đến', color: 'blue' },
  arrived: { label: 'Đã đến nơi', color: 'purple' },
  in_progress: { label: 'Đang thực hiện', color: 'orange' },
  completed: { label: 'Hoàn thành', color: 'success' },
  cancelled: { label: 'Đã hủy', color: 'default' },
}

export const COMPLAINT_STATUS: Record<ComplaintStatus, { label: string; color: string }> = {
  open: { label: 'Mới', color: 'error' },
  processing: { label: 'Đang xử lý', color: 'blue' },
  resolved: { label: 'Đã giải quyết', color: 'success' },
  rejected: { label: 'Từ chối', color: 'default' },
}

export const SEVERITY: Record<
  Severity,
  { label: string; tone: 'danger' | 'warning' | 'calm' | 'done' }
> = {
  high: { label: 'Quá hạn', tone: 'danger' },
  medium: { label: 'Cần xử lý', tone: 'warning' },
  low: { label: 'Theo dõi', tone: 'calm' },
  none: { label: 'Đã xong', tone: 'done' },
}

export const PERIOD_OPTIONS: { value: Period; label: string; compare: string }[] = [
  { value: 'today', label: 'Hôm nay', compare: 'cùng giờ hôm qua' },
  { value: '7d', label: '7 ngày', compare: '7 ngày trước đó' },
  { value: '30d', label: '30 ngày', compare: '30 ngày trước đó' },
  { value: 'month', label: 'Tháng này', compare: 'cùng kỳ tháng trước' },
]

export const PAYMENT_METHOD: Record<PaymentMethod, string> = {
  cash: 'Tiền mặt',
  momo: 'MoMo',
  vnpay: 'VNPay',
}

export type KpiFormat = 'number' | 'currency' | 'percent' | 'minutes' | 'rating'

export interface KpiDef {
  key: KpiKey
  label: string
  format: KpiFormat
  lowerIsBetter?: boolean
  hint?: string
}

export const KPI_GROUPS: { title: string; items: KpiDef[] }[] = [
  {
    title: 'Đơn hàng',
    items: [
      { key: 'orders_created', label: 'Đơn tạo mới', format: 'number' },
      { key: 'orders_completed', label: 'Đơn hoàn thành', format: 'number' },
      {
        key: 'completion_rate',
        label: 'Tỷ lệ hoàn thành',
        format: 'percent',
        hint: 'Trên các đơn tạo trong kỳ đã kết thúc (hoàn thành hoặc hủy)',
      },
      { key: 'cancellation_rate', label: 'Tỷ lệ hủy', format: 'percent', lowerIsBetter: true },
    ],
  },
  {
    title: 'Ghép thợ và phục vụ',
    items: [
      {
        key: 'avg_match_minutes',
        label: 'Thời gian ghép thợ',
        format: 'minutes',
        lowerIsBetter: true,
        hint: 'Từ lúc tạo đơn đến lúc thợ nhận đơn',
      },
      {
        key: 'avg_service_minutes',
        label: 'Thời gian phục vụ',
        format: 'minutes',
        lowerIsBetter: true,
        hint: 'Từ lúc thợ nhận đơn đến lúc hoàn thành',
      },
      {
        key: 'offer_acceptance_rate',
        label: 'Tỷ lệ thợ nhận offer',
        format: 'percent',
        hint: 'Số offer được nhận trên số offer đã có phản hồi',
      },
      { key: 'avg_rating', label: 'Điểm đánh giá', format: 'rating' },
    ],
  },
  {
    title: 'Doanh thu và tăng trưởng',
    items: [
      { key: 'revenue', label: 'Doanh thu', format: 'currency' },
      { key: 'commission', label: 'Hoa hồng nền tảng', format: 'currency' },
      { key: 'avg_order_value', label: 'Giá trị đơn trung bình', format: 'currency' },
      { key: 'new_customers', label: 'Khách hàng mới', format: 'number' },
      { key: 'new_workers', label: 'Thợ mới', format: 'number' },
    ],
  },
]
