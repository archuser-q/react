import { CheckOutlined, CloseOutlined, InboxOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space } from 'antd'
import { useState } from 'react'
import { ResolveComplaintModal } from '#/components/complaints/ResolveComplaintModal'
import type { ResolveMode } from '#/components/complaints/ResolveComplaintModal'
import { useUpdateComplaintStatus } from '#/hooks/useComplaints'
import type { ComplaintDetail } from '#/types/complaint'

export function ComplaintActions({ complaint }: { complaint: ComplaintDetail }) {
  const [mode, setMode] = useState<ResolveMode | null>(null)
  const update = useUpdateComplaintStatus(complaint.id)
  const target = update.isPending ? update.variables?.status : undefined

  if (complaint.status === 'resolved' || complaint.status === 'rejected') return null

  return (
    <>
      <Space wrap>
        {complaint.status === 'open' && (
          <Popconfirm
            title="Tiếp nhận khiếu nại này?"
            description="Bạn sẽ là người phụ trách xử lý."
            okText="Tiếp nhận"
            cancelText="Hủy"
            onConfirm={() => update.mutateAsync({ status: 'processing' }).catch(() => undefined)}
          >
            <Button type="primary" icon={<InboxOutlined />} loading={target === 'processing'}>
              Tiếp nhận
            </Button>
          </Popconfirm>
        )}
        <Button
          type={complaint.status === 'processing' ? 'primary' : 'default'}
          icon={<CheckOutlined />}
          onClick={() => setMode('resolved')}
        >
          Giải quyết
        </Button>
        <Button danger icon={<CloseOutlined />} onClick={() => setMode('rejected')}>
          Từ chối
        </Button>
      </Space>

      <ResolveComplaintModal
        mode={mode}
        complaintId={complaint.id}
        loading={update.isPending}
        onCancel={() => setMode(null)}
        onSubmit={(resolution) =>
          mode &&
          update
            .mutateAsync({ status: mode, resolution })
            .then(() => setMode(null))
            .catch(() => undefined)
        }
      />
    </>
  )
}
