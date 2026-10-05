import { http } from '#/lib/http'
import type { LoginPayload, LoginResult, User } from '#/types/auth'

export const authService = {
  login: (payload: LoginPayload) => http.post<LoginResult>('/auth/login', payload),
  me: () => http.get<User>('/auth/me'),
  logout: () => http.post<null>('/auth/logout'),
}
