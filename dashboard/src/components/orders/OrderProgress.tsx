import { Steps, Typography } from 'antd'
import type { StepsProps } from 'antd'
import { SectionCard } from '#/components/common/SectionCard'
import type { OrderStatus } from '#/types/dashboard'
import type { OrderDetail, OrderHistoryItem } from '#/types/order'
import { ORDER_STATUS } from '#/utils/constants'
import { formatDateTime } from '#/utils/format'

const FLOW: OrderStatus[] = [
  'pending',
  'matched',
  'accepted',
  'on_the_way',
  'arrived',
  'in_progress',
  'completed',
]

const ROLE_LABEL: Record<string, string> = {
  admin: 'quản trị viên',
  worker: 'thợ',
  customer: 'khách',
}

function describe(entry: OrderHistoryItem | undefined, fallbackTime?: string) {
  const time = entry?.created_at ?? fallbackTime
  if (!time) return null
  return (
    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
      {formatDateTime(time)}
      {entry?.changed_by_name && (
        <>
          <br />
          {entry.changed_by_name}
          {entry.changed_by_role &&
            ` (${ROLE_LABEL[entry.changed_by_role] ?? entry.changed_by_role})`}
        </>
      )}
    </Typography.Text>
  )
}

export function OrderProgress({ order }: { order: OrderDetail }) {
  const firstOf = (status: OrderStatus) => order.history.find((h) => h.status === status)
  const cancelled = order.status === 'cancelled'

  // Bước xa nhất đơn đã đi tới trước khi kết thúc
  const reached = FLOW.reduce(
    (max, status, index) => (firstOf(status) || order.status === status ? index : max),
    0,
  )

  const items: StepsProps['items'] = FLOW.map((status, index) => ({
    title: ORDER_STATUS[status].label,
    content: describe(firstOf(status), status === 'pending' ? order.created_at : undefined),
    status:
      index < reached || (!cancelled && status === 'completed' && index === reached)
        ? 'finish'
        : index === reached && !cancelled
          ? 'process'
          : 'wait',
  }))

  if (cancelled) {
    items.splice(reached + 1, items.length, {
      title: ORDER_STATUS.cancelled.label,
      content: describe(firstOf('cancelled')),
      status: 'error',
    })
    items[reached] = { ...items[reached], status: 'finish' }
  }

  return (
    <SectionCard title="Tiến trình đơn" description="Mỗi bước kèm thời điểm và người cập nhật">
      <div style={{ overflowX: 'auto' }}>
        <Steps size="small" items={items} style={{ minWidth: 760 }} />
      </div>
    </SectionCard>
  )
}
