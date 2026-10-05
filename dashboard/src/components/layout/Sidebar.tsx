import { ToolFilled } from '@ant-design/icons'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Layout, Menu } from 'antd'
import { findNavItem, NAV_ITEMS } from '#/components/layout/nav-items'
import styles from '#/components/layout/layout.module.css'

interface SidebarProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const active = findNavItem(pathname)

  return (
    <Layout.Sider
      width={232}
      collapsedWidth={72}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      className={styles.sider}
    >
      <div className={styles.brand}>
        <span className={styles.brandMark}>
          <ToolFilled />
        </span>
        {!collapsed && (
          <span className={styles.brandText}>
            <strong>Thợ Nhanh</strong>
            <small>Quản trị hệ thống</small>
          </span>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[active.path]}
        items={NAV_ITEMS.map((item) => ({ key: item.path, icon: item.icon, label: item.label }))}
        onClick={({ key }) => navigate({ to: key })}
      />
    </Layout.Sider>
  )
}
