import { useRouter } from '@tanstack/react-router'
import { Button, Table, Tag, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { SectionCard } from '#/components/common/SectionCard'
import type { RecentOrder } from '#/types/dashboard'
import { ORDER_STATUS } from '#/utils/constants'
import { formatCurrency, formatDateTime } from '#/utils/format'

const columns: TableColumnsType<RecentOrder> = [
  {
    title: 'Mã đơn',
    dataIndex: 'id',
    width: 90,
    render: (id: number) => <Typography.Text strong>#{id}</Typography.Text>,
  },
  { title: 'Khách hàng', dataIndex: 'customer_name', ellipsis: true },
  { title: 'Dịch vụ', dataIndex: 'service_name', ellipsis: true },
  {
    title: 'Thợ',
    dataIndex: 'worker_name',
    ellipsis: true,
    render: (name: string | null) =>
      name ?? <Typography.Text type="secondary">Chưa có thợ</Typography.Text>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 140,
    render: (s: RecentOrder['status']) => (
      <Tag color={ORDER_STATUS[s].color}>{ORDER_STATUS[s].label}</Tag>
    ),
  },
  {
    title: 'Giá trị',
    dataIndex: 'amount',
    align: 'right',
    width: 130,
    render: (v: number | null) => formatCurrency(v),
  },
  {
    title: 'Tạo lúc',
    dataIndex: 'created_at',
    width: 150,
    render: (v: string) => formatDateTime(v),
  },
]

interface RecentOrdersTableProps {
  data?: RecentOrder[]
  loading: boolean
}

export function RecentOrdersTable({ data, loading }: RecentOrdersTableProps) {
  const router = useRouter()
  return (
    <SectionCard
      title="Đơn hàng mới nhất"
      description="Giá trị là giá chốt, hoặc giá ước tính nếu đơn chưa hoàn thành"
      extra={
        <Button type="link" onClick={() => router.history.push('/orders')}>
          Mở trang đơn hàng
        </Button>
      }
      styles={{ body: { padding: 0 } }}
    >
      <Table<RecentOrder>
        rowKey="id"
        size="middle"
        columns={columns}
        dataSource={data}
        loading={loading && !data}
        pagination={false}
        scroll={{ x: 860 }}
        onRow={(o) => ({
          onClick: () => router.history.push(`/orders/${o.id}`),
          style: { cursor: 'pointer' },
        })}
        locale={{ emptyText: 'Chưa có đơn hàng nào' }}
      />
    </SectionCard>
  )
}
