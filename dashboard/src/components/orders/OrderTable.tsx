import { WarningFilled } from '@ant-design/icons'
import { Button, Table, Tooltip, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { PersonCell } from '#/components/common/PersonCell'
import { OrderStatusTag } from '#/components/orders/OrderStatusTag'
import { palette } from '#/theme/tokens'
import type { Paginated } from '#/types/api'
import type { OrderListItem } from '#/types/order'
import { formatCurrency, formatDateTime } from '#/utils/format'

interface OrderTableProps {
  data?: Paginated<OrderListItem>
  loading: boolean
  onPageChange: (page: number) => void
  onOpen: (orderId: number) => void
}

export function OrderTable({ data, loading, onPageChange, onOpen }: OrderTableProps) {
  const columns: TableColumnsType<OrderListItem> = [
    {
      title: 'Mã đơn',
      key: 'id',
      width: 100,
      render: (_, o) => (
        <>
          <Typography.Text strong>#{o.id}</Typography.Text>
          {o.has_open_complaint && (
            <Tooltip title="Đơn đang có khiếu nại chưa xử lý xong">
              <WarningFilled
                style={{ color: palette.red, marginLeft: 6 }}
                aria-label="Có khiếu nại"
              />
            </Tooltip>
          )}
        </>
      ),
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (_, o) => <PersonCell name={o.customer.full_name} sub={o.customer.phone} />,
    },
    {
      title: 'Thợ',
      key: 'worker',
      render: (_, o) =>
        o.worker ? (
          <PersonCell name={o.worker.full_name} sub={o.worker.phone} />
        ) : (
          <Typography.Text type="secondary">Chưa có thợ</Typography.Text>
        ),
    },
    {
      title: 'Dịch vụ',
      key: 'service',
      render: (_, o) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography.Text>{o.service_name}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {o.category_name}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 140,
      render: (status: OrderListItem['status']) => <OrderStatusTag status={status} />,
    },
    {
      title: 'Giá trị',
      dataIndex: 'amount',
      width: 120,
      align: 'right',
      render: (v: number | null) => formatCurrency(v),
    },
    {
      title: 'Thời gian',
      key: 'time',
      width: 170,
      render: (_, o) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>{formatDateTime(o.created_at)}</span>
          {o.scheduled_at && (
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Hẹn {formatDateTime(o.scheduled_at)}
            </Typography.Text>
          )}
        </div>
      ),
    },
    {
      title: '',
      key: 'open',
      width: 90,
      align: 'right',
      render: (_, o) => (
        <Button
          type="link"
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onOpen(o.id)
          }}
        >
          Chi tiết
        </Button>
      ),
    },
  ]

  return (
    <Table<OrderListItem>
      rowKey="id"
      columns={columns}
      dataSource={data?.items}
      loading={loading}
      scroll={{ x: 1150 }}
      onRow={(o) => ({ onClick: () => onOpen(o.id), style: { cursor: 'pointer' } })}
      locale={{ emptyText: 'Không có đơn hàng nào khớp bộ lọc' }}
      pagination={{
        current: data?.page ?? 1,
        pageSize: data?.page_size ?? 20,
        total: data?.total ?? 0,
        showSizeChanger: false,
        showTotal: (total) => `${total} đơn`,
        onChange: onPageChange,
      }}
    />
  )
}
