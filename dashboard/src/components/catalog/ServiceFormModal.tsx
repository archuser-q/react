import { AutoComplete, Form, Input, InputNumber, Modal, Select, Switch } from 'antd'
import { useEffect } from 'react'
import type { CategoryItem, ServiceItem, ServicePayload } from '#/types/catalog'

const UNITS = ['lần', 'giờ', 'bộ', 'cái', 'phòng', 'm²', 'mét']

interface ServiceFormModalProps {
  open: boolean
  service: ServiceItem | null
  categories: CategoryItem[]
  defaultCategoryId?: number
  loading: boolean
  onCancel: () => void
  onSubmit: (values: ServicePayload) => void
}

const moneyFormatter = (v?: number | string) =>
  v === undefined || v === '' ? '' : `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
const moneyParser = (v?: string) => Number((v ?? '').replace(/\D/g, ''))

export function ServiceFormModal({
  open,
  service,
  categories,
  defaultCategoryId,
  loading,
  onCancel,
  onSubmit,
}: ServiceFormModalProps) {
  const [form] = Form.useForm<ServicePayload>()

  useEffect(() => {
    if (!open) return
    form.resetFields()
    form.setFieldsValue(
      service
        ? {
            category_id: service.category_id,
            name: service.name,
            description: service.description,
            base_price: service.base_price,
            unit: service.unit,
            is_active: service.is_active,
          }
        : { category_id: defaultCategoryId, is_active: true, unit: 'lần' },
    )
  }, [open, service, defaultCategoryId, form])

  return (
    <Modal
      open={open}
      title={service ? `Sửa dịch vụ "${service.name}"` : 'Thêm dịch vụ'}
      okText={service ? 'Lưu' : 'Thêm dịch vụ'}
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
          onSubmit({
            ...values,
            name: values.name?.trim(),
            description: values.description?.trim() || null,
            unit: values.unit?.trim() || null,
          })
        }
      >
        <Form.Item
          name="category_id"
          label="Danh mục"
          rules={[{ required: true, message: 'Chọn danh mục' }]}
        >
          <Select
            placeholder="Chọn danh mục"
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên dịch vụ"
          rules={[
            { required: true, whitespace: true, message: 'Nhập tên dịch vụ' },
            { min: 2, max: 150, message: 'Tên từ 2 đến 150 ký tự' },
          ]}
        >
          <Input placeholder="Ví dụ: Vệ sinh điều hòa" />
        </Form.Item>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: 12 }}>
          <Form.Item
            name="base_price"
            label="Giá gốc"
            rules={[{ required: true, message: 'Nhập giá gốc' }]}
            extra="Giá khởi điểm khách thấy khi đặt đơn. Thợ có thể báo giá phát sinh sau khi kiểm tra."
          >
            <InputNumber<number>
              min={1000}
              max={100_000_000}
              step={10000}
              addonAfter="đ"
              formatter={moneyFormatter}
              parser={moneyParser}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item name="unit" label="Đơn vị tính">
            <AutoComplete options={UNITS.map((u) => ({ value: u }))} placeholder="lần" />
          </Form.Item>
        </div>
        <Form.Item name="description" label="Mô tả (không bắt buộc)">
          <Input.TextArea rows={3} maxLength={2000} showCount />
        </Form.Item>
        <Form.Item name="is_active" label="Đang bán" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}
