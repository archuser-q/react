import type { PriceMode, PriceRounding } from '#/types/catalog'

// Cùng công thức với bulk_update_price ở backend (làm tròn .5 lên trên)
export function adjustPrice(price: number, mode: PriceMode, value: number, roundTo: PriceRounding) {
  const raw = mode === 'percent' ? price * (1 + value / 100) : price + value
  return Math.floor(raw / roundTo + 0.5) * roundTo
}

// Chênh lệch giữa giá thực tế khách trả và giá gốc, tính theo %
export function priceGap(base: number, actual: number | null) {
  if (actual === null || base <= 0) return null
  return Math.round(((actual - base) / base) * 1000) / 10
}
