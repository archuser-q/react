import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { workerKeys } from '#/hooks/query-keys'
import { dashboardKeys } from '#/hooks/useDashboard'
import { dashboardService } from '#/services/dashboard.service'
import { workerService } from '#/services/worker.service'
import type {
  ReviewDocumentPayload,
  WorkerListParams,
  WorkerVerificationPayload,
} from '#/types/worker'

export function useWorkerList(params: WorkerListParams) {
  return useQuery({
    queryKey: workerKeys.list(params),
    queryFn: () => workerService.list(params),
    placeholderData: keepPreviousData,
  })
}

export function useWorkerDetail(id: number) {
  return useQuery({
    queryKey: workerKeys.detail(id),
    queryFn: () => workerService.get(id),
  })
}

// Dùng lại API /dashboard/summary để lấy số thợ theo từng trạng thái xác minh
export function useWorkerCounts() {
  return useQuery({
    queryKey: workerKeys.counts(),
    queryFn: dashboardService.summary,
    select: (summary) => summary.workers,
    staleTime: 30_000,
  })
}

export function useReviewDocument(workerId: number) {
  const queryClient = useQueryClient()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: ({ documentId, ...payload }: { documentId: number } & ReviewDocumentPayload) =>
      workerService.reviewDocument(documentId, payload),
    onSuccess: (doc) => {
      message.success(
        doc.status === 'approved' ? 'Đã xác nhận giấy tờ hợp lệ' : 'Đã từ chối giấy tờ',
      )
      queryClient.invalidateQueries({ queryKey: workerKeys.detail(workerId) })
      queryClient.invalidateQueries({ queryKey: workerKeys.counts() })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
    },
    onError: (error) => message.error(error.message),
  })
}

export function useUpdateVerification(workerId: number) {
  const queryClient = useQueryClient()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: (payload: WorkerVerificationPayload) =>
      workerService.updateVerification(workerId, payload),
    onSuccess: (profile) => {
      message.success(
        profile.verification_status === 'approved'
          ? 'Đã duyệt hồ sơ, thợ có thể bắt đầu nhận đơn'
          : 'Đã từ chối hồ sơ thợ',
      )
      queryClient.invalidateQueries({ queryKey: workerKeys.all })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
    },
    onError: (error) => message.error(error.message),
  })
}
