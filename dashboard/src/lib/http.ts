import { API_BASE_URL } from '#/config/env'
import type { ApiResponse } from '#/types/api'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type Query = Record<string, string | number | boolean | null | undefined>

interface RequestOptions extends Omit<RequestInit, 'body'> {
  query?: Query
  body?: unknown
}

const UNAUTHORIZED_EVENT = 'thonhanh:unauthorized'

export const onUnauthorized = (handler: () => void) => {
  window.addEventListener(UNAUTHORIZED_EVENT, handler)
  return () => window.removeEventListener(UNAUTHORIZED_EVENT, handler)
}

function buildUrl(path: string, query?: Query) {
  const url = new URL(API_BASE_URL.replace(/\/$/, '') + path)
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })
  return url.toString()
}

function readErrorMessage(body: unknown, status: number): string {
  const detail = (body as { detail?: unknown } | null)?.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && detail[0]?.msg) return String(detail[0].msg)
  if (status === 0) return 'Không kết nối được tới máy chủ API'
  return `Yêu cầu thất bại (mã ${status})`
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { query, body, headers, ...init } = options

  let response: Response
  try {
    response = await fetch(buildUrl(path, query), {
      ...init,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, readErrorMessage(null, 0))
  }

  const json = await response.json().catch(() => null)

  if (!response.ok) {
    if (response.status === 401 && !path.startsWith('/auth/')) {
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
    }
    throw new ApiError(response.status, readErrorMessage(json, response.status))
  }

  return (json as ApiResponse<T>).data
}

export const http = {
  get: <T>(path: string, query?: Query) => request<T>(path, { method: 'GET', query }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
}
