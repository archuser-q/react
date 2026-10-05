import { LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import type { ButtonProps } from 'antd'
import { useUpdateUserStatus } from '#/hooks/useUsers'
import type { User } from '#/types/auth'

interface AccountLockButtonProps {
  user: User
  size?: ButtonProps['size']
}

export function AccountLockButton({ user, size }: AccountLockButtonProps) {
  const update = useUpdateUserStatus()
  const blocked = user.status === 'blocked'
  const pending = update.isPending && update.variables?.id === user.id

  if (user.role === 'admin') return null

  const description = blocked
    ? `${user.full_name} sẽ đăng nhập và sử dụng ứng dụng trở lại.`
    : user.role === 'worker'
      ? `${user.full_name} sẽ không đăng nhập được và bị chuyển sang ngoại tuyến, không nhận đơn mới.`
      : `${user.full_name} sẽ không đăng nhập và đặt đơn được nữa.`

  return (
    <Popconfirm
      title={blocked ? 'Mở khóa tài khoản này?' : 'Khóa tài khoản này?'}
      description={<div style={{ maxWidth: 280 }}>{description}</div>}
      okText={blocked ? 'Mở khóa' : 'Khóa tài khoản'}
      okButtonProps={{ danger: !blocked }}
      cancelText="Hủy"
      onConfirm={() =>
        update
          .mutateAsync({ id: user.id, status: blocked ? 'active' : 'blocked' })
          .catch(() => undefined)
      }
    >
      <Button
        size={size}
        danger={!blocked}
        icon={blocked ? <UnlockOutlined /> : <LockOutlined />}
        loading={pending}
        onClick={(e) => e.stopPropagation()}
      >
        {blocked ? 'Mở khóa' : 'Khóa'}
      </Button>
    </Popconfirm>
  )
}
