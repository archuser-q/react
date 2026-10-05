import { http } from '#/lib/http'
import type { Paginated } from '#/types/api'
import type {
  AdminWorkerDetail,
  AdminWorkerItem,
  ReviewDocumentPayload,
  WorkerDocument,
  WorkerListParams,
  WorkerProfile,
  WorkerVerificationPayload,
} from '#/types/worker'

export const workerService = {
  list: (params: WorkerListParams) =>
    http.get<Paginated<AdminWorkerItem>>('/admin/workers', params),
  get: (id: number) => http.get<AdminWorkerDetail>(`/admin/workers/${id}`),
  reviewDocument: (documentId: number, payload: ReviewDocumentPayload) =>
    http.patch<WorkerDocument>(`/admin/worker-documents/${documentId}/review`, payload),
  updateVerification: (workerId: number, payload: WorkerVerificationPayload) =>
    http.patch<WorkerProfile>(`/admin/workers/${workerId}/verification`, payload),
}
