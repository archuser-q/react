import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { workerKeys } from '#/hooks/query-keys'
import { dashboardKeys } from '#/hooks/useDashboard'
import { orderKeys } from '#/hooks/useOrders'
import { reviewService } from '#/services/review.service'
import type { ModerationPayload, ReviewFilterParams, ReviewListParams } from '#/types/review'

export const reviewKeys = {
  all: ['reviews'] as const,
  list: (params: ReviewListParams) => [...reviewKeys.all, 'list', params] as const,
  stats: (params: ReviewFilterParams) => [...reviewKeys.all, 'stats', params] as const,
  detail: (id: number) => [...reviewKeys.all, 'detail', id] as const,
}

export function useReviewList(params: ReviewListParams) {
  return useQuery({
    queryKey: reviewKeys.list(params),
    queryFn: () => reviewService.list(params),
    placeholderData: keepPreviousData,
  })
}

export function useReviewStats(params: ReviewFilterParams) {
  return useQuery({
    queryKey: reviewKeys.stats(params),
    queryFn: () => reviewService.stats(params),
    placeholderData: keepPreviousData,
  })
}

export function useReviewDetail(id: number | null) {
  return useQuery({
    queryKey: reviewKeys.detail(id ?? 0),
    queryFn: () => reviewService.get(id as number),
    enabled: id !== null,
  })
}

const SUCCESS_MESSAGE = {
  flag: 'Đã gắn cờ đánh giá',
  approve: 'Đã giữ lại đánh giá',
  hide: 'Đã ẩn đánh giá',
  restore: 'Đã hiển thị lại đánh giá',
}

export function useModerateReview(id: number) {
  const queryClient = useQueryClient()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: (payload: ModerationPayload) => reviewService.moderate(id, payload),
    onSuccess: (review, payload) => {
      message.success(SUCCESS_MESSAGE[payload.action])
      queryClient.setQueryData(reviewKeys.detail(id), review)
      queryClient.invalidateQueries({ queryKey: reviewKeys.all })
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(review.order_id) })
      queryClient.invalidateQueries({ queryKey: workerKeys.detail(review.worker.id) })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
    },
    onError: (error) => message.error(error.message),
  })
}
