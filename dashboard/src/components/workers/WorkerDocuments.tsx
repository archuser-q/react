import {
  CheckCircleFilled,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons'
import { Button, Card, Image, Space, Tag, Typography } from 'antd'
import { useState } from 'react'
import { EmptyBlock } from '#/components/common/EmptyBlock'
import { SectionCard } from '#/components/common/SectionCard'
import { RejectDocumentModal } from '#/components/workers/RejectDocumentModal'
import { useReviewDocument } from '#/hooks/useWorkers'
import { palette } from '#/theme/tokens'
import type { WorkerDocument } from '#/types/worker'
import { DOC_STATUS, DOC_TYPE, REQUIRED_DOCS } from '#/utils/constants'
import { formatDateTime } from '#/utils/format'
import styles from '#/components/workers/workers.module.css'

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><rect width="100%" height="100%" fill="#F4F5F2"/><text x="50%" y="50%" fill="#6B7480" font-family="sans-serif" font-size="14" text-anchor="middle">Không tải được ảnh</text></svg>',
  )

function RequiredChecklist({ documents }: { documents: WorkerDocument[] }) {
  return (
    <ul className={styles.checklist}>
      {REQUIRED_DOCS.map((type) => {
        const ofType = documents.filter((d) => d.doc_type === type)
        const ok = ofType.some((d) => d.status === 'approved')
        const waiting = ofType.some((d) => d.status === 'pending')
        return (
          <li key={type}>
            {ok ? (
              <CheckCircleFilled style={{ color: palette.green }} />
            ) : (
              <ExclamationCircleFilled style={{ color: waiting ? palette.amber : palette.red }} />
            )}
            <span>{DOC_TYPE[type]}</span>
            <Typography.Text type="secondary">
              {ok
                ? 'đã hợp lệ'
                : waiting
                  ? 'chờ duyệt'
                  : ofType.length
                    ? 'bị từ chối, chờ thợ gửi lại'
                    : 'thợ chưa gửi'}
            </Typography.Text>
          </li>
        )
      })}
    </ul>
  )
}

interface DocumentCardProps {
  doc: WorkerDocument
  busy: boolean
  onApprove: () => void
  onReject: () => void
}

function DocumentCard({ doc, busy, onApprove, onReject }: DocumentCardProps) {
  const status = DOC_STATUS[doc.status]
  return (
    <Card
      size="small"
      className={styles.docCard}
      cover={
        <Image
          src={doc.file_url}
          alt={DOC_TYPE[doc.doc_type]}
          fallback={FALLBACK_IMAGE}
          height={180}
          style={{ objectFit: 'cover' }}
        />
      }
    >
      <div className={styles.docHead}>
        <Typography.Text strong>{DOC_TYPE[doc.doc_type]}</Typography.Text>
        <Tag color={status.color} style={{ margin: 0 }}>
          {status.label}
        </Tag>
      </div>
      <div className={styles.docMeta}>
        <span>Gửi lúc {formatDateTime(doc.uploaded_at)}</span>
        {doc.reviewed_at && <span>Duyệt lúc {formatDateTime(doc.reviewed_at)}</span>}
      </div>
      {doc.reject_reason && (
        <Typography.Paragraph type="danger" style={{ margin: '6px 0 0', fontSize: 13 }}>
          Lý do: {doc.reject_reason}
        </Typography.Paragraph>
      )}
      <Space wrap style={{ marginTop: 10 }}>
        {doc.status !== 'approved' && (
          <Button
            size="small"
            type="primary"
            icon={<CheckOutlined />}
            onClick={onApprove}
            loading={busy}
          >
            Hợp lệ
          </Button>
        )}
        {doc.status !== 'rejected' && (
          <Button size="small" danger icon={<CloseOutlined />} onClick={onReject} disabled={busy}>
            Không hợp lệ
          </Button>
        )}
      </Space>
    </Card>
  )
}

interface WorkerDocumentsProps {
  workerId: number
  documents: WorkerDocument[]
}

export function WorkerDocuments({ workerId, documents }: WorkerDocumentsProps) {
  const review = useReviewDocument(workerId)
  const [rejecting, setRejecting] = useState<WorkerDocument | null>(null)
  const busyId = review.isPending ? review.variables?.documentId : undefined

  return (
    <SectionCard
      title="Giấy tờ xác minh"
      description="Cần đủ 3 giấy tờ bắt buộc hợp lệ trước khi duyệt hồ sơ. Bấm vào ảnh để phóng to."
    >
      <RequiredChecklist documents={documents} />
      {documents.length === 0 ? (
        <EmptyBlock text="Thợ chưa gửi giấy tờ nào" />
      ) : (
        <Image.PreviewGroup>
          <div className={styles.docGrid}>
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                busy={busyId === doc.id}
                onApprove={() =>
                  review
                    .mutateAsync({ documentId: doc.id, status: 'approved' })
                    .catch(() => undefined)
                }
                onReject={() => setRejecting(doc)}
              />
            ))}
          </div>
        </Image.PreviewGroup>
      )}
      <RejectDocumentModal
        open={rejecting !== null}
        title={rejecting ? DOC_TYPE[rejecting.doc_type] : ''}
        loading={review.isPending}
        onCancel={() => setRejecting(null)}
        onSubmit={(reason) => {
          if (!rejecting) return
          review
            .mutateAsync({ documentId: rejecting.id, status: 'rejected', reject_reason: reason })
            .then(() => setRejecting(null))
            .catch(() => undefined)
        }}
      />
    </SectionCard>
  )
}
