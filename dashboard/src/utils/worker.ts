import type { DocType, WorkerDocument } from '#/types/worker'
import { REQUIRED_DOCS } from '#/utils/constants'

// Giống kiểm tra ở backend: mỗi loại giấy tờ bắt buộc phải có ít nhất một bản đã duyệt
export function getMissingRequiredDocs(documents: WorkerDocument[]): DocType[] {
  const approved = new Set(documents.filter((d) => d.status === 'approved').map((d) => d.doc_type))
  return REQUIRED_DOCS.filter((type) => !approved.has(type))
}

export const toScore = (value: string) => Math.round(Number(value) * 100)
