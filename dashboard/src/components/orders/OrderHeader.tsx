import { StopOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Space, Tag, Typography } from 'antd'
import { useState } from 'react'
import { CancelOrderModal } from '#/components/orders/CancelOrderModal'
import { OrderStatusTag } from '#/components/orders/OrderStatusTag'
import { useCancelOrder } from '#/hooks/useOrders'
import type { OrderDetail } from '#/types/order'
import { CANCELLABLE_ORDER_STATUSES, MATCHING_MODE } from '#/utils/constants'
import { formatDateTime } from '#/utils/format'

export function OrderHeader({ order }: { order: OrderDetail }) {
  const [cancelling, setCancelling] = useState(false)
  const cancel = useCancelOrder(order.id)
  const canCancel = CANCELLABLE_ORDER_STATUSES.includes(order.status)
  const openComplaints = order.complaints.filter((c) => ['open', 'processing'].includes(c.status))

  return (
    <Card variant="borderless">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <Space wrap size={8} style={{ marginBottom: 4 }}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Đơn #{order.id}
            </Typography.Title>
            <OrderStatusTag status={order.status} />
            {order.matching_mode && <Tag>{MATCHING_MODE[order.matching_mode]}</Tag>}
          </Space>
          <Typography.Text type="secondary" style={{ display: 'block' }}>
            {order.service.category_name}, {order.service.name}. Tạo lúc{' '}
            {formatDateTime(order.created_at)}
            {order.scheduled_at && `, hẹn lúc ${formatDateTime(order.scheduled_at)}`}
          </Typography.Text>
        </div>
        {canCancel && (
          <Button danger icon={<StopOutlined />} onClick={() => setCancelling(true)}>
            Hủy đơn
          </Button>
        )}
      </div>

      {order.status === 'cancelled' && order.cancel_reason && (
        <Alert
          type="error"
          showIcon
          style={{ marginTop: 16 }}
          title="Đơn đã bị hủy"
          description={`Lý do: ${order.cancel_reason}`}
        />
      )}
      {openComplaints.length > 0 && (
        <Alert
          type="warning"
          showIcon
          style={{ marginTop: 16 }}
          title={`Đơn đang có ${openComplaints.length} khiếu nại chưa xử lý xong`}
          description={openComplaints.map((c) => c.reason).join('; ')}
        />
      )}

      <CancelOrderModal
        open={cancelling}
        orderId={order.id}
        hasWorker={order.worker !== null}
        loading={cancel.isPending}
        onCancel={() => setCancelling(false)}
        onSubmit={(reason) =>
          cancel
            .mutateAsync(reason)
            .then(() => setCancelling(false))
            .catch(() => undefined)
        }
      />
    </Card>
  )
}
