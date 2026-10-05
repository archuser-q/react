import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { dashboardKeys } from '#/hooks/useDashboard'
import { orderKeys } from '#/hooks/useOrders'
import { complaintService } from '#/services/complaint.service'
import type {
  ComplaintCountParams,
  ComplaintListParams,
  ComplaintStatusPayload,
} from '#/types/complaint'

export const complaintKeys = {
  all: ['complaints'] as const,
  list: (params: ComplaintListParams) => [...complaintKeys.all, 'list', params] as const,
  counts: (params: ComplaintCountParams) => [...complaintKeys.all, 'counts', params] as const,
  detail: (id: number) => [...complaintKeys.all, 'detail', id] as const,
}

export function useComplaintList(params: ComplaintListParams) {
  return useQuery({
    queryKey: complaintKeys.list(params),
    queryFn: () => complaintService.list(params),
    placeholderData: keepPreviousData,
  })
}

export function useComplaintStatusCounts(params: ComplaintCountParams) {
  return useQuery({
    queryKey: complaintKeys.counts(params),
    queryFn: () => complaintService.statusCounts(params),
    placeholderData: keepPreviousData,
  })
}

export function useComplaintDetail(id: number | null) {
  return useQuery({
    queryKey: complaintKeys.detail(id ?? 0),
    queryFn: () => complaintService.get(id as number),
    enabled: id !== null,
  })
}

const SUCCESS_MESSAGE = {
  processing: 'Đã tiếp nhận khiếu nại',
  resolved: 'Đã giải quyết khiếu nại',
  rejected: 'Đã từ chối khiếu nại',
}

export function useUpdateComplaintStatus(id: number) {
  const queryClient = useQueryClient()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: (payload: ComplaintStatusPayload) => complaintService.updateStatus(id, payload),
    onSuccess: (complaint, payload) => {
      message.success(SUCCESS_MESSAGE[payload.status])
      queryClient.setQueryData(complaintKeys.detail(id), complaint)
      queryClient.invalidateQueries({ queryKey: complaintKeys.all })
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(complaint.order.id) })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
    },
    onError: (error) => message.error(error.message),
  })
}
