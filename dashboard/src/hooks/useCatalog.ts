import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { catalogService } from '#/services/catalog.service'
import type {
  BulkPricePayload,
  CategoryPayload,
  ServiceListParams,
  ServicePayload,
} from '#/types/catalog'

export const catalogKeys = {
  all: ['catalog'] as const,
  categories: () => [...catalogKeys.all, 'categories'] as const,
  services: (params: ServiceListParams) => [...catalogKeys.all, 'services', params] as const,
}

// Danh mục còn được dùng ở bộ lọc trang Đơn hàng
const ORDER_FILTER_KEY = ['orders', 'filter-options']

export function useCategories() {
  return useQuery({ queryKey: catalogKeys.categories(), queryFn: catalogService.categories })
}

export function useServiceList(params: ServiceListParams) {
  return useQuery({
    queryKey: catalogKeys.services(params),
    queryFn: () => catalogService.services(params),
    placeholderData: keepPreviousData,
  })
}

function useCatalogMutation<TVars, TResult>(
  mutationFn: (vars: TVars) => Promise<TResult>,
  successMessage: string | ((result: TResult) => string),
) {
  const queryClient = useQueryClient()
  const { message } = App.useApp()
  return useMutation({
    mutationFn,
    onSuccess: (result) => {
      message.success(
        typeof successMessage === 'function' ? successMessage(result) : successMessage,
      )
      queryClient.invalidateQueries({ queryKey: catalogKeys.all })
      queryClient.invalidateQueries({ queryKey: ORDER_FILTER_KEY })
    },
    onError: (error) => message.error(error.message),
  })
}

export const useCreateCategory = () =>
  useCatalogMutation(
    (payload: CategoryPayload) => catalogService.createCategory(payload),
    'Đã thêm danh mục',
  )

export const useUpdateCategory = () =>
  useCatalogMutation(
    ({ id, ...payload }: CategoryPayload & { id: number }) =>
      catalogService.updateCategory(id, payload),
    'Đã cập nhật danh mục',
  )

export const useDeleteCategory = () =>
  useCatalogMutation((id: number) => catalogService.deleteCategory(id), 'Đã xóa danh mục')

export const useCreateService = () =>
  useCatalogMutation(
    (payload: ServicePayload) => catalogService.createService(payload),
    'Đã thêm dịch vụ',
  )

export const useUpdateService = () =>
  useCatalogMutation(
    ({ id, ...payload }: ServicePayload & { id: number }) =>
      catalogService.updateService(id, payload),
    'Đã cập nhật dịch vụ',
  )

export const useDeleteService = () =>
  useCatalogMutation((id: number) => catalogService.deleteService(id), 'Đã xóa dịch vụ')

export const useBulkPrice = () =>
  useCatalogMutation(
    (payload: BulkPricePayload) => catalogService.bulkPrice(payload),
    (result) => `Đã cập nhật giá ${result.updated} dịch vụ`,
  )
