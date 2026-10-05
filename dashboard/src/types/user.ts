import type { UserRole, UserStatus } from '#/types/auth'

export type UserListParams = {
  role?: UserRole
  status?: UserStatus
  keyword?: string
  page: number
  page_size: number
}

export type UserStatusPayload = {
  status: 'active' | 'blocked'
}
