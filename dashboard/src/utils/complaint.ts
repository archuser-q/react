import type { ComplaintStatus } from '#/types/dashboard'
import { COMPLAINT_SLA_HOURS } from '#/utils/constants'
import { parseServerTime } from '#/utils/format'

// Số giờ khiếu nại đã chờ, và có vượt SLA của trạng thái hiện tại hay không
export function complaintWaiting(status: ComplaintStatus, createdAt: string) {
  const sla = COMPLAINT_SLA_HOURS[status]
  if (!sla) return null
  const hours = (Date.now() - parseServerTime(createdAt).valueOf()) / 3_600_000
  return { hours, sla, overdue: hours > sla }
}

export function formatWaiting(hours: number) {
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))} phút`
  if (hours < 48) return `${Math.round(hours)} giờ`
  return `${Math.round(hours / 24)} ngày`
}
