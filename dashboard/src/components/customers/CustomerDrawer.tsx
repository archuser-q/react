import { Alert, Descriptions, Drawer, Skeleton } from 'antd'
import { AccountLockButton } from '#/components/common/AccountLockButton'
import { PersonCell } from '#/components/common/PersonCell'
import { UserStatusTag } from '#/components/common/UserStatusTag'
import { useUserDetail } from '#/hooks/useUsers'
import { formatDateTime, fromNow } from '#/utils/format'

interface CustomerDrawerProps {
  userId: number | null
  onClose: () => void
}

export function CustomerDrawer({ userId, onClose }: CustomerDrawerProps) {
  const { data: user, isLoading, error } = useUserDetail(userId)

  return (
    <Drawer
      open={userId !== null}
      onClose={onClose}
      size={460}
      title="Thông tin khách hàng"
      extra={user && <AccountLockButton user={user} />}
      destroyOnHidden
    >
      {isLoading && <Skeleton active avatar paragraph={{ rows: 6 }} />}
      {error && <Alert type="error" showIcon title={error.message} />}
      {user && (
        <>
          <PersonCell
            name={user.full_name}
            avatarUrl={user.avatar_url}
            sub={`Mã khách hàng #${user.id}`}
          />
          <Descriptions
            column={1}
            bordered
            size="small"
            style={{ marginTop: 20 }}
            items={[
              { key: 'phone', label: 'Số điện thoại', children: user.phone },
              { key: 'email', label: 'Email', children: user.email ?? 'Chưa cập nhật' },
              {
                key: 'status',
                label: 'Trạng thái',
                children: <UserStatusTag status={user.status} />,
              },
              {
                key: 'created',
                label: 'Ngày tham gia',
                children: `${formatDateTime(user.created_at)} (${fromNow(user.created_at)})`,
              },
            ]}
          />
          {user.status === 'blocked' && (
            <Alert
              type="warning"
              showIcon
              style={{ marginTop: 16 }}
              title="Tài khoản đang bị khóa"
              description="Khách hàng không đăng nhập và đặt đơn được cho đến khi được mở khóa."
            />
          )}
        </>
      )}
    </Drawer>
  )
}
