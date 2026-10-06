import { http, request } from '#/lib/http'
import type {
  MatchingConfigItem,
  MatchingConfigPayload,
  SimulatePayload,
  SimulateResult,
} from '#/types/matching'

const BASE = '/admin/matching'

export const matchingService = {
  configs: () => http.get<MatchingConfigItem[]>(`${BASE}/configs`),
  create: (payload: MatchingConfigPayload) =>
    http.post<MatchingConfigItem>(`${BASE}/configs`, payload),
  update: (id: number, payload: MatchingConfigPayload) =>
    request<MatchingConfigItem>(`${BASE}/configs/${id}`, { method: 'PUT', body: payload }),
  activate: (id: number) => http.post<MatchingConfigItem>(`${BASE}/configs/${id}/activate`),
  remove: (id: number) => request<null>(`${BASE}/configs/${id}`, { method: 'DELETE' }),
  simulate: (payload: SimulatePayload) => http.post<SimulateResult>(`${BASE}/simulate`, payload),
}
