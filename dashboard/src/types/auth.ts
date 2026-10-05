export type UserRole = 'admin' | 'worker' | 'customer'
export type UserStatus = 'active' | 'blocked' | 'pending'

export interface User {
  id: number
  phone: string
  email: string | null
  full_name: string
  avatar_url: string | null
  role: UserRole
  status: UserStatus
  created_at: string
}

export interface LoginPayload {
  phone: string
  password: string
}

export interface LoginResult {
  access_token: string
  token_type: 'bearer'
  user: User
}
