import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '#/lib/http'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: true,
        retry: (count, error) =>
          !(error instanceof ApiError && [401, 403, 422].includes(error.status)) && count < 2,
      },
    },
  })
}
