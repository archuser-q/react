import { EyeOutlined } from '@ant-design/icons'
import { Button, Space, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { AccountLockButton } from '#/components/common/AccountLockButton'
import { PersonCell } from '#/components/common/PersonCell'
import { UserStatusTag } from '#/components/common/UserStatusTag'
import type { Paginated } from '#/types/api'
import type { User } from '#/types/auth'
import { formatDateTime } from '#/utils/format'

interface CustomerTableProps {
  data?: Paginated<User>
  loading: boolean
  onPageChange: (page: number) => void
  onView: (id: number) => void
}

export function CustomerTable({ data, loading, onPageChange, onView }: CustomerTableProps) {
  const columns: TableColumnsType<User> = [
    {
      title: 'Khách hàng',
      key: 'name',
      render: (_, u) => <PersonCell name={u.full_name} avatarUrl={u.avatar_url} sub={u.email} />,
    },
    { title: 'Số điện thoại', dataIndex: 'phone', width: 150 },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 160,
      render: (status: User['status']) => <UserStatusTag status={status} />,
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'created_at',
      width: 170,
      render: (v: string) => formatDateTime(v),
    },
    {
      title: '',
      key: 'actions',
      width: 210,
      align: 'right',
      render: (_, u) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => onView(u.id)}>
            Chi tiết
          </Button>
          <AccountLockButton user={u} size="small" />
        </Space>
      ),
    },
  ]

  return (
    <Table<User>
      rowKey="id"
      columns={columns}
      dataSource={data?.items}
      loading={loading}
      scroll={{ x: 900 }}
      locale={{ emptyText: 'Không có khách hàng nào khớp bộ lọc' }}
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
