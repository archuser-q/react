import { Alert, Form, Input, Modal, Tag } from 'antd'
import { useEffect } from 'react'
import { ORDER_CANCEL_REASONS } from '#/utils/constants'

interface CancelOrderModalProps {
  open: boolean
  orderId: number
  hasWorker: boolean
  loading: boolean
  onCancel: () => void
  onSubmit: (reason: string) => void
}

export function CancelOrderModal({
  open,
  orderId,
  hasWorker,
  loading,
  onCancel,
  onSubmit,
}: CancelOrderModalProps) {
  const [form] = Form.useForm<{ reason: string }>()

  useEffect(() => {
    if (open) form.resetFields()
  }, [open, form])

  return (
    <Modal
      open={open}
      title={`Hủy đơn #${orderId}`}
      okText="Hủy đơn hàng"
      okButtonProps={{ danger: true, loading }}
      cancelText="Đóng"
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
    >
      <Alert
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
        title="Thao tác này không hoàn tác được"
        description={
          hasWorker
            ? 'Đơn sẽ chuyển sang Đã hủy. Thợ đang nhận đơn sẽ được trả về trạng thái sẵn sàng nếu không còn đơn nào khác.'
            : 'Đơn sẽ chuyển sang Đã hủy và các offer đang chờ thợ phản hồi sẽ hết hạn.'
        }
      />
      <Form form={form} layout="vertical" onFinish={({ reason }) => onSubmit(reason.trim())}>
        <Form.Item
          name="reason"
          label="Lý do hủy (khách và thợ sẽ thấy nội dung này)"
          rules={[
            { required: true, whitespace: true, message: 'Nhập lý do hủy đơn' },
            { min: 3, message: 'Lý do quá ngắn' },
          ]}
        >
          <Input.TextArea rows={3} maxLength={500} showCount />
        </Form.Item>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {ORDER_CANCEL_REASONS.map((reason) => (
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
