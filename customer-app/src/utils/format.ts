import type { IconName } from '../components/Icon';
import type { CatalogService, OrderStatus, Payment, PaymentMethod } from '../api';
import { colors, formatVnd } from '../theme';

// ── Ngày giờ ────────────────────────────────────────────────────────────────
// Backend trả "YYYY-MM-DDTHH:mm:ss" theo giờ VN, không có múi giờ -> cắt chuỗi
// để hiển thị đúng như server, không phụ thuộc múi giờ của điện thoại.

const DT_RE = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/;

export function fmtDate(iso?: string | null): string {
  const m = iso?.match(DT_RE);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
}

export function fmtTime(iso?: string | null): string {
  const m = iso?.match(DT_RE);
  return m && m[4] ? `${m[4]}:${m[5]}` : '';
}

export function fmtDateTime(iso?: string | null): string {
  const t = fmtTime(iso);
  return t ? `${fmtDate(iso)} · ${t}` : fmtDate(iso);
}

const VN_OFFSET_MS = 7 * 3600 * 1000;

/**
 * Khung giờ hẹn theo giờ Việt Nam (không phụ thuộc múi giờ của điện thoại).
 * VD vnSlot(1, 9) = 09:00 ngày mai giờ VN -> { iso: "2026-10-08T09:00:00+07:00", ts }
 */
export function vnSlot(dayOffset: number, hour: number): { iso: string; ts: number } {
  const vnNow = new Date(Date.now() + VN_OFFSET_MS); // đọc bằng getUTC* = giờ VN
  const ts = Date.UTC(vnNow.getUTCFullYear(), vnNow.getUTCMonth(), vnNow.getUTCDate() + dayOffset, hour) - VN_OFFSET_MS;
  const iso = new Date(ts + VN_OFFSET_MS).toISOString().slice(0, 19) + '+07:00';
  return { iso, ts };
}

// ── Tiền ────────────────────────────────────────────────────────────────────

export function money(n?: number | null): string {
  return n === null || n === undefined ? '—' : `${formatVnd(n)}đ`;
}

export function orderCode(id: number): string {
  return `ĐH-${id}`;
}

// ── Trạng thái đơn ──────────────────────────────────────────────────────────

export const ORDER_STATUS: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Đang tìm thợ', color: colors.blue600, bg: colors.blue50 },
  matched: { label: 'Đã ghép thợ', color: colors.blue600, bg: colors.blue50 },
  accepted: { label: 'Thợ đã nhận', color: colors.blue600, bg: colors.blue50 },
  on_the_way: { label: 'Đang tới', color: colors.blue600, bg: colors.blue50 },
  arrived: { label: 'Thợ đã đến', color: colors.blue600, bg: colors.blue50 },
  in_progress: { label: 'Đang làm', color: colors.blue600, bg: colors.blue50 },
  completed: { label: 'Hoàn thành', color: colors.emerald600, bg: colors.emerald50 },
  cancelled: { label: 'Đã hủy', color: colors.red500, bg: colors.red50 },
};

export const ACTIVE_STATUSES: OrderStatus[] = ['pending', 'matched', 'accepted', 'on_the_way', 'arrived', 'in_progress'];

/** 4 bước trên thanh tiến trình của màn Theo dõi */
export function orderSteps(status: OrderStatus) {
  // vị trí bước đang diễn ra: 0 Đã đặt, 1 Thợ đến, 2 Đang sửa, 3 Hoàn thành
  const current: Record<OrderStatus, number> = {
    pending: 0,
    matched: 1,
    accepted: 1,
    on_the_way: 1,
    arrived: 2,
    in_progress: 2,
    completed: 4,
    cancelled: -1,
  };
  const at = current[status];
  return ['Đã đặt', 'Thợ đến', 'Đang sửa', 'Hoàn thành'].map((label, i) => ({
    label,
    done: at > i || (i === 0 && at >= 0),
    active: at === i && i !== 0,
  }));
}

// ── Thanh toán ──────────────────────────────────────────────────────────────

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  cash: 'Tiền mặt',
  momo: 'Ví MoMo',
  vnpay: 'VNPay',
};

export const PAYMENT_STATUS_LABEL: Record<Payment['status'], string> = {
  pending: 'Chờ xác nhận',
  success: 'Thành công',
  failed: 'Đã hủy',
  refunded: 'Đã hoàn tiền',
};

// ── Khoảng cách ─────────────────────────────────────────────────────────────

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function fmtKm(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

/** Ước lượng thời gian tới nơi, đi xe máy trong phố ~20 km/h */
export function etaMinutes(km: number): number {
  return Math.max(1, Math.round((km / 20) * 60));
}

// ── Màu / icon cho dịch vụ (backend chưa có icon) ───────────────────────────

const PALETTE = [
  { color: '#F59E0B', bg: '#FFFBEB' },
  { color: '#3B82F6', bg: '#EFF6FF' },
  { color: '#EF4444', bg: '#FEF2F2' },
  { color: '#8B5CF6', bg: '#F5F3FF' },
  { color: '#10B981', bg: '#ECFDF5' },
  { color: '#0891B2', bg: '#ECFEFF' },
];

const ICON_RULES: [RegExp, IconName][] = [
  [/cầu dao|aptomat|mcb/i, 'toggle-switch'],
  [/đèn|led/i, 'creation'],
  [/ổ cắm|công tắc/i, 'record-circle-outline'],
  [/an toàn|kiểm tra/i, 'check-circle-outline'],
  [/lắp đặt|đi dây|dây điện/i, 'pulse'],
  [/nước|ống|bồn/i, 'water-outline'],
  [/điều hòa|điều hoà|máy lạnh/i, 'snowflake'],
  [/máy giặt/i, 'washing-machine'],
  [/tủ lạnh/i, 'fridge-outline'],
  [/khóa|khoá/i, 'key-outline'],
  [/điện/i, 'lightning-bolt'],
];

/** Dịch vụ từ backend + màu/icon để hiển thị như bản thiết kế */
export type UIService = CatalogService & { label: string; icon: IconName; color: string; bg: string };

export function decorateService(s: CatalogService, index: number): UIService {
  const icon = ICON_RULES.find(([re]) => re.test(s.name))?.[1] ?? 'wrench-outline';
  return { ...s, label: s.name, icon, ...PALETTE[index % PALETTE.length] };
}

/** Icon theo tên dịch vụ (dùng ở danh sách đơn) */
export function serviceIcon(name: string): IconName {
  return ICON_RULES.find(([re]) => re.test(name))?.[1] ?? 'wrench-outline';
}
