import { DatePicker, Input, Select, Space } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import type { ReviewSort } from '#/types/review'

export interface ReviewFilterValue {
  keyword?: string
  rating?: number
  sort?: ReviewSort
  date_from?: string
  date_to?: string
}

const FORMAT = 'YYYY-MM-DD'

interface ReviewFiltersProps {
  value: ReviewFilterValue
  onChange: (value: ReviewFilterValue) => void
}

export function ReviewFilters({ value, onChange }: ReviewFiltersProps) {
  const [keyword, setKeyword] = useState(value.keyword ?? '')

  useEffect(() => setKeyword(value.keyword ?? ''), [value.keyword])

  return (
    <Space wrap style={{ marginBottom: 8 }}>
      <Input.Search
        allowClear
        placeholder="Nội dung, tên khách, tên thợ hoặc mã đơn (#123)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={(text) => onChange({ ...value, keyword: text.trim() || undefined })}
        style={{ width: 330 }}
        aria-label="Tìm đánh giá"
      />
      <Select
        allowClear
        placeholder="Mọi số sao"
        value={value.rating}
        onChange={(rating) => onChange({ ...value, rating })}
        style={{ width: 140 }}
        aria-label="Lọc theo số sao"
        options={[5, 4, 3, 2, 1].map((s) => ({ value: s, label: `${s} sao` }))}
      />
      <Select
        value={value.sort ?? 'newest'}
        onChange={(sort) => onChange({ ...value, sort: sort === 'newest' ? undefined : sort })}
        style={{ width: 170 }}
        aria-label="Sắp xếp"
        options={[
          { value: 'newest', label: 'Mới nhất' },
          { value: 'lowest', label: 'Điểm thấp nhất' },
        ]}
      />
      <DatePicker.RangePicker
        format="DD/MM/YYYY"
        placeholder={['Từ ngày', 'Đến ngày']}
        value={
          value.date_from && value.date_to
            ? [dayjs(value.date_from, FORMAT), dayjs(value.date_to, FORMAT)]
            : null
        }
        onChange={(range) =>
          onChange({
            ...value,
            date_from: range?.[0]?.format(FORMAT),
            date_to: range?.[1]?.format(FORMAT),
          })
        }
        disabledDate={(d) => d.isAfter(dayjs(), 'day')}
        aria-label="Lọc theo ngày đánh giá"
      />
    </Space>
  )
}
