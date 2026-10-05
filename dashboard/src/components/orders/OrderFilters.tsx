import { DatePicker, Input, Select, Space } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useOrderFilterOptions } from '#/hooks/useOrders'

export interface OrderFilterValue {
  keyword?: string
  category_id?: number
  date_from?: string
  date_to?: string
}

interface OrderFiltersProps {
  value: OrderFilterValue
  onChange: (value: OrderFilterValue) => void
}

const DATE_FORMAT = 'YYYY-MM-DD'

export function OrderFilters({ value, onChange }: OrderFiltersProps) {
  const [keyword, setKeyword] = useState(value.keyword ?? '')
  const { data: options, isLoading } = useOrderFilterOptions()

  useEffect(() => setKeyword(value.keyword ?? ''), [value.keyword])

  return (
    <Space wrap style={{ marginBottom: 16 }}>
      <Input.Search
        allowClear
        placeholder="Mã đơn (#123), tên, SĐT khách hoặc thợ"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={(text) => onChange({ ...value, keyword: text.trim() || undefined })}
        style={{ width: 320 }}
        aria-label="Tìm đơn hàng"
      />
      <Select
        allowClear
        loading={isLoading}
        placeholder="Mọi danh mục"
        value={value.category_id}
        onChange={(category_id) => onChange({ ...value, category_id })}
        style={{ width: 180 }}
        aria-label="Lọc theo danh mục dịch vụ"
        options={options?.categories.map((c) => ({ value: c.id, label: c.name }))}
      />
      <DatePicker.RangePicker
        format="DD/MM/YYYY"
        placeholder={['Từ ngày', 'Đến ngày']}
        value={
          value.date_from && value.date_to
            ? [dayjs(value.date_from, DATE_FORMAT), dayjs(value.date_to, DATE_FORMAT)]
            : null
        }
        onChange={(range) =>
          onChange({
            ...value,
            date_from: range?.[0]?.format(DATE_FORMAT),
            date_to: range?.[1]?.format(DATE_FORMAT),
          })
        }
        disabledDate={(d) => d.isAfter(dayjs(), 'day')}
        aria-label="Lọc theo ngày tạo đơn"
      />
    </Space>
  )
}
