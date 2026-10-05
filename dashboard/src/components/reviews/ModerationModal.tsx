import { Form, Input, Modal, Tag } from 'antd'
import { useEffect } from 'react'
import type { ModerationAction } from '#/types/review'

const TEXT: Record<
  ModerationAction,
  {
    title: string
    ok: string
    label: string
    required: boolean
    danger: boolean
    templates: string[]
  }
> = {
  flag: {
    title: 'Gắn cờ đánh giá',
    ok: 'Gắn cờ',
    label: 'Lý do gắn cờ',
    required: true,
    danger: true,
    templates: [
      'Ngôn từ không phù hợp',
      'Nghi ngờ đánh giá ảo',
      'Nội dung không liên quan đến dịch vụ',
    ],
  },
  approve: {
    title: 'Giữ lại đánh giá',
    ok: 'Giữ lại',
    label: 'Ghi chú (không bắt buộc)',
    required: false,
    danger: false,
    templates: ['Nội dung phản ánh đúng trải nghiệm', 'Không vi phạm quy định'],
  },
  hide: {
    title: 'Ẩn đánh giá',
    ok: 'Ẩn đánh giá',
    label: 'Lý do ẩn (khách hàng sẽ nhận được thông báo này)',
    required: true,
    danger: true,
    templates: [
      'Ngôn từ xúc phạm hoặc thô tục',
      'Chứa thông tin cá nhân của người khác',
      'Đánh giá ảo, không phản ánh dịch vụ thực tế',
      'Quảng cáo hoặc nội dung rác',
    ],
  },
  restore: {
    title: 'Hiển thị lại đánh giá',
    ok: 'Hiển thị lại',
    label: 'Ghi chú (không bắt buộc)',
    required: false,
    danger: false,
    templates: ['Xem xét lại, đánh giá không vi phạm'],
  },
}

interface ModerationModalProps {
  action: ModerationAction | null
  reviewId: number
  loading: boolean
  onCancel: () => void
  onSubmit: (note?: string) => void
}

export function ModerationModal({
  action,
  reviewId,
  loading,
  onCancel,
  onSubmit,
}: ModerationModalProps) {
  const [form] = Form.useForm<{ note?: string }>()

  useEffect(() => {
    if (action) form.resetFields()
  }, [action, form])

  if (!action) return null
  const text = TEXT[action]

  return (
    <Modal
      open
      title={`${text.title} #${reviewId}`}
      okText={text.ok}
      okButtonProps={{ danger: text.danger, loading }}
      cancelText="Đóng"
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={({ note }) => onSubmit(note?.trim() || undefined)}
      >
        <Form.Item
          name="note"
          label={text.label}
          rules={
            text.required
              ? [{ required: true, whitespace: true, message: 'Nhập lý do trước khi lưu' }]
              : []
          }
        >
          <Input.TextArea rows={3} maxLength={action === 'flag' ? 255 : 1000} showCount />
        </Form.Item>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {text.templates.map((t) => (
            <Tag
              key={t}
              style={{ cursor: 'pointer', margin: 0 }}
              onClick={() => form.setFieldValue('note', t)}
            >
              {t}
            </Tag>
          ))}
        </div>
      </Form>
    </Modal>
  )
}
