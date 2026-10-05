import { Table, Tag, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { PersonCell } from '#/components/common/PersonCell'
import { palette } from '#/theme/tokens'
import type { Paginated } from '#/types/api'
import type { ComplaintListItem } from '#/types/complaint'
import { complaintWaiting, formatWaiting } from '#/utils/complaint'
import { COMPLAINT_STATUS, USER_ROLE_LABEL } from '#/utils/constants'
import { formatDateTime } from '#/utils/format'

function WaitingCell({ complaint }: { complaint: ComplaintListItem }) {
  const waiting = complaintWaiting(complaint.status, complaint.created_at)
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>{formatDateTime(complaint.created_at)}</span>
      {waiting && (
        <Typography.Text
          style={{ fontSize: 13, color: waiting.overdue ? palette.red : palette.muted }}
        >
          {waiting.overdue ? 'Quá hạn, ' : ''}đã chờ {formatWaiting(waiting.hours)}
        </Typography.Text>
      )}
    </div>
  )
}

interface ComplaintTableProps {
  data?: Paginated<ComplaintListItem>
  loading: boolean
  selectedId?: number
  onPageChange: (page: number) => void
  onOpen: (id: number) => void
}

export function ComplaintTable({
  data,
  loading,
  selectedId,
  onPageChange,
  onOpen,
}: ComplaintTableProps) {
  const columns: TableColumnsType<ComplaintListItem> = [
    {
      title: 'Khiếu nại',
      key: 'reason',
      render: (_, c) => (
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Typography.Text strong ellipsis>
            {c.reason}
          </Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            #{c.id}, đơn #{c.order_id}, {c.service_name}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: 'Người gửi',
      key: 'complainant',
      width: 220,
      render: (_, c) => (
        <PersonCell
          name={c.complainant.full_name}
          sub={`${USER_ROLE_LABEL[c.complainant.role]}, ${c.complainant.phone}`}
        />
      ),
    },
    {
      title: 'Thợ của đơn',
      dataIndex: 'worker_name',
      width: 170,
      render: (name: string | null) =>
        name ?? <Typography.Text type="secondary">Chưa có thợ</Typography.Text>,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 170,
      render: (_, c) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Tag color={COMPLAINT_STATUS[c.status].color} style={{ margin: 0, width: 'fit-content' }}>
            {COMPLAINT_STATUS[c.status].label}
          </Tag>
          {c.handled_by_name && (
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {c.handled_by_name}
            </Typography.Text>
          )}
        </div>
      ),
    },
    {
      title: 'Gửi lúc',
      key: 'created',
      width: 170,
      render: (_, c) => <WaitingCell complaint={c} />,
    },
  ]

  return (
    <Table<ComplaintListItem>
      rowKey="id"
      columns={columns}
      dataSource={data?.items}
      loading={loading}
      scroll={{ x: 1000 }}
      rowClassName={(c) => (c.id === selectedId ? 'ant-table-row-selected' : '')}
      onRow={(c) => ({ onClick: () => onOpen(c.id), style: { cursor: 'pointer' } })}
      locale={{ emptyText: 'Không có khiếu nại nào trong mục này' }}
      pagination={{
        current: data?.page ?? 1,
        pageSize: data?.page_size ?? 20,
        total: data?.total ?? 0,
        showSizeChanger: false,
        showTotal: (total) => `${total} khiếu nại`,
        onChange: onPageChange,
      }}
    />
  )
}
