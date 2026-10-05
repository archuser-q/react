import {
  AlertOutlined,
  AppstoreOutlined,
  ControlOutlined,
  DashboardOutlined,
  FileTextOutlined,
  StarOutlined,
  TeamOutlined,
  ToolOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'

export interface NavItem {
  path: string
  label: string
  icon: ReactNode
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Tổng quan', icon: <DashboardOutlined /> },
  { path: '/orders', label: 'Đơn hàng', icon: <FileTextOutlined /> },
  { path: '/workers', label: 'Thợ', icon: <ToolOutlined /> },
  { path: '/users', label: 'Người dùng', icon: <TeamOutlined /> },
  { path: '/complaints', label: 'Khiếu nại', icon: <AlertOutlined /> },
  { path: '/reviews', label: 'Đánh giá', icon: <StarOutlined /> },
  { path: '/payments', label: 'Thanh toán', icon: <WalletOutlined /> },
  { path: '/services', label: 'Dịch vụ & bảng giá', icon: <AppstoreOutlined /> },
  { path: '/settings', label: 'Cấu hình ghép thợ', icon: <ControlOutlined /> },
]

export function findNavItem(pathname: string) {
  return (
    NAV_ITEMS.find((item) => item.path !== '/' && pathname.startsWith(item.path)) ?? NAV_ITEMS[0]
  )
}
