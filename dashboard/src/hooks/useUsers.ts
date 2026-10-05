import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { userKeys, workerKeys } from '#/hooks/query-keys'
import { dashboardKeys } from '#/hooks/useDashboard'
import { userService } from '#/services/user.service'
import type { UserListParams, UserStatusPayload } from '#/types/user'

export function useUserList(params: UserListParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userService.list(params),
    placeholderData: keepPreviousData,
  })
}

export function useUserDetail(id: number | null) {
  return useQuery({
    queryKey: userKeys.detail(id ?? 0),
    queryFn: () => userService.get(id as number),
    enabled: id !== null,
  })
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: ({ id, status }: { id: number } & UserStatusPayload) =>
      userService.updateStatus(id, { status }),
    onSuccess: (user) => {
      message.success(
        user.status === 'blocked'
          ? `Đã khóa tài khoản ${user.full_name}`
          : `Đã mở khóa tài khoản ${user.full_name}`,
      )
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      queryClient.invalidateQueries({ queryKey: workerKeys.all })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
    },
    onError: (error) => message.error(error.message),
  })
}
