import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { ApiError, onUnauthorized } from '#/lib/http'
import { authService } from '#/services/auth.service'
import type { LoginPayload } from '#/types/auth'

export const meQueryOptions = queryOptions({
  queryKey: ['auth', 'me'],
  queryFn: authService.me,
  staleTime: Infinity,
  retry: false,
})

export function useCurrentUser() {
  return useQuery(meQueryOptions).data ?? null
}

export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { user } = await authService.login(payload)
      if (user.role !== 'admin') {
        await authService.logout()
        throw new ApiError(403, 'Tài khoản này không có quyền quản trị')
      }
      return user
    },
    onSuccess: (user) => {
      queryClient.setQueryData(meQueryOptions.queryKey, user)
      navigate({ to: '/' })
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return async () => {
    await authService.logout().catch(() => undefined)
    queryClient.clear()
    navigate({ to: '/login' })
  }
}

export function useSessionGuard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  useEffect(
    () =>
      onUnauthorized(() => {
        queryClient.removeQueries({ queryKey: meQueryOptions.queryKey })
        navigate({ to: '/login', search: { expired: true } })
      }),
    [navigate, queryClient],
  )
}