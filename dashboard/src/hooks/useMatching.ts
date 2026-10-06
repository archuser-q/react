import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { dashboardKeys } from '#/hooks/useDashboard'
import { matchingService } from '#/services/matching.service'
import type { MatchingConfigItem, MatchingConfigPayload } from '#/types/matching'

export const matchingKeys = {
  all: ['matching'] as const,
  configs: () => [...matchingKeys.all, 'configs'] as const,
}

export function useMatchingConfigs() {
  return useQuery({ queryKey: matchingKeys.configs(), queryFn: matchingService.configs })
}

function useConfigMutation<TVars>(
  mutationFn: (vars: TVars) => Promise<MatchingConfigItem | null>,
  successMessage: (result: MatchingConfigItem | null) => string,
) {
  const queryClient = useQueryClient()
  const { message } = App.useApp()
  return useMutation({
    mutationFn,
    onSuccess: (result) => {
      message.success(successMessage(result))
      queryClient.invalidateQueries({ queryKey: matchingKeys.all })
      // Trang Tổng quan có hiển thị cấu hình đang áp dụng
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
    },
    onError: (error) => message.error(error.message),
  })
}

export const useCreateConfig = () =>
  useConfigMutation(
    (payload: MatchingConfigPayload) => matchingService.create(payload),
    () => 'Đã tạo cấu hình',
  )

export const useUpdateConfig = () =>
  useConfigMutation(
    ({ id, ...payload }: MatchingConfigPayload & { id: number }) =>
      matchingService.update(id, payload),
    (c) =>
      c?.is_active
        ? 'Đã lưu, cấu hình mới có hiệu lực ngay với các đơn tiếp theo'
        : 'Đã lưu cấu hình',
  )

export const useActivateConfig = () =>
  useConfigMutation(
    (id: number) => matchingService.activate(id),
    (c) => `Đã áp dụng cấu hình "${c?.name}"`,
  )

export const useDeleteConfig = () =>
  useConfigMutation(
    (id: number) => matchingService.remove(id),
    () => 'Đã xóa cấu hình',
  )

export function useSimulate() {
  const { message } = App.useApp()
  return useMutation({
    mutationFn: matchingService.simulate,
    onError: (error) => message.error(error.message),
  })
}
