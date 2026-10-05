import { http } from '#/lib/http'
import type { Paginated } from '#/types/api'
import type {
  ComplaintCountParams,
  ComplaintDetail,
  ComplaintListItem,
  ComplaintListParams,
  ComplaintStatusCounts,
  ComplaintStatusPayload,
} from '#/types/complaint'

export const complaintService = {
  list: (params: ComplaintListParams) =>
    http.get<Paginated<ComplaintListItem>>('/admin/complaints', params),
  statusCounts: (params: ComplaintCountParams) =>
    http.get<ComplaintStatusCounts>('/admin/complaints/status-counts', params),
  get: (id: number) => http.get<ComplaintDetail>(`/admin/complaints/${id}`),
  updateStatus: (id: number, payload: ComplaintStatusPayload) =>
    http.patch<ComplaintDetail>(`/admin/complaints/${id}/status`, payload),
}
