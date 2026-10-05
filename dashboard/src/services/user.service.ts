import { http } from '#/lib/http'
import type { Paginated } from '#/types/api'
import type { User } from '#/types/auth'
import type { UserListParams, UserStatusPayload } from '#/types/user'

export const userService = {
  list: (params: UserListParams) => http.get<Paginated<User>>('/admin/users', params),
  get: (id: number) => http.get<User>(`/admin/users/${id}`),
  updateStatus: (id: number, payload: UserStatusPayload) =>
    http.patch<User>(`/admin/users/${id}/status`, payload),
}
