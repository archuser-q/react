import { Badge, Tag } from 'antd'
import type { Availability, VerificationStatus } from '#/types/worker'
import { AVAILABILITY, VERIFICATION_STATUS } from '#/utils/constants'

export function VerificationTag({ status }: { status: VerificationStatus }) {
  const meta = VERIFICATION_STATUS[status]
  return <Tag color={meta.color}>{meta.label}</Tag>
}

export function AvailabilityBadge({ availability }: { availability: Availability }) {
  const meta = AVAILABILITY[availability]
  return <Badge status={meta.status} text={meta.label} />
}
