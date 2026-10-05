import { StarFilled } from '@ant-design/icons'
import { Button, Progress, Table, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { PersonCell } from '#/components/common/PersonCell'
import { UserStatusTag } from '#/components/common/UserStatusTag'
import { AvailabilityBadge, VerificationTag } from '#/components/workers/WorkerTags'
import { palette } from '#/theme/tokens'
import type { Paginated } from '#/types/api'
import type { AdminWorkerItem } from '#/types/worker'
import { formatDateTime, formatNumber } from '#/utils/format'
import { toScore } from '#/utils/worker'

interface WorkerTableProps {
  data?: Paginated<AdminWorkerItem>
  loading: boolean
  onPageChange: (page: number) => void
  onOpen: (workerId: number) => void
}

export function WorkerTable({ data, loading, onPageChange, onOpen }: WorkerTableProps) {
  const columns: TableColumnsType<AdminWorkerItem> = [
    {
      title: 'Thợ',
      key: 'name',
      render: (_, { user }) => (
        <PersonCell name={user.full_name} avatarUrl={user.avatar_url} sub={user.phone} />
      ),
    },
    {
      title: 'Xác minh',
      key: 'verification',
      width: 120,
      render: (_, { profile }) => <VerificationTag status={profile.verification_status} />,
    },
    {
      title: 'Tình trạng',
      key: 'availability',
      width: 170,
      render: (_, { user, profile }) =>
        profile.verification_status === 'approved' && user.status === 'active' ? (
          <AvailabilityBadge availability={profile.availability} />
        ) : (
          <Typography.Text type="secondary">Chưa nhận đơn</Typography.Text>
        ),
    },
    {
      title: 'Trust Score',
      key: 'trust',
      width: 150,
      render: (_, { profile }) => (
        <Progress
          percent={toScore(profile.trust_score)}
          size="small"
          strokeColor={palette.green}
          format={(p) => p}
        />
      ),
    },
    {
      title: 'Đơn hoàn thành',
      key: 'orders',
      width: 130,
      align: 'right',
      render: (_, { profile }) => formatNumber(profile.completed_orders),
    },
    {
      title: 'Đánh giá',
      key: 'reviews',
      width: 100,
      align: 'right',
      render: (_, { profile }) => (
        <>
          {formatNumber(profile.review_count)} <StarFilled style={{ color: palette.amber }} />
        </>
      ),
    },
    {
      title: 'Tài khoản',
      key: 'status',
      width: 150,
      render: (_, { user }) => <UserStatusTag status={user.status} />,
    },
    {
      title: 'Đăng ký',
      key: 'created',
      width: 150,
      render: (_, { profile }) => formatDateTime(profile.created_at),
    },
    {
      title: '',
      key: 'open',
      width: 110,
      align: 'right',
      render: (_, { user }) => (
        <Button size="small" type="link" onClick={() => onOpen(user.id)}>
          Xem hồ sơ
        </Button>
      ),
    },
  ]

  return (
    <Table<AdminWorkerItem>
      rowKey={(row) => row.user.id}
      columns={columns}
      dataSource={data?.items}
      loading={loading}
      scroll={{ x: 1250 }}
      onRow={(row) => ({ onClick: () => onOpen(row.user.id), style: { cursor: 'pointer' } })}
      locale={{ emptyText: 'Không có thợ nào trong mục này' }}
      pagination={{
        current: data?.page ?? 1,
        pageSize: data?.page_size ?? 20,
        total: data?.total ?? 0,
        showSizeChanger: false,
        onChange: onPageChange,
      }}
    />
  )
}
