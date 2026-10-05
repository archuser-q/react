import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Tooltip } from 'antd'
import { useUpdateVerification } from '#/hooks/useWorkers'
import type { VerificationStatus, WorkerDocument } from '#/types/worker'
import { DOC_TYPE } from '#/utils/constants'
import { getMissingRequiredDocs } from '#/utils/worker'

interface VerificationActionsProps {
  workerId: number
  status: VerificationStatus
  documents: WorkerDocument[]
}

export function VerificationActions({ workerId, status, documents }: VerificationActionsProps) {
  const update = useUpdateVerification(workerId)
  const missing = getMissingRequiredDocs(documents)
  const target = update.variables?.status

  const approve = () => update.mutateAsync({ status: 'approved' }).catch(() => undefined)
  const reject = () => update.mutateAsync({ status: 'rejected' }).catch(() => undefined)

  return (
    <>
      {status !== 'approved' && (
        <Tooltip
          title={
            missing.length
              ? `Cần duyệt hợp lệ: ${missing.map((t) => DOC_TYPE[t]).join(', ')}`
              : undefined
          }
        >
          <Popconfirm
            title="Duyệt hồ sơ thợ này?"
            description="Thợ sẽ được bật trạng thái nhận đơn trên ứng dụng."
            okText="Duyệt hồ sơ"
            cancelText="Hủy"
            onConfirm={approve}
            disabled={missing.length > 0}
          >
            <Button
              type="primary"
              icon={<CheckOutlined />}
              disabled={missing.length > 0}
              loading={update.isPending && target === 'approved'}
            >
              Duyệt hồ sơ
            </Button>
          </Popconfirm>
        </Tooltip>
      )}
      {status !== 'rejected' && (
        <Popconfirm
          title="Từ chối hồ sơ thợ này?"
          description={
            <div style={{ maxWidth: 280 }}>
              {status === 'approved'
                ? 'Thợ sẽ bị chuyển sang ngoại tuyến và không nhận được đơn mới.'
                : 'Thợ cần bổ sung giấy tờ và gửi lại để được xét duyệt.'}
            </div>
          }
          okText="Từ chối hồ sơ"
          okButtonProps={{ danger: true }}
          cancelText="Hủy"
          onConfirm={reject}
        >
          <Button icon={<CloseOutlined />} loading={update.isPending && target === 'rejected'}>
            {status === 'approved' ? 'Thu hồi duyệt' : 'Từ chối hồ sơ'}
          </Button>
        </Popconfirm>
      )}
    </>
  )
}
