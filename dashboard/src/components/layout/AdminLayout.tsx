import { Outlet } from '@tanstack/react-router'
import { Layout } from 'antd'
import { useState } from 'react'
import { AppHeader } from '#/components/layout/AppHeader'
import { Sidebar } from '#/components/layout/Sidebar'
import styles from '#/components/layout/layout.module.css'
import { useSessionGuard } from '#/hooks/useAuth'

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  useSessionGuard()

  return (
    <Layout className={styles.shell}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <AppHeader />
        <Layout.Content className={styles.content}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
