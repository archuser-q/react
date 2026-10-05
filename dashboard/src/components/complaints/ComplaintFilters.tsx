import { DatePicker, Input, Space } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export interface ComplaintFilterValue {
  keyword?: string
  date_from?: string
  date_to?: string
}

interface ComplaintFiltersProps {
  value: ComplaintFilterValue
  onChange: (value: ComplaintFilterValue) => void
}

const DATE_FORMAT = 'YYYY-MM-DD'

export function ComplaintFilters({ value, onChange }: ComplaintFiltersProps) {
  const [keyword, setKeyword] = useState(value.keyword ?? '')

  useEffect(() => setKeyword(value.keyword ?? ''), [value.keyword])

  return (
    <Space wrap style={{ marginBottom: 16 }}>
      <Input.Search
        allowClear
        placeholder="Nội dung, người gửi, tên thợ hoặc mã đơn (#123)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={(text) => onChange({ ...value, keyword: text.trim() || undefined })}
        style={{ width: 340 }}
        aria-label="Tìm khiếu nại"
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
        aria-label="Lọc theo ngày gửi khiếu nại"
      />
    </Space>
  )
}
