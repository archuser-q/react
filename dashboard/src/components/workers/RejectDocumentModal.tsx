import { Form, Input, Modal, Tag } from 'antd'
import { useEffect } from 'react'
import { DOC_REJECT_REASONS } from '#/utils/constants'

interface RejectDocumentModalProps {
  open: boolean
  title: string
  loading: boolean
  onCancel: () => void
  onSubmit: (reason: string) => void
}

export function RejectDocumentModal({
  open,
  title,
  loading,
  onCancel,
  onSubmit,
}: RejectDocumentModalProps) {
  const [form] = Form.useForm<{ reason: string }>()

  useEffect(() => {
    if (open) form.resetFields()
  }, [open, form])

  return (
    <Modal
      open={open}
      title={`Từ chối ${title.toLowerCase()}`}
      okText="Từ chối giấy tờ"
      okButtonProps={{ danger: true, loading }}
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={({ reason }) => onSubmit(reason.trim())}>
        <Form.Item
          name="reason"
          label="Lý do (thợ sẽ thấy nội dung này)"
          rules={[{ required: true, whitespace: true, message: 'Nhập lý do từ chối' }]}
        >
          <Input.TextArea rows={3} maxLength={255} showCount />
        </Form.Item>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {DOC_REJECT_REASONS.map((reason) => (
            <Tag
              key={reason}
              style={{ cursor: 'pointer', margin: 0 }}
              onClick={() => form.setFieldValue('reason', reason)}
            >
              {reason}
            </Tag>
          ))}
        </div>
      </Form>
    </Modal>
  )
}
