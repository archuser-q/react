import { Alert, InputNumber, Modal, Radio, Select, Space, Table, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { palette } from '#/theme/tokens'
import type { PriceMode, PriceRounding, ServiceItem } from '#/types/catalog'
import { formatCurrency } from '#/utils/format'
import { adjustPrice } from '#/utils/price'

interface BulkPriceModalProps {
  services: ServiceItem[]
  open: boolean
  loading: boolean
  onCancel: () => void
  onSubmit: (values: { mode: PriceMode; value: number; round_to: PriceRounding }) => void
}

export function BulkPriceModal({
  services,
  open,
  loading,
  onCancel,
  onSubmit,
}: BulkPriceModalProps) {
  const [mode, setMode] = useState<PriceMode>('percent')
  const [value, setValue] = useState<number | null>(10)
  const [roundTo, setRoundTo] = useState<PriceRounding>(1000)

  useEffect(() => {
    if (open) {
      setMode('percent')
      setValue(10)
      setRoundTo(1000)
    }
  }, [open])

  const preview = useMemo(
    () =>
      services.map((s) => ({
        ...s,
        new_price: value ? adjustPrice(s.base_price, mode, value, roundTo) : s.base_price,
      })),
    [services, mode, value, roundTo],
  )
  const invalid = preview.some((p) => p.new_price <= 0)
  const percentOutOfRange = mode === 'percent' && value !== null && (value < -90 || value > 500)

  return (
    <Modal
      open={open}
      width={640}
      title={`Điều chỉnh giá ${services.length} dịch vụ`}
      okText="Áp dụng giá mới"
      okButtonProps={{ loading, disabled: !value || invalid || percentOutOfRange }}
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => value && onSubmit({ mode, value, round_to: roundTo })}
      destroyOnHidden
    >
      <Space wrap size={12} style={{ marginBottom: 16 }}>
        <Radio.Group
          optionType="button"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value)
            setValue(e.target.value === 'percent' ? 10 : 10000)
          }}
          options={[
            { value: 'percent', label: 'Theo %' },
            { value: 'amount', label: 'Theo số tiền' },
          ]}
        />
        <InputNumber<number>
          value={value}
          onChange={setValue}
          addonAfter={mode === 'percent' ? '%' : 'đ'}
          step={mode === 'percent' ? 5 : 10000}
          style={{ width: 170 }}
          aria-label="Mức điều chỉnh"
        />
        <Select<PriceRounding>
          value={roundTo}
          onChange={setRoundTo}
          style={{ width: 190 }}
          aria-label="Làm tròn"
          options={[
            { value: 1, label: 'Không làm tròn' },
            { value: 1000, label: 'Làm tròn đến 1.000đ' },
            { value: 5000, label: 'Làm tròn đến 5.000đ' },
            { value: 10000, label: 'Làm tròn đến 10.000đ' },
          ]}
        />
      </Space>
      <Typography.Paragraph type="secondary" style={{ marginTop: -8 }}>
        Nhập số âm để giảm giá. Giá mới chỉ áp dụng cho đơn tạo sau thời điểm này, đơn cũ giữ nguyên
        giá.
      </Typography.Paragraph>
      {percentOutOfRange && (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 12 }}
          title="Phần trăm phải từ -90% đến 500%"
        />
      )}
      {invalid && (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 12 }}
          title="Có dịch vụ bị giá âm hoặc bằng 0"
        />
      )}
      <Table
        rowKey="id"
        size="small"
        dataSource={preview}
        pagination={false}
        scroll={{ y: 300 }}
        columns={[
          { title: 'Dịch vụ', dataIndex: 'name', ellipsis: true },
          {
            title: 'Giá hiện tại',
            dataIndex: 'base_price',
            width: 130,
            align: 'right',
            render: (v: number) => formatCurrency(v),
          },
          {
            title: 'Giá mới',
            dataIndex: 'new_price',
            width: 130,
            align: 'right',
            render: (v: number, row) => (
              <Typography.Text
                strong
                style={{
                  color:
                    v > row.base_price
                      ? palette.green
                      : v < row.base_price
                        ? palette.red
                        : undefined,
                }}
              >
                {formatCurrency(v)}
              </Typography.Text>
            ),
          },
        ]}
      />
    </Modal>
  )
}
