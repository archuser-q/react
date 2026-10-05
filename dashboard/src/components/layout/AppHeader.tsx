import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation } from '@tanstack/react-router'
import { Avatar, Dropdown, Layout, Typography } from 'antd'
import { findNavItem } from '#/components/layout/nav-items'
import styles from '#/components/layout/layout.module.css'
import { useCurrentUser, useLogout } from '#/hooks/useAuth'
import { useNow } from '#/hooks/useNow'
import { formatLongDate, initials } from '#/utils/format'

export function AppHeader() {
  const { pathname } = useLocation()
  const user = useCurrentUser()
  const logout = useLogout()
  const now = useNow()

  return (
    <Layout.Header className={styles.header}>
      <div>
        <Typography.Title level={4} className={styles.pageTitle}>
          {findNavItem(pathname).label}
        </Typography.Title>
        <Typography.Text type="secondary" className={styles.pageDate}>
          {formatLongDate(now)}
        </Typography.Text>
      </div>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [{ key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true }],
          onClick: ({ key }) => key === 'logout' && logout(),
        }}
      >
        <button type="button" className={styles.userButton}>
          <Avatar size={34} src={user?.avatar_url} icon={!user && <UserOutlined />}>
            {user && initials(user.full_name)}
          </Avatar>
          <span className={styles.userMeta}>
            <strong>{user?.full_name ?? 'Quản trị viên'}</strong>
            <small>{user?.phone}</small>
          </span>
        </button>
      </Dropdown>
    </Layout.Header>
  )
}
