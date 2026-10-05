import type { UserListParams } from '#/types/user'
import type { WorkerListParams } from '#/types/worker'

export const userKeys = {
  all: ['users'] as const,
  list: (params: UserListParams) => [...userKeys.all, 'list', params] as const,
  detail: (id: number) => [...userKeys.all, 'detail', id] as const,
}

export const workerKeys = {
  all: ['workers'] as const,
  list: (params: WorkerListParams) => [...workerKeys.all, 'list', params] as const,
  detail: (id: number) => [...workerKeys.all, 'detail', id] as const,
  counts: () => [...workerKeys.all, 'counts'] as const,
}
