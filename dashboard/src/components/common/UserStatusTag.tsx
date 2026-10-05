import { Tag } from 'antd'
import type { UserStatus } from '#/types/auth'
import { USER_STATUS } from '#/utils/constants'

export function UserStatusTag({ status }: { status: UserStatus }) {
  const meta = USER_STATUS[status] ?? { label: status, color: 'default' }
  return <Tag color={meta.color}>{meta.label}</Tag>
}
