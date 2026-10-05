import type { UserStatus } from '#/types/auth'
import type { Availability, DocStatus, DocType, VerificationStatus } from '#/types/worker'
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

// ---------- Khách hàng và thợ ----------

export const PAGE_SIZE = 20

export const USER_STATUS: Record<UserStatus, { label: string; color: string }> = {
  active: { label: 'Đang hoạt động', color: 'success' },
  blocked: { label: 'Đã khóa', color: 'error' },
  pending: { label: 'Chờ kích hoạt', color: 'warning' },
}

export const VERIFICATION_STATUS: Record<VerificationStatus, { label: string; color: string }> = {
  pending: { label: 'Chờ duyệt', color: 'gold' },
  approved: { label: 'Đã duyệt', color: 'success' },
  rejected: { label: 'Bị từ chối', color: 'error' },
}

export const AVAILABILITY: Record<
  Availability,
  { label: string; status: 'success' | 'warning' | 'default' }
> = {
  online: { label: 'Sẵn sàng nhận đơn', status: 'success' },
  busy: { label: 'Đang làm đơn', status: 'warning' },
  offline: { label: 'Ngoại tuyến', status: 'default' },
}

export const DOC_TYPE: Record<DocType, string> = {
  id_card_front: 'CCCD mặt trước',
  id_card_back: 'CCCD mặt sau',
  portrait: 'Ảnh chân dung',
  certificate: 'Chứng chỉ nghề',
}

export const DOC_STATUS: Record<DocStatus, { label: string; color: string }> = {
  pending: { label: 'Chờ duyệt', color: 'gold' },
  approved: { label: 'Hợp lệ', color: 'success' },
  rejected: { label: 'Không hợp lệ', color: 'error' },
}

export const REQUIRED_DOCS: DocType[] = ['id_card_front', 'id_card_back', 'portrait']

export const DOC_REJECT_REASONS = [
  'Ảnh bị mờ, không đọc được thông tin',
  'Thông tin không khớp với tài khoản',
  'Giấy tờ đã hết hạn',
  'Ảnh bị cắt, thiếu góc',
  'Không phải giấy tờ được yêu cầu',
]
