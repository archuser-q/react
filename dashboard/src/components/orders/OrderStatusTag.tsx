import { Tag } from 'antd'
import type { OrderStatus } from '#/types/dashboard'
import { ORDER_STATUS } from '#/utils/constants'

export function OrderStatusTag({ status }: { status: OrderStatus }) {
  const meta = ORDER_STATUS[status] ?? { label: status, color: 'default' }
  return (
    <Tag color={meta.color} style={{ margin: 0 }}>
      {meta.label}
    </Tag>
  )
}
