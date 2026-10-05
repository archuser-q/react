import { Form, Input, Modal, Tag } from 'antd'
import { useEffect } from 'react'
import { COMPLAINT_RESOLUTION_TEMPLATES } from '#/utils/constants'

export type ResolveMode = 'resolved' | 'rejected'

const TEXT: Record<ResolveMode, { title: string; ok: string; label: string }> = {
  resolved: {
    title: 'Giải quyết khiếu nại',
    ok: 'Xác nhận đã giải quyết',
    label: 'Kết quả xử lý (người gửi sẽ nhận được thông báo này)',
  },
  rejected: {
    title: 'Từ chối khiếu nại',
    ok: 'Từ chối khiếu nại',
    label: 'Lý do từ chối (người gửi sẽ nhận được thông báo này)',
  },
}

interface ResolveComplaintModalProps {
  mode: ResolveMode | null
  complaintId: number
  loading: boolean
  onCancel: () => void
  onSubmit: (resolution: string) => void
}

export function ResolveComplaintModal({
  mode,
  complaintId,
  loading,
  onCancel,
  onSubmit,
}: ResolveComplaintModalProps) {
  const [form] = Form.useForm<{ resolution: string }>()

  useEffect(() => {
    if (mode) form.resetFields()
  }, [mode, form])

  if (!mode) return null
  const text = TEXT[mode]

  return (
    <Modal
      open
      title={`${text.title} #${complaintId}`}
      okText={text.ok}
      okButtonProps={{ danger: mode === 'rejected', loading }}
      cancelText="Đóng"
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={({ resolution }) => onSubmit(resolution.trim())}
      >
        <Form.Item
          name="resolution"
          label={text.label}
          rules={[{ required: true, whitespace: true, message: 'Nhập nội dung trước khi lưu' }]}
        >
          <Input.TextArea rows={4} maxLength={2000} showCount />
        </Form.Item>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {COMPLAINT_RESOLUTION_TEMPLATES[mode].map((t) => (
            <Tag
              key={t}
              style={{ cursor: 'pointer', margin: 0 }}
              onClick={() => form.setFieldValue('resolution', t)}
            >
              {t}
            </Tag>
          ))}
        </div>
      </Form>
    </Modal>
  )
}
