import { Input, Select, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import type { UserStatus } from '#/types/auth'
import { formatNumber } from '#/utils/format'

export interface CustomerFilterValue {
  keyword?: string
  status?: Extract<UserStatus, 'active' | 'blocked'>
}

interface CustomerFiltersProps {
  value: CustomerFilterValue
  total?: number
  onChange: (value: CustomerFilterValue) => void
}

export function CustomerFilters({ value, total, onChange }: CustomerFiltersProps) {
  const [keyword, setKeyword] = useState(value.keyword ?? '')

  useEffect(() => setKeyword(value.keyword ?? ''), [value.keyword])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' }}>
      <Space wrap>
        <Input.Search
          allowClear
          placeholder="Tìm theo tên, số điện thoại, email"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={(text) => onChange({ ...value, keyword: text.trim() || undefined })}
          style={{ width: 300 }}
          aria-label="Tìm khách hàng"
        />
        <Select
          allowClear
          placeholder="Mọi trạng thái"
          value={value.status}
          onChange={(status) => onChange({ ...value, status })}
          style={{ width: 180 }}
          options={[
            { value: 'active', label: 'Đang hoạt động' },
            { value: 'blocked', label: 'Đã khóa' },
          ]}
          aria-label="Lọc theo trạng thái"
        />
      </Space>
      {total !== undefined && (
        <Typography.Text type="secondary" style={{ alignSelf: 'center' }}>
          {formatNumber(total)} khách hàng
        </Typography.Text>
      )}
    </div>
  )
}
