import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale('vi')

// Backend trả thời gian dạng "2026-10-04T21:43:00" (giờ Việt Nam, không kèm múi giờ)
export const VN_TZ = 'Asia/Ho_Chi_Minh'
export const parseServerTime = (iso: string) => dayjs.tz(iso, VN_TZ)
export const toVnTime = (d: Date | number) => dayjs(d).tz(VN_TZ)

const numberFmt = new Intl.NumberFormat('vi-VN')
const decimalFmt = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 })
const currencyFmt = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

const EMPTY = '–'

export const formatNumber = (v: number | null | undefined) =>
  v === null || v === undefined ? EMPTY : numberFmt.format(v)

export const formatDecimal = (v: number | null | undefined) =>
  v === null || v === undefined ? EMPTY : decimalFmt.format(v)

export const formatCurrency = (v: number | null | undefined) =>
  v === null || v === undefined ? EMPTY : currencyFmt.format(v)

export function formatCompactVnd(v: number | null | undefined) {
  if (v === null || v === undefined) return EMPTY
  const abs = Math.abs(v)
  if (abs >= 1e9) return `${decimalFmt.format(v / 1e9)} tỷ`
  if (abs >= 1e6) return `${decimalFmt.format(v / 1e6)} tr`
  if (abs >= 1e3) return `${decimalFmt.format(v / 1e3)}k`
  return numberFmt.format(v)
}

export const formatPercent = (v: number | null | undefined) =>
  v === null || v === undefined ? EMPTY : `${decimalFmt.format(v)}%`

export function formatSignedPercent(v: number | null | undefined) {
  if (v === null || v === undefined) return EMPTY
  return `${v > 0 ? '+' : ''}${decimalFmt.format(v)}%`
}

export function formatMinutes(v: number | null | undefined) {
  if (v === null || v === undefined) return EMPTY
  if (v < 60) return `${Math.round(v)} phút`
  const h = Math.floor(v / 60)
  const m = Math.round(v % 60)
  return m ? `${h} giờ ${m} phút` : `${h} giờ`
}

export function formatSla(minutes: number | null) {
  if (!minutes) return null
  return minutes < 60 ? `${minutes} phút` : `${minutes / 60} giờ`
}

export const fromNow = (iso: string | null | undefined) =>
  iso ? parseServerTime(iso).fromNow() : EMPTY

export const formatDateTime = (iso: string | null | undefined) =>
  iso ? parseServerTime(iso).format('HH:mm DD/MM/YYYY') : EMPTY

export const formatTime = (iso: string) => parseServerTime(iso).format('HH:mm')

export const formatClock = (d: Date | number) => toVnTime(d).format('HH:mm')

export const formatLongDate = (d: Date) => {
  const s = toVnTime(d).format('dddd, D MMMM YYYY')
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
