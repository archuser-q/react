import { Alert, Button, Drawer, Form, Input, InputNumber, Radio, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { weightSum } from '#/components/matching/factors'
import { WeightSliders } from '#/components/matching/WeightSliders'
import type { MatchingConfigItem, MatchingConfigPayload, Weights } from '#/types/matching'

const DEFAULT_VALUES: MatchingConfigPayload = {
  name: '',
  mode: 'instant',
  batch_window_seconds: null,
  search_radius_km: 5,
  max_offers: 3,
  offer_timeout_seconds: 60,
  weight_distance: 0.4,
  weight_trust: 0.3,
  weight_price: 0.1,
  weight_workload: 0.2,
}

interface ConfigFormDrawerProps {
  open: boolean
  // null: tạo mới; có id: sửa; không có id: nhân bản
  initial: (Partial<MatchingConfigItem> & { id?: number }) | null
  loading: boolean
  onClose: () => void
  onSubmit: (values: MatchingConfigPayload) => void
}

export function ConfigFormDrawer({
  open,
  initial,
  loading,
  onClose,
  onSubmit,
}: ConfigFormDrawerProps) {
  const [form] = Form.useForm<MatchingConfigPayload>()
  const mode = Form.useWatch('mode', form)
  const weights = Form.useWatch([], form) as MatchingConfigPayload | undefined
  const isEdit = Boolean(initial?.id)
  const weightValue: Weights = {
    weight_distance: weights?.weight_distance ?? 0,
    weight_trust: weights?.weight_trust ?? 0,
    weight_price: weights?.weight_price ?? 0,
    weight_workload: weights?.weight_workload ?? 0,
  }
  const sumValid = Math.abs(weightSum(weightValue) - 1) <= 0.001

  useEffect(() => {
    if (!open) return
    form.resetFields()
    form.setFieldsValue({ ...DEFAULT_VALUES, ...(initial ?? {}) })
  }, [open, initial, form])

  return (
    <Drawer
      open={open}
      onClose={onClose}
      size={520}
      destroyOnHidden
      title={isEdit ? `Sửa cấu hình "${initial?.name}"` : 'Tạo cấu hình ghép thợ'}
      footer={
        <Space>
          <Button
            type="primary"
            loading={loading}
            disabled={!sumValid}
            onClick={() => form.submit()}
          >
            {isEdit ? 'Lưu' : 'Tạo cấu hình'}
          </Button>
          <Button onClick={onClose}>Hủy</Button>
        </Space>
      }
    >
      {isEdit && initial?.is_active && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          title="Cấu hình này đang được áp dụng"
          description="Thay đổi có hiệu lực ngay với các đơn tạo sau khi lưu."
        />
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) =>
          onSubmit({
            ...values,
            name: values.name.trim(),
            batch_window_seconds: values.mode === 'batch' ? values.batch_window_seconds : null,
          })
        }
      >
        <Form.Item
          name="name"
          label="Tên cấu hình"
          rules={[
            { required: true, whitespace: true, message: 'Nhập tên cấu hình' },
            { min: 2, max: 100, message: 'Tên từ 2 đến 100 ký tự' },
          ]}
        >
          <Input placeholder="Ví dụ: Ưu tiên thợ gần, giờ cao điểm" />
        </Form.Item>

        <Form.Item name="mode" label="Chế độ ghép">
          <Radio.Group
            optionType="button"
            options={[
              { value: 'instant', label: 'Tức thời' },
              { value: 'batch', label: 'Theo lô' },
            ]}
          />
        </Form.Item>
        <Typography.Paragraph type="secondary" style={{ marginTop: -16, fontSize: 13 }}>
          {mode === 'batch'
            ? 'Gom các đơn đến trong một khoảng thời gian rồi ghép cùng lúc, tránh nhiều đơn tranh một thợ.'
            : 'Mỗi đơn được ghép ngay khi khách đặt.'}
        </Typography.Paragraph>
        {mode === 'batch' && (
          <Form.Item
            name="batch_window_seconds"
            label="Thời gian gom đơn"
            rules={[{ required: true, message: 'Nhập thời gian gom đơn' }]}
          >
            <InputNumber min={5} max={600} addonAfter="giây" style={{ width: 180 }} />
          </Form.Item>
        )}

        <Space size={16} wrap align="start">
          <Form.Item name="search_radius_km" label="Bán kính tìm thợ" rules={[{ required: true }]}>
            <InputNumber min={0.5} max={50} step={0.5} addonAfter="km" style={{ width: 140 }} />
          </Form.Item>
          <Form.Item name="max_offers" label="Số thợ nhận offer" rules={[{ required: true }]}>
            <InputNumber min={1} max={20} addonAfter="thợ" style={{ width: 130 }} />
          </Form.Item>
          <Form.Item name="offer_timeout_seconds" label="Chờ phản hồi" rules={[{ required: true }]}>
            <InputNumber min={10} max={600} step={5} addonAfter="giây" style={{ width: 140 }} />
          </Form.Item>
        </Space>

        <Typography.Title level={5} style={{ marginTop: 8 }}>
          Trọng số chấm điểm
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ fontSize: 13 }}>
          Điểm của thợ = tổng (trọng số × điểm tiêu chí). Tổng 4 trọng số phải bằng 1.
        </Typography.Paragraph>
        {/* Các trường trọng số được giữ trong form, chỉnh qua thanh kéo bên dưới */}
        {(['weight_distance', 'weight_trust', 'weight_price', 'weight_workload'] as const).map(
          (name) => (
            <Form.Item key={name} name={name} hidden>
              <InputNumber />
            </Form.Item>
          ),
        )}
        <WeightSliders value={weightValue} onChange={(w) => form.setFieldsValue(w)} />
      </Form>
    </Drawer>
  )
}
