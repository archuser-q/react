import { Table, Tag, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { Link } from '@tanstack/react-router'
import { SectionCard } from '#/components/common/SectionCard'
import type { OrderOfferItem } from '#/types/order'
import { OFFER_STATUS } from '#/utils/constants'
import { formatDateTime } from '#/utils/format'

const columns: TableColumnsType<OrderOfferItem> = [
  {
    title: 'Thợ',
    key: 'worker',
    render: (_, o) => (
      <Link to="/workers/$workerId" params={{ workerId: o.worker_id }}>
        {o.worker_name}
      </Link>
    ),
  },
  {
    title: 'Điểm ghép',
    dataIndex: 'match_score',
    width: 100,
    align: 'right',
    render: (v: number | null) => (v === null ? '–' : (v * 100).toFixed(1)),
  },
  {
    title: 'Khoảng cách',
    dataIndex: 'distance_km',
    width: 110,
    align: 'right',
    render: (v: number | null) => (v === null ? '–' : `${v.toFixed(1)} km`),
  },
  {
    title: 'Kết quả',
    dataIndex: 'status',
    width: 110,
    render: (s: OrderOfferItem['status']) => (
      <Tag color={OFFER_STATUS[s].color} style={{ margin: 0 }}>
        {OFFER_STATUS[s].label}
      </Tag>
    ),
  },
  {
    title: 'Gửi lúc',
    dataIndex: 'sent_at',
    width: 150,
    render: (v: string) => formatDateTime(v),
  },
  {
    title: 'Phản hồi',
    key: 'response',
    width: 110,
    render: (_, o) => {
      if (!o.responded_at) return <Typography.Text type="secondary">–</Typography.Text>
      const seconds = Math.round(
        (new Date(o.responded_at).getTime() - new Date(o.sent_at).getTime()) / 1000,
      )
      return `sau ${seconds} giây`
    },
  },
]

export function OrderMatchingCard({ offers }: { offers: OrderOfferItem[] }) {
  return (
    <SectionCard
      title="Ghép thợ"
      description="Các thợ hệ thống đã gửi offer, xếp theo điểm ghép từ cao xuống thấp"
      styles={{ body: { padding: 0 } }}
    >
      <Table<OrderOfferItem>
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={offers}
        pagination={false}
        scroll={{ x: 700 }}
        locale={{ emptyText: 'Chưa gửi offer cho thợ nào' }}
      />
    </SectionCard>
  )
}
