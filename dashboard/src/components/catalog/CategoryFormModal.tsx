import { Form, Input, Modal } from 'antd'
import { useEffect } from 'react'
import type { CategoryItem, CategoryPayload } from '#/types/catalog'

interface CategoryFormModalProps {
  open: boolean
  category: CategoryItem | null
  loading: boolean
  onCancel: () => void
  onSubmit: (values: CategoryPayload) => void
}

export function CategoryFormModal({
  open,
  category,
  loading,
  onCancel,
  onSubmit,
}: CategoryFormModalProps) {
  const [form] = Form.useForm<CategoryPayload>()

  useEffect(() => {
    if (open) {
      form.resetFields()
      if (category) form.setFieldsValue({ name: category.name, description: category.description })
    }
  }, [open, category, form])

  return (
    <Modal
      open={open}
      title={category ? `Sửa danh mục "${category.name}"` : 'Thêm danh mục'}
      okText={category ? 'Lưu' : 'Thêm danh mục'}
      okButtonProps={{ loading }}
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) =>
          onSubmit({ name: values.name?.trim(), description: values.description?.trim() || null })
        }
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[
            { required: true, whitespace: true, message: 'Nhập tên danh mục' },
            { min: 2, max: 100, message: 'Tên từ 2 đến 100 ký tự' },
          ]}
        >
          <Input placeholder="Ví dụ: Điện lạnh" />
        </Form.Item>
        <Form.Item name="description" label="Mô tả (không bắt buộc)">
          <Input.TextArea rows={3} maxLength={1000} showCount />
        </Form.Item>
      </Form>
    </Modal>
  )
}
